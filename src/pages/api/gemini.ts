import type { APIRoute } from "astro";
import { GoogleGenAI } from "@google/genai";
import kb from "@/generated/kb.json";

export const prerender = false;

type ChatMessage = { role: "user" | "model"; text: string };
type KbDoc = { url: string; title: string; text: string; tf: Record<string, number>; len: number };
type DownloadItem = { label: string; url: string };

const BLOG_DOWNLOADS: DownloadItem[] = [
  { label: "Blog.tsx", url: "/downloads/Blog.tsx" },
  { label: "blog.astro", url: "/downloads/blog.astro" },
  { label: "[slug].astro", url: "/downloads/[slug].astro" },
];

const FEATURES_DOWNLOADS: DownloadItem[] = [
  { label: "Banner.tsx", url: "/api/features/download?id=Banner&type=tsx" },
  { label: "BannerMobile.tsx", url: "/api/features/download?id=BannerMobile&type=tsx" },
  { label: "data.json.ts", url: "/api/features/download?id=data.json&type=ts" },
  { label: "FormularioPlanilha.gs.ts", url: "/api/features/download?id=FormularioPlanilha.gs&type=ts" },
  { label: "trabalhe.json.ts", url: "/api/features/download?id=trabalhe.json&type=ts" },
  { label: "Lista de Features (JSON)", url: "/api/features/list" },
];

function getCuratedDownloads(question: string): DownloadItem[] {
  const q = question.toLowerCase();
  const out: DownloadItem[] = [];
  if (q.includes("blog") || q.includes("wordpress")) {
    out.push(...BLOG_DOWNLOADS);
  }
  if (q.includes("feature") || q.includes("features")) {
    out.push(...FEATURES_DOWNLOADS);
  }
  return out;
}

function looksLikeCode(text: string) {
  const t = text.toLowerCase();
  return (
    text.includes("```") ||
    t.includes("import ") ||
    t.includes("export ") ||
    t.includes("function ") ||
    t.includes("return (") ||
    t.includes("return(") ||
    t.includes("<div") ||
    t.includes("const ") ||
    t.includes("=>")
  );
}

function wantsExtraction(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("separe") ||
    t.includes("separar") ||
    t.includes("extraia") ||
    t.includes("extrair") ||
    t.includes("me entregue") ||
    t.includes("me entrega") ||
    t.includes("me dê") ||
    t.includes("sem imports") ||
    t.includes("apenas o export")
  );
}

function extractExplicitMessage(question: string) {
  // 1) Prefer quoted text
  const quoteMatch = question.match(/["“”'‘’]([^"“”'‘’]+)["“”'‘’]/);
  if (quoteMatch?.[1]?.trim()) return quoteMatch[1].trim();

  // 2) "mensagem: ...", "mensagem = ...", "mensagem - ..."
  const msgMatch = question.match(/mensagem\s*[:=\-]\s*([\s\S]+)$/i);
  if (msgMatch?.[1]?.trim()) return msgMatch[1].trim();

  // 3) "com a mensagem <...>"
  const withMsgMatch = question.match(/com\s+a\s+mensagem\s+([\s\S]+)$/i);
  if (withMsgMatch?.[1]?.trim()) return withMsgMatch[1].trim();

  return null;
}

function shouldGenerateMessage(question: string) {
  const q = question.toLowerCase();
  // User gave freedom to generate a message
  return (
    q.includes("mensagem personalizada") ||
    q.includes("crie uma mensagem") ||
    q.includes("gera uma mensagem") ||
    q.includes("escreva uma mensagem") ||
    q.includes("pode ser uma mensagem") ||
    q.includes("uma mensagem qualquer")
  );
}

function defaultWhatsAppMessage() {
  return "Olá! Tudo bem? Vim pelo CodeShelf e gostaria de mais informações.";
}

