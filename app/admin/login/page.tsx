"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/portfolio");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Authentication failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF9F6] dark:bg-[#0B0B0B] flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] border border-[rgba(197,168,128,0.2)] p-8 rounded-[2rem] shadow-xl">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#C5A880] uppercase block mb-2">
            Trabowl Tattoo Haus
          </span>
          <h1 className="font-serif text-3xl text-neutral-950 dark:text-neutral-50">
            Studio Workspace
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-400 uppercase mb-2">
              Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-neutral-50 dark:bg-[#1C1C1E] border border-neutral-200 dark:border-neutral-800 rounded-2xl text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-[#A47E4B] hover:bg-[#8F6C3F] text-white font-bold tracking-wider uppercase text-xs rounded-2xl transition-all shadow-md"
          >
            Authenticate Access
          </button>
        </form>
      </div>
    </main>
  );
}
