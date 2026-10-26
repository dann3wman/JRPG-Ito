/* Coordinates and influence radii use a 1000 × 1000 bind space. Source PNGs stay intact. */
(function(root){
  const bone = (id,parent,x,y,rx,ry,idle={}) => ({id,parent,at:[x,y],radius:[rx*1.18,ry*1.18],idle:Object.fromEntries(Object.entries(idle).map(([f,v])=>[f,['x','y','r','sx','sy'].includes(f)&&id!=='root'?v*2.4:v]))});
  const track = (bone,field,keys) => ({bone,field,keys:keys.map(([t,v])=>[t,bone!=='root'&&['x','y','r'].includes(field)?v*1.8:v])});
  const strike = (a,b,c) => [[0,0],[.22,a],[.38,b],[.56,c],[1,0]];
  const common = {
    hit:{label:'Hit reaction',duration:.75,markers:{impact:.12,recovery:.4},tracks:[track('root','x',strike(-9,4,-2)),track('root','r',strike(-.8,.4,0))]},
    transition:{label:'Transform',duration:3.2,next:true,markers:{anticipation:.8,reveal:2.1},tracks:[track('root','r',[[0,0],[.25,-2],[.65,12],[1,20]]),track('root','sx',[[0,1],[.25,1.02],[.65,.75],[1,.58]]),track('root','sy',[[0,1],[.25,1.02],[.65,.75],[1,.58]])]},
    defeat:{label:'Collapse',duration:3.6,hold:true,markers:{collapse:1.8},tracks:[track('root','r',[[0,0],[.3,-3],[1,35]]),track('root','sx',[[0,1],[.3,.97],[1,.04]]),track('root','sy',[[0,1],[.3,.97],[1,.04]])]}
  };
  // The native sampler adds continuous idle offsets; keep the final collapse above the pulse amplitude until it fades out.
  const eyeCollapse = common.defeat.tracks.map(tr=>tr.field[0]==='s'?{...tr,keys:tr.keys.map(([t,v])=>[t,Math.max(.3,v)])}:tr);
  const rigs = {
    unwound:{name:'Ainsel, the Unwound',stage:1,image:'hellstar-stage-1-unwound.png',next:'eaten',
      description:'Ainsel breathes first. The planet follows. The Tongue recoils before it strikes.',
      bones:[
        bone('root',null,500,500,0,0,{y:2}),
        bone('shell','root',565,335,420,330,{sy:.009,phase:.18}),
        bone('eye','shell',728,319,205,155,{sy:.022,phase:.2}),
        bone('pupil','eye',731,318,78,95,{x:3,phase:.4}),
        bone('jaw','shell',742,506,200,135,{y:3,sy:.01,phase:.25}),
        bone('chest','root',425,525,140,190,{y:-4,sy:.015}),
        bone('head','chest',443,403,76,83,{r:1.2,phase:.1}),
        bone('throat','chest',447,452,45,53,{sx:.025,phase:.1}),
        bone('armL','chest',300,530,135,75,{r:1.4,phase:.12}),
        bone('handL','armL',184,558,85,65,{r:1.1,phase:.24}),
        bone('armR','chest',548,566,95,65,{r:-1.2,phase:.18}),
        bone('handR','armR',637,612,70,65,{r:-.8,phase:.28}),
        bone('ribbonL','root',197,747,170,210,{x:4,r:.7,phase:.35}),
        bone('ribbonR','chest',472,789,150,170,{x:-3,r:-.7,phase:.45}),
        bone('tongueBase','jaw',787,650,90,145,{x:2,phase:.2}),
        bone('tongueBend','tongueBase',735,831,190,90,{y:4,phase:.32}),
        bone('tongueTip','tongueBend',908,868,90,125,{r:2,x:3,phase:.45})
      ],
      clips:{idle:{label:'Unequal breath',duration:8,loop:true,tracks:[]},
        gaze:{label:'Gaze / Offbeat',duration:2.6,markers:{anticipation:.6,impact:1.1,recovery:1.8},tracks:[track('head','r',strike(-3,5,-1)),track('throat','sx',[[0,1],[.25,.92],[.42,1.16],[.7,1.04],[1,1]]),track('pupil','x',strike(-5,10,3)),track('eye','sy',[[0,1],[.23,.94],[.42,1.07],[.7,1.02],[1,1]])]},
        devour:{label:'Tongue / Devour',duration:2.8,markers:{anticipation:.7,impact:1.15,recovery:1.9},tracks:[track('jaw','y',strike(-5,10,2)),track('tongueBase','r',strike(-3,4,-1)),track('tongueBend','x',strike(-12,26,3)),track('tongueTip','r',strike(-7,10,-2)),track('tongueTip','y',strike(8,-18,4)),track('armL','r',strike(1,-2,0))]},...common}
    },
    eaten:{name:'The Eaten',stage:2,image:'hellstar-stage-2-eaten.png',next:'eye',
      description:'The binding arms strain against the spiral. Faces answer in staggered breaths.',
      bones:[
        bone('root',null,500,500,0,0,{y:1.5}),
        bone('chest','root',504,200,150,170,{sy:.012,y:-2}),
        bone('head','chest',503,78,72,70,{r:1.4,phase:.1}),
        bone('armL','chest',326,231,155,95,{r:1.5,phase:.12}),
        bone('armR','chest',683,239,145,95,{r:-1.5,phase:.16}),
        bone('ribL','root',191,449,195,190,{x:-5,r:.8,phase:.2}),
        bone('ribR','root',843,412,160,170,{x:5,r:-.8,phase:.25}),
        bone('spiralTop','root',453,351,180,170,{r:1.3,phase:.25}),
        bone('spiralLeft','root',336,509,150,155,{r:1.3,phase:.4}),
        bone('spiralBottom','root',513,621,180,130,{r:1.3,phase:.55}),
        bone('spiralRight','root',638,464,125,170,{r:1.3,phase:.7}),
        bone('eye','ribR',806,571,100,128,{sy:.025,phase:.2}),
        bone('pupil','eye',816,585,51,65,{x:2,phase:.5}),
        bone('facesL','root',146,657,105,125,{y:2,sy:.012,phase:.1}),
        bone('sleeper','root',198,802,86,95,{r:1,phase:.3}),
        bone('facesMid','root',356,819,125,120,{y:2,sy:.014,phase:.4}),
        bone('facesR','root',530,884,105,80,{y:2,sy:.014,phase:.7}),
        bone('tongueBase','root',552,607,100,115,{r:1,phase:.2}),
        bone('tongueBend','tongueBase',633,807,130,90,{y:3,phase:.4}),
        bone('tongueTip','tongueBend',848,899,95,80,{r:2,phase:.6})
      ],
      clips:{idle:{label:'The bodies breathe',duration:10,loop:true,tracks:[]},
        chorus:{label:'The Eaten / Chorus',duration:3.2,markers:{anticipation:.65,impact:1.4,recovery:2.4},tracks:[track('facesL','sy',[[0,1],[.2,1],[.32,1.08],[.5,1],[1,1]]),track('facesMid','sy',[[0,1],[.3,1],[.45,1.08],[.64,1],[1,1]]),track('facesR','sy',[[0,1],[.43,1],[.58,1.08],[.78,1],[1,1]]),track('head','r',strike(-3,4,1)),track('eye','sy',[[0,1],[.25,.95],[.5,1.07],[1,1]])]},
        unwind:{label:'Binding arms / Unwind',duration:3.4,markers:{anticipation:.85,impact:1.4,recovery:2.5},tracks:[track('armL','r',strike(2,-3,1)),track('armR','r',strike(-2,3,-1)),track('ribL','x',strike(5,-16,3)),track('ribR','x',strike(-5,16,-3)),track('spiralTop','r',strike(-2,5,1)),track('spiralLeft','r',strike(-2,5,1)),track('spiralBottom','r',strike(-2,5,1)),track('spiralRight','r',strike(-2,5,1)),track('tongueTip','r',strike(-3,7,1))]},...common}
    },
    eye:{name:'The Listener’s Eye',stage:3,image:'hellstar-stage-3-listeners-eye.png',
      description:'The Eye convulses in uneven pulses. Its spinal iris writhes, the anchors wrench against each other, and Ainsel’s face struggles inside the pupil.',
      bones:[
        bone('root',null,500,510,0,0,{x:4,y:5,r:2,sx:.12,sy:-.095,cycles:10}),
        bone('lidL','root',230,490,205,245,{x:-10,y:4,r:2,phase:.08,cycles:7}),
        bone('lidR','root',783,480,205,245,{x:10,y:-4,r:-2,phase:.39,cycles:9}),
        bone('lidTop','root',500,316,275,150,{x:5,y:-8,r:2,phase:.17,cycles:8}),
        bone('lidBottom','root',505,757,260,160,{x:-5,y:8,r:-2,phase:.61,cycles:11}),
        bone('irisTop','root',499,407,180,155,{x:3,y:-4,r:3.6,phase:0,cycles:9}),
        bone('irisRight','root',652,521,165,165,{x:4,y:3,r:-3.6,phase:.23,cycles:11}),
        bone('irisBottom','root',495,666,185,160,{x:-3,y:4,r:3.6,phase:.51,cycles:7}),
        bone('irisLeft','root',362,530,160,165,{x:-4,y:-3,r:-3.6,phase:.77,cycles:9}),
        bone('pupil','root',504,525,110,115,{sx:.065,sy:.08,phase:.12,cycles:10}),
        bone('face','pupil',500,522,55,58,{r:-3.5,x:2,phase:.33,cycles:13}),
        bone('anchorTop','root',528,258,115,150,{x:5,y:7,r:3.8,phase:.1,cycles:8}),
        bone('anchorLeft','root',245,698,135,170,{x:7,y:-4,r:-3.8,phase:.43,cycles:11}),
        bone('anchorRight','root',822,701,135,170,{x:-7,y:4,r:3.8,phase:.76,cycles:13}),
        bone('hairL','pupil',452,536,65,76,{r:3.2,y:1.5,phase:.2,cycles:15}),
        bone('hairR','pupil',553,530,65,76,{r:-3.2,y:-1.5,phase:.57,cycles:17})
      ],
      clips:{idle:{label:'Unstable / Convulsions',duration:12,loop:true,tracks:[]},
        listen:{label:'Listen / Lost Turn',duration:3.6,markers:{anticipation:1,impact:1.65,recovery:2.8},tracks:[track('pupil','sx',[[0,1],[.25,.93],[.47,1.1],[.7,1.03],[1,1]]),track('pupil','sy',[[0,1],[.25,.93],[.47,1.1],[.7,1.03],[1,1]]),track('face','r',strike(2,-4,1)),track('irisTop','r',strike(-1,4,0)),track('irisRight','r',strike(-1,4,0)),track('irisBottom','r',strike(-1,4,0)),track('irisLeft','r',strike(-1,4,0))]},
        fold:{label:'The anchors tighten',duration:3.6,markers:{anticipation:.9,impact:1.5,recovery:2.7},tracks:[track('anchorTop','y',strike(-5,13,2)),track('anchorLeft','x',strike(-5,13,2)),track('anchorRight','x',strike(5,-13,-2)),track('lidTop','y',strike(-4,9,0)),track('lidBottom','y',strike(4,-9,0)),track('face','r',strike(-2,3,0))]},...common,
        defeat:{...common.defeat,tracks:eyeCollapse},
        transition:{...common.transition,label:'Wind into the shell',next:false,hold:true,tracks:eyeCollapse}}
    }
  };
  const value = {version:1,space:1000,grid:32,rigs};
  if(typeof module!=='undefined' && module.exports) module.exports=value;
  else root.HellstarRigs=value;
})(typeof globalThis!=='undefined'?globalThis:this);
