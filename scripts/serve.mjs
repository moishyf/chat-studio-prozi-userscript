import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.jpg':'image/jpeg','.md':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/'){res.writeHead(302,{Location:'/website/index.html'});res.end();return;}
  if(url.pathname==='/fixture-runtime.js'){
   const original=url.searchParams.get('original')==='1';
   let s=fs.readFileSync(original?'original/v15.3/content.js':'dist/chat-studio.user.js','utf8');
   s=s.replace("const HOST = location.hostname;","const HOST = 'chat.google.com';");
   s=s.replace('  boot();',`window.fixtureAPI={update,pickTheme,setUI,open:()=>{anchor=document.getElementById('open-panel');openPanel();},close:closePanel,themeDef,bgDef,ALL_THEMES,ALL_BGS,DEFAULTS,drawFit,buildCSS,cleanup,applyAll,registerAccount,recompute,meKey,getState:()=>({G,PROF,IMGIX,R}),isSeenLabel,tagMessages};\n  boot().then(()=>window.dispatchEvent(new Event('fixture-ready')));`);
   if(original)s=s.replace("const XURL = p => { try { return chrome.runtime.getURL(p); } catch { return ''; } };","const XURL = p => '/original/v15.3/'+p;");
   res.setHeader('Content-Type',types['.js']);res.end(s);return;
  }
  const p=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/website/index.html':url.pathname));
  if(!p.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(p.endsWith('fixture.html'))res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'none'; require-trusted-types-for 'script'");
  res.setHeader('Content-Type',types[path.extname(p)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');
  let body=fs.readFileSync(p);
  if(p.endsWith('fixture.html')&&url.searchParams.has('original'))body=body.toString().replace('src="/fixture-runtime.js"','src="/fixture-runtime.js?original=1"');
  res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Chat Studio preview: http://127.0.0.1:4173/tests/fixture.html'));
