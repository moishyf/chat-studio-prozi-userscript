const BACKUP_FORMAT='chat-studio-prozi';
function validateBackup(input) {
  if(!input || input.format!==BACKUP_FORMAT || input.schema!==1 || !input.values || typeof input.values!=='object' || Array.isArray(input.values))throw Error('Unsupported backup');
  const values=JSON.parse(JSON.stringify(input.values));
  const inspect=v=>{if(v && typeof v==='object')for(const [k,x] of Object.entries(v)){if(['__proto__','constructor','prototype'].includes(k))throw Error('Unsafe key');inspect(x);}};
  inspect(values);
  for(const [key,value]of Object.entries(values)){
    if(!/^(cs6|cs6prof|cs6acct|cs7imgs|cs5|cs5img|cs6img|cs7i:[\w-]+)$/.test(key))throw Error('Unknown key');
    if(key.startsWith('cs7i:') && (typeof value!=='string'|| !/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value)||value.length>24e6))throw Error('Invalid image');
  }
  const look=o=>{
    if(!o || typeof o!=='object'||Array.isArray(o))throw Error('Invalid settings');
    for(const [k,v]of Object.entries(o)){
      if(k==='_w')continue;
      if(k==='custom'){if(!v||!['a','b','c'].every(c=>/^#[\da-f]{6}$/i.test(v[c])))throw Error('Invalid colors');}
      else if(k==='favs'){if(!Array.isArray(v)||v.length>2000||v.some(x=>typeof x!=='string'||!/^[-\w:]+$/.test(x)))throw Error('Invalid favorites');}
      else if(typeof v==='string' && (!/^[-\w:@.]+$/.test(v)||v.length>200))throw Error('Invalid setting');
      else if(typeof v!=='string' && typeof v!=='boolean' && (typeof v!=='number'||!Number.isFinite(v)||Math.abs(v)>10000))throw Error('Invalid setting type');
    }
  };
  if(values.cs6)look(values.cs6);if(values.cs5)look(values.cs5);
  if(values.cs6prof){if(!values.cs6prof.p||typeof values.cs6prof.p!=='object')throw Error('Invalid profiles');for(const [key,p]of Object.entries(values.cs6prof.p)){if(!/^[\w.+-]+@[\w.-]+$/.test(key)&&!/^u\d+$/.test(key))throw Error('Invalid account');look(p);}}
  if(values.cs7imgs){const x=values.cs7imgs.x;if(!Array.isArray(x)||x.length>12)throw Error('Invalid image index');const seen=new Set();for(const e of x){if(!e||!/^[-\w]+$/.test(e.id)||seen.has(e.id)||!['d','u'].includes(e.t))throw Error('Invalid image entry');seen.add(e.id);if(e.t==='d'&&!values['cs7i:'+e.id])throw Error('Missing image');if(e.t==='u'&&!/^https?:\/\/\S+$/.test(e.u))throw Error('Invalid URL');if(e.th&&!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(e.th))throw Error('Invalid thumbnail');}}
  return values;
}
async function exportBackup(){const values=await gmStorage.get(null);delete values.cs6acctdiag;return {format:BACKUP_FORMAT,schema:1,version:CS_VERSION,values};}
function downloadJSON(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
function backupControls(el,lang){
  const he=lang==='he';
  const status=el('div',{class:'cs-note',role:'status'});
  const file=el('input',{type:'file',accept:'.json,application/json',class:'cs-hide',onchange:async e=>{
    try{const f=e.target.files?.[0];if(!f)return;if(f.size>220e6)throw Error('Backup too large');const values=validateBackup(JSON.parse(await f.text()));
      // Preserve a private rollback snapshot before replacing settings.
      GM_setValue('csprozi:last-backup',await exportBackup());
      await gmStorage.set(values);status.textContent=he?'הגיבוי יובא. רעננו את הדפים הפתוחים.':'Imported. Reload open tabs.';
    }catch{status.textContent=he?'הייבוא נכשל. בדקו שהקובץ הוא גיבוי תקין.':'Import failed. Check the backup file.';}
  }});
  return [el('div',{class:'cs-sec'},he?'גיבוי מלא ושחזור':'Full backup and restore'),
    el('div',{class:'cs-note'},he?'כולל תמונות ופרופילים עם כתובות החשבונות. שמרו את הקובץ באופן פרטי.':'Includes images and account addresses. Keep the file private.'),
    el('div',{class:'cs-row'},el('button',{class:'cs-pb',type:'button',onclick:async()=>downloadJSON(await exportBackup(),'chat-studio-backup.json')},he?'ייצוא גיבוי':'Export backup'),
      el('button',{class:'cs-pb cs-ghost',type:'button',onclick:()=>file.click()},he?'ייבוא גיבוי':'Import backup'),file),
    el('button',{class:'cs-pb cs-ghost',type:'button',onclick:async()=>{try{const b=GM_getValue('csprozi:last-backup');await gmStorage.set(validateBackup(b));status.textContent=he?'שוחזר הגיבוי שלפני הייבוא.':'Pre-import backup restored.';}catch{status.textContent=he?'אין גיבוי שחזור תקין.':'No valid recovery backup.';}}},he?'שחזור לפני הייבוא האחרון':'Restore before last import'),status,
    el('a',{class:'cs-credit',href:CS_HOME,target:'_blank',rel:'noopener noreferrer'},he?'מדריך שימוש ועדכונים':'Guide and updates')];
}
