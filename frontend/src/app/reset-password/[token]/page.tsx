"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = params?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/auth/reset-password/${token}`, { password });
      toast.success("Password updated! You can now log in.");
      router.push("/login");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Unable to reset password";
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
        <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-400 mb-6">Enter a new password for your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-gold text-black rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
