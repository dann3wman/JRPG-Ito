(function(root){
  root.installHellstarRigs = function(rigs,atlas){
    for(const [id,source] of Object.entries(HellstarRigs.rigs)){
      const key='hellstar_'+id,byId=Object.fromEntries(source.bones.map(b=>[b.id,b]));
      atlas[key]={assembled:[0,0,1254,1254]};
      rigs[key]={name:source.name,short:['Hellstar I','Hellstar II','Hellstar III'][source.stage-1],accent:'#ce786c',arena:'none',
        lore:source.description+' One continuous skin, weighted to the bones shown here. Select a joint to inspect it; drag to bend it. Setup edits and clip tracks use the same authoring controls as the other creatures.',
        mesh:id,sheet:'../../assets/bosses/'+source.image,
        bones:source.bones.map(b=>({id:b.id,p:b.parent,at:b.parent?b.at.map((n,i)=>n-byId[b.parent].at[i]):[...b.at],pv:[0,0],tip:[0,-Math.max(25,b.radius[1]*.4)]})),
        anims:Object.fromEntries(Object.entries(source.clips).map(([name,clip])=>[name,{
          label:clip.label,dur:clip.duration,markers:clip.markers||{},next:clip.next&&source.next?'hellstar_'+source.next:null,
          timing:{in:.12,out:clip.hold||clip.next?0:.22,mix:.2,holdEnd:!!(clip.hold||clip.next)},
          fn(t,P){const pose=HellstarSkin.pose(source,name,t);for(const b of source.bones)Object.assign(P[b.id],pose[b.id]);P.root.a=HellstarSkin.opacity(source,name,t);}
        }]))};
    }
  };
})(globalThis);
