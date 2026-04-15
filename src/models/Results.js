import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    language: { type: String, required: true },
    difficulty: { type: String, required: true },
    numberOfQuestions: { type: Number, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    status: { type: String, enum: ["completed", "disqualified"], default: "completed" },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
