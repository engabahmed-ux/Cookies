/* Canvas drink assembly with progressive ingredient blending and stage-synced recorded Foley. */
(() => {
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const palette=name=>{
    const n=String(name||"").toLowerCase();
    if(/milk|cream|foam|condensed/.test(n))return {top:"#d8bd98",bottom:"#b58c63",sound:null};
    if(/espresso|coffee|بن|قهوة/.test(n))return {top:"#98603d",bottom:"#422719",sound:"coffee"};
    if(/matcha|green tea/.test(n))return {top:"#91a85e",bottom:"#536b37",sound:"powder"};
    if(/ice|ثلج/.test(n))return {top:"#c4e5e7",bottom:"#8fc3c9",sound:null};
    if(/syrup|sauce|caramel|chocolate|صوص|سيرب/.test(n))return {top:"#a96b3d",bottom:"#62351f",sound:null};
    if(/strawberry|berry|فراولة|توت/.test(n))return {top:"#ca6673",bottom:"#8b304b",sound:null};
    if(/mango|passion|orange|مانجو|برتقال/.test(n))return {top:"#e8ae50",bottom:"#c47732",sound:null};
    if(/water|ماء/.test(n))return {top:"#b4dce1",bottom:"#76aeb7",sound:null};
    if(/tea|شاي/.test(n))return {top:"#b77a3d",bottom:"#68401f",sound:null};
    return {top:"#b98a62",bottom:"#71482e",sound:null};
  };
  const ingredientPlan=(p,recipe)=>{
    const items=(recipe?.ingredients||[]).map(x=>({name:x.name,amount:x.amount,...palette(x.name)}));
    const n=(p.name||"").toLowerCase(),c=p.category;
    if(c==="Frappe Coffee"||c==="Milk Shake")return [{name:"Blending",sound:"blend",top:"#c5a27b",bottom:"#79563d"},...items.slice(0,3),{name:"Final texture",top:items[0]?.top||"#b98a62",bottom:items[0]?.bottom||"#71482e"}].slice(0,5);
    if(c==="Matcha")return [{name:"Matcha whisk",sound:"whisk",top:"#91a85e",bottom:"#536b37"},...items.slice(0,4)];
    if(c==="Coffee"&&!/tea/i.test(n)&&!items.some(x=>x.sound==="coffee"))return [{name:"Espresso extraction",sound:"coffee",top:"#98603d",bottom:"#422719"},...items.slice(0,4)];
    return items.slice(0,5);
  };
  function makeAudio(){
    // Deliberately omit generic water/glass recordings: they did not sound like the ingredient being added.
    const sources={
      coffee:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Espresso_machine.ogg",
      blend:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kitchen_blender.webm",
      whisk:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Kitchen_sounds_recorded_while_cooking.ogg",
      powder:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Coffee_grinder.ogg"
    };
    let enabled=true,current=null;
    const stop=()=>{if(current){current.pause();current.currentTime=0;current=null;}};
    return {
      play(kind){
        stop();
        if(!enabled||!sources[kind])return;
        const audio=new Audio(sources[kind]);current=audio;audio.preload="auto";audio.volume=kind==="blend"?.48:.58;
        const result=audio.play();if(result&&typeof result.catch==="function")result.catch(()=>{});
      },
      stop,
      toggle(){enabled=!enabled;if(!enabled)stop();return enabled;},
      get enabled(){return enabled;}
    };
  }
  const hexRgb=value=>{const h=value.replace("#","");return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));};
  const rgbHex=rgb=>"#"+rgb.map(v=>Math.round(clamp(v,0,255)).toString(16).padStart(2,"0")).join("");
  const mix=(a,b,t)=>rgbHex(hexRgb(a).map((v,i)=>v+(hexRgb(b)[i]-v)*t));
  function mount(product,recipe){
    const host=document.querySelector("#recipeScene");if(!host)return;
    host.__fluidCleanup?.();host.querySelector(".fluid-canvas")?.remove();host.querySelector(".fluid-sound-toggle")?.remove();
    const canvas=document.createElement("canvas");canvas.className="fluid-canvas";canvas.setAttribute("aria-label","Drink ingredients blending together inside a glass");host.appendChild(canvas);host.classList.add("fluid-active");
    const ctx=canvas.getContext("2d"),audio=makeAudio(),plan=ingredientPlan(product,recipe);
    const dpr=Math.min(2,window.devicePixelRatio||1);let w=0,h=0,raf=0,start=0,lastStage=-1,paused=false;
    const particles=[];const resize=()=>{const r=host.getBoundingClientRect();w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);};
    resize();
    const cup={cx:()=>w*.5,top:Math.max(56,h*.25),bottom:h-19,half:Math.min(58,w*.22)};
    const total=Math.max(1,plan.length),stageDuration=1900,fullDuration=total*stageDuration+500;
    const stages=plan.map((item,i)=>({...item,from:i/total,to:(i+1)/total}));
    const initial=stages[0]||{top:"#98603d",bottom:"#422719"};
    let currentTop=initial.top,currentBottom=initial.bottom,fromTop=currentTop,fromBottom=currentBottom,targetTop=currentTop,targetBottom=currentBottom;
    function cupPath(){const x=cup.cx(),t=cup.top,b=cup.bottom,hw=cup.half;ctx.beginPath();ctx.moveTo(x-hw,t);ctx.lineTo(x-hw*.78,b-8);ctx.quadraticCurveTo(x-hw*.72,b,x,b);ctx.quadraticCurveTo(x+hw*.72,b,x+hw*.78,b-8);ctx.lineTo(x+hw,t);ctx.closePath();}
    function surfaceY(level){return cup.bottom-(cup.bottom-cup.top-9)*level;}
    function addMixMotion(y,index){for(let i=0;i<3;i++)particles.push({x:cup.cx()+(Math.random()-.5)*cup.half*.7,y:y+(Math.random()-.5)*7,age:0,life:1.05+i*.12,r:9+i*5,dir:i%2?1:-1,kind:"swirl"});for(let i=0;i<5;i++)particles.push({x:cup.cx()+(Math.random()-.5)*cup.half*.8,y:y-2,age:0,life:.5+Math.random()*.25,r:1+Math.random()*2,kind:"bubble",vx:(Math.random()-.5)*20,vy:-5-Math.random()*15});}
    function drawLiquid(level,elapsed,blendProgress){
      if(level<=0)return;
      const x=cup.cx(),y=surfaceY(level),b=cup.bottom,hw=cup.half;
      ctx.save();cupPath();ctx.clip();
      const g=ctx.createLinearGradient(0,cup.top,0,b);g.addColorStop(0,mix(currentTop,targetTop,blendProgress));g.addColorStop(1,mix(currentBottom,targetBottom,blendProgress));
      ctx.fillStyle=g;ctx.fillRect(x-hw,cup.top,hw*2,b-cup.top);
      // Soft internal marbling dissolves into the drink instead of drawing hard ingredient bands.
      const swirlAlpha=(1-blendProgress)*.16;
      for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(x+Math.sin(elapsed*.001+i)*hw*.18,y+(i-1.5)*12,hw*(.22+i*.08),5+i*1.7,Math.sin(elapsed*.0015+i)*.22,0,Math.PI*2);ctx.strokeStyle="rgba(255,244,224,"+swirlAlpha+")";ctx.lineWidth=2.2;ctx.stroke();}
      ctx.beginPath();ctx.moveTo(x-hw,y);
      for(let px=-hw;px<=hw;px+=4){const wave=Math.sin((px+elapsed*.05)*.1)*1.2+Math.sin(px*.16+elapsed*.003)*.65;ctx.lineTo(x+px,y+wave);}
      ctx.lineTo(x+hw,b);ctx.lineTo(x-hw,b);ctx.closePath();
      const surface=ctx.createLinearGradient(0,y-4,0,y+15);surface.addColorStop(0,"rgba(255,255,255,.28)");surface.addColorStop(1,"rgba(255,255,255,.015)");ctx.fillStyle=surface;ctx.fill();
      ctx.restore();
    }
    function drawGlass(){
      const x=cup.cx(),t=cup.top,b=cup.bottom,hw=cup.half;
      ctx.save();cupPath();ctx.fillStyle="rgba(255,255,255,.075)";ctx.fill();ctx.lineWidth=2.2;ctx.strokeStyle="rgba(255,255,255,.86)";ctx.stroke();
      ctx.beginPath();ctx.ellipse(x,t,hw,5,0,0,Math.PI*2);ctx.strokeStyle="rgba(255,255,255,.92)";ctx.lineWidth=2;ctx.stroke();
      ctx.beginPath();ctx.moveTo(x-hw*.62,t+12);ctx.lineTo(x-hw*.48,b-14);ctx.strokeStyle="rgba(255,255,255,.24)";ctx.lineWidth=4;ctx.stroke();
      ctx.beginPath();ctx.moveTo(x+hw*.7,t+18);ctx.lineTo(x+hw*.55,b-19);ctx.strokeStyle="rgba(255,255,255,.13)";ctx.lineWidth=2;ctx.stroke();ctx.restore();
    }
    function drawStream(level,item,elapsed,progress){
      if(progress>.84)return;
      const x=cup.cx()+Math.sin(elapsed*.005)*2.2,y=surfaceY(level),alpha=Math.sin(Math.PI*progress)*.78;
      ctx.save();ctx.globalAlpha=alpha;const grad=ctx.createLinearGradient(x-3,0,x+3,0);grad.addColorStop(0,item.bottom);grad.addColorStop(.5,item.top);grad.addColorStop(1,item.bottom);
      ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(x-1.8,7);ctx.quadraticCurveTo(x-1,y*.45,x+1,y);ctx.lineTo(x+1.8,7);ctx.closePath();ctx.fill();ctx.restore();
    }
    function drawParticles(dt){
      for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.age+=dt;if(p.age>p.life){particles.splice(i,1);continue;}const k=p.age/p.life;
        if(p.kind==="swirl"){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.dir*k*1.9);ctx.beginPath();ctx.ellipse(0,0,p.r*(.35+k),2+k*2,0,0,Math.PI*1.75);ctx.strokeStyle="rgba(255,242,218,"+((1-k)*.22)+")";ctx.lineWidth=1.8;ctx.stroke();ctx.restore();}
        else{p.x+=(p.vx||0)*dt;p.y+=(p.vy||0)*dt;ctx.fillStyle="rgba(255,255,255,"+((1-k)*.42)+")";ctx.beginPath();ctx.arc(p.x,p.y,p.r*(1-k*.4),0,Math.PI*2);ctx.fill();}
      }
    }
    function frame(now){
      if(paused)return;if(!start)start=now;
      const elapsed=now-start,progress=clamp(elapsed/fullDuration,0,1),stageIndex=Math.min(total-1,Math.floor(progress*total)),stage=stages[stageIndex],stageProgress=clamp((progress-stage.from)/(stage.to-stage.from),0,1);
      const level=clamp((stageIndex+stageProgress)/total,0,1);
      if(stageIndex!==lastStage){lastStage=stageIndex;audio.play(stage.sound);fromTop=currentTop;fromBottom=currentBottom;targetTop=stage.top;targetBottom=stage.bottom;addMixMotion(surfaceY(Math.max(.025,stage.from)),stageIndex);}
      currentTop=mix(fromTop,targetTop,clamp(stageProgress*1.18,0,1));currentBottom=mix(fromBottom,targetBottom,clamp(stageProgress*1.18,0,1));
      ctx.clearRect(0,0,w,h);ctx.fillStyle="rgba(255,255,255,.025)";ctx.fillRect(0,0,w,h);
      drawLiquid(level,elapsed,stageProgress);if(stageProgress<.82)drawStream(level,stage,elapsed,stageProgress);
      drawParticles(1/60);drawGlass();
      if(progress<1)raf=requestAnimationFrame(frame);else{audio.stop();const label=host.querySelector(".scene-stage-label.label-three");if(label)label.textContent="READY TO ENJOY";}
    }
    const replay=()=>{cancelAnimationFrame(raf);audio.stop();start=0;lastStage=-1;particles.length=0;currentTop=initial.top;currentBottom=initial.bottom;fromTop=targetTop=currentTop;fromBottom=targetBottom=currentBottom;ctx.clearRect(0,0,w,h);raf=requestAnimationFrame(frame);};
    const sound=document.createElement("button");sound.type="button";sound.className="fluid-sound-toggle";sound.textContent="♫ Sound on";sound.setAttribute("aria-pressed","true");
    sound.addEventListener("click",()=>{const on=audio.toggle();sound.textContent=on?"♫ Sound on":"♫ Sound off";sound.setAttribute("aria-pressed",String(on));});
    host.querySelector(".recipe-scene-controls")?.appendChild(sound);
    const onResize=()=>resize();window.addEventListener("resize",onResize,{passive:true});
    const onVisibility=()=>{if(document.hidden){paused=true;cancelAnimationFrame(raf);audio.stop();}else if(paused){paused=false;replay();}};
    document.addEventListener("visibilitychange",onVisibility);replay();
    host.__fluidCleanup=()=>{cancelAnimationFrame(raf);audio.stop();window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);canvas.remove();sound.remove();};
    return host.__fluidCleanup;
  }
  window.RecipeFluid={mount};
})();