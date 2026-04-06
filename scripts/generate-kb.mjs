import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "src", "pages");
const SRC_DIR = path.join(ROOT, "src");
const OUT_DIR = path.join(ROOT, "src", "generated");
const OUT_FILE = path.join(OUT_DIR, "kb.json");

function toRoute(filePath) {
  const rel = path.relative(PAGES_DIR, filePath).replaceAll(path.sep, "/");
  const noExt = rel.replace(/\.astro$/i, "");
  if (noExt === "index") return "/";
  return "/" + noExt;
}

function stripAstro(raw) {
  // Remove frontmatter ---
  let s = raw.replace(/^---[\s\S]*?---\s*/m, "");
  // Remove tags <...> keeping inner text where possible
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<[^>]+>/g, " ");
  // Remove Astro expressions { ... }
  s = s.replace(/\{[\s\S]*?\}/g, " ");
  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

function stripTsx(raw) {
  let s = raw;
  // remove imports/exports (best effort)
  s = s.replace(/^\s*import[\s\S]*?;\s*$/gm, " ");
  s = s.replace(/^\s*export[\s\S]*?$/gm, " ");
  // remove JSX tags but keep inner text
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<[^>]+>/g, " ");
  // keep string literals content (rough)
  s = s.replace(/`[^`]*`/g, (m) => " " + m.slice(1, -1) + " ");
  s = s.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, " $1 ");
  s = s.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, " $1 ");
  // remove braces / code
  s = s.replace(/[{}()[\];]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const STOP = new Set([
  "a","o","os","as","um","uma","uns","umas",
  "de","do","da","dos","das","e","ou","para","por","com","sem","em","no","na","nos","nas",
  "que","como","onde","quando","qual","quais","pra","se","ao","aos","à","às",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

async function main() {
  const files = await walk(SRC_DIR);
  const docs = [];

  for (const file of files) {
    const norm = file.replaceAll(path.sep, "/");
    if (norm.includes("/src/pages/api/")) continue;
    if (norm.includes("/src/generated/")) continue;

    const lower = norm.toLowerCase();
    const isAstro = lower.endsWith(".astro");
    const isTsx = lower.endsWith(".tsx") || lower.endsWith(".ts");
    if (!isAstro && !isTsx) continue;

    const raw = await fs.readFile(file, "utf8");
    const text = isAstro ? stripAstro(raw) : stripTsx(raw);
    if (!text) continue;

    const url = isAstro && norm.includes("/src/pages/") ? toRoute(file) : norm.replace(`${ROOT.replaceAll(path.sep, "/")}/`, "");
    const tokens = tokenize(text);
    const tf = {};
    for (const t of tokens) tf[t] = (tf[t] ?? 0) + 1;

    docs.push({
      url,
      title: url === "/" ? "Home" : url.replaceAll("/", " ").trim(),
      text,
      tf,
      len: tokens.length || 1,
    });
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), docs }, null, 2), "utf8");
  console.log(`KB generated: ${path.relative(ROOT, OUT_FILE)} (${docs.length} docs)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