function tryBuildWhatsAppLink(question: string) {
  const q = question.toLowerCase();
  if (!q.includes("whatsapp")) return null;
  if (!(q.includes("link") || q.includes("wa.me"))) return null;

  // Grab digits from the message (supports formats like: 19 99119-3965, +55 (19) 99119-3965, etc)
  const digits = question.replace(/\D/g, "");
  if (!digits) return null;

  // Heuristics for BR numbers:
  // - If starts with 55 and length is 12-13 => already has country code
  // - If length is 10-11 => assume BR without country code
  // - Otherwise, still try as-is
  let phone = digits;
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    phone = digits;
  } else if (digits.length === 10 || digits.length === 11) {
    phone = `55${digits}`;
  }

  // Basic sanity: wa.me requires at least country+number; keep minimal check
  if (phone.length < 11) return null;

  const explicitMessage = extractExplicitMessage(question);
  const message = explicitMessage ?? (shouldGenerateMessage(question) ? defaultWhatsAppMessage() : null);

  if (!message) return `https://wa.me/${phone}`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

const STOP = new Set([
  "a","o","os","as","um","uma","uns","umas",
  "de","do","da","dos","das","e","ou","para","por","com","sem","em","no","na","nos","nas",
  "que","como","onde","quando","qual","quais","pra","se","ao","aos","à","às",
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

function scoreDoc(doc: KbDoc, queryTokens: string[]) {
  // lightweight TF score
  let score = 0;
  for (const t of queryTokens) score += (doc.tf?.[t] ?? 0);
  // normalize by doc length to avoid giant docs dominating
  return score / Math.sqrt(doc.len || 1);
}

function pickSnippet(text: string, queryTokens: string[]) {
  const lower = text.toLowerCase();
  const hit = queryTokens.find((t) => lower.includes(t));
  if (!hit) return text.slice(0, 700);
  const idx = lower.indexOf(hit);
  const start = Math.max(0, idx - 300);
  const end = Math.min(text.length, idx + 500);
  return text.slice(start, end);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY não configurada" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type deve ser application/json" }), {
        status: 415,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.text?.trim();
    if (!lastUser) {
      return new Response(JSON.stringify({ error: "Mensagem vazia" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const waLink = tryBuildWhatsAppLink(lastUser);
    if (waLink) {
      return new Response(
        JSON.stringify({
          text: `Aqui está o link do WhatsApp:\n${waLink}`,
          downloads: [],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const model = import.meta.env.GEMINI_MODEL || "gemini-2.5-flash";

    const docs = ((kb as unknown as { docs: KbDoc[] })?.docs ?? []).filter(Boolean);
    const qTokens = tokenize(lastUser).slice(0, 32);
    const ranked = docs
      .map((d) => ({ d, s: scoreDoc(d, qTokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 4);

    const contextBlocks =
      ranked.length === 0
        ? "Nenhum contexto interno encontrado."
        : ranked
            .map(({ d }) => {
              const snippet = pickSnippet(d.text, qTokens);
              return [`Fonte: ${d.url}`, snippet].join("\n");
            })
            .join("\n\n---\n\n");

    const downloads = getCuratedDownloads(lastUser);
    const downloadsBlock =
      downloads.length === 0
        ? ""
        : [
            "",
            "ARQUIVOS PARA BAIXAR (do CodeShelf):",
            ...downloads.map((d) => `- ${d.label}: ${d.url}`),
          ].join("\n");

    const codeMode = looksLikeCode(lastUser) && wantsExtraction(lastUser);
    const responseRules = codeMode
      ? [
          "MODO EXTRAÇÃO DE CÓDIGO:",
          "- O usuário vai colar um código e pedir para separar/entregar uma parte.",
          "- Responda SOMENTE com UM bloco de código TSX (entre ```tsx ... ```).",
          "- Não inclua imports.",
          "- Não inclua explicações, texto, bullets, ou markdown extra fora do bloco.",
          "- Entregue apenas o componente pedido, no formato: export ... { return ( ... ) }",
          "- Se precisar de dependências (hooks/components), mantenha o uso no JSX, mas não escreva imports.",
        ].join("\n")
      : [
          "REGRAS DE RESPOSTA:",
          "- Seja curto e objetivo.",
          "- Se o contexto interno não tiver a resposta, diga isso e indique a página/arquivo mais provável no CodeShelf.",
        ].join("\n");

    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: [
                "Você é um assistente do site CodeShelf. Responda em pt-BR, de forma curta e útil.",
                responseRules,
                "",
                "CONTEXTO INTERNO (trechos mais relevantes):",
                contextBlocks,
                downloadsBlock,
                "",
                lastUser,
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const text = result.text ?? "";
    return new Response(JSON.stringify({ text, downloads }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("api/gemini error:", err);
    return new Response(JSON.stringify({ error: "Erro ao gerar resposta" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

