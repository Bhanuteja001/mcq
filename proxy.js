import { NextResponse } from "next/server";
import { verifyToken } from "./src/lib/jwt";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 1. Reverse Redirection: If user is on the login page but already has a valid token
  if (pathname === "/") {
    if (token) {
      try {
        verifyToken(token);
        // User is valid, send to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // Token invalid/expired, let them stay on login page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2. Route Protection: /dashboard, /test, /result
  const protectedRoutes = ["/dashboard", "/test", "/result"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      // Clear invalid cookie and redirect to login
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/test/:path*", "/result/:path*"],
};
