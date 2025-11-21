"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-4xl font-bold text-gradient inline-block mb-4"
          >
            🪙 FunCoin
          </Link>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Login to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-xl space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-gold hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-gold text-black rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn size={20} />
                Login
              </>
            )}
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-gold hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
