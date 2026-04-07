"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await axios.post(url, data, {
        withCredentials: true,
      });

      if (isLogin) {
        if (res.data.message === "Login Successful") {
          localStorage.setItem("user", res.data.user.username);
          localStorage.setItem("userId", res.data.user.id);
          alert("Login Successful");
          router.push("/dashboard");
          return;
        } else {
          alert(res.data.message || "Invalid credentials");
          return;
        }
      }

      if (!isLogin) {
        alert("Registered Successfully");
        reset();
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || "Something went wrong";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 backdrop-blur-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin
              ? "Login to your account to take the test"
              : "Join our community"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Field - Show only on Register */}
          {!isLogin && (
            <div>
              <input
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  ⚠️ {errors.username.message}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <input
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                ⚠️ {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                className="w-full border-2 border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition duration-200 text-xl"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                ⚠️ {errors.password.message}
              </p>
            )}
          </div>

          {/* Admin Secret Field (Register only) */}
          {!isLogin && (
            <div>
              <input
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                {...register("adminSecret")}
                placeholder="Admin Secret (optional)"
              />
              <p className="text-gray-500 text-xs mt-1">
                Enter the admin secret to create an administrator account.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200 mt-6"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">or</span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          type="button"
          className="w-full border-2 border-blue-500 text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition duration-200"
          onClick={() => {
            setIsLogin(!isLogin);
            reset();
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-white text-sm mt-8 text-center">
        Your secure MCQ testing platform
      </p>
    </div>
  );
}
