import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const src = join(BOT_DIR, "VIDEO.json");
const raw = readFileSync(src, "utf8");
const doc = JSON.parse(raw);
if (typeof doc.url !== "string" || !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/[0-9]+$/.test(doc.url)) {
  throw new Error(`VIDEO.json does not name a TikTok video address: ${doc.url}`);
}
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "VIDEO.json"), JSON.stringify(doc, null, 0) + "\n", "utf8");
console.log(`VIDEO.json written -> ${doc.url} (valid TikTok video address)`);
