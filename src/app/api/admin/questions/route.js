import { connectDB } from "@/lib/db";
import Questions from "@/models/Questions";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;

  try {
    const decoded = verifyToken(token);
    return decoded && decoded.role === "admin";
  } catch (error) {
    return false;
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await connectDB();
  const questions = await Questions.find({}).sort({ _id: -1 });
  return NextResponse.json(questions);
}

export async function POST(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const data = await req.json();
    await connectDB();

    const newQuestion = await Questions.create(data);
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating question" }, { status: 500 });
  }
}
