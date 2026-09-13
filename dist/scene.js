/* Dependency-free WebGL scenes. Geometry, perspective, lighting and pointer rotation
   are real-time; each design owns a distinct shape. No remote models are required. */
const TAU = Math.PI * 2;
const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
uniform vec2 resolution;
uniform vec2 rotation;
uniform float pointScale;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  float cx=cos(rotation.x), sx=sin(rotation.x), cy=cos(rotation.y), sy=sin(rotation.y);
  mat3 rx=mat3(1.,0.,0., 0.,cx,sx, 0.,-sx,cx);
  mat3 ry=mat3(cy,0.,-sy, 0.,1.,0., sy,0.,cy);
  vec3 p=ry*rx*position;
  float depth=4.5-p.z;
  float aspect=resolution.x/resolution.y;
  gl_Position=vec4(p.x*2.65/aspect,p.y*2.65,-p.z*.15,depth);
  gl_PointSize=pointScale*(1.15+p.z*.28);
  vNormal=ry*rx*normal;
  vPosition=p;
}`;
const fragmentSource = `
precision mediump float;
uniform vec3 color;
uniform float material;
uniform float isPoint;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  if(isPoint>.5 && distance(gl_PointCoord,vec2(.5))>.5) discard;
  vec3 n=normalize(vNormal);
  float diffuse=max(dot(n,normalize(vec3(-.5,.8,1.))),0.);
  float rim=pow(1.-abs(n.z),2.2);
  float light=mix(.78,.2+diffuse*.85+rim*.35,material);
  vec3 tint=mix(color,color.bgr,clamp(vPosition.y*.1+.12,0.,.28));
  vec3 shine=vec3(pow(max(dot(reflect(normalize(vec3(.5,-.8,-1.)),n),vec3(0.,0.,1.)),0.),26.)*.45);
  gl_FragColor=vec4(tint*light+shine*material,1.);
}`;
function normalize(v) { const l=Math.hypot(...v)||1; return v.map(x=>x/l); }
function mesh(surface, uSteps=110, vSteps=32) {
  const vertices=[], normals=[];
  const add=(u,v) => {
    const p=surface(u,v), a=surface(u+.001,v), b=surface(u,v+.001);
    const x=a.map((n,i)=>n-p[i]), y=b.map((n,i)=>n-p[i]);
    vertices.push(...p);
    normals.push(...normalize([x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]]));
  };
  for(let u=0;u<uSteps;u++) for(let v=0;v<vSteps;v++) {
    const a=u/uSteps*TAU,b=v/vSteps*TAU,c=(u+1)/uSteps*TAU,d=(v+1)/vSteps*TAU;
    add(a,b);add(c,b);add(c,d);add(a,b);add(c,d);add(a,d);
  }
  return {vertices,normals,type:'TRIANGLES',material:1};
}
function pushPoint(vertices, normals, p) {
  vertices.push(...p);
  normals.push(...normalize(p));
}
function pushLine(vertices, normals, a, b) {
  vertices.push(...a, ...b);
  normals.push(...normalize(a), ...normalize(b));
}
function rotateY(p, a) {
  const c=Math.cos(a), s=Math.sin(a);
  return [p[0]*c+p[2]*s, p[1], -p[0]*s+p[2]*c];
}
function rotateX(p, a) {
  const c=Math.cos(a), s=Math.sin(a);
  return [p[0], p[1]*c-p[2]*s, p[1]*s+p[2]*c];
}
function rotateZ(p, a) {
  const c=Math.cos(a), s=Math.sin(a);
  return [p[0]*c-p[1]*s, p[0]*s+p[1]*c, p[2]];
}

/* ORBIT — dense luminous particle sphere with inclined orbital rings and an inner nucleus. */
function orbitGeometry() {
  const shell=[], shellN=[], core=[], coreN=[], rings=[], ringN=[];
  const count=3200;
  for (let i=0;i<count;i++) {
    const y=1-2*(i+.5)/count;
    const r=Math.sqrt(Math.max(0,1-y*y));
    const a=i*2.39996323;
    const radius=1.38+(i%7===0?.08:0);
    pushPoint(shell, shellN, [Math.cos(a)*r*radius, y*radius, Math.sin(a)*r*radius]);
  }
  for (let i=0;i<420;i++) {
    const y=1-2*(i+.5)/420;
    const r=Math.sqrt(Math.max(0,1-y*y));
    const a=i*2.39996323;
    pushPoint(core, coreN, [Math.cos(a)*r*.42, y*.42, Math.sin(a)*r*.42]);
  }
  const tilts=[[.55,0],[.2,.9],[-.65,.35],[.1,-.75]];
  tilts.forEach((tilt, j) => {
    const radius=1.58+j*.14;
    for (let i=0;i<260;i++) {
      const a=i/260*TAU;
      let p=[Math.cos(a)*radius, Math.sin(a)*radius*.18, Math.sin(a)*radius];
      p=rotateX(p, tilt[0]);
      p=rotateZ(p, tilt[1]);
      pushPoint(rings, ringN, p);
      if (i%2===0) {
        const next=(i+1)/260*TAU;
        let q=[Math.cos(next)*radius, Math.sin(next)*radius*.18, Math.sin(next)*radius];
        q=rotateX(q, tilt[0]);
        q=rotateZ(q, tilt[1]);
        pushLine(rings, ringN, p, q);
      }
    }
  });
  return [
    {vertices:shell,normals:shellN,type:'POINTS',material:0},
    {vertices:core,normals:coreN,type:'POINTS',material:0},
    {vertices:rings,normals:ringN,type:'LINES',material:0},
  ];
}

/* ATLAS — cartographic wire globe: dense meridians/parallels, geodesic arcs, polar crowns. */
function atlasGeometry() {
  const lines=[], normals=[];
  const R=1.45;
  for (let lat=-8;lat<=8;lat++) {
    const phi=lat/9*Math.PI/2;
    const y=Math.sin(phi)*R;
    const r=Math.cos(phi)*R;
    for (let i=0;i<160;i++) {
      const a=i/160*TAU, b=(i+1)/160*TAU;
      pushLine(lines, normals, [Math.cos(a)*r,y,Math.sin(a)*r], [Math.cos(b)*r,y,Math.sin(b)*r]);
    }
  }
  for (let lon=0;lon<24;lon++) {
    const t=lon/24*TAU;
    for (let i=0;i<100;i++) {
      const a=-Math.PI/2+i/100*Math.PI;
      const b=-Math.PI/2+(i+1)/100*Math.PI;
      pushLine(lines, normals,
        [Math.cos(t)*Math.cos(a)*R, Math.sin(a)*R, Math.sin(t)*Math.cos(a)*R],
        [Math.cos(t)*Math.cos(b)*R, Math.sin(b)*R, Math.sin(t)*Math.cos(b)*R]);
    }
  }
  for (let band=0;band<3;band++) {
    const elev=(-.55+band*.55);
    const r=Math.sqrt(Math.max(0.12,1-elev*elev))*R*1.08;
    for (let i=0;i<90;i++) {
      const a=i/90*TAU*.72+band*.4;
      const b=(i+1)/90*TAU*.72+band*.4;
      const y=elev*R;
      pushLine(lines, normals,
        rotateY([Math.cos(a)*r, y, Math.sin(a)*r], band*1.1),
        rotateY([Math.cos(b)*r, y, Math.sin(b)*r], band*1.1));
    }
  }
  for (let pole=-1;pole<=1;pole+=2) {
    for (let ring=0;ring<3;ring++) {
      const y=pole*(R-.12-ring*.08);
      const r=.22+ring*.12;
      for (let i=0;i<48;i++) {
        const a=i/48*TAU, b=(i+1)/48*TAU;
        pushLine(lines, normals, [Math.cos(a)*r,y,Math.sin(a)*r], [Math.cos(b)*r,y,Math.sin(b)*r]);
      }
    }
  }
  const nodes=[], nodeN=[];
  for (let i=0;i<180;i++) {
    const y=1-2*(i+.5)/180;
    const rr=Math.sqrt(Math.max(0,1-y*y));
    const a=i*2.39996323;
    pushPoint(nodes, nodeN, [Math.cos(a)*rr*R*1.01, y*R*1.01, Math.sin(a)*rr*R*1.01]);
  }
  return [
    {vertices:lines,normals,type:'LINES',material:0},
    {vertices:nodes,normals:nodeN,type:'POINTS',material:0},
  ];
}

/* SIGNAL — modern pulse field: layered waveforms, ring cores, beacon nodes. */
function signalGeometry() {
  const lines=[], lineN=[], points=[], pointN=[];
  // Layered oscilloscope ribbons
  for (let band=0;band<5;band++) {
    const amp=.28+band*.12, freq=2.2+band*.55, y0=-.85+band*.38, phase=band*.7;
    const steps=140;
    for (let i=0;i<steps;i++) {
      const t0=i/steps, t1=(i+1)/steps;
      const x0=-1.55+t0*3.1, x1=-1.55+t1*3.1;
      const z0=Math.sin(t0*TAU*freq+phase)*amp, z1=Math.sin(t1*TAU*freq+phase)*amp;
      const yA=y0+Math.cos(t0*TAU*1.4+phase)*.06;
      const yB=y0+Math.cos(t1*TAU*1.4+phase)*.06;
      pushLine(lines,lineN,[x0,yA,z0],[x1,yB,z1]);
      if (i%3===0) pushPoint(points,pointN,[x0,yA,z0]);
    }
  }
  // Concentric pulse rings (top-down telemetry)
  for (let ring=0;ring<6;ring++) {
    const r=.35+ring*.28, y=-.15+Math.sin(ring)*.08;
    const steps=64+ring*8;
    for (let i=0;i<steps;i++) {
      const a=i/steps*TAU, b=(i+1)/steps*TAU;
      const wobble=.04*Math.sin(a*3+ring);
      pushLine(lines,lineN,
        [Math.cos(a)*(r+wobble), y, Math.sin(a)*(r+wobble)],
        [Math.cos(b)*(r+wobble), y, Math.sin(b)*(r+wobble)]);
    }
  }
  // Vertical carrier axis + satellite arcs
  pushLine(lines,lineN,[0,-1.35,0],[0,1.35,0]);
  for (let a=0;a<3;a++) {
    const tilt=a*1.1, elev=-.4+a*.35, rr=1.35+a*.15;
    for (let i=0;i<50;i++) {
      const t0=i/50*TAU*.7+tilt, t1=(i+1)/50*TAU*.7+tilt;
      pushLine(lines,lineN,
        rotateY([Math.cos(t0)*rr, elev+Math.sin(t0)*.08, Math.sin(t0)*rr], a*.4),
        rotateY([Math.cos(t1)*rr, elev+Math.sin(t1)*.08, Math.sin(t1)*rr], a*.4));
    }
  }
  // Core nucleus points
  for (let i=0;i<220;i++) {
    const y=1-2*(i+.5)/220;
    const r=Math.sqrt(Math.max(0,1-y*y))*0.42;
    const a=i*2.39996323;
    pushPoint(points,pointN,[Math.cos(a)*r, y*0.42, Math.sin(a)*r]);
  }
  for (let i=0;i<60;i++) {
    const a=i/60*TAU;
    pushPoint(points,pointN,[Math.cos(a)*1.7, Math.sin(i*.7)*.15, Math.sin(a)*1.7]);
  }
  return [
    {vertices:lines,normals:lineN,type:'LINES',material:0},
    {vertices:points,normals:pointN,type:'POINTS',material:0},
  ];
}

function geometry(shape) {
  if (shape==='orbit') return orbitGeometry();
  if (shape==='atlas') return atlasGeometry();
  if (shape==='signal') return signalGeometry();
  if (shape==='aura') return [mesh((u,v)=> {
    const r=1.3+.12*Math.sin(3*u),tube=.35+.06*Math.cos(2*u);
    return [(r+tube*Math.cos(v))*Math.cos(u),(r+tube*Math.cos(v))*Math.sin(u),tube*Math.sin(v)+.28*Math.sin(2*u)];
  })];
  if (shape==='folio') return [mesh((u,v)=> {
    const r=1.05+.3*Math.cos(5*u);
    return [(r+.18*Math.cos(v))*Math.cos(u),(r+.18*Math.cos(v))*Math.sin(u),.2*Math.sin(v)+.36*Math.sin(5*u)];
  },140,22)];
  return [mesh((u,v)=> {
    const squircle=a=>Math.sign(a)*Math.pow(Math.abs(a),.42);
    const x=squircle(Math.cos(u)),y=squircle(Math.sin(u));
    const thickness=.23*Math.cos(v+u*2);
    return [x*(.98+thickness),y*(.98+thickness),.26*Math.sin(v+u*2)];
  },120,28)];
}
function parseColor(value) {
  const hex=value.trim().replace('#','');
  if(/^[a-f0-9]{6}$/i.test(hex)) return [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255);
  const rgb=value.match(/[\d.]+/g);
  return rgb?.length>=3?rgb.slice(0,3).map(Number).map(n=>n/255):[.7,.9,.5];
}
export function mountScene(element, motionOff) {
  const canvas=element.querySelector('canvas'),shape=element.dataset.shape;
  let gl;
  try { gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'low-power'}); } catch { return ()=>{}; }
  if(!gl) return ()=>{};
  let program, buffers=[], raf=0, disposed=false, visible=true, lost=false;
  const shaders=[];
  try {
    const compile=(type,source)=> {
      const shader=gl.createShader(type); shaders.push(shader);
      gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error('Shader unavailable');
      return shader;
    };
    program=gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource));
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('WebGL program unavailable');
    const attributes={position:gl.getAttribLocation(program,'position'),normal:gl.getAttribLocation(program,'normal')};
    const uniforms=Object.fromEntries(['resolution','rotation','pointScale','color','material','isPoint'].map(k=>[k,gl.getUniformLocation(program,k)]));
    const objects=geometry(shape).map(object=>{
      const upload=data=>{ const b=gl.createBuffer();buffers.push(b);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);return b; };
      return {...object,positionBuffer:upload(object.vertices),normalBuffer:upload(object.normals),count:object.vertices.length/3};
    });
    let width=0,height=0,lastTime=0,angle=0,angleX=0,pointer=[0,0],targetPointer=[0,0],scrollTilt=[0,0],color=[.7,.9,.5];
    const interactive=shape==='orbit'||shape==='atlas'||shape==='signal';
    const spin=shape==='orbit'?0.00018:shape==='atlas'?0.00012:shape==='signal'?0.00028:0.00012;
    const spinX=shape==='signal'?0.00008:0;
    const base=shape==='aura'?[.75,.3]:shape==='signal'?[.25,.9]:shape==='shift'?[.55,-.4]:shape==='atlas'?[.52,.18]:[.42,.28];
    const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
    const palette=()=>{
      const styles=getComputedStyle(document.documentElement);
      color=parseColor(styles.getPropertyValue(shape==='shift'?'--accent-ink':'--accent'));
    };
    const resize=()=>{
      const r=element.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.7);
      width=Math.max(1,Math.round(r.width*dpr));height=Math.max(1,Math.round(r.height*dpr));
      if(canvas.width!==width||canvas.height!==height) {canvas.width=width;canvas.height=height;}
    };
    const updateScroll=()=>{
      if (!interactive||motionOff()) { scrollTilt=[0,0]; return; }
      const r=element.getBoundingClientRect();
      const mid=r.top+r.height/2;
      const view=window.innerHeight||1;
      const offset=((mid-view/2)/view)*-.42;
      scrollTilt=[offset*.55, offset];
    };
    const draw=()=>{
      if(disposed||lost) return;
      pointer[0]+=(targetPointer[0]-pointer[0])*0.12;
      pointer[1]+=(targetPointer[1]-pointer[1])*0.12;
      const wobble=shape==='signal'?Math.sin(angle*2.4)*0.08:0;
      const bob=shape==='signal'?Math.sin(angle*1.7)*0.05:0;
      gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);gl.useProgram(program);
      gl.uniform2f(uniforms.resolution,width,height);
      gl.uniform2f(uniforms.rotation,base[0]+angleX+pointer[1]+scrollTilt[1]+bob,base[1]+angle+pointer[0]+scrollTilt[0]+wobble);
      const pulse=shape==='signal'?2.35+Math.sin(angle*4)*0.45:shape==='orbit'?2.05:shape==='atlas'?1.7:1.8;
      gl.uniform1f(uniforms.pointScale,Math.min(devicePixelRatio||1,1.7)*pulse);
      gl.uniform3fv(uniforms.color,color);
      for(const object of objects) {
        for(const [key,buffer] of [['position',object.positionBuffer],['normal',object.normalBuffer]]) {
          gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(attributes[key]);gl.vertexAttribPointer(attributes[key],3,gl.FLOAT,false,0,0);
        }
        gl.uniform1f(uniforms.material,object.material);gl.uniform1f(uniforms.isPoint,object.type==='POINTS'?1:0);
        gl.drawArrays(gl[object.type],0,object.count);
      }
    };
    const tick=time=>{
      raf=0;
      if(disposed||lost||!visible||document.hidden||motionOff()) return;
      if(time-lastTime>16) {
        const dt=Math.min(time-lastTime,70);
        angle+=dt*spin;
        angleX+=dt*spinX;
        lastTime=time;updateScroll();draw();
      }
      raf=requestAnimationFrame(tick);
    };
    const sync=()=>{
      cancelAnimationFrame(raf);raf=0;resize();palette();updateScroll();draw();
      if(!disposed&&!lost&&visible&&!document.hidden&&!motionOff()) {lastTime=performance.now();raf=requestAnimationFrame(tick);}
    };
    const move=event=>{
      if(motionOff()||!finePointer.matches||event.pointerType==='touch') return;
      const r=element.getBoundingClientRect();
      const strength=shape==='signal'?1.05:interactive?0.55:0.45;
      targetPointer=[(event.clientX-r.left-r.width/2)/r.width*strength,(event.clientY-r.top-r.height/2)/r.height*(strength*.75)];
      if (shape==='signal' && !raf) draw();
    };
    const leave=()=>{targetPointer=[0,0];};
    const loss=event=>{event.preventDefault();lost=true;cancelAnimationFrame(raf);element.dataset.ready='false';};
    const onScroll=()=>{ if (!interactive||motionOff()) return; updateScroll(); if (!raf) draw(); };
    const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}):null;
    observer?.observe(element);
    const resizer='ResizeObserver' in window?new ResizeObserver(sync):null;
    resizer?.observe(element);
    element.addEventListener('pointermove',move);element.addEventListener('pointerleave',leave);
    canvas.addEventListener('webglcontextlost',loss);
    document.addEventListener('visibilitychange',sync);
    window.addEventListener('resize',sync);window.addEventListener('themechange',sync);window.addEventListener('motionchange',sync);
    window.addEventListener('scroll',onScroll,{passive:true});
    element.dataset.ready='true';sync();
    return ()=>{
      disposed=true;cancelAnimationFrame(raf);observer?.disconnect();resizer?.disconnect();
      element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);canvas.removeEventListener('webglcontextlost',loss);
      document.removeEventListener('visibilitychange',sync);window.removeEventListener('resize',sync);window.removeEventListener('themechange',sync);window.removeEventListener('motionchange',sync);
      window.removeEventListener('scroll',onScroll);
      buffers.forEach(b=>gl.deleteBuffer(b));shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  } catch {
    buffers.forEach(b=>gl.deleteBuffer(b));shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);
    element.dataset.ready='false';return ()=>{};
  }
}
