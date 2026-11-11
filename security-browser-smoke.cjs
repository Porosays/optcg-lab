const {chromium}=require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const fs=require('node:fs'),http=require('node:http'),assert=require('node:assert/strict');
(async()=>{const server=http.createServer((req,res)=>{const file=req.url==='/worker.js'?'worker.js':'index.html';res.setHeader('Content-Type',file.endsWith('js')?'application/javascript':'text/html');res.end(fs.readFileSync('site/'+file));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
try {browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL || "msedge"}); const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForTimeout(1800);
const result=await page.evaluate(async()=>{
 const valid=await helperCall({type:'parse',text:document.getElementById('deck').value});
 const baseline=JSON.stringify(MEM);let rejected=false;
 try{mergeMem({games:1,decks:{},cards:{'\"><img src=x onerror=alert(1)>':[1,30]}})}catch{rejected=true}
 const huge=await helperCall({type:'parse',text:'999999999999xOP01-001'});
 mergeMem({games:30,decks:{Friendly:{g:30,w:15,vs:{Opponent:[15,30]}}},cards:{'OP01-001':[15,30]}});
 await renderMemory();
 return {valid:!!valid.deck&&valid.errors.length===0,rejected,hugeRejected:huge.errors.length>0,rendered:document.getElementById('mdecks').textContent.includes('Friendly')};
});console.log(JSON.stringify({result,errors}));assert.ok(Object.values(result).every(Boolean));assert.deepEqual(errors,[]);
} finally {await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1});


