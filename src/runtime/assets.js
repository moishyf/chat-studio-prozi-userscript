/* SVG assets are compiled into node recipes: no HTML sinks, image URL, CSP escape,
 * raster approximation, or network request. The original paths are unchanged. */
const assetNS = 'http://www.w3.org/2000/svg';
let patternSequence = 0;
function assetNode(recipe) {
  const [tag,attrs,children] = recipe;
  const node = document.createElementNS(assetNS,tag);
  for(const [name,value] of Object.entries(attrs)) node.setAttribute(name,value);
  for(const child of children)node.append(assetNode(child));
  return node;
}
function patternNode(name, width, height) {
  const recipe=CS_ASSETS[name]; if(!recipe)throw Error('Missing embedded asset: '+name);
  const source=assetNode(recipe),a=recipe[1];
  const view=a.viewBox || `0 0 ${a.width} ${a.height}`;
  const dims=view.split(/\s+/).map(Number);
  height ||= width*dims[3]/dims[2];
  const root=document.createElementNS(assetNS,'svg');
  root.setAttribute('aria-hidden','true');root.setAttribute('class','cs-asset');
  const defs=document.createElementNS(assetNS,'defs'),pattern=document.createElementNS(assetNS,'pattern');
  const id='cs-pattern-'+(++patternSequence);
  for(const [k,v] of Object.entries({id,patternUnits:'userSpaceOnUse',width,height}))pattern.setAttribute(k,v);
  source.setAttribute('viewBox',view);source.setAttribute('width',width);source.setAttribute('height',height);
  pattern.append(source);defs.append(pattern);
  const rect=document.createElementNS(assetNS,'rect');rect.setAttribute('width','100%');rect.setAttribute('height','100%');rect.setAttribute('fill',`url(#${id})`);
  root.append(defs,rect);return root;
}
const assetLayers=new Map();
function embeddedBackground(target,d,area) {
  const prev=assetLayers.get(target);
  const signature=d?.asset?JSON.stringify(d.asset):'';
  if(prev?.signature===signature && prev.node.isConnected)return;
  if(prev){prev.observer.disconnect();prev.node.remove();assetLayers.delete(target);}
  if(!signature)return;
  const node=patternNode(...d.asset);
  const isCard=target.classList.contains('cs-card');
  const positioned=getComputedStyle(target).position!=='static';
  const box=area||target;
  if(isCard){node.classList.add('cs-asset-card');target.prepend(node);}
  else if(target===document.body){node.classList.add('cs-asset-fixed');target.prepend(node);}
  else if(positioned){node.classList.add('cs-asset-absolute');target.classList.add('cs-il-host');target.prepend(node);}
  else {node.classList.add('cs-asset-sticky');box.classList.add('cs-il-host');box.prepend(node);}
  const resize=()=>{if(node.classList.contains('cs-asset-sticky')){node.style.height=box.clientHeight+'px';node.style.marginBottom=-box.clientHeight+'px';}};
  resize();const observer=new ResizeObserver(resize);observer.observe(box);
  assetLayers.set(target,{node,signature,observer});
}
function clearEmbedded(target) {
  const old=assetLayers.get(target);if(old){old.observer.disconnect();old.node.remove();assetLayers.delete(target);}
}
