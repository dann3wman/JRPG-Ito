(function(root){
  class Renderer {
    constructor(canvas){
      this.canvas=canvas;this.ctx=canvas.getContext('2d');this.textures=new Map();this.meshes=new Map();
      this.mode='Canvas 2D';
      if(location.protocol!=='file:'){
        try{this.initGPU();}catch(e){this.gpu=null;console.info('Mesh renderer uses Canvas 2D:',e.message);}
      }
    }
    initGPU(){
      this.gpu=document.createElement('canvas');
      const gl=this.gl=this.gpu.getContext('webgl',{alpha:true,premultipliedAlpha:true,preserveDrawingBuffer:true,antialias:true});
      if(!gl)throw Error('WebGL unavailable');
      const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
      const p=this.program=gl.createProgram();
      gl.attachShader(p,shader(gl.VERTEX_SHADER,'attribute vec2 position;attribute vec2 uv;uniform vec2 size;varying vec2 tex;void main(){tex=uv;gl_Position=vec4(position.x/size.x*2.-1.,1.-position.y/size.y*2.,0.,1.);}'));
      gl.attachShader(p,shader(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D image;uniform float opacity;varying vec2 tex;void main(){vec4 c=texture2D(image,tex);float a=c.a*opacity;gl_FragColor=vec4(c.rgb*a,a);}'));
      gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
      this.locations={position:gl.getAttribLocation(p,'position'),uv:gl.getAttribLocation(p,'uv'),size:gl.getUniformLocation(p,'size'),opacity:gl.getUniformLocation(p,'opacity')};
      this.buffers={position:gl.createBuffer(),uv:gl.createBuffer(),indices:gl.createBuffer()};
      gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);this.mode='WebGL';
      this.gpu.addEventListener('webglcontextlost',e=>{e.preventDefault();this.gpu=null;this.mode='Canvas 2D';});
    }
    getMesh(key){
      if(!this.meshes.has(key))this.meshes.set(key,HellstarSkin.mesh(HellstarRigs.rigs[key],HellstarRigs.grid));
      return this.meshes.get(key);
    }
    frame(key,clip,time,clock,manual={},rest=false){
      const rig=HellstarRigs.rigs[key],mesh=this.getMesh(key);
      const pose=rest?Object.fromEntries(rig.bones.map(b=>[b.id,{x:0,y:0,r:0,sx:1,sy:1}])):HellstarSkin.pose(rig,clip,time,clock,manual);
      const matrices=HellstarSkin.solve(rig,pose);
      return {rig,mesh,pose,matrices,points:HellstarSkin.skin(mesh,matrices),opacity:rest?1:HellstarSkin.opacity(rig,clip,time)};
    }
    view(){const {width:w,height:h}=this.canvas;const size=Math.min(w,h)*.84;return {scale:size/1000,x:(w-size)/2,y:(h-size)/2};}
    screen(p,v=this.view()){return [v.x+p[0]*v.scale,v.y+p[1]*v.scale];}
    clear(background){const g=this.ctx;g.clearRect(0,0,this.canvas.width,this.canvas.height);if(background){g.fillStyle=background;g.fillRect(0,0,this.canvas.width,this.canvas.height);}}
    draw(image,frame,alpha=1){
      const points=frame.points.map(p=>this.screen(p)),opacity=frame.opacity*alpha;
      if(opacity<=0)return;
      if(this.gpu)this.drawGPU(image,frame.mesh,points,opacity);
      else this.drawCanvas(image,frame.mesh,points,opacity);
    }
    drawGPU(image,mesh,points,opacity){
      const gl=this.gl,w=this.canvas.width,h=this.canvas.height;
      if(this.gpu.width!==w||this.gpu.height!==h){this.gpu.width=w;this.gpu.height=h;}
      gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(this.program);
      let texture=this.textures.get(image);
      if(!texture){
        texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);this.textures.set(image,texture);
      }else gl.bindTexture(gl.TEXTURE_2D,texture);
      const filter=this.ctx.imageSmoothingEnabled?gl.LINEAR:gl.NEAREST;
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filter);
      for(const [name,data]of [['position',points.flat()],['uv',mesh.vertices.flatMap(p=>p.map(n=>n/1000))]]){
        gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers[name]);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(this.locations[name]);gl.vertexAttribPointer(this.locations[name],2,gl.FLOAT,false,0,0);
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.buffers.indices);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(mesh.indices),gl.STATIC_DRAW);
      gl.uniform2f(this.locations.size,w,h);gl.uniform1f(this.locations.opacity,opacity);gl.drawElements(gl.TRIANGLES,mesh.indices.length,gl.UNSIGNED_SHORT,0);
      this.ctx.drawImage(this.gpu,0,0);
    }
    drawCanvas(image,mesh,points,opacity){
      const g=this.ctx;g.save();g.globalAlpha=opacity;
      for(let i=0;i<mesh.indices.length;i+=3){
        const ids=mesh.indices.slice(i,i+3),[a,b,c]=ids.map(n=>mesh.vertices[n]),dst=ids.map(n=>points[n]);
        const [p,q,r]=dst,det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);
        const m0=((q[0]-p[0])*(c[1]-a[1])-(r[0]-p[0])*(b[1]-a[1]))/det;
        const m1=((q[1]-p[1])*(c[1]-a[1])-(r[1]-p[1])*(b[1]-a[1]))/det;
        const m2=((r[0]-p[0])*(b[0]-a[0])-(q[0]-p[0])*(c[0]-a[0]))/det;
        const m3=((r[1]-p[1])*(b[0]-a[0])-(q[1]-p[1])*(c[0]-a[0]))/det;
        const cx=(p[0]+q[0]+r[0])/3,cy=(p[1]+q[1]+r[1])/3;
        g.save();g.beginPath();
        dst.forEach(([x,y],j)=>{const length=Math.hypot(x-cx,y-cy)||1;g[j?'lineTo':'moveTo'](x+(x-cx)*.45/length,y+(y-cy)*.45/length);});
        g.closePath();g.clip();g.setTransform(m0,m1,m2,m3,p[0]-m0*a[0]-m2*a[1],p[1]-m1*a[0]-m3*a[1]);
        g.drawImage(image,0,0,1000,1000);g.restore();
      }
      g.restore();
    }
    overlays(frame,{bones=false,wire=false,selected='root'}={}){
      const g=this.ctx,v=this.view(),factor=this.canvas.width/this.canvas.clientWidth;
      g.save();g.lineWidth=factor;
      if(wire){g.strokeStyle='#d6cee06b';g.beginPath();for(let i=0;i<frame.mesh.indices.length;i+=3){const ids=frame.mesh.indices.slice(i,i+3);ids.forEach((id,j)=>{const p=this.screen(frame.points[id]);g[j?'lineTo':'moveTo'](...p);});g.closePath();}g.stroke();}
      if(bones){
        const locations={};frame.rig.bones.forEach((b,i)=>locations[b.id]=this.screen(HellstarSkin.point(frame.matrices[i],...b.at)));
        g.strokeStyle='#ecebe6';
        for(const b of frame.rig.bones){const p=locations[b.id];if(b.parent){g.beginPath();g.moveTo(...locations[b.parent]);g.lineTo(...p);g.stroke();}g.beginPath();g.arc(...p,(b.id===selected?6:3)*factor,0,Math.PI*2);g.fillStyle=b.id===selected?'#d6cee0':'#151515';g.fill();g.stroke();}
        const bone=frame.rig.bones.find(b=>b.id===selected),p=locations[selected];
        if(p){g.fillStyle='#ecebe6';g.font=`${12*factor}px monospace`;g.fillText(selected,p[0]+9*factor,p[1]-7*factor);g.strokeStyle='#d6cee0';g.beginPath();g.ellipse(...p,bone.radius[0]*v.scale,bone.radius[1]*v.scale,0,0,Math.PI*2);g.stroke();}
      }
      g.restore();
    }
  }
  root.HellstarRenderer=Renderer;
})(globalThis);
