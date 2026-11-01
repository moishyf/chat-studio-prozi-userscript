// One-time, reviewable conversion of the preserved V15.3 modules. Not run by build.
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,s)=>fs.writeFileSync(p,s);
function patch(file,from,to){const p='src/core/'+file+'.js',s=read(p);if(!s.includes(from))throw Error('Missing conversion anchor: '+file+' '+from.slice(0,60));write(p,s.replace(from,to));}
for(const p of fs.readdirSync('src/core'))write('src/core/'+p,read('src/core/'+p).replaceAll('chrome.','csPlatform.').replaceAll("typeof chrome !== 'undefined'","typeof csPlatform !== 'undefined'"));
patch('context-state',"  const XURL = p => { try { return csPlatform.runtime.getURL(p); } catch { return ''; } };","  const XURL = () => ''; // Assets are rendered as SVG DOM by embeddedBackground.");
// Write at the action boundary: do not let a remote event overwrite a delayed local save.
patch('context-state','    saveT = setTimeout(() => {','    (() => {');
patch('context-state','    }, 150);','    })();');
// Never bind a private look to a mutable account index, including stale cached maps.
const ap='src/core/accounts.js';let a=read(ap);
a=a.replace(/  function curEmail\(\) \{[\s\S]*?\n  \}/,"  function curEmail() { return pageAcct?.email || ''; }");
a=a.replace(/  function meKey\(\) \{[\s\S]*?\n  \}/,"  function meKey() { const email=curEmail(); return email && onProf(email) ? email : null; }");
a=a.replace("const p = readPageAccount(); if (p) pageAcct = p;","const p = readPageAccount(); pageAcct = p;");
write(ap,a);
patch('ui','  function toggleOwn(k) {',"  function toggleOwn(k) {\n    if(!curEmail() || k !== curEmail()) return toast(L().acctNoEmail);");
// Build-time known assets; preserve original CSS colors and all IDs.
patch('backgrounds',"const fileBg = (name, size) => `url(\"${XURL('img/' + name + '.svg')}\") 0 0/${size} repeat`;","const fileBg = () => 'linear-gradient(transparent,transparent)';");
patch('backgrounds','    if (k === \'c\' && CBG[a]) return CBG[a];',"    if (k === 'c' && CBG[a]) return {...CBG[a], ...(/^whatsappd?$/.test(a)?{asset:[a==='whatsappd'?'doodle-wad.svg':'doodle-wa.svg',400]}:{})};");
patch('backgrounds',"    if (k === 'p' && PATTERNS[a] && getPal(b, st)) return PATTERNS[a].f(getPal(b, st));", "    if (k === 'p' && PATTERNS[a] && getPal(b, st)) return {...PATTERNS[a].f(getPal(b, st)), ...(['doodle','waves'].includes(a)&&b!=='custom'?{asset:[a+'-'+b+'.svg',a==='waves'?120:190,a==='waves'?40:undefined]}:{})};");
patch('chat-background','      setMover(pane, d);','      setMover(pane, d);\n      embeddedBackground(pane,d,list[0]);');
patch('chat-background','  function unpaint(pane) {','  function unpaint(pane) {\n    clearEmbedded(pane);');
patch('gmail','    paintBg(document.body, d);','    paintBg(document.body, d);\n    embeddedBackground(document.body,d);');
patch('gmail','  function unMail() {','  function unMail() {\n    clearEmbedded(document.body);');
patch('ui','    if (wa) {',"    if(wa) embeddedBackground(c,{asset:[id==='k:wadark'?'doodle-wad.svg':'doodle-wa.svg',220]});\n    if (wa) {");
patch('ui',"    return el('div', { class: 'cs-card' + (S.bg === id", "    const card = el('div', { class: 'cs-card' + (S.bg === id");
patch('ui',"      el('span', { class: 'cs-lbl' }, bgName(id)));", "      el('span', { class: 'cs-lbl' }, bgName(id)));\n    embeddedBackground(card,d);return card;");
patch('ui',"const OWN_CLS = ['cs-root'", "const OWN_CLS = ['cs-asset', 'cs-root'");
patch('ui',"        icon('sparkle'), el('b', null, 'כל הזכויות שמורות בס\"ד: לשכת הרב'))", "        icon('sparkle'), el('b', null, 'כל הזכויות שמורות בס\"ד: לשכת הרב')),\n      el('div',{class:'cs-credit'},icon('sparkle'),el('b',null,S.lang==='he'?'גרסת הסקריפט והתוספות: פרוזי':'Userscript conversion & additions: Prozi')),\n      ...backupControls(el, S.lang),\n      el('div',{class:'cs-note',dir:'ltr'},'Chat Studio '+CS_VERSION)");
// Keyboard support without altering appearance.
patch('ui',"el('div', { class: 'cs-sw', onclick: fn }", "el('div', { class: 'cs-sw', role:'switch', tabindex:'0', 'aria-checked':String(on), onkeydown:e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}}, onclick: fn }");
patch('helpers',"    return e;", "    if(e.classList.contains('cs-card')) {e.tabIndex=0;e.setAttribute('role','button');e.setAttribute('aria-label',e.title||'Select');e.addEventListener('keydown',event=>{if(event.target===e&&(event.key==='Enter'||event.key===' ')){event.preventDefault();e.click();}});}\n    return e;");
// All templates remain; replace extension-specific check icon with its exact SVG paths.
let css=read('src/styles.css');css=css.replace('background: #7c5cff url("chrome-extension://__MSG_@@extension_id__/img/check.svg") center/11px no-repeat;','background: #7c5cff;');
css+='\n.cs-asset {pointer-events:none;display:block;overflow:hidden;width:100%;height:100%}\n.cs-asset-card {position:absolute;inset:0;z-index:0}\n.cs-asset-absolute {position:absolute;inset:0;z-index:-1}\n.cs-asset-fixed {position:fixed;inset:0;z-index:-1}\n.cs-asset-sticky {position:sticky;top:0;z-index:-1}\n.cs-card.cs-sel .cs-check {display:block}\n.cs-check {display:none;position:absolute;top:8.5px;inset-inline-end:8.5px;width:11px;height:11px;z-index:4;pointer-events:none}\n#cs-panel :focus-visible{outline:2px solid #7c5cff;outline-offset:2px}\n@media(prefers-reduced-motion:reduce){#cs-panel *, .cs-btn, .cs-btn::after {animation:none!important;transition:none!important}}\n';
write('src/styles.css',css);
patch('helpers',"if(e.classList.contains('cs-card')) {", "if(e.classList.contains('cs-card')) {const check=assetNode(CS_ASSETS['check.svg']);check.setAttribute('class','cs-check');check.setAttribute('aria-hidden','true');e.append(check);");
// Keep upstream account parsers, but never invent indices from the order of arbitrary emails.
let bg=read('original/v15.3/background.js').replaceAll('chrome.','csPlatform.');
bg=bg.slice(0,bg.indexOf('csPlatform.runtime.onMessage'));
bg=bg.replace(/  if \(!out.length\) \{ const emails[^\n]+\n/,'');
bg=bg.replace("const res = await fetch(url, { credentials: 'include', cache: 'no-store', redirect: 'follow' });",`const res = await googleRequest(url);`);
write('src/runtime/accounts.js',`function googleRequest(url) { return new Promise((resolve,reject)=>GM_xmlhttpRequest({url,method:'GET',timeout:12000,onload:r=>resolve({ok:r.status>=200&&r.status<300,status:r.status,text:async()=>r.responseText}),onerror:()=>reject(Error('network unavailable')),ontimeout:()=>reject(Error('request timeout'))})); }\n`+bg);
write('src/runtime/account-menu.js',read('original/v15.3/accounts.js').replaceAll('chrome.','csPlatform.'));
console.log('Converted platform, assets, account identity, keyboard access and credits.');
