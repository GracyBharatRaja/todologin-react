import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome</h1>
        <p className="text-sm text-gray-500 mb-6">Choose where you want to go</p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Go to Login"
          >
            Go to Login
          </Link>

          <Link
            to="/todos"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Go to Todo List"
          >
            Go to Todo List
          </Link>
        </div>
      </div>
    </div>
  );
}