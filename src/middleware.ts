import { defineMiddleware } from "astro:middleware";

const BACKEND_ME_URL = "https://code-shelf-backend.vercel.app/api/users/me";

function isPublicPath(pathname: string) {
  if (pathname === "/login") return true;
  if (pathname === "/api/login" || pathname === "/api/logout") return true;
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/images/")) return true;
  if (pathname.startsWith("/downloads/")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname.startsWith("/robots.txt")) return true;
  if (pathname.startsWith("/sitemap")) return true;
  return false;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (isPublicPath(pathname)) return next();

  const cookie = context.request.headers.get("cookie") ?? "";
  if (!cookie) {
    return context.redirect(`/login`);
  }

  // Verify session with backend (best-effort). If endpoint doesn't exist, fallback to cookie presence.
  try {
    const meRes = await fetch(BACKEND_ME_URL, {
      method: "GET",
      headers: { Cookie: cookie },
    });

    if (!meRes.ok) {
      return context.redirect(`/login`);
    }
  } catch {
    // If backend is temporarily unreachable, we still block access (safer default).
    return context.redirect(`/login`);
  }

  return next();
});

