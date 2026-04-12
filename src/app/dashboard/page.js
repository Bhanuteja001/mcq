"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ToastProvider";
import ConfirmModal from "@/components/ConfirmModal";

export default function Dashboard() {
  const router = useRouter();
  const toast = useToast();

  const [user, setUser] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [resultsLoading, setResultsLoading] = useState(true);
  const pageSize = 10;

  const fetchResults = (page) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setResultsLoading(false);
      return;
    }

    setResultsLoading(true);
    fetch(
      `/api/results?userId=${encodeURIComponent(userId)}&page=${page}&limit=${pageSize}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setAllResults(data.results);
          setTotalCount(data.totalCount || 0);
        }
      })
      .catch((err) => {
        console.error("Cannot load results:", err);
        toast.error("Unable to load results");
      })
      .finally(() => {
        setResultsLoading(false);
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/");
      return;
    }
    setUser(storedUser);
    localStorage.removeItem("testToken"); // Always start clean on dashboard
    fetchResults(currentPage);
  }, [router]);

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  const handleStart = () => {
    if (!language || !difficulty || !questions) {
      toast.error("Please select all fields");
      return;
    }
    if (!user) {
      router.replace("/");
      return;
    }
    // Generate a test token
    const testToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("testToken", testToken);
    localStorage.setItem("language", language);
    localStorage.setItem("difficulty", difficulty);
    localStorage.setItem("questions", questions);

    router.push("/test");
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-200">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">
          Welcome, <span className="text-blue-600 capitalize">{user}</span>
        </h2>

        <button
          type="button"
          onClick={handleLogoutRequest}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
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

      {/* MAIN CONTENT */}
      <div className="flex justify-center items-center mt-16 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
            New Session
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {/* TECHNOLOGY */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Technology --</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>

            {/* DIFFICULTY */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Difficulty --</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* QUESTIONS */}
            <select
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="w-full border p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">-- Questions --</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>

            {/* BUTTON */}
            <button
              onClick={handleStart}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
            >
              Start Test 🚀
            </button>
          </div>
        </div>
      </div>

      {/* TEST HISTORY */}
      {resultsLoading ? (
        <div className="flex justify-center items-center mt-10 px-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl text-center text-gray-500 animate-pulse">
            Loading your most recent results...
          </div>
        </div>
      ) : allResults.length > 0 ? (
        <div className="flex justify-center items-center mt-10 px-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
              Your Test History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center">Date & Time</th>
                    <th className="px-4 py-2 text-left">Technology</th>
                    <th className="px-4 py-2 text-left">Difficulty</th>
                    <th className="px-4 py-2 text-left">Questions</th>
                    <th className="px-4 py-2 text-left">Score</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">%</th>
                  </tr>
                </thead>
                <tbody>
                  {allResults.map((result) => (
                    <tr key={result._id} className="border-t border-gray-200">
                      <td className="px-4 py-2">
                        {new Date(result.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 capitalize">
                        {result.language}
                      </td>
                      <td className="px-4 py-2 capitalize">
                        {result.difficulty}
                      </td>
                      <td className="px-4 py-2">{result.numberOfQuestions}</td>
                      <td className="px-4 py-2">
                        {result.score}/{result.total}
                      </td>
                      <td className="px-4 py-2">{result.timeTaken}s</td>
                      <td className="px-4 py-2">
                        {((result.score / result.total) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Math.ceil(totalCount / pageSize) > 1 && (
              <div className="mt-4 flex justify-center items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from(
                  { length: Math.ceil(totalCount / pageSize) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${currentPage === page ? "bg-purple-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === Math.ceil(totalCount / pageSize)}
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, Math.ceil(totalCount / pageSize)),
                    )
                  }
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
