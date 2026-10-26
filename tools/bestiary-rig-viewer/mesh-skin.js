(function(root){
  const identity = () => [1,0,0,1,0,0];
  const mul = (a,b) => [a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
  const point = (m,x,y) => [m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
  const smooth = t => { t=Math.max(0,Math.min(1,t)); return t*t*(3-2*t); };
  function keyValue(keys,t){
    if(t<=keys[0][0]) return keys[0][1];
    for(let i=1;i<keys.length;i++) if(t<=keys[i][0]){
      const a=keys[i-1],b=keys[i],f=smooth((t-a[0])/(b[0]-a[0])); return a[1]+(b[1]-a[1])*f;
    }
    return keys[keys.length-1][1];
  }
  function validate(rig){
    const seen=new Set();
    for(const b of rig.bones){
      if(seen.has(b.id) || (b.parent && !seen.has(b.parent))) throw Error('Invalid bone order: '+b.id);
      if(![...b.at,...b.radius].every(Number.isFinite) || b.radius.some(n=>n<0)) throw Error('Invalid bone geometry: '+b.id);
      seen.add(b.id);
    }
    if(rig.bones[0].id!=='root') throw Error('Root bone required');
    for(const [name,c] of Object.entries(rig.clips)){
      if(!(c.duration>0)) throw Error('Invalid duration: '+name);
      for(const tr of c.tracks){
        if(!seen.has(tr.bone) || !['x','y','r','sx','sy'].includes(tr.field)) throw Error('Invalid track: '+name+'/'+tr.bone);
        let previous=-1;
        for(const [t,v] of tr.keys){
          if(!Number.isFinite(t)||!Number.isFinite(v)||t<0||t>1||t<=previous||(tr.field[0]==='s'&&v<=0)) throw Error('Invalid key: '+name);
          previous=t;
        }
      }
    }
  }
  function mesh(rig,grid=32){
    validate(rig);
    const vertices=[],weights=[],indices=[];
    for(let y=0;y<=grid;y++) for(let x=0;x<=grid;x++){
      const p=[x*1000/grid,y*1000/grid]; vertices.push(p);
      const list=[[0,.12]];
      rig.bones.forEach((b,i)=>{
        if(!i) return;
        const d=((p[0]-b.at[0])/b.radius[0])**2+((p[1]-b.at[1])/b.radius[1])**2;
        if(d<1) list.push([i,(1-d)**3]);
      });
      const total=list.reduce((s,w)=>s+w[1],0); weights.push(list.map(([i,w])=>[i,w/total]));
      if(x<grid&&y<grid){const a=y*(grid+1)+x,b=a+1,c=a+grid+1,d=c+1;indices.push(a,b,c,b,d,c);}
    }
    return {vertices,weights,indices,grid};
  }
  function pose(rig,clip,time,clock=time,manual={}){
    const c=rig.clips[clip]; if(!c) throw Error('Unknown clip '+clip);
    const P={};
    for(const b of rig.bones){
      const q=P[b.id]={x:0,y:0,r:0,sx:1,sy:1},a=b.idle||{};
      const w=Math.sin(2*Math.PI*((clock/rig.clips.idle.duration)*(a.cycles||1)+(a.phase||0)));
      for(const f of ['x','y','r','sx','sy']) if(a[f]) q[f]+=a[f]*w;
    }
    const t=Math.max(0,Math.min(1,time/c.duration));
    for(const tr of c.tracks){const v=keyValue(tr.keys,t); if(tr.field[0]==='s')P[tr.bone][tr.field]*=v;else P[tr.bone][tr.field]+=v;}
    for(const [id,offset] of Object.entries(manual)){if(!P[id])continue;for(const [f,v]of Object.entries(offset))if(f in P[id])P[id][f]+=v;}
    return P;
  }
  function solve(rig,P){
    const matrices=[],byId={};
    rig.bones.forEach((b,i)=>{
      const q=P[b.id],angle=q.r*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),[x,y]=b.at;
      const local=[c*q.sx,s*q.sx,-s*q.sy,c*q.sy,0,0];
      local[4]=x+q.x-local[0]*x-local[2]*y;local[5]=y+q.y-local[1]*x-local[3]*y;
      matrices[i]=b.parent?mul(matrices[byId[b.parent]],local):local;byId[b.id]=i;
    });
    return matrices;
  }
  function skin(mesh,matrices){
    return mesh.vertices.map(([x,y],i)=>{
      let dx=0,dy=0;for(const [b,w]of mesh.weights[i]){const p=point(matrices[b],x,y);dx+=p[0]*w;dy+=p[1]*w;}return [dx,dy];
    });
  }
  function opacity(rig,clip,time){
    const c=rig.clips[clip],t=time/c.duration;
    if(clip==='defeat'||(clip==='transition'&&!rig.next))return 1-smooth((t-.45)/.55);
    if(c.next&&rig.next)return 1-smooth((t-.58)/.42);
    return 1;
  }
  const api={identity,mul,point,smooth,keyValue,validate,mesh,pose,solve,skin,opacity};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.HellstarSkin=api;
})(typeof globalThis!=='undefined'?globalThis:this);
