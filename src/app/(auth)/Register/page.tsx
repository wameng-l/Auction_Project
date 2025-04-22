"use client";

import Link from "next/link";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-200">
      <div className="w-full max-w-md bg-gray-800 backdrop-blur-md text-white rounded-xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Register
        </h1>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="your_username"
              className="px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
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
              className="px-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
