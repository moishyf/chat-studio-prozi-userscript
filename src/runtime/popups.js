/* Scoped stacking repair. Keep Google's node, events, focus and placement intact.
 * Raising only the tooltip fails when its containing row is a stacking context.
 * Observe visibility changes as well as insertions (Google reuses popup nodes).
 */
function createPopupGuard(root=document) {
  const selector='[role="tooltip"],[role="menu"],[role="dialog"],[role="alertdialog"],[role="listbox"]';
  const candidates=new Set(),applied=new Map();let observer=null,frame=0;
  const own=e=>e.closest?.('#cs-panel,.cs-root,.cs-asset,.cs-imglayer,.cs-wa-meta');
  function collect(e){if(!e?.querySelectorAll||own(e))return;if(e.matches?.(selector))candidates.add(e);for(const p of e.querySelectorAll(selector))if(!own(p))candidates.add(p);}
  const open=e=>e.isConnected&&!e.hidden&&e.getAttribute('aria-hidden')!=='true'&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none';
  function sync(){
    frame=0;const desired=new Map();
    for(const popup of candidates){
      if(!popup.isConnected){candidates.delete(popup);continue;}
      if(!open(popup))continue;
      for(let e=popup;e&&e!==document.body&&e!==document.documentElement;e=e.parentElement){
        if(e!==popup&&e.matches('.cs-chat-pane,[role="list"],[role="main"]'))break;
        const cs=getComputedStyle(e);
        const bubble=e.classList.contains('cs-msg');
        const stacking=cs.position!=='static'||cs.transform!=='none'||cs.filter!=='none'||cs.isolation==='isolate'||Number(cs.opacity)<1||cs.backdropFilter!=='none';
        if(e===popup||bubble||stacking){
          const classes=new Set();
          if(cs.zIndex==='auto'||Number(cs.zIndex)<1000||e.classList.contains('cs-popup-raised'))classes.add('cs-popup-raised');
          if(cs.position==='static'||e.classList.contains('cs-popup-position'))classes.add('cs-popup-position');
          if(bubble)classes.add('cs-popup-frozen');
          const existing=desired.get(e)||new Set();classes.forEach(c=>existing.add(c));desired.set(e,existing);
        }
      }
    }
    for(const [e,classes]of applied)for(const c of classes)if(!desired.get(e)?.has(c))e.classList.remove(c);
    for(const [e,classes]of desired)for(const c of classes)if(!e.classList.contains(c))e.classList.add(c);
    applied.clear();for(const [e,classes]of desired)applied.set(e,classes);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(sync);};
  const stripped=s=>(s||'').split(/\s+/).filter(c=>c&&!c.startsWith('cs-')).sort().join(' ');
  function start(){
    if(observer)return;collect(root);
    observer=new MutationObserver(mutations=>{
      let relevant=false;
      for(const m of mutations){
        if(own(m.target))continue;
        if(m.type==='attributes'){
          if(m.attributeName==='class'&&stripped(m.oldValue)===stripped(m.target.getAttribute('class')))continue;
          if(candidates.has(m.target)||m.target.matches?.(selector)||m.target.querySelector?.(selector)){collect(m.target);relevant=true;}
        }else{for(const n of m.addedNodes)if(n.nodeType===1){collect(n);relevant=true;}if(m.removedNodes.length)relevant=true;}
      }
      if(relevant)schedule();
    });
    observer.observe(root.documentElement||root,{subtree:true,childList:true,attributes:true,attributeOldValue:true,attributeFilter:['hidden','aria-hidden','style','class','role']});
    schedule();
  }
  function stop(){observer?.disconnect();observer=null;cancelAnimationFrame(frame);frame=0;for(const [e,classes]of applied)e.classList.remove(...classes);applied.clear();candidates.clear();}
  return {start,stop,sync};
}
const popupGuard=createPopupGuard();
