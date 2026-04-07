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

export async function PUT(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  try {
    const data = await req.json();
    await connectDB();

    const updatedQuestion = await Questions.findByIdAndUpdate(id, data, { new: true });
    if (!updatedQuestion) {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    return NextResponse.json({ message: "Error updating question" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  try {
    await connectDB();
    const deleted = await Questions.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting question" }, { status: 500 });
  }
}
