/* Canvas-based drink assembly: persistent liquid volume, layered pours, ripples and ingredient-specific procedural sounds. */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const palette = name => {
    const n=String(name||"").toLowerCase();
    if(/milk|cream|foam|condensed/.test(n)) return {top:"#ead0a5",bottom:"#c79d6c",sound:"milk"};
    if(/espresso|coffee|بن|قهوة/.test(n)) return {top:"#9a5b32",bottom:"#422318",sound:"coffee"};
    if(/matcha|green tea/.test(n)) return {top:"#9bb66c",bottom:"#506b35",sound:"powder"};
    if(/ice|ثلج/.test(n)) return {top:"#d9f3f4",bottom:"#8fc9d0",sound:"ice"};
    if(/syrup|sauce|caramel|chocolate|صوص|سيرب/.test(n)) return {top:"#b97842",bottom:"#60351f",sound:"syrup"};
    if(/strawberry|berry|فراولة|توت/.test(n)) return {top:"#d96f7d",bottom:"#8c294b",sound:"fruit"};
    if(/mango|passion|orange|مانجو|برتقال/.test(n)) return {top:"#f3b84f",bottom:"#c56d26",sound:"fruit"};
    if(/water|ماء/.test(n)) return {top:"#b9e3e9",bottom:"#6daebd",sound:"water"};
    if(/tea|شاي/.test(n)) return {top:"#b77a3d",bottom:"#68401f",sound:"water"};
    return {top:"#c18a58",bottom:"#6e4028",sound:"pour"};
  };
  const ingredientPlan = (p, recipe) => {
    const ingredients=(recipe?.ingredients||[]).map(x=>({name:x.name,amount:x.amount,...palette(x.name)}));
    const n=(p.name||"").toLowerCase(), c=p.category;
    let ordered=ingredients;
    if(c==="Iced Coffee" && !n.includes("americano")) ordered=[...ingredients].sort((a,b)=>Number(/syrup|sauce|صوص|سيرب/.test(b.name))-Number(/syrup|sauce|صوص|سيرب/.test(a.name)));
    if(c==="Frappe Coffee"||c==="Milk Shake") return [{name:"Blend",sound:"blend",top:"#c9a77e",bottom:"#8b6547"},...ordered.slice(0,3),{name:"Final pour",sound:"thick",top:ordered[0]?.top||"#bd8a58",bottom:ordered[0]?.bottom||"#69452f"}].slice(0,5);
    if(c==="Matcha") return [{name:"Matcha whisk",sound:"whisk",top:"#9bb66c",bottom:"#506b35"},...ordered.slice(0,4)];
    if(c==="Soft Drinks & Juices" && n==="water") return [{name:"Water pour",sound:"water",top:"#b9e3e9",bottom:"#6daebd"}];
    return ordered.slice(0,5);
  };
  function makeAudio() {
    const sources = {
      coffee: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Espresso_machine.ogg",
      milk: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Drinking_a_glass_of_wat.ogg",
      water: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Water_flowing_pouring_trickling.ogg",
      ice: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Binging_glass.ogg",
      syrup: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Water_flowing_pouring_trickling.ogg",
      fruit: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Drinking_a_glass_of_wat.ogg",
      blend: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kitchen_blender.webm",
      whisk: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kitchen_sounds_recorded_while_cooking.ogg",
      powder: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coffee_grinder.ogg",
      thick: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Water_flowing_pouring_trickling.ogg",
      pour: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Drinking_a_glass_of_wat.ogg"
    };
    const limits = {coffee:4.8,milk:3.4,water:3.2,ice:1.8,syrup:2.5,fruit:2.7,blend:8.5,whisk:3.5,powder:2.2,thick:2.8,pour:3};
    let enabled=true,active=[];
    return {
      play(kind) {
        if(!enabled)return;
        const url=sources[kind]||sources.pour;
        const audio=new Audio(url);
        audio.preload="auto";
        audio.volume=kind==="blend"?.52:.72;
        audio.playbackRate=kind==="syrup"?.78:kind==="ice"?1.08:1;
        const max=limits[kind]||3;
        const stopAt=()=>{if(audio.currentTime>=max){audio.pause();audio.removeEventListener("timeupdate",stopAt);}};
        audio.addEventListener("timeupdate",stopAt);
        active.push(audio);
        audio.addEventListener("ended",()=>{active=active.filter(x=>x!==audio);});
        const result=audio.play();
        if(result&&typeof result.catch==="function")result.catch(()=>{});
      },
      toggle(){enabled=!enabled;if(!enabled){active.forEach(a=>a.pause());active=[];}return enabled;},
      get enabled(){return enabled;}
    };
  }
  function mount(product, recipe) {
    const host=document.querySelector("#recipeScene");
    if(!host)return;
    host.__fluidCleanup?.();
    host.querySelector(".fluid-canvas")?.remove();
    host.querySelector(".fluid-sound-toggle")?.remove();
    const canvas=document.createElement("canvas");canvas.className="fluid-canvas";canvas.setAttribute("aria-label","Animated drink being poured into a glass");
    host.appendChild(canvas);
    host.classList.add("fluid-active");
    const ctx=canvas.getContext("2d"),audio=makeAudio(),plan=ingredientPlan(product,recipe);
    const dpr=Math.min(2,window.devicePixelRatio||1);
    let w=0,h=0,raf=0,start=0,lastStage=-1,paused=false;
    const particles=[];
    const resize=()=>{const r=host.getBoundingClientRect();w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);};
    resize();
    const cup={cx:()=>w*.5,top:Math.max(56,h*.28),bottom:h-19,half:Math.min(58,w*.22)};
    const total=Math.max(1,plan.length),stageDuration=1700,fullDuration=total*stageDuration+650;
    const stages=plan.map((item,i)=>({...item,from:i/total,to:(i+1)/total}));
    function roundedCupPath(){
      const x=cup.cx(),t=cup.top,b=cup.bottom,hw=cup.half;
      ctx.beginPath();ctx.moveTo(x-hw,t);ctx.lineTo(x-hw*.78,b-8);ctx.quadraticCurveTo(x-hw*.72,b,x,b);ctx.quadraticCurveTo(x+hw*.72,b,x+hw*.78,b-8);ctx.lineTo(x+hw,t);ctx.closePath();
    }
    function surfaceY(level){return cup.bottom-(cup.bottom-cup.top-9)*level;}
    function addRipple(y,amount){particles.push({x:cup.cx(),y,age:0,life:.9,r:4+amount*9,kind:"ripple"});for(let i=0;i<8;i++)particles.push({x:cup.cx()+(Math.random()-.5)*cup.half,y:y-2,age:0,life:.45+Math.random()*.35,r:1+Math.random()*2,kind:"bubble",vx:(Math.random()-.5)*32,vy:-8-Math.random()*24});}
    function drawLiquid(level,active,elapsed,stageIndex){
      const x=cup.cx(),y=surfaceY(level),b=cup.bottom,hw=cup.half;
      ctx.save();roundedCupPath();ctx.clip();
      const layerCount=Math.max(1,Math.min(plan.length,Math.ceil(level*total)));
      for(let i=0;i<layerCount;i++){
        const item=stages[i],segmentBottom=surfaceY(i/total);
        const segmentTop=i===stageIndex?y:surfaceY((i+1)/total);
        const top=Math.max(cup.top,segmentTop),bottom=Math.min(b,segmentBottom);
        if(bottom<=top)continue;
        const grad=ctx.createLinearGradient(0,top,0,bottom);grad.addColorStop(0,item.top);grad.addColorStop(1,item.bottom);
        ctx.fillStyle=grad;ctx.fillRect(x-hw,top,hw*2,bottom-top+2);
      }
      if(level>0){
        ctx.beginPath();ctx.moveTo(x-hw,y);
        for(let px=-hw;px<=hw;px+=4){const wave=Math.sin((px+elapsed*.07)*.11)*1.8+Math.sin(px*.19+elapsed*.004)*.9;ctx.lineTo(x+px,y+wave);}
        ctx.lineTo(x+hw,b);ctx.lineTo(x-hw,b);ctx.closePath();
        const surface=ctx.createLinearGradient(0,y-4,0,y+15);surface.addColorStop(0,"rgba(255,255,255,.42)");surface.addColorStop(1,"rgba(255,255,255,.02)");ctx.fillStyle=surface;ctx.fill();
      }
      if(active&&level>.03){
        const impact=surfaceY(level);
        ctx.strokeStyle="rgba(255,255,255,.5)";ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(x,impact+3,12+Math.sin(elapsed*.025)*5,3,0,0,Math.PI*2);ctx.stroke();
      }
      ctx.restore();
    }
    function drawGlass(){
      const x=cup.cx(),t=cup.top,b=cup.bottom,hw=cup.half;
      ctx.save();roundedCupPath();ctx.fillStyle="rgba(255,255,255,.075)";ctx.fill();ctx.lineWidth=2.2;ctx.strokeStyle="rgba(255,255,255,.82)";ctx.stroke();
      ctx.beginPath();ctx.ellipse(x,t,hw,5,0,0,Math.PI*2);ctx.strokeStyle="rgba(255,255,255,.9)";ctx.lineWidth=2;ctx.stroke();
      ctx.beginPath();ctx.moveTo(x-hw*.62,t+12);ctx.lineTo(x-hw*.48,b-14);ctx.strokeStyle="rgba(255,255,255,.24)";ctx.lineWidth=4;ctx.stroke();
      ctx.beginPath();ctx.moveTo(x+hw*.7,t+18);ctx.lineTo(x+hw*.55,b-19);ctx.strokeStyle="rgba(255,255,255,.13)";ctx.lineWidth=2;ctx.stroke();
      ctx.restore();
    }
    function drawStream(level,item,elapsed,progress){
      if(progress>.9)return;
      const x=cup.cx()+Math.sin(elapsed*.006)*3, y=surfaceY(level),alpha=Math.sin(Math.PI*progress)*.92;
      ctx.save();ctx.globalAlpha=alpha;const grad=ctx.createLinearGradient(x-3,0,x+3,0);grad.addColorStop(0,item.bottom);grad.addColorStop(.5,item.top);grad.addColorStop(1,item.bottom);
      ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(x-2.3,7);ctx.quadraticCurveTo(x-1,y*.45,x+1,y);ctx.lineTo(x+2.3,7);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.ellipse(x,y,4,7,0,0,Math.PI*2);ctx.fillStyle=item.top;ctx.fill();ctx.restore();
    }
    function drawParticles(dt){
      for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.age+=dt;if(p.age>p.life){particles.splice(i,1);continue;}const k=p.age/p.life;
        if(p.kind==="ripple"){ctx.strokeStyle="rgba(255,255,255,"+(1-k)*.6+")";ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(p.x,p.y,p.r*(.5+k*2),2+k*2,0,0,Math.PI*2);ctx.stroke();}
        else{p.x+=(p.vx||0)*dt;p.y+=(p.vy||0)*dt;ctx.fillStyle="rgba(255,255,255,"+((1-k)*.55)+")";ctx.beginPath();ctx.arc(p.x,p.y,p.r*(1-k*.4),0,Math.PI*2);ctx.fill();}
      }
    }
    function frame(now){
      if(paused)return;
      if(!start)start=now;
      const elapsed=now-start,progress=clamp(elapsed/fullDuration,0,1),stageIndex=Math.min(total-1,Math.floor(progress*total)),stage=stages[stageIndex],stageProgress=clamp((progress-stage.from)/(stage.to-stage.from),0,1);
      const level=clamp((stageIndex+stageProgress)/total,0,1);
      if(stageIndex!==lastStage){lastStage=stageIndex;audio.play(stage.sound);addRipple(surfaceY(Math.max(.02,stage.from)),stageIndex);}
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle="rgba(255,255,255,.035)";ctx.fillRect(0,0,w,h);
      drawLiquid(level,stageProgress<.82,elapsed,stageIndex);
      if(stageProgress<.82)drawStream(level,stage,elapsed,stageProgress);
      drawParticles(1/60);drawGlass();
      if(progress<1)raf=requestAnimationFrame(frame);
      else{drawParticles(1/60);const label=host.querySelector(".scene-stage-label.label-three");if(label)label.textContent="READY TO ENJOY";}
    }
    const replay=()=>{cancelAnimationFrame(raf);start=0;lastStage=-1;particles.length=0;ctx.clearRect(0,0,w,h);raf=requestAnimationFrame(frame);};
    const sound=document.createElement("button");sound.type="button";sound.className="fluid-sound-toggle";sound.textContent="♫ Sound on";sound.setAttribute("aria-pressed","true");
    sound.addEventListener("click",()=>{const on=audio.toggle();sound.textContent=on?"♫ Sound on":"♫ Sound off";sound.setAttribute("aria-pressed",String(on));if(on)audio.play("pour");});
    host.querySelector(".recipe-scene-controls")?.appendChild(sound);
    const onResize=()=>{resize();};window.addEventListener("resize",onResize,{passive:true});
    const onVisibility=()=>{if(document.hidden){paused=true;cancelAnimationFrame(raf);}else if(paused){paused=false;replay();}};
    document.addEventListener("visibilitychange",onVisibility);
    replay();
    host.__fluidCleanup=()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);canvas.remove();sound.remove();};
    return host.__fluidCleanup;
  }
  window.RecipeFluid={mount};
})();