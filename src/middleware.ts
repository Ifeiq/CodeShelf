import { defineMiddleware } from "astro:middleware";

const AUTH_COOKIE_NAME = "cs_auth";

function isPublicPath(pathname: string) {
  if (pathname === "/login") return true;
  if (pathname === "/api/login" || pathname === "/api/logout") return true;
  if (pathname.startsWith("/api/")) return true;
  // Astro internal assets
  if (pathname.startsWith("/_astro/")) return true;
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

  const isAuthed = context.cookies.get(AUTH_COOKIE_NAME)?.value === "1";

  if (!isAuthed) {
    return context.redirect(`/login?next=${encodeURIComponent(pathname)}`);
  }

  return next();
});

