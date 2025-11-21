"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("If that account exists, a reset link has been sent.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Unable to send reset email. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-dark">
      <div className="max-w-md w-full glass p-8 rounded-xl">
        <Link href="/login" className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <ArrowLeft size={16} /> Back to login
        </Link>
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
        <p className="text-gray-400 mb-6">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-gold text-black rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
