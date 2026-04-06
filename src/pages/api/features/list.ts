import type { APIRoute } from "astro";

export const prerender = false;

type FeatureItem = { id: string; fileType: "ts" | "tsx"; downloadUrl: string };

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

function toItem(filePath: string): FeatureItem | null {
  const fileName = filePath.split("/").pop();
  if (!fileName) return null;
  const m = fileName.match(/^(.*)\.(tsx|ts)$/);
  if (!m) return null;
  const id = m[1];
  const fileType = m[2] as "ts" | "tsx";
  return { id, fileType, downloadUrl: `/api/features/download?id=${encodeURIComponent(id)}&type=${fileType}` };
}

const items: FeatureItem[] = Object.keys(rawCodes)
  .map(toItem)
  .filter(Boolean) as FeatureItem[];

items.sort((a, b) => a.id.localeCompare(b.id));

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

