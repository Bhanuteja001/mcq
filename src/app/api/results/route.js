import { connectDB } from "@/lib/db";
import Result from "@/models/Results";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    userId,
    username,
    score,
    total,
    language,
    difficulty,
    numberOfQuestions,
    timeTaken,
    status,
  } = await req.json();

  if (!userId || !username) {
    return NextResponse.json(
      { message: "userId and username are required" },
      { status: 400 },
    );
  }

  await connectDB();
  await Result.create({
    userId,
    username,
    score,
    total,
    language,
    difficulty,
    numberOfQuestions,
    timeTaken,
    status: status || "completed",
  });

  return NextResponse.json({ message: "Result Saved" });
}

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userId query param is required" },
      { status: 400 },
    );
  }

  const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
  const limit = parseInt(req.nextUrl.searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  await connectDB();
  const filter = { userId, status: "completed" };
  const totalCount = await Result.countDocuments(filter);
  const results = await Result.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({ results, totalCount });
}
