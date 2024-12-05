/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Registration logic here (e.g., API call using Axios)
    try {
      const response: any = await axios.post(
        "https://devmeets-backend.vercel.app/api/users/signup",
        {
          email,
          username,
          password,
          firstName: username, // Adjust as needed
          lastName: "kamble", // You might want to get this from a user input
        }
      );

      router.push("/login");
      alert("Registration successful. Please log in.");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full sm:max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-2xl mt-20 sm:mt-24">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-indigo-600">
          Register in Task Manager
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
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Log in
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
