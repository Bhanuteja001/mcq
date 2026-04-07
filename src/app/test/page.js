"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { testData } from "@/lib/testData";

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [initialTime, setInitialTime] = useState(60);
  const [userAnswers, setUserAnswers] = useState([]);
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const lang = localStorage.getItem("language") || "javascript";
    const diff = localStorage.getItem("difficulty") || "easy";
    const numQuestions = parseInt(localStorage.getItem("questions")) || 10;

    setLanguage(lang);
    setDifficulty(diff);
    setNumberOfQuestions(numQuestions);

    // Get questions from static data
    const allQuestions = testData[lang]?.[diff] || [];
    const selectedQuestions = allQuestions.slice(0, numQuestions);
    setQuestions(selectedQuestions);

    const timeMap = {
      5: 60,
      10: 180,
      20: 360,
      30: 540,
    };

    const timeForQuiz = timeMap[numQuestions] || 60;
    setInitialTime(timeForQuiz);
    setTimer(timeForQuiz);
  }, []);

  const saveResult = async (finalScore, finalTotal, finalTime) => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("user");
    const language = localStorage.getItem("language") || "javascript";
    const difficulty = localStorage.getItem("difficulty") || "easy";

    localStorage.setItem("score", finalScore);
    localStorage.setItem("total", finalTotal);
    localStorage.setItem("numberOfQuestions", finalTotal);
    localStorage.setItem("timeTaken", finalTime);

    if (!userId || !username) {
      console.warn("Skipping result save: missing userId or username");
      return;
    }

    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          username,
          score: finalScore,
          total: finalTotal,
          language,
          difficulty,
          numberOfQuestions: finalTotal,
          timeTaken: finalTime,
        }),
      });
    } catch (err) {
      console.error("Failed to save result", err);
    }
  };

  useEffect(() => {
    if (timer === 0 && questions.length > 0) {
      saveResult(score, questions.length, initialTime).then(() =>
        router.push("/result"),
      );
    }
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, questions.length, router, score, initialTime]);

  const handleAnswer = async (opt) => {
    const isCorrect = opt === questions[index].answer;
    const nextScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(nextScore);
    }

    setUserAnswers([
      ...userAnswers,
      { question: questions[index].question, answer: opt, isCorrect },
    ]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const finalScore = nextScore;
      const finalTotal = questions.length;
      const finalTime = initialTime - timer;

      await saveResult(finalScore, finalTotal, finalTime);
      router.push("/result");
    }
  };

  if (!questions.length)
    return <p className="text-center text-lg mt-10">Loading questions...</p>;

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-2xl mx-auto">
        {/* TEST INFO HEADER */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-semibold">Technology</p>
              <p className="text-lg font-bold text-blue-600 capitalize">
                {language}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-semibold">Difficulty</p>
              <p className="text-lg font-bold text-purple-600 capitalize">
                {difficulty}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm font-semibold">Questions</p>
              <p className="text-lg font-bold text-yellow-600">
                {numberOfQuestions}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN TEST CONTAINER */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Timer and Progress */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              Question {index + 1} of {questions.length}
            </h2>
            <div
              className={`text-2xl font-bold ${timer > 10 ? "text-green-600" : "text-red-600"}`}
            >
              ⏱️ {formatTime(timer)}
            </div>
          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {questions[index].question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {questions[index].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-left"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
