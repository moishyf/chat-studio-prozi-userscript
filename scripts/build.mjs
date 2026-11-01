import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const pkg=JSON.parse(read('package.json'));
const repo='moishyf/chat-studio-prozi-userscript';
const home=`https://moishyf.github.io/chat-studio-prozi-userscript/`;
const hashes=JSON.parse(read('original/SHA256.json'));
for(const [file,hash]of Object.entries(hashes))if(crypto.createHash('sha256').update(fs.readFileSync('original/v15.3/'+file)).digest('hex')!==hash)throw Error('Original modified: '+file);
export function parseSVG(text){
  const roots=[],stack=[];
  const allowed=new Set(['svg','g','path','circle','rect','ellipse','line','polyline','polygon','defs','pattern','linearGradient','radialGradient','stop']);
  const tokens=text.match(/<[^>]+>/g)||[];
  if(text.replace(/<[^>]+>/g,'').trim())throw Error('Unexpected SVG text');
  for(const token of tokens){
    if(token.startsWith('<!--')||token.startsWith('<?'))continue;
    if(token.startsWith('</')){const name=token.slice(2,-1).trim();if(stack.pop()?.[0]!==name)throw Error('Malformed SVG');continue;}
    const m=token.match(/^<([\w]+)([\s\S]*?)(\/?)>$/);if(!m||!allowed.has(m[1]))throw Error('Unsafe SVG tag');
    const attrs={};let rest=m[2];
    rest=rest.replace(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g,(_,key,_q,value)=>{if(/^on/i.test(key)||['href','xlink:href','style'].includes(key)||/url\((?!#)/.test(value))throw Error('Unsafe SVG attribute');attrs[key]=value;return '';});
    if(rest.trim())throw Error('Malformed SVG attributes');
    const recipe=[m[1],attrs,[]];if(stack.length)stack.at(-1)[2].push(recipe);else roots.push(recipe);if(!m[3])stack.push(recipe);
  }
  if(stack.length||roots.length!==1||roots[0][0]!=='svg')throw Error('Malformed SVG root');return roots[0];
}
const assets={};for(const f of fs.readdirSync('original/v15.3/img').sort())assets[f]=parseSVG(read('original/v15.3/img/'+f));
fs.writeFileSync('src/assets/recipes.json',JSON.stringify(assets));
const header=`// ==UserScript==
// @name         Chat Studio · Prozi
// @namespace    https://github.com/${repo}
// @version      ${pkg.version}
// @description  כל עיצובי Chat Studio V15.3 — גרסת הסקריפט והתוספות: פרוזי
// @author       Original: לשכת הרב; Userscript conversion: Prozi
// @copyright    כל הזכויות שמורות בס"ד: לשכת הרב
// @match        https://chat.google.com/*
// @match        https://mail.google.com/*
// @match        https://ogs.google.com/*
// @run-at       document-start
// @sandbox      DOM
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      accounts.google.com
// @homepageURL  ${home}
// @updateURL    https://raw.githubusercontent.com/${repo}/main/dist/chat-studio.meta.js
// @downloadURL  https://raw.githubusercontent.com/${repo}/main/dist/chat-studio.user.js
// ==/UserScript==
`;
const runtime=['storage','assets','accounts','platform','backup'].map(n=>read('src/runtime/'+n+'.js')).join('\n');
const core=JSON.parse(read('src/order.json')).map(p=>read('src/'+p)).join('\n');
const script=header+`\n(()=>{'use strict';\nif(window.__chatStudioProzi)return;window.__chatStudioProzi=true;\nconst CS_VERSION=${JSON.stringify(pkg.version)},CS_HOME=${JSON.stringify(home)},CS_ASSETS=${JSON.stringify(assets)};\n${runtime}\nif(location.hostname==='ogs.google.com'){${read('src/runtime/account-menu.js')}\nreturn;}\nGM_addStyle(${JSON.stringify(read('src/styles.css'))});\nfunction start(){if(!document.documentElement){setTimeout(start,0);return;}\n${core}\n}\nstart();\n})();\n`;
new vm.Script(script);
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync('dist/chat-studio.user.js',script);fs.writeFileSync('dist/chat-studio.meta.js',header);
fs.writeFileSync('dist/SHA256SUMS',crypto.createHash('sha256').update(script).digest('hex')+'  chat-studio.user.js\n');
console.log(JSON.stringify({version:pkg.version,assets:Object.keys(assets).length,bytes:Buffer.byteLength(script)}));
