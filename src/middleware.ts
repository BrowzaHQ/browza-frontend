import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = req.cookies.get("role")?.value;

  // If logged in, keep /login unreachable
  if (pathname === "/login" && role) {
    const to = role === "admin" ? "/admin" : "/buyer";
    return NextResponse.redirect(new URL(to, req.url));
  }

  // Guard admin area
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  // Guard buyer area
  if (pathname.startsWith("/buyer")) {
    if (role !== "buyer") {
      return NextResponse.redirect(new URL("/401", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/buyer/:path*", "/admin/:path*"],
};
