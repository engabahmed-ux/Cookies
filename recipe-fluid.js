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
    let ctx=null, master=null, enabled=true;
    const get=()=>{if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ctx=new AC();master=ctx.createGain();master.gain.value=.22;master.connect(ctx.destination);}if(ctx.state==="suspended")ctx.resume();return ctx;};
    const noise=(duration,frequency,filterType="lowpass",volume=.2)=>{
      const c=get();if(!c)return;
      const length=Math.max(1,Math.floor(c.sampleRate*duration)),buffer=c.createBuffer(1,length,c.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
      const src=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();
      src.buffer=buffer;filter.type=filterType;filter.frequency.value=frequency;
      gain.gain.setValueAtTime(.0001,c.currentTime);gain.gain.exponentialRampToValueAtTime(volume,c.currentTime+.035);gain.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);
      src.connect(filter);filter.connect(gain);gain.connect(master);src.start();src.stop(c.currentTime+duration);
    };
    const tone=(frequency,duration,volume=.07,type="sine")=>{
      const c=get();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(frequency,c.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(40,frequency*.72),c.currentTime+duration);g.gain.setValueAtTime(volume,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);o.connect(g);g.connect(master);o.start();o.stop(c.currentTime+duration);
    };
    return {
      play(kind){if(!enabled)return;get();if(!ctx)return;
        if(kind==="ice"){noise(.24,2400,"highpass",.38);tone(1250,.12,.035,"triangle");}
        else if(kind==="milk"){noise(.75,720,"lowpass",.22);tone(180,.5,.025);}
        else if(kind==="coffee"){noise(.62,1150,"lowpass",.28);tone(260,.35,.035);}
        else if(kind==="syrup"){noise(.85,420,"lowpass",.18);tone(115,.6,.025);}
        else if(kind==="fruit"){noise(.35,1800,"bandpass",.25);tone(520,.18,.025,"triangle");}
        else if(kind==="powder"||kind==="whisk"){noise(.6,3200,"highpass",.13);tone(720,.42,.025,"triangle");}
        else if(kind==="blend"){noise(1.15,850,"lowpass",.24);tone(95,1,.05,"sawtooth");}
        else if(kind==="thick"){noise(.9,560,"lowpass",.2);}
        else if(kind==="water"){noise(.65,1500,"lowpass",.22);}
        else {noise(.55,1000,"lowpass",.2);}
      },
      toggle(){enabled=!enabled;return enabled;},
      get enabled(){return enabled;}
    };
  }
  function mount(product, recipe) {
    const host=document.querySelector("#recipeScene");
    if(!host)return;
    const old=host.querySelector(".fluid-canvas");if(old)old.remove();
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
    function drawLiquid(level,active,elapsed){
      const x=cup.cx(),y=surfaceY(level),b=cup.bottom,hw=cup.half;
      ctx.save();roundedCupPath();ctx.clip();
      const layerCount=Math.max(1,Math.min(plan.length,Math.ceil(level*total)));
      for(let i=0;i<layerCount;i++){
        const item=stages[i],lower=surfaceY((i+1)/total),upper=surfaceY(i/total);
        const bottom=Math.min(b,lower+2),top=Math.max(y,upper);
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
      drawLiquid(level,stageProgress<.82,elapsed);
      if(stageProgress<.82)drawStream(level,stage,elapsed,stageProgress);
      drawParticles(1/60);drawGlass();
      if(progress<1)raf=requestAnimationFrame(frame);
      else{drawParticles(1/60);const label=host.querySelector(".scene-stage-label.label-three");if(label)label.textContent="READY TO ENJOY";}
    }
    const replay=()=>{cancelAnimationFrame(raf);start=0;lastStage=-1;particles.length=0;ctx.clearRect(0,0,w,h);raf=requestAnimationFrame(frame);};
    const replayButton=host.querySelector("#replayRecipeScene");
    replayButton?.addEventListener("click",replay);
    const sound=document.createElement("button");sound.type="button";sound.className="fluid-sound-toggle";sound.textContent="♫ Sound on";sound.setAttribute("aria-pressed","true");
    sound.addEventListener("click",()=>{const on=audio.toggle();sound.textContent=on?"♫ Sound on":"♫ Sound off";sound.setAttribute("aria-pressed",String(on));if(on)audio.play("pour");});
    host.querySelector(".recipe-scene-controls")?.appendChild(sound);
    const onResize=()=>{resize();};window.addEventListener("resize",onResize,{passive:true});
    const onVisibility=()=>{if(document.hidden){paused=true;cancelAnimationFrame(raf);}else if(paused){paused=false;replay();}};
    document.addEventListener("visibilitychange",onVisibility);
    replay();
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);};
  }
  window.RecipeFluid={mount};
})();