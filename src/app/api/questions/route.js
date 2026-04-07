import {connectDB} from "@/lib/db";
import Questions from "@/models/Questions";
import { NextResponse } from "next/server";

export async function POST(req){
    const {language,difficulty}=await req.json();
    await connectDB();
    const questions = await Questions.find({language,difficulty});
    return NextResponse.json(questions);

}