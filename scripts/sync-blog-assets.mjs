// Copies every non-MDX file from content/blog/<slug>/ to public/blog/<slug>/
// so posts can keep their photos next to the text and use relative paths.
// Runs automatically before `npm run dev` and `npm run build`.
// public/blog/ is generated, so it is gitignored.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "content", "blog");
const out = path.join(root, "public", "blog");

fs.rmSync(out, { recursive: true, force: true });
if (!fs.existsSync(src)) process.exit(0);

let copied = 0;
for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const from = path.join(src, entry.name);
  const to = path.join(out, entry.name);
  fs.cpSync(from, to, {
    recursive: true,
    filter: (file) => !/\.(mdx?|DS_Store)$/i.test(file),
  });
  copied++;
}
console.log(`[blog] synced assets for ${copied} post folder(s)`);
