"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    language: "",
    difficulty: "Easy",
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/api/admin/questions", { withCredentials: true });
      setQuestions(res.data);
    } catch (error) {
      if (error.response?.status === 403) {
        router.push("/admin/login");
      }
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestion) {
        await axios.put(`/api/admin/questions/${editingQuestion._id}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post("/api/admin/questions", formData, { withCredentials: true });
      }
      setShowModal(false);
      setEditingQuestion(null);
      resetForm();
      fetchQuestions();
    } catch (error) {
      alert("Error saving question");
    }
  };

  const resetForm = () => {
    setFormData({
      language: "",
      difficulty: "Easy",
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setFormData({
      language: q.language,
      difficulty: q.difficulty,
      question: q.question,
      options: [...q.options],
      answer: q.answer,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`/api/admin/questions/${id}`, { withCredentials: true });
        fetchQuestions();
      } catch (error) {
        alert("Error deleting question");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight mb-2">
              Management Portal
            </h1>
            <p className="text-slate-400 font-medium">Control center for exam content and questions.</p>
          </div>
          <button
            onClick={() => {
              setEditingQuestion(null);
              resetForm();
              setShowModal(true);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>+</span> Add New Question
          </button>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-top-6 duration-1000 delay-150">
          <StatCard title="Total Questions" value={questions.length} icon="📝" color="text-blue-400" />
          <StatCard title="Languages" value={new Set(questions.map((q) => q.language)).size} icon="🌐" color="text-indigo-400" />
          <StatCard title="Recent Updates" value="Today" icon="⚡" color="text-emerald-400" />
        </div>

        {/* Questions Grid/Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          {loading ? (
            <div className="p-20 text-center text-slate-500 animate-pulse">Scanning database...</div>
          ) : questions.length === 0 ? (
            <div className="p-20 text-center text-slate-500">Repository is currently empty.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Language</th>
                    <th className="px-6 py-4">Difficulty</th>
                    <th className="px-6 py-4 w-1/2">Question</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {questions.map((q) => (
                    <tr key={q._id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-blue-300 border border-slate-700 uppercase">
                          {q.language}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold ${
                            q.difficulty === "Hard"
                              ? "text-rose-400"
                              : q.difficulty === "Medium"
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-1 text-sm text-slate-300 font-medium">{q.question}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(q)} className="text-slate-400 hover:text-white p-1">
                            ✏️
                          </button>
                          <button onClick={() => handleDelete(q._id)} className="text-slate-400 hover:text-rose-400 p-1">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingQuestion ? "Edit Data Entry" : "New Question Entry"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Subject/Language</label>
                    <input
                      required
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g. JavaScript"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Difficulty Tier</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase mb-2">The Question</label>
                  <textarea
                    required
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter the challenge text..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-slate-400 text-xs font-bold uppercase">Response Options</label>
                  {formData.options.map((opt, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-500 rounded-lg text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <input
                        required
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder={`Option ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Correct Answer (Case Sensitive)</label>
                  <input
                    required
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Exact correct option text..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                  >
                    {editingQuestion ? "Commit Changes" : "Create Question"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm font-bold uppercase tracking-widest ${color}`}>{title}</span>
      </div>
      <div className="text-3xl font-black text-white">{value}</div>
    </div>
  );
}
