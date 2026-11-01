import fs from 'node:fs';
fs.mkdirSync('.local',{recursive:true});
const recipes=fs.readFileSync('src/assets/recipes.json','utf8');
const runtime=fs.readFileSync('src/runtime/assets.js','utf8');
fs.writeFileSync('.local/asset-test.js',`const CS_ASSETS=${recipes};\n${runtime}\n
for(const name of Object.keys(CS_ASSETS)) {
 const card=document.createElement('figure'),title=document.createElement('figcaption');title.textContent=name;
 const pair=document.createElement('div');pair.className='pair';
 const original=document.createElement('img');original.src='../original/v15.3/img/'+name;original.alt='Original '+name;
 const converted=assetNode(CS_ASSETS[name]);converted.setAttribute('class','converted');
 pair.append(original,converted);card.append(title,pair);document.querySelector('main').append(card);
}
addEventListener('load',()=>{
 const cards=[...document.querySelectorAll('figure')];
 const failed=cards.filter(c=>{const img=c.querySelector('img'),svg=c.querySelector('svg');return !img.naturalWidth||!svg.getBBox().width||!svg.getBBox().height;});
 document.querySelector('output').textContent=JSON.stringify({assets:cards.length,failed:failed.map(c=>c.querySelector('figcaption').textContent)});
});
`);
fs.writeFileSync('.local/asset-test.html',`<!doctype html><html><head><meta charset="utf-8"><title>Chat Studio — 99 original/converted SVG assets</title><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; require-trusted-types-for 'script'"><style>body{font:14px Arial;background:#edf0f6;margin:25px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:14px}figure{background:white;padding:12px;margin:0;border-radius:12px}figcaption{margin-bottom:10px}.pair{display:flex;gap:8px;align-items:center}.pair>*{width:120px;height:100px;object-fit:contain;background:#d9e3ed}output{display:block;margin:20px;font-size:20px}</style><script src="asset-test.js" defer></script></head><body><h1>99 SVG assets — original / converted</h1><p>Each pair: original file on the left; production SVG DOM recipe on the right.</p><output>Loading</output><main></main></body></html>`);
