import t from"../../utils/extend.prod.js";import e from"../../utils/getOriginXY.prod.js";import n from"../../utils/hypot.prod.js";import r from"../../utils/is.prod.js";import{resolveRectLike as o,rectToXY as s}from"../../utils/rect.prod.js";import{makeModifier as a}from"../base.prod.js";const i={start(n){const{interaction:r,interactable:a,element:i,rect:l,state:g,startOffset:f}=n,{options:c}=g,x=c.offsetWithOrigin?(t=>{const{element:n}=t.interaction;return s(o(t.state.options.origin,null,null,[n]))||e(t.interactable,n,t.interaction.prepared.name)})(n):{x:0,y:0};let d;if("startCoords"===c.offset)d={x:r.coords.start.page.x,y:r.coords.start.page.y};else{const t=o(c.offset,a,i,[r]);d=s(t)||{x:0,y:0},d.x+=x.x,d.y+=x.y}const{relativePoints:p}=c;g.offsets=l&&p&&p.length?p.map((t,e)=>({index:e,relativePoint:t,x:f.left-l.width*t.x+d.x,y:f.top-l.height*t.y+d.y})):[t({index:0,relativePoint:null},d)]},set(o){const{interaction:s,coords:a,state:i}=o,{options:l,offsets:g}=i,f=e(s.interactable,s.element,s.prepared.name),c=t({},a),x=[];l.offsetWithOrigin||(c.x-=f.x,c.y-=f.y);for(const t of g){const e=c.x-t.x,n=c.y-t.y;for(let o=0,a=l.targets.length;o<a;o++){const a=l.targets[o];let i;i=r.func(a)?a(e,n,s._proxy,t,o):a,i&&x.push({x:(r.number(i.x)?i.x:e)+t.x,y:(r.number(i.y)?i.y:n)+t.y,range:r.number(i.range)?i.range:l.range,source:a,index:o,offset:t})}}const d={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}};for(const t of x){const e=t.range,r=t.x-c.x,o=t.y-c.y,s=n(r,o);let a=s<=e;e===1/0&&d.inRange&&d.range!==1/0&&(a=!1),d.target&&!(a?d.inRange&&e!==1/0?s/e<d.distance/d.range:e===1/0&&d.range!==1/0||s<d.distance:!d.inRange&&s<d.distance)||(d.target=t,d.distance=s,d.range=e,d.inRange=a,d.delta.x=r,d.delta.y=o)}return d.inRange&&(a.x=d.target.x,a.y=d.target.y),i.closest=d,d},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}};export default a(i,"snap");export{i as snap};
//# sourceMappingURL=pointer.prod.js.map