#!/bin/bash
# usage: run-ab.sh decks.json games variant
f=${1:-decks/meta.json}; g=${2:-6}; v=${3:-planner}; o=${4:-}; n=$(nproc)
for i in $(seq 0 $((n-1))); do bun bench-planner.ts $f $g $i $n $v "$o" > /tmp/ab-$i.json & done; wait
python3 - <<'PY'
import json,glob,math
rows=[x for f in glob.glob('/tmp/ab-*.json') for x in json.load(open(f))]
fin=[r for r in rows if r['newWon'] is not None]; w=sum(r['newWon'] for r in fin); n=len(fin)
z=1.96;p=w/n;d=1+z*z/n;c=p+z*z/(2*n);m=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))
print(f"new bot won {w}/{n} = {100*p:.1f}% (95% range {100*(c-m)/d:.0f}-{100*(c+m)/d:.0f}%), unfinished {len(rows)-n}")
by={}
for r in fin: by.setdefault(r['deck'],[0,0]); by[r['deck']][0]+=r['newWon']; by[r['deck']][1]+=1
old={}
for r in fin: old.setdefault(r['oldDeck'],[0,0]); old[r['oldDeck']][0]+=(not r['newWon']); old[r['oldDeck']][1]+=1
print("deck: win rate piloted by new bot vs by old bot (same opponents and shuffles)")
for k in sorted(set(by)|set(old)):
  a=by.get(k,[0,0]); b=old.get(k,[0,0])
  if a[1] and b[1]: print(f"  {k}: new {100*a[0]/a[1]:.0f}% vs old {100*b[0]/b[1]:.0f}%  (n={a[1]}/{b[1]})")
PY
