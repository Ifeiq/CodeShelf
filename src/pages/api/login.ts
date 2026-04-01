import type { APIRoute } from "astro";

export const prerender = false;

const BACKEND_LOGIN_URL = "https://code-shelf-backend.vercel.app/api/users/login";
const AUTH_COOKIE_NAME = "cs_auth";

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

    // Important: don't forward upstream Set-Cookie here.
    // In dev, combining multiple Set-Cookie values can prevent the browser from saving our auth cookie.
    const resHeaders = new Headers({
      "Content-Type": upstreamRes.headers.get("content-type") || "application/json",
    });

    // Local auth gate cookie (so middleware can protect pages even on localhost)
    if (upstreamRes.ok) {
      resHeaders.append("Set-Cookie", `${AUTH_COOKIE_NAME}=1; Path=/; HttpOnly; Max-Age=1209600; SameSite=Lax`);
    } else {
      resHeaders.append("Set-Cookie", `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
    }

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

