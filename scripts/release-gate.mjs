import fs from 'node:fs';
const checks=JSON.parse(fs.readFileSync('release-checklist.json','utf8'));
const missing=Object.entries(checks).filter(([k,v])=>k!=='evidence'&&v!==true).map(([k])=>k);
if(missing.length)throw Error('Stable release blocked by unverified checks: '+missing.join(', '));
const {version}=JSON.parse(fs.readFileSync('package.json','utf8'));
if(!/^\d+\.\d+\.\d+$/.test(version))throw Error('Choose a stable numeric version only after verification');
if(!fs.existsSync(checks.evidence))throw Error('Missing evidence');
