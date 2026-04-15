"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";

export default function Result() {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [technology, setTechnology] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationReason, setDisqualificationReason] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/");
      return;
    }

    // Check for result token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const storedToken = localStorage.getItem("resultToken");
    if (!token || token !== storedToken) {
      router.replace("/dashboard");
      return;
    }

    setScore(parseInt(localStorage.getItem("score")) || 0);
    setTotal(parseInt(localStorage.getItem("total")) || 0);
    setTimeTaken(parseInt(localStorage.getItem("timeTaken")) || 0);
    setTechnology(localStorage.getItem("language") || "N/A");
    setDifficulty(localStorage.getItem("difficulty") || "N/A");
    setNumberOfQuestions(
      parseInt(localStorage.getItem("numberOfQuestions")) || 0,
    );

    const disqualified = urlParams.get("disqualified") === "true" || localStorage.getItem("disqualified") === "true";
    setIsDisqualified(disqualified);
    if (disqualified) {
      setDisqualificationReason(urlParams.get("reason") || "Multiple violations detected");
    }
  }, [router]);

  const wrong = total - score;
  const percentage = total > 0 ? ((score / total) * 100).toFixed(2) : 0;

  const handleDashboard = () => {
    // Clear all test-related data from storage
    localStorage.removeItem("language");
    localStorage.removeItem("difficulty");
    localStorage.removeItem("questions");
    localStorage.removeItem("testToken");
    localStorage.removeItem("resultToken");
    localStorage.removeItem("score");
    localStorage.removeItem("total");
    localStorage.removeItem("numberOfQuestions");
    localStorage.removeItem("timeTaken");
    localStorage.removeItem("disqualified");

    router.push("/dashboard");
  };

  const handleLogoutRequest = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.clear();
    router.push("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-200 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
            {isDisqualified ? "Assessment Terminated" : "Test Results"}
          </h1>

          {isDisqualified && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-bold">
                    DISQUALIFIED: {disqualificationReason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Technology and Difficulty */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-semibold">Technology</p>
              <p className="text-xl font-bold text-blue-600 capitalize">
                {technology}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-semibold">Difficulty</p>
              <p className="text-xl font-bold text-purple-600 capitalize">
                {difficulty}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-semibold">Questions</p>
              <p className="text-xl font-bold text-yellow-600">
                {numberOfQuestions}
              </p>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Time Taken */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Time Taken
            </p>
            <p className="text-4xl font-bold text-green-600">{timeTaken}s</p>
            <p className="text-gray-500 text-xs mt-2">Out of 60 seconds</p>
          </div>

          {/* Total Questions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Total Questions
            </p>
            <p className="text-4xl font-bold text-blue-600">{total}</p>
          </div>

          {/* Correct Answers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Correct Answers
            </p>
            <p className="text-4xl font-bold text-green-600">{score}</p>
            <p className="text-gray-500 text-xs mt-2">
              {((score / total) * 100).toFixed(2)}%
            </p>
          </div>

          {/* Wrong Answers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Wrong Answers
            </p>
            <p className="text-4xl font-bold text-red-600">{wrong}</p>
            <p className="text-gray-500 text-xs mt-2">
              {(((total - score) / total) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="bg-linear-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg p-8 text-white text-center mb-6">
          <p className="text-lg font-semibold mb-2">Overall Score</p>
          <p className="text-6xl font-bold mb-2">{isDisqualified ? "0.00" : percentage}%</p>
          <p className="text-lg">
            {isDisqualified
              ? "❌ Disqualified for violating exam protocols."
              : percentage >= 70
                ? "🎉 Excellent Work!"
                : percentage >= 50
                  ? "👍 Good Effort!"
                  : "📚 Keep Learning!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDashboard}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Back to Dashboard
          </button>
          <button
            type="button"
            onClick={handleLogoutRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
        <ConfirmModal
          open={showLogoutModal}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      </div>
    </div>
  );
}
