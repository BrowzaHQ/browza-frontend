import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const role = req.cookies.get("role")?.value as "buyer" | "admin" | undefined;

  // Not logged in → block everything except public routes
  const publicPaths = ["/login", "/favicon.ico", "/assets"];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p));

  if (!role && !isPublic) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Already logged in → keep them out of /login
  if (role && pathname === "/login") {
    url.pathname = role === "admin" ? "/admin" : "/buyer";
    return NextResponse.redirect(url);
  }

  // Basic role guards
  if (role === "buyer" && pathname.startsWith("/admin")) {
    url.pathname = "/buyer";
    return NextResponse.redirect(url);
  }
  if (role === "admin" && pathname.startsWith("/buyer")) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets).*)"],
};
