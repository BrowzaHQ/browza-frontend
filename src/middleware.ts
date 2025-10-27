import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: For MVP we read a plain cookie `role` set on login.
// Replace with your secure backend session cookie logic later.
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const role = req.cookies.get("role")?.value as "buyer" | "admin" | undefined;

  // Unauthed → send to /login
  if (!role && !url.pathname.startsWith("/login")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Basic role routing guards
  if (role === "buyer" && url.pathname.startsWith("/admin")) {
    url.pathname = "/buyer";
    return NextResponse.redirect(url);
  }
  if (role === "admin" && url.pathname.startsWith("/buyer")) {
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|assets|favicon.ico|api).*)"],
};
