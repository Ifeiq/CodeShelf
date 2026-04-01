import type { APIRoute } from "astro";

export const prerender = false;

const rawCodesTsx = import.meta.glob("../../../UI/Features/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const rawCodesTs = import.meta.glob("../../../UI/Features/**/*.ts", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const rawCodes: Record<string, string> = { ...rawCodesTsx, ...rawCodesTs };

function findFile(id: string, type: string | null) {
  const safeId = id.replace(/[^a-zA-Z0-9._-]/g, "");
  const t = type === "ts" || type === "tsx" ? type : null;
  const candidates = Object.keys(rawCodes).filter((p) => {
    if (!p.includes("/UI/Features/")) return false;
    if (!p.endsWith(`/${safeId}.ts`) && !p.endsWith(`/${safeId}.tsx`)) return false;
    if (t && !p.endsWith(`.${t}`)) return false;
    return true;
  });
  const match = candidates[0];
  if (!match) return null;
  return { path: match, code: rawCodes[match] };
}

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id") || "";
  const type = url.searchParams.get("type");
  if (!id.trim()) {
    return new Response(JSON.stringify({ error: "Parâmetro 'id' é obrigatório" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const found = findFile(id.trim(), type);
  if (!found) {
    return new Response(JSON.stringify({ error: "Feature não encontrada" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ext = found.path.endsWith(".tsx") ? "tsx" : "ts";
  const filename = `${id}.${ext}`;
  return new Response(found.code, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
};

