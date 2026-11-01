const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(p,'utf8');
const plain=o=>JSON.parse(JSON.stringify(o));
function catalog(original){
 const s=original?read('original/v15.3/content.js'):JSON.parse(read('src/order.json')).map(p=>read('src/'+p)).join('\n');
 const start=s.indexOf('  /* ================= Helpers'),end=s.indexOf('  /* ---------- pictures:');
 const pre=`const R={custom:{a:'#7c5cff',b:'#00c9c8',c:'#ffd166'}},S={...R,lang:'he'},G={lite:false};const XURL=p=>'asset:'+p;const calm=()=>false;const IMGIX=[];`;
 return vm.runInNewContext(pre+s.slice(start,end)+`;({PAL_LIST,STYLES,CLASSIC,ALL_THEMES,ALL_BGS,PATTERNS,CBG,ENTERS,FITS,themeDef,bgDef})`);
}
test('all original catalogue IDs and every computed theme retained',()=>{
 const a=catalog(true),b=catalog(false);
 assert.equal(b.ALL_THEMES.length,1177);assert.equal(b.ALL_BGS,688);assert.equal(b.PAL_LIST.length,48);
 for(const key of ['STYLES','CLASSIC','PATTERNS','CBG','ENTERS','FITS'])assert.deepEqual(Object.keys(b[key]),Object.keys(a[key]));
 assert.equal(Object.keys(b.STYLES).length,24);assert.equal(Object.keys(b.CLASSIC).length,24);assert.equal(Object.keys(b.ENTERS).length,21);
 assert.deepEqual(plain(a.ALL_THEMES),plain(b.ALL_THEMES));
 for(const id of a.ALL_THEMES)assert.deepEqual(plain(b.themeDef(id)),plain(a.themeDef(id)),id);
});
test('all 688 backgrounds preserve color and effect definitions',()=>{
 const a=catalog(true),b=catalog(false);
 for(const id of [...Object.keys(a.CBG).map(k=>'c:'+k),...Object.keys(a.PATTERNS).flatMap(k=>a.PAL_LIST.map(p=>`p:${k}:${p[0]}`))]){
  const old=plain(a.bgDef(id)),now=plain(b.bgDef(id));delete now.asset;
  if(old.css)old.css=old.css.replace(/url\("asset:[^"]+"\) 0 0\/[^,]+ repeat/g,'linear-gradient(transparent,transparent)');
  assert.deepEqual(now,old,id);
 }
});
function storageHub(){
 const data=new Map(),subs=new Map();let next=0,queue=[];
 const make=()=>{const own=++next;const api={list:()=>[...data.keys()],get:k=>plainMaybe(data.get(k)),set(k,v){const old=data.get(k);data.set(k,plainMaybe(v));for(const [id,s]of subs)if(s.k===k)queue.push(()=>s.fn(k,old,v,s.own!==own));},listen(k,fn){const id=++next;subs.set(id,{own,k,fn});return id;},unlisten:id=>subs.delete(id)};return vm.runInNewContext(read('src/runtime/storage.js')+';createStorage',{console})(api);};
 return {make,data,flush(){const q=queue;queue=[];q.forEach(f=>f());}};
}
const plainMaybe=v=>v===undefined?undefined:plain(v);
test('field-level concurrent edits preserve two account profiles and global fields',async()=>{
 const h=storageHub(),a=h.make(),b=h.make();
 await a.set({cs6:{theme:'k:day',bg:'c:paper'},cs6prof:{p:{'a@example.test':{theme:'k:day'},'b@example.test':{theme:'k:night'}}}});h.flush();
 const x=await a.get(null),y=await b.get(null);
 x.cs6.theme='k:neon';y.cs6.bg='c:cosmic';x.cs6prof.p['a@example.test'].theme='k:glass';y.cs6prof.p['b@example.test'].off=true;
 await a.set(x);await b.set(y);h.flush();
 const v=await a.get(null);assert.equal(v.cs6.theme,'k:neon');assert.equal(v.cs6.bg,'c:cosmic');assert.equal(v.cs6prof.p['a@example.test'].theme,'k:glass');assert.equal(v.cs6prof.p['b@example.test'].off,true);
});
test('storage persists on reopen, lazily loads images, supports removal',async()=>{
 const h=storageHub(),a=h.make();await a.set({'cs7i:test':'data:image/jpeg;base64,AA==',cs6:{theme:'k:day'}});
 const b=h.make();assert.deepEqual(plain(await b.get(['cs6'])),{cs6:{theme:'k:day'}});await b.remove('cs7i:test');assert.equal((await a.get(null))['cs7i:test'],undefined);
});
test('storage failure is reported rather than a false success callback',()=>{
 let caught=0,callback=false;
 const make=vm.runInNewContext(read('src/runtime/storage.js')+';createStorage');
 const s=make({list:()=>[],get:()=>undefined,set:()=>{throw Error('quota');},listen:()=>1},()=>caught++);
 assert.throws(()=>s.set({cs6:{theme:'k:day'}},()=>callback=true));assert.equal(caught,1);assert.equal(callback,false);
});
test('account chooser never invents indices from arbitrary email order',()=>{
 const p=vm.runInNewContext(read('src/runtime/accounts.js')+';({parseList,parseChooser})');
 assert.equal(p.parseChooser('first@example.test second@example.test').length,0);
 assert.equal(p.parseChooser('<a data-authuser="1">second@example.test</a>')[0].idx,1);
 const row=['gaia.l.a',0,'Demo','demo@example.test','',0,0,0,0,1,'123',0,0,0,0];
 assert.equal(p.parseList(")]}'\n"+JSON.stringify(['gaia.l.a.r',[row]]))[0].email,'demo@example.test');
});
test('unknown identity and changed indices cannot select another private look',()=>{
 const source=read('src/core/accounts.js');
 const code=`let pageAcct=null;const ACCTS={'wrong@example.test':{idx:0,email:'wrong@example.test'}},ACCT_IDX=0,PROF={'wrong@example.test':{},u0:{}};`+source.slice(source.indexOf('  function curEmail'),source.indexOf('  /* the profile key'))+`;meKey()`;
 assert.equal(vm.runInNewContext(code),null);
});
test('backup rejects active content, invalid URLs, missing images and bad schema',()=>{
 const validate=vm.runInNewContext(read('src/runtime/backup.js')+';validateBackup');
 const b={format:'chat-studio-prozi',schema:1,values:{cs6:{theme:'k:wa',custom:{a:'#123456',b:'#123456',c:'#123456'}}}};
 assert.equal(validate(b).cs6.theme,'k:wa');
 for(const values of [{cs6:{custom:{a:'red; color:red',b:'#123456',c:'#123456'}}},{cs7imgs:{x:[{id:'x',t:'d'}]}},{cs7imgs:{x:[{id:'x',t:'u',u:'javascript:alert(1)'}]}}])assert.throws(()=>validate({...b,values}));
 assert.throws(()=>validate({...b,schema:2}));
});
test('distribution is standalone and has narrow grants and matching metadata',()=>{
 const s=read('dist/chat-studio.user.js'),meta=read('dist/chat-studio.meta.js');assert.ok(s.startsWith(meta));
 assert.ok(!s.includes('chrome-extension://'));assert.ok(!/\bchrome\.(storage|runtime)/.test(s));assert.ok(!/@require|@connect\s+\*/.test(meta));
 assert.equal(Object.keys(JSON.parse(read('src/assets/recipes.json'))).length,99);
 assert.ok(!/\.innerHTML\s*=|eval\(|new Function\(/.test(s));new vm.Script(s);
});
