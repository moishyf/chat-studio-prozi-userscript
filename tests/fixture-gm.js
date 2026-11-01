// Only the fixture supplies GM emulation. Never included in the installable script.
const params=new URLSearchParams(location.search),fixturePrefix=params.has('original')?'original:':'converted:';
window.GM_getValue=(k,d)=>{const v=localStorage.getItem(fixturePrefix+k);return v===null?d:JSON.parse(v);};
window.GM_setValue=(k,v)=>localStorage.setItem(fixturePrefix+k,JSON.stringify(v));
window.GM_listValues=()=>Object.keys(localStorage).filter(k=>k.startsWith(fixturePrefix)).map(k=>k.slice(fixturePrefix.length));
const listeners=new Map();let seq=0;
window.GM_addValueChangeListener=(k,fn)=>{listeners.set(++seq,{k,fn});return seq;};
window.GM_removeValueChangeListener=id=>listeners.delete(id);
addEventListener('storage',e=>{for(const {k,fn}of listeners.values())if(e.key===fixturePrefix+k)fn(k,JSON.parse(e.oldValue),JSON.parse(e.newValue),true);});
window.GM_addStyle=text=>{const s=document.createElement('style');s.textContent=text;document.head.append(s);return s;};
window.GM_xmlhttpRequest=options=>options.onerror();
if(params.has('original')){
 const link=document.createElement('link');link.rel='stylesheet';link.href='/original/v15.3/styles.css';document.head.append(link);
 window.chrome={storage:{local:{get:(keys,cb)=>{const value=Object.fromEntries(keys.filter(k=>GM_getValue(k)!==undefined).map(k=>[k,GM_getValue(k)]));cb?.(value);return Promise.resolve(value);},set:(o,cb)=>{Object.entries(o).forEach(([k,v])=>GM_setValue(k,v));cb?.();return Promise.resolve();},remove:keys=>{for(const k of Array.isArray(keys)?keys:[keys])localStorage.removeItem(fixturePrefix+k);}},onChanged:{addListener:()=>{}}},runtime:{sendMessage:(_m,cb)=>cb({ok:false,list:[]}),getURL:p=>'/original/v15.3/'+p}};
 // Trusted Types does not allow a dynamically assigned script URL. The server emits it instead.
}
