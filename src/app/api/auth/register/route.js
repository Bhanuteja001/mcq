import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, email, password, adminSecret } = await req.json();
  await connectDB();
  const hashed = await bcrypt.hash(password, 10);

  const s1 = adminSecret ? adminSecret.trim() : "";
  const s2 = process.env.ADMIN_SECRET ? process.env.ADMIN_SECRET.trim() : "";
  console.log('Comparison:', s1, 'vs', s2);
  const role = s1 === s2 ? "admin" : "user";
  console.log('Assigned role:', role);

  const user = await User.create({
    username,
    email,
    password: hashed,
    role,
  });
  return NextResponse.json({ message: "User Created", user });
}
