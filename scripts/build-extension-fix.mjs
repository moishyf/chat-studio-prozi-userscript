// Optional minimal fix for the original extension. Original files remain untouched.
import fs from 'node:fs';
const dir='dist/extension-tooltip-fix';
fs.mkdirSync(dir,{recursive:true});fs.cpSync('original/v15.3',dir,{recursive:true});
let content=fs.readFileSync(dir+'/content.js','utf8');
content=content.replace('    startObs();','    startObs();\n    popupGuard.start();').replace('  function cleanup() {','  function cleanup() {\n    popupGuard.stop();');
const guard=fs.readFileSync('src/runtime/popups.js','utf8');
content=content.replace('  /* ================= Context',guard+'\n  /* ================= Context');
fs.writeFileSync(dir+'/content.js',content);
fs.appendFileSync(dir+'/styles.css','\n.cs-popup-raised{z-index:1000!important}.cs-popup-position{position:relative!important}.cs-popup-frozen{transform:none!important;filter:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;animation:none!important;opacity:1!important}\n');
const manifest=JSON.parse(fs.readFileSync(dir+'/manifest.json','utf8'));manifest.version='15.3.1';fs.writeFileSync(dir+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Built separate minimal extension tooltip fix.');
