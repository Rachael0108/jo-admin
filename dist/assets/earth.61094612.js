import*as t from"https://cdn.skypack.dev/three@0.136.0";import{OrbitControls as w}from"https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";import{n as S,b,e as C}from"./index.3ee9cab2.js";const P={class:"outer"},E={__name:"earth",setup(x){console.clear();let n=new t.Scene;n.background=new t.Color(1441814);let r=new t.PerspectiveCamera(60,innerWidth/innerHeight,1,1e3);r.position.set(0,4,21);let o=new t.WebGLRenderer;o.setSize(innerWidth,innerHeight),document.body.appendChild(o.domElement),window.addEventListener("resize",e=>{r.aspect=innerWidth/innerHeight,r.updateProjectionMatrix(),o.setSize(innerWidth,innerHeight)});let i=new w(r,o.domElement);i.enableDamping=!0,i.enablePan=!1;let m={time:{value:0}},l=[],c=[],f=()=>{c.push(Math.random()*Math.PI,Math.random()*Math.PI*2,(Math.random()*.9+.1)*Math.PI*.1,Math.random()*.9+.1)},p=new Array(5e4).fill().map(e=>(l.push(Math.random()*1.5+.5),f(),new t.Vector3().randomDirection().multiplyScalar(Math.random()*.5+9.5)));for(let e=0;e<1e5;e++){let d=10,u=40,h=Math.pow(Math.random(),1.5),M=Math.sqrt(u*u*h+(1-h)*d*d);p.push(new t.Vector3().setFromCylindricalCoords(M,Math.random()*2*Math.PI,(Math.random()-.5)*2)),l.push(Math.random()*1.5+.5),f()}let s=new t.BufferGeometry().setFromPoints(p);s.setAttribute("sizes",new t.Float32BufferAttribute(l,1)),s.setAttribute("shift",new t.Float32BufferAttribute(c,4));let v=new t.PointsMaterial({size:.125,transparent:!0,depthTest:!1,blending:t.AdditiveBlending,onBeforeCompile:e=>{e.uniforms.time=m.time,e.vertexShader=`
      uniform float time;
      attribute float sizes;
      attribute vec4 shift;
      varying vec3 vColor;
      ${e.vertexShader}
    `.replace("gl_PointSize = size;","gl_PointSize = size * sizes;").replace("#include <color_vertex>",`#include <color_vertex>
        float d = length(abs(position) / vec3(40., 10., 40));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
      `).replace("#include <begin_vertex>",`#include <begin_vertex>
        float t = time;
        float moveT = mod(shift.x + shift.z * t, PI2);
        float moveS = mod(shift.y + shift.z * t, PI2);
        transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
      `),console.log(e.vertexShader),e.fragmentShader=`
      varying vec3 vColor;
      ${e.fragmentShader}
    `.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        float d = length(gl_PointCoord.xy - 0.5);
        //if (d > 0.5) discard;
      `).replace("vec4 diffuseColor = vec4( diffuse, opacity );","vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d)/* * 0.5 + 0.5*/ );"),console.log(e.fragmentShader)}}),a=new t.Points(s,v);a.rotation.order="ZYX",a.rotation.z=.2,n.add(a);let g=new t.Clock;o.setAnimationLoop(()=>{i.update();let e=g.getElapsedTime()*.5;m.time.value=e*Math.PI,a.rotation.y=e*.05,o.render(n,r)}),S(()=>{_()});const _=()=>{n.traverse(e=>{e.material&&e.material.dispose(),e.geometry&&e.geometry.dispose(),e=null}),o.forceContextLoss(),o.dispose(),n.clear(),n=null,r=null,i=null,o.domElement=null,o=null,console.log("clearScene")};return(e,d)=>(b(),C("div",P))}};export{E as default};
