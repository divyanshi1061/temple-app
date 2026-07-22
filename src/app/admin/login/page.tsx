"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getApiBase, setAuthToken, getAuthToken } from "@/lib/adminApi";
import { FaLock, FaUser, } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to admin home
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      setAuthToken(data.token);
      toast.success("Welcome, Acharya Ji! Access Granted.");
      router.push("/admin");
    } catch (err: any) {
      toast.error(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="relative flex items-center justify-center min-h-screen bg-[#FAF8F5] overflow-hidden"
    >
      {/* Subtle spiritual background watermark */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md p-8 m-4 bg-white/90 backdrop-blur-md rounded-3xl border border-gold/15 shadow-xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white mb-4 shadow-md animate-pulse">
            <span className="font-bold text-2xl font-cinzel text-slate-900">ॐ</span>
          </div>
          <h1 className="text-2xl font-bold tracking-wider font-cinzel text-gray-900 uppercase">
            Acharya Panel Login
          </h1>
          <p className="text-xs text-amber-700 font-bold uppercase tracking-wider mt-2">
            Maa Baglamukhi Temple Nalkheda Dham
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-600/70">
                <FaUser size={14} />
              </span>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wider block mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-amber-600/70">
                <FaLock size={14} />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-amber-500 focus:ring-0 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-gold to-yellow-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-gold/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
