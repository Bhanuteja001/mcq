import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, email, password, adminSecret } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Username, email, and password are required." },
      { status: 400 },
    );
  }

  await connectDB();

  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });

  if (existingUser) {
    const sameUsername = existingUser.username === normalizedUsername;
    const sameEmail = existingUser.email === normalizedEmail;
    let message = "User already exists.";
    let field = "username";

    if (sameUsername && sameEmail) {
      message = `Username "${normalizedUsername}" and email "${normalizedEmail}" are already registered.`;
    } else if (sameUsername) {
      message = `Username "${normalizedUsername}" is already taken.`;
    } else if (sameEmail) {
      message = `Email "${normalizedEmail}" is already registered.`;
      field = "email";
    }

    return NextResponse.json({ message, field }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const s1 = adminSecret ? adminSecret.trim() : "";
  const s2 = process.env.ADMIN_SECRET ? process.env.ADMIN_SECRET.trim() : "";
  const role = s1 === s2 ? "admin" : "user";

  const user = await User.create({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashed,
    role,
  });

  return NextResponse.json({ message: "User Created", user });
}
