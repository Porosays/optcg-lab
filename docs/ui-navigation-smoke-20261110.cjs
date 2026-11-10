const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('submodules/one-piece/packages/engine/src/automation/search/web/index.src.html','utf8');
const built=fs.readFileSync('site/index.html','utf8');
test('built application JavaScript parses without placeholders',()=>{assert.ok(!built.includes('__FIELDS__'));new Function(built.match(/<script>([\s\S]*?)<\/script>/)[1]);});
test('navigation targets exist exactly once and Start is visible',()=>{const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]); assert.equal(ids.length,new Set(ids).size);for(const m of html.split("<script>")[0].matchAll(/data-tab="([^"]+)"/g))assert.ok(ids.includes('tab-'+m[1]));assert.match(html,/<section id="tab-home">/);assert.match(html,/<section id="tab-test" class="hidden">/);});
const sideCode=html.slice(html.indexOf('function side(sd,'),html.indexOf('function showFrame'));
function render(checked=true,setup=false){const ctx={$:()=>({checked}),cimg:id=>`<img data-card="${id}">`,esc:s=>s.replaceAll('<','&lt;')};vm.createContext(ctx);vm.runInContext(sideCode,ctx);return ctx.side({leader:{id:'L',don:1,rested:false,power:5000},chars:[{id:'C',don:0,rested:true,power:2000}],stage:['S'],handIds:['H'],hand:1,deck:30,trash:4,life:0,donActive:2,donRested:3,donDeck:5},'A','<deck>',true,setup);}
test('board exposes zones, resources, active/rested state, and escapes deck name',()=>{const s=render();for(const label of ['Leader','Characters / 1 of 5','Stage','Hand / 1 cards','DON!! 2 ready / 3 rested','Deck 30','Trash 4','0 life','Rested','Active','&lt;deck>'])assert.ok(s.includes(label),label);});
test('opening setup does not misleadingly display zero life',()=>{assert.ok(render(true,true).includes('Setting up life'));assert.ok(!render(true,true).includes('0 life'));});
test('hiding hands omits hand card identities',()=>{assert.ok(!render(false).includes('data-card="H"'));assert.ok(render(false).includes('Hand cards hidden'));});
test('card inspector has dismissal and keyboard support; navigation pauses playback',()=>{assert.ok(html.includes('aria-label="Close card preview"'));assert.ok(html.includes("e.key === 'Escape'"));assert.ok(html.includes("b.dataset.tab !== 'watch') stopAuto()"));assert.ok(html.includes('tabindex="0" role="button"'));});
const runJobsCode=html.slice(html.indexOf('function executeBatch('),html.indexOf('function drawBatchQueue('));
test('batch worker errors are returned, not mistaken for completed games',async()=>{let results=0;class Worker{postMessage(){queueMicrotask(()=>this.onmessage({data:{type:'error',id:0,message:'engine failure'}}));}terminate(){}}const ctx={Worker,NIGHTLY:null,drawBatchQueue:()=>{}};vm.createContext(ctx);vm.runInContext(runJobsCode,ctx);const outcome=await ctx.executeBatch({jobs:[{},{}],bot:'fast',nWorkers:1,results:[],onResult:()=>results++});assert.equal(results,0);assert.equal(outcome.errors[0],'engine failure');assert.equal(outcome.stopped,false);});
