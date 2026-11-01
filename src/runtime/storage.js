/* Field-level records avoid replacing another tab's unrelated account or setting.
 * GM values are shared across the three matched origins. No Google page storage.
 * Concurrent changes to the SAME field use last-write-wins; not a distributed lock.
 */
function createStorage(api, onError = () => {}) {
  const prefix = 'csprozi:1:', pulse = 'csprozi:changed';
  const listeners = new Set(), baseline = new Map();
  const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const recordKey = (key, parts) => prefix + JSON.stringify([key,...parts]);
  const allowed = key => /^(cs6|cs6prof|cs6acct|cs6acctdiag|cs7imgs|cs5|cs5img|cs6img|cs7i:[\w-]+)$/.test(key);
  function flatten(value, parts = [], out = new Map()) {
    if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length) {
      for (const [key,v] of Object.entries(value)) {
        if (['__proto__','constructor','prototype','_w'].includes(key)) continue;
        flatten(v,[...parts,key],out);
      }
    } else out.set(JSON.stringify(parts),value);
    return out;
  }
  function read(key) {
    let result;
    for (const name of api.list()) {
      if (!name.startsWith(prefix)) continue;
      const [k,...parts] = JSON.parse(name.slice(prefix.length));
      if (k !== key || parts.some(p=>['__proto__','constructor','prototype'].includes(p))) continue;
      const record = api.get(name);
      if (!record || record.deleted) continue;
      if (!parts.length) { result = clone(record.value); continue; }
      if (!result || typeof result !== 'object') result = {};
      let cur = result;
      for (const part of parts.slice(0,-1)) cur = cur[part] ||= {};
      cur[parts.at(-1)] = clone(record.value);
    }
    return result;
  }
  const keys = () => [...new Set(api.list().filter(k=>k.startsWith(prefix)).map(k=>JSON.parse(k.slice(prefix.length))[0]))];
  function notify(changes) { if(Object.keys(changes).length) for(const fn of listeners) fn(clone(changes),'local'); }
  function refresh() {
    const changes={};
    for(const k of new Set([...keys(),...baseline.keys()])) {
      const value=read(k),old=baseline.get(k);
      if(!equal(old,value)) {baseline.set(k,clone(value));changes[k]={oldValue:old,newValue:value};}
    }
    notify(changes);
  }
  const listenerId = api.listen(pulse, (_k,_old,_new,remote)=>{if(remote)refresh();});
  function get(request,cb) {
    const selected=request==null?keys():typeof request==='string'?[request]:Array.isArray(request)?request:Object.keys(request);
    const result={};
    for(const k of selected) { const value=read(k); baseline.set(k,clone(value)); if(value!==undefined) result[k]=value; else if(request && !Array.isArray(request) && typeof request==='object') result[k]=request[k]; }
    if(cb)cb(clone(result));
    return Promise.resolve(clone(result));
  }
  function set(values,cb) {
    try {
      const changes={};
      for(const [key,raw] of Object.entries(values)) {
        if(!allowed(key))throw Error('Unsupported storage key');
        const old=baseline.has(key)?baseline.get(key):read(key);
        const before=flatten(old),after=flatten(raw);
        for(const parts of new Set([...before.keys(),...after.keys()])) {
          if(equal(before.get(parts),after.get(parts)))continue;
          api.set(recordKey(key,JSON.parse(parts)),after.has(parts)?{value:after.get(parts)}:{deleted:true});
        }
        const value=read(key); baseline.set(key,clone(value));
        // Preserve the upstream writer token only in the local event.
        changes[key]={oldValue:old,newValue:raw && raw._w?{...value,_w:raw._w}:value};
      }
      api.set(pulse,{at:Date.now(),nonce:Math.random()});
      notify(changes); if(cb)cb(); return Promise.resolve();
    } catch(error) { onError(error); throw error; }
  }
  function remove(request,cb) {
    const selected=typeof request==='string'?[request]:request;
    const changes={};
    for(const key of selected) {
      const old=read(key);
      for(const name of api.list()) if(name.startsWith(prefix)&&JSON.parse(name.slice(prefix.length))[0]===key)api.set(name,{deleted:true});
      baseline.set(key,undefined);changes[key]={oldValue:old,newValue:undefined};
    }
    api.set(pulse,{at:Date.now(),nonce:Math.random()});notify(changes);if(cb)cb();return Promise.resolve();
  }
  return {get,set,remove,refresh,keys,dispose:()=>api.unlisten(listenerId),onChanged:{addListener:fn=>listeners.add(fn),removeListener:fn=>listeners.delete(fn)}};
}
