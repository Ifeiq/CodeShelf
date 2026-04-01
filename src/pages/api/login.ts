import type { APIRoute } from "astro";

export const prerender = false;

const BACKEND_LOGIN_URL = "https://code-shelf-backend.vercel.app/api/users/login";

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type deve ser application/json" }), {
        status: 415,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = (await request.json()) as { email?: string; password?: string };

    const upstreamRes = await fetch(BACKEND_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward cookies if present (useful for some auth flows)
        Cookie: request.headers.get("cookie") ?? "",
      },
      body: JSON.stringify(body),
    });

    const upstreamText = await upstreamRes.text();

    // Forward Set-Cookie so the browser stores session cookie for this origin.
    const resHeaders = new Headers();
    resHeaders.set("Content-Type", upstreamRes.headers.get("content-type") || "application/json");

    const setCookie = upstreamRes.headers.get("set-cookie");
    if (setCookie) resHeaders.set("set-cookie", setCookie);

    return new Response(upstreamText, {
      status: upstreamRes.status,
      headers: resHeaders,
    });
  } catch (err) {
    console.error("api/login error:", err);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

