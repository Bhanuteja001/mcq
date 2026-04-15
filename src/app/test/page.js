"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { testData } from "@/lib/testData";
import ConfirmModal from "@/components/ConfirmModal";

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
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationReason, setDisqualificationReason] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const isExiting = useRef(false);

  const router = useRouter();

  const startFullscreenExam = () => {
    if (typeof document !== "undefined") {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsExamStarted(true);
    }
  };

  const disqualifyUser = async (reason) => {
    if (isDisqualified || isExiting.current) return;
    setIsDisqualified(true);
    console.warn(`User disqualified: ${reason}`);
    setDisqualificationReason(reason);

    const finalScore = 0;
    const finalTotal = questions.length || parseInt(localStorage.getItem("questions")) || 0;
    const finalTime = initialTime - timer;

    await finalSubmit("disqualified", reason);
  };

  // 🛡️ Single Session Check
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/validate-session");
        if (!res.ok) {
          localStorage.clear();
          router.replace("/");
        }
      } catch (err) {
        console.error("Session validation failed", err);
      }
    };

    if (isExamStarted && !isDisqualified) {
      const interval = setInterval(checkSession, 10000); // Check every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isExamStarted, isDisqualified, router]);

  // 🚫 Anti-Cheat: Tab Switching / Blur
  useEffect(() => {
    if (!isExamStarted || isDisqualified) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        disqualifyUser("Tab Switched");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isExamStarted && !isDisqualified && !isExiting.current) {
        disqualifyUser("Fullscreen Exited");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isExamStarted, isDisqualified, questions.length, initialTime, timer]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const lang = localStorage.getItem("language");
    const diff = localStorage.getItem("difficulty");
    const numQuestions = parseInt(localStorage.getItem("questions"));
    const testToken = localStorage.getItem("testToken");

    // 🔒 Not logged in
    if (!user) {
      router.replace("/");
      return;
    }

    // 🚫 No selection or no test token → block access
    if (!lang || !diff || !numQuestions || !testToken) {
      router.replace("/dashboard");
      return;
    }

    setLanguage(lang);
    setDifficulty(diff);
    setNumberOfQuestions(numQuestions);

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

    // Initialize userAnswers with nulls
    setUserAnswers(new Array(numQuestions).fill(null));
  }, []);

  const finalSubmit = async (reason = "voluntary", specificReason = "") => {
    if (isDisqualified && reason !== "disqualified") return;
    isExiting.current = true;
    
    // Calculate final score
    let finalScore = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === questions[i]?.answer) {
        finalScore++;
      }
    });

    const finalTotal = questions.length;
    const finalTime = initialTime - timer;

    await saveResult(finalScore, finalTotal, finalTime, reason === "disqualified" ? "disqualified" : "completed");

    const resultToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("resultToken", resultToken);
    
    if (reason === "disqualified") {
        localStorage.setItem("disqualified", "true");
    }
    
    localStorage.removeItem("testToken");

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    const reasonParam = reason === "disqualified" ? `&disqualified=true&reason=${encodeURIComponent(specificReason || disqualificationReason)}` : "";
    router.push(`/result?token=${resultToken}${reasonParam}`);
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const saveResult = async (finalScore, finalTotal, finalTime, status = "completed") => {
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
          status,
        }),
      });
    } catch (err) {
      console.error("Failed to save result", err);
    }
  };

  useEffect(() => {
    if (!isExamStarted) return; // Wait for user gesture/fullscreen

    if (timer === 0 && questions.length > 0) {
      finalSubmit("voluntary");
    }
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, questions.length, router, score, initialTime, isExamStarted]);

  const handleAnswer = (opt) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = opt;
    setUserAnswers(updatedAnswers);
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
    <>
      {!isExamStarted && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-md px-6 text-center text-white font-sans">
          <div className="max-w-md space-y-8 p-10 bg-slate-800/50 rounded-3xl border border-slate-700/50 shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/20 blur-xl"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3l-7 7" />
                  <path d="M3 21l7-7" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">
                Exam Mode Protocol
              </h1>
              <p className="text-slate-400 leading-relaxed">
                To ensure a focused environment, this exam requires{" "}
                <strong className="text-white">Fullscreen Mode</strong>.
                The timer will begin as soon as you enter.
              </p>
            </div>

            <button
              onClick={startFullscreenExam}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group"
            >
              Start Session
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
              Secure Assessment Environment
            </p>
          </div>
        </div>
      )}
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
          <div className="space-y-4">
            {questions[index].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-left border-2 ${
                  userAnswers[index] === opt
                    ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 translate-x-1"
                    : "bg-white border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                        userAnswers[index] === opt ? "bg-white/20" : "bg-slate-100"
                    }`}>
                        {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={prevQuestion}
                    disabled={index === 0}
                    className="flex-1 max-w-[140px] px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    Back
                </button>

                <div className="hidden sm:flex items-center gap-2 overflow-x-auto py-2 no-scrollbar px-4 rounded-2xl bg-slate-50 border border-slate-100">
                    {questions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`min-w-[36px] h-9 rounded-lg text-sm font-bold transition-all ${
                                index === i 
                                ? "bg-indigo-600 text-white shadow-md scale-110" 
                                : userAnswers[i] !== null
                                ? "bg-emerald-500 text-white"
                                : "bg-white text-slate-400 hover:text-slate-600 border border-slate-200"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={nextQuestion}
                    disabled={index === questions.length - 1}
                    className="flex-1 max-w-[140px] px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center justify-center gap-2 text-right"
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group"
            >
                Submit Assessment
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={showSubmitModal}
        title="Finish Assessment?"
        message="Are you sure you want to submit your answers? You won't be able to change them later."
        onConfirm={() => {
            setShowSubmitModal(false);
            finalSubmit();
        }}
        onCancel={() => setShowSubmitModal(false)}
      />
      </div>
    </>
  );
}
