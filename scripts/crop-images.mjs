// Exports every crop in src/data/crops.json to public/img/<id>.webp.
// The photos carry a baked-in watermark near the bottom, so crops are cut
// from focal points here rather than with CSS object-position at runtime.
import sharp from "sharp";
import { readFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/img");
const { crops } = JSON.parse(await readFile(path.join(root, "src/data/crops.json"), "utf8"));

await mkdir(outDir, { recursive: true });

const newer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs > (await stat(b)).mtimeMs;
  } catch {
    return true;
  }
};

let made = 0;
for (const c of crops) {
  const src = path.join(root, "assets-src", c.src);
  const out = path.join(outDir, `${c.id}.webp`);
  if (!(await newer(src, out)) && !(await newer(path.join(root, "src/data/crops.json"), out))) continue;

  const img = sharp(src);
  const { width: W, height: H } = await img.metadata();
  let pipeline = img;

  if (c.aspect) {
    const [aw, ah] = c.aspect;
    let cw = W / (c.zoom ?? 1);
    let ch = (cw * ah) / aw;
    if (ch > H) {
      ch = H;
      cw = (ch * aw) / ah;
    }
    const left = Math.round((W - cw) * c.fx);
    const top = Math.round((H - ch) * c.fy);
    pipeline = pipeline.extract({ left, top, width: Math.round(cw), height: Math.round(ch) });
  }

  const maxW = c.maxW ?? 900;
  await pipeline
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  made++;
}
console.log(`images: ${made} written, ${crops.length - made} up to date → public/img`);
