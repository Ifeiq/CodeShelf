import type { APIRoute } from "astro";

export const prerender = false;

const BACKEND_LOGOUT_URL = "https://code-shelf-backend.vercel.app/api/users/logout";

function buildCookieClears(cookieHeader: string | null) {
  if (!cookieHeader) return [];
  const names = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .map((c) => c.split("=")[0]?.trim())
    .filter(Boolean);

  // avoid duplicates
  const uniq = Array.from(new Set(names));
  return uniq.map((name) => `${name}=; Path=/; Max-Age=0; SameSite=Lax`);
}

export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");

  // Always clear cookies for this origin so UI can "log out"
  const clears = buildCookieClears(cookieHeader);
  const resHeaders = new Headers({ "Content-Type": "application/json" });
  for (const c of clears) resHeaders.append("Set-Cookie", c);

  try {
    // Best-effort: ask backend to invalidate session too.
    await fetch(BACKEND_LOGOUT_URL, {
      method: "POST",
      headers: {
        Cookie: cookieHeader ?? "",
      },
    });
  } catch (err) {
    console.error("api/logout upstream error:", err);
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: resHeaders });
};

