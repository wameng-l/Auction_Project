"use client";

import Link from "next/link";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-lg p-10 min-h-[600px] flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </h1>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="your_username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-base font-semibold transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
