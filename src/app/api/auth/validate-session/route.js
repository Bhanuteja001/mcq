import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    await connectDB();
    const user = await User.findById(decoded.id);

    if (!user || user.sessionId !== decoded.sessionId) {
      return NextResponse.json({ message: "Session Invalid" }, { status: 403 });
    }

    return NextResponse.json({ message: "Session Valid" });
  } catch (error) {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}
