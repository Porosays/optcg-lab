const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
const html = fs.readFileSync('submodules/one-piece/packages/engine/src/automation/search/web/index.src.html','utf8');
function run(m) {
 const code = html.slice(html.indexOf('function mergeMem('), html.indexOf('$("mreset").onclick'));
 const ctx = vm.createContext({ input:m });
 vm.runInContext('let MEM = { games: 0, decks: {}, cards: {} };'+code, ctx);
 const before = vm.runInContext('JSON.stringify(MEM)',ctx);
 let error;try { vm.runInContext('mergeMem(input)',ctx); } catch(e) {error=e;}
 return {error,before,after:vm.runInContext('JSON.stringify(MEM)',ctx)};
}
const good = () => ({games:30,decks:{Friendly:{g:30,w:15,vs:{Opponent:[15,30]}}},cards:{'OP01-001':[15,30]}});
test('merges valid shared data',()=>{const r=run(good());assert.equal(r.error,undefined);assert.equal(JSON.parse(r.after).games,30)});
for (const [label,mutate] of [
 ['HTML card key',m=>{m.cards={'\"><img src=x onerror=alert(1)>':[15,30]}}],
 ['HTML game count',m=>{m.games='<img src=x>'}],
 ['string numeric counter',m=>{m.decks.Friendly.g='30'}],
 ['invalid win count',m=>{m.cards['OP01-001']=[31,30]}],
 ['prototype key',m=>{m.decks=JSON.parse('{"__proto__":{"g":30,"w":15,"vs":{}}}')}],
 ['oversized collection',m=>{m.cards=Object.fromEntries(Array.from({length:10001},(_,i)=>['OP'+i+'-001',[1,2]]))}]
]) test('rejects '+label+' atomically',()=>{const m=good();mutate(m);const r=run(m);assert.ok(r.error,'must reject unsafe data');assert.equal(r.after,r.before,'must not partially modify saved stats')});
test('script embedded JSON uses HTML-safe serializer',()=>{const py=fs.readFileSync('submodules/one-piece/packages/engine/src/automation/search/web/build.py','utf8');assert.match(py,/script_json\(nightly\)/);});
for (const text of ['9'.repeat(60)+'xOP01-001', 'x'.repeat(65537), '1000xOP01-001', '0xOP01-001']) {
 test('rejects unsafe deck input '+text.slice(0,20),async()=>{
  const code=html.slice(html.indexOf('function helperCall('),html.indexOf('async function loadNames('));
  let sent=0;
  const ctx=vm.createContext({text,Worker:class{postMessage(m){sent++;this.onmessage?.({data:{id:m.id}})}},NIGHTLY:null});
  vm.runInContext('let helper;const pending=new Map();let reqId=0;'+code,ctx);
  const r=await vm.runInContext('helperCall({type:"parse",text})',ctx);
  assert.equal(sent,0,'bad deck must not reach the pinned parser');assert.ok(r.errors.length);
 });
}
