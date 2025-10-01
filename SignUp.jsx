// SignUp.jsx
import { useState } from "react";

import { supabase } from "./supabaseClient";


export default function SignUp({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doublePassword, setDoublePassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp(e) {
  e.preventDefault();

  // Check if passwords match
  if (password !== doublePassword) {
    setMessage("❌ Passwords do not match");
    return;
  }

  // Optionally: enforce a minimum length
  if (password.length < 6) {
    setMessage("⚠️ Password must be at least 6 characters long");
    return;
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    if (error.status === 429) {
      setMessage("⚠️ Too many signup attempts. Please wait a moment.");
    } else {
      setMessage(error.message);
    }
  } else {
    setMessage("✅ Check your email for confirmation!");
    if (onSignUp) onSignUp(data.user);
  }
}


  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label name="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label name="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label name="repeat password" className=" text-sm font-medium text-gray-700">
            Retype Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={doublePassword}
            onChange={(e) => setDoublePassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
