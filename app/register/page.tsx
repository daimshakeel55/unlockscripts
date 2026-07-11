"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://unlockscripts.com/auth/callback",
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✅ Account created! Check your email to verify your account.");
      setFullName("");
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#18181F] p-8">
        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Join UnlockScripts today.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-700 bg-[#111118] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-700 bg-[#111118] px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border border-gray-700 bg-[#111118] px-4 py-3 outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-300">
              {message}
            </p>
          )}

        </form>
      </div>
    </main>
  );
}