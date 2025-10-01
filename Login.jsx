// Login.jsx
import { useState } from "react";

import { supabase } from "./supabaseClient";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
      return;
    } else {
      setMessage("✅ Logged in!");
      if (onLogin) onLogin(data.user); // pass user up to parent
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Log In
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <label name="email" className=" text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <label name="password" className=" text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Log In
        </button>
      </form>
      {message && <p className="mt-3 text-center text-sm">{message}</p>}
    </div>
  );
}
