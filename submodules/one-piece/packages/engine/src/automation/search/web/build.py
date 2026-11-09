"""Builds the Deck Lab site into site/: bundles worker.js and embeds the deck fields.
Run from the repo root:  python3 submodules/one-piece/packages/engine/src/automation/search/web/build.py"""
import json, os, subprocess
here = os.path.dirname(os.path.abspath(__file__)); search = os.path.dirname(here)
engine = os.path.abspath(os.path.join(here, "../../../.."))
out = os.path.abspath(os.path.join(engine, "../../../../site")); os.makedirs(out, exist_ok=True)
subprocess.run(["bun", "build", "src/automation/search/web/worker.ts", "--target=browser", "--minify", f"--outfile={out}/worker.js"], cwd=engine, check=True)
fields = [("meta","Current meta (EB-05)"),("op18-community","OP-18 community lists"),("op18-preview","OP-18 preview (all 22)"),("meta-op16","OP-16 era"),("classic-2024","Classic 2023–24 (Extra)"),("test-decks","Engine test decks")]
data = {}
for k, label in fields:
    d = json.load(open(os.path.join(search, "decks", f"{k}.json")))
    data[k] = {"label": label, "decks": [{"name": x["name"], "leader": x["leader"], "main": x["main"]} for x in d]}
html = open(os.path.join(here, "index.src.html")).read().replace("__FIELDS__", json.dumps(data, separators=(",", ":")))
open(os.path.join(out, "index.html"), "w").write(html); print("built", out)
