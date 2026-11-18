import {surface,panel,label,rect,read,persist,wrap,type Frame} from "@shared/surface";
const meters=["2/4","3/4","4/4","6/8"],beats=[2,3,4,6];type Setup={bpm:number;bars:number;meter:number};
let setup=read<Setup>("count-in-setup",{bpm:90,bars:2,meter:2}),field=0,origin=0,index=-1,done=false,closed=false;
let timer:ReturnType<typeof setTimeout>|undefined;const names=["TEMPO","BARS","METER"];
function stop(){if(timer!==undefined)clearTimeout(timer);timer=undefined;origin=0;}
function pump(){timer=undefined;if(!origin||closed)return;const period=60000/setup.bpm;index=Math.floor((Date.now()-origin)/period);
 if(index>=setup.bars*beats[setup.meter]){stop();done=true;refresh("success");return;}refresh();
 timer=setTimeout(pump,Math.max(8,Math.ceil(origin+(index+1)*period-Date.now())));}
function draw():Frame{const b=beats[setup.meter],bar=Math.floor(index/b)+1,beat=wrap(index,b);
 const headline=done?"GO":origin?"BAR "+bar+"/"+setup.bars:names[field],value=done?"PLAY":origin?String(beat+1):[setup.bpm+" bpm",setup.bars+" bars",meters[setup.meter]][field];
 const out:Frame=[label("head",headline,1,0,"#F5AE80FF","front","tiny"),label("value",value,1,6,"#FFF2DAFF","front","small")];
 for(let i=0;i<b;i++)out.push(rect("beat"+i,42+4*i,7,3,7,done?"#96D7ACFF":origin&&i===beat?"#F5AE80FF":"#394650FF"));
 return out.concat(panel("COUNT IN",[done?"Enter now":origin?"Bar "+bar+" of "+setup.bars+"  /  beat "+(beat+1):"Ready to rehearse",meters[setup.meter]+" / "+setup.bpm+" beats/min",setup.bars+" bars before entry","Wheel: adjust / Click: field","Start: begin or stop","Tempo counts marked beats"]));}
const refresh=surface(draw,k=>{if(k==="start"){if(origin){stop();index=-1;done=false;}else{done=false;origin=Date.now();pump();}return;}
 if(origin)return;done=false;if(k==="ok")field=wrap(field+1,3);if(k==="up"||k==="down"){const n=k==="up"?1:-1;if(field===0)setup.bpm=Math.max(30,Math.min(240,setup.bpm+n));else if(field===1)setup.bars=Math.max(1,Math.min(32,setup.bars+n));else setup.meter=wrap(setup.meter+n,meters.length);persist("count-in-setup",setup);}},()=>{closed=true;stop();},{enabled:false});
