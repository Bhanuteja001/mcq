import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;
  console.log("TOKEN for proxy:", token);
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/test"],
};
