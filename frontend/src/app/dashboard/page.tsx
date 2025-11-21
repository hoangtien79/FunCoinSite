"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Shield,
  MessageSquare,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ comments: 0, likes: 0 });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await api.get(`/comments/user/${user?.id}`);
      if (response.data.success) {
        const comments = response.data.data;
        const totalLikes = comments.reduce(
          (sum: number, comment: any) => sum + comment.likes.length,
          0
        );
        setStats({ comments: comments.length, likes: totalLikes });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">
            Welcome back, <span className="text-gradient">{user.username}</span>
            !
          </h1>

          {/* User Info Card */}
          <div className="glass p-8 rounded-xl mb-8">
            <div className="flex items-center gap-6 mb-6">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-gold"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield size={16} />
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-dark p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar size={20} />
                  <span className="text-sm">Member Since</span>
                </div>
                <p className="text-xl font-bold text-gold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-dark p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <MessageSquare size={20} />
                  <span className="text-sm">Comments</span>
                </div>
                <p className="text-xl font-bold text-gold">{stats.comments}</p>
              </div>

              <div className="bg-dark p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Heart size={20} />
                  <span className="text-sm">Likes Received</span>
                </div>
                <p className="text-xl font-bold text-gold">{stats.likes}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/#comments")}
                  className="w-full p-3 bg-dark hover:bg-dark-light rounded-lg text-left transition"
                >
                  💬 View Comments
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full p-3 bg-dark hover:bg-dark-light rounded-lg text-left transition"
                >
                  🏠 Go to Homepage
                </button>
                {user.role === "admin" && (
                  <button
                    onClick={() => router.push("/admin")}
                    className="w-full p-3 bg-gradient-gold text-black rounded-lg text-left transition font-semibold"
                  >
                    👑 Admin Panel
                  </button>
                )}
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-dark hover:bg-dark-light rounded-lg text-left transition">
                  ⚙️ Edit Profile
                </button>
                <button className="w-full p-3 bg-dark hover:bg-dark-light rounded-lg text-left transition">
                  🔒 Change Password
                </button>
                <button className="w-full p-3 bg-dark hover:bg-dark-light rounded-lg text-left transition">
                  🔔 Notification Settings
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
