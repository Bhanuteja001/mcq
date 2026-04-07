"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        localStorage.setItem("adminUser", res.data.user.username);
        localStorage.setItem("adminRole", res.data.user.role);
        alert("Welcome, Admin");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || "Login failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      {/* Premium Glassmorphism Card */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl w-full max-w-md p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-600 shadow-inner">
            <span className="text-4xl">🔐</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Admin Console
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Authorized Personnel Only
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Admin Email
            </label>
            <input
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              {...register("email", {
                required: "Admin email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-2 ml-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
              Secret Passphrase
            </label>
            <div className="relative">
              <input
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Passphrase is required" })}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors"
              >
                {showPassword ? "🔓" : "🔒"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-2 ml-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            type="submit"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <button 
            onClick={() => router.push("/")}
            className="text-slate-500 hover:text-slate-400 text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            ← Back to Platform
          </button>
        </div>
      </div>
    </div>
  );
}
