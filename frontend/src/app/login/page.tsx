/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // New state for remember me
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // login
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log(res);

      if (!res.data.success) {
        alert(res.data.message);
      }

      // Store token and userId in localStorage or sessionStorage based on rememberMe
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        console.log("Token and userId stored in localStorage");
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", JSON.stringify(res.data.userId));
        console.log("Token and userId stored in sessionStorage");
      }
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full sm:max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-2xl mt-20 sm:mt-24">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-600">
          Log in to Task Manager
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </span>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
