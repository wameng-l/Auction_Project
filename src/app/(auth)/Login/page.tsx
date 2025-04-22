"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // default to home

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "user" && password === "123456") {
      // Success: redirect to last page
      router.push(callbackUrl);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-200">
      <div className="w-full max-w-md bg-gray-800 backdrop-blur-md text-white rounded-xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
              required
            />
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            href={`/Register?callbackUrl=${callbackUrl}`}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
