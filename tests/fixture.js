let ready=!!window.fixtureAPI;
addEventListener('error',e=>{document.getElementById('results').textContent='ERROR: '+e.message;});
addEventListener('unhandledrejection',e=>{document.getElementById('results').textContent='ERROR: '+e.reason;});
addEventListener('fixture-ready',()=>{ready=true;document.getElementById('results').textContent='המוצר נטען. אפשר לפתוח את החלונית ולהריץ בדיקות.';});
document.getElementById('open-panel').onclick=()=>window.fixtureAPI.open();
document.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{window.fixtureAPI.close();window.fixtureAPI.pickTheme(b.dataset.theme);});
const tooltip=document.getElementById('reaction-tooltip');
document.getElementById('reaction').onmouseenter=()=>{tooltip.hidden=false;};
document.getElementById('reaction').onmouseleave=()=>{tooltip.hidden=true;};
document.getElementById('popup-test').onclick=()=>{tooltip.hidden=!tooltip.hidden;};
document.getElementById('image-test').onclick=()=>{const input=document.querySelector('#cs-panel input[type=file][accept="image/*"]');if(!input){window.fixtureAPI.setUI({tab:'bg',bgCat:'mine'});window.fixtureAPI.open();return;}
 const c=document.createElement('canvas');c.width=600;c.height=400;const g=c.getContext('2d'),gradient=g.createLinearGradient(0,0,600,400);gradient.addColorStop(0,'#6240c5');gradient.addColorStop(1,'#38d5b8');g.fillStyle=gradient;g.fillRect(0,0,600,400);g.fillStyle='#fff';g.font='40px Arial';g.fillText('Chat Studio · DEMO',70,200);c.toBlob(blob=>{const data=new DataTransfer();data.items.add(new File([blob],'demo.png',{type:'image/png'}));input.files=data.files;input.dispatchEvent(new Event('change'));});};
document.getElementById('run-checks').onclick=async()=>{
 const lines=[],check=(name,ok)=>lines.push((ok?'PASS':'FAIL')+' '+name),api=window.fixtureAPI;
 check('Runtime initialized',ready&&!!api);if(!api)return;
 check('1177 themes / 688 backgrounds',api.ALL_THEMES.length===1177&&api.ALL_BGS===688);
 check('5 message bubbles detected',document.querySelectorAll('.cs-msg').length===5);
 check('No inline HTML required by Trusted Types',!!document.querySelector('#cs-dyn'));
 api.update({ticks:'wa',lite:false});api.pickTheme('k:wa');await new Promise(r=>setTimeout(r,1000));
 check('WhatsApp own-message colors',getComputedStyle(document.querySelector('.self .cs-msg')).backgroundColor==='rgb(217, 253, 211)');
 const footer=document.querySelector('.self .cs-wa-meta'),textHost=footer?.parentElement;
 const textRange=document.createRange();if(textHost){textRange.selectNodeContents(textHost);textRange.setEndBefore(footer);}
 check('Time and ticks occupy a separate footer',!!footer&&footer.getBoundingClientRect().top>=textRange.getBoundingClientRect().bottom);
 check('Original timestamp is visually hidden',document.querySelectorAll('.cs-time-source').length===5);
 api.update({ticks:'off'});await new Promise(r=>setTimeout(r,500));
 check('Turning off ticks restores original timestamps',!document.querySelector('.cs-time-source,.cs-wa-meta'));
 api.update({ticks:'wa'});
 check('SVG wallpaper exists',params.has('original')||!!document.querySelector('#chat-pane .cs-asset path'));
 check('Read detection rejects unread',!api.isSeenLabel('mark as unread')&&api.isSeenLabel('Read by Demo'));
 api.open();check('Four panel tabs',document.querySelectorAll('#cs-panel .cs-tab').length===4);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));api.close();await new Promise(r=>setTimeout(r,450));
 api.pickTheme('s:crystal:lavender');
 document.querySelectorAll('article').forEach(e=>e.style.isolation='isolate');
 document.querySelector('[data-message-id="4"]').style.alignItems='flex-start';
 document.getElementById('messages').scrollTop=130;
 tooltip.hidden=false;await new Promise(r=>setTimeout(r,400));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 const r=tooltip.getBoundingClientRect(),viewport=document.getElementById('messages').getBoundingClientRect();
 const hit=document.elementFromPoint(r.left+r.width/2,Math.min(r.bottom-5,viewport.bottom-5));
 check('Reaction tooltip above next message',!!hit&&(hit===tooltip||tooltip.contains(hit)));
 if(!hit||!(hit===tooltip||tooltip.contains(hit)))lines.push('DETAIL '+JSON.stringify({rect:[r.top,r.bottom],viewport:[viewport.top,viewport.bottom],hit:hit?.className,raised:document.querySelectorAll('.cs-popup-raised').length}));
 tooltip.hidden=true;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
 check('Closing restores popup ancestor layers',document.querySelectorAll('.cs-popup-raised').length===0);
 document.querySelectorAll('article').forEach(e=>{e.style.isolation='';e.style.alignItems='';});
 api.update({onChat:false});check('Disable removes styled bubbles',document.querySelectorAll('.cs-msg').length===0);api.update({onChat:true});
 document.getElementById('messages').scrollTop=0;
 document.getElementById('results').textContent=lines.join('\n');
};
document.getElementById('long-test').onclick=async()=>{
 const api=window.fixtureAPI;api.close();api.update({lite:true,fx:'none',scope:'messages',theme:'k:day'});
 document.querySelectorAll('[data-fixture-long]').forEach(e=>e.remove());
 const fragment=document.createDocumentFragment(),start=performance.now();
 for(let i=0;i<500;i++){const row=document.createElement('article');row.dataset.messageId='long-'+i;row.dataset.fixtureLong='1';row.setAttribute('role','listitem');const bubble=document.createElement('div');bubble.className='bubble';const txt=document.createElement('div');txt.setAttribute('jsname','bgckF');txt.dir='auto';txt.textContent='הודעת בדיקה '+i+' — נתונים פיקטיביים לבדיקת ביצועים';bubble.append(txt);row.append(bubble);fragment.append(row);}
 document.getElementById('messages').append(fragment);
 const wait=()=>{const count=document.querySelectorAll('[data-fixture-long] .cs-msg').length;if(count<500&&performance.now()-start<10000){requestAnimationFrame(wait);return;}document.getElementById('performance-result').textContent=JSON.stringify({messages:count,insertAndStyleMs:Math.round(performance.now()-start),mode:params.has('original')?'original':'converted',note:'Single local sample, Lite mode; not a long-session benchmark'});};requestAnimationFrame(wait);
};
