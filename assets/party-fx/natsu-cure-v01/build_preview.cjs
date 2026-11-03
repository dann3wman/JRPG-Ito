const fs=require('fs'),path=require('path');
const at=name=>path.join(__dirname,name);
let html=fs.readFileSync(at('preview_template.html'),'utf8');
html=html.replace('/*POSES_DATA*/',()=>`window.NATSU_POSES="data:image/png;base64,${fs.readFileSync(at('poses.png')).toString('base64')}";window.ALLY_POSES="data:image/png;base64,${fs.readFileSync(at('ally_poses.png')).toString('base64')}";`);
html=html.replace('/*RENDER_SOURCE*/',()=>fs.readFileSync(at('render.js'),'utf8'));
fs.writeFileSync(at('natsu_cure_v01.html'),html);
console.log('Updated natsu_cure_v01.html');
