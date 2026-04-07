import mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  language: String,
  difficulty: String,
  question: String,
  options: [String],
  answer: String,
});


export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);