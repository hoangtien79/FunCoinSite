# 🎯 FunCoin Complete Code Guide

This document contains ALL remaining code for authentication pages, comment system, and admin panel.

## 📁 File Structure Reference

```
frontend/src/
├── app/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── admin/page.tsx
│   └── reset-password/[token]/page.tsx
├── components/
│   ├── Comments/
│   │   ├── CommentList.tsx
│   │   ├── CommentItem.tsx
│   │   ├── CommentForm.tsx
│   │   └── LikeButton.tsx
│   └── Auth/
│       ├── LoginForm.tsx
│       ├── SignupForm.tsx
│       └── ProtectedRoute.tsx
```

---

## 🔐 Authentication Pages

### app/login/page.tsx

```typescript
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
```

### app/signup/page.tsx

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
    } catch (error) {
      console.error("Signup error:", error);
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
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-2">Join the FunCoin community</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass p-8 rounded-xl space-y-6"
        >
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="johndoe"
                required
                minLength={3}
              />
            </div>
          </div>

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
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark border border-gold/20 rounded-lg focus:border-gold focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-gold text-black rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus size={20} />
                Sign Up
              </>
            )}
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gold hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
```

### app/dashboard/page.tsx

```typescript
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
```

### app/admin/page.tsx

```typescript
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Trash2, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"stats" | "users" | "comments">(
    "stats"
  );

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
      toast.error("Access denied. Admin only.");
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
      fetchUsers();
      fetchComments();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get("/admin/comments");
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers();
      fetchStats();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to permanently delete this comment?"))
      return;

    try {
      await api.delete(`/admin/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchComments();
      fetchStats();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading || !isAdmin) {
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
            <span className="text-gradient">Admin Panel</span>
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "stats" ? "bg-gradient-gold text-black" : "glass"
              }`}
            >
              <BarChart3 className="inline mr-2" size={20} />
              Statistics
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "users" ? "bg-gradient-gold text-black" : "glass"
              }`}
            >
              <Users className="inline mr-2" size={20} />
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "comments"
                  ? "bg-gradient-gold text-black"
                  : "glass"
              }`}
            >
              <MessageSquare className="inline mr-2" size={20} />
              Comments ({comments.length})
            </button>
          </div>

          {/* Stats Tab */}
          {activeTab === "stats" && stats && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Total Users</h3>
                <p className="text-4xl font-bold text-gold">
                  {stats.totalUsers}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  +{stats.recentUsers} this week
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Total Comments</h3>
                <p className="text-4xl font-bold text-gold">
                  {stats.totalComments}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  +{stats.recentComments} this week
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-gray-400 mb-2">Deleted Comments</h3>
                <p className="text-4xl font-bold text-red-500">
                  {stats.deletedComments}
                </p>
                <p className="text-sm text-gray-400 mt-2">Moderation actions</p>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="glass p-6 rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold/20">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-gold/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.username}
                              className="w-10 h-10 rounded-full"
                            />
                            <span>{u.username}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{u.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              u.role === "admin"
                                ? "bg-gold/20 text-gold"
                                : "bg-gray-700"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {u._id !== user?.id && (
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-2 hover:bg-red-500/20 rounded transition"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="glass p-6 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">
                            {comment.author.username}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`${
                          comment.isDeleted ? "text-gray-500 italic" : ""
                        }`}
                      >
                        {comment.isDeleted ? "[Deleted]" : comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span>❤️ {comment.likes.length} likes</span>
                        <span>💬 {comment.replies.length} replies</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="p-2 hover:bg-red-500/20 rounded transition"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
```

---

## 💬 Comment System Components

### components/Comments/CommentList.tsx

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { getSocket } from '@/lib/socket';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { Comment } from '@/types';
import { MessageSquare } from 'lucide-react';

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
    setupSocketListeners();

    return () => {
      const socket = getSocket();
      socket.off('comment-added');
      socket.off('comment-updated');
      socket.off('comment-deleted');
      socket.off('comment-liked');
    };
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get('/comments');
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    const socket = getSocket();

    socket.on('comment-added', (newComment: Comment) => {
      setComments((prev) => [newComment, ...prev]);
    });

    socket.on('comment-updated', (updatedComment: Comment) => {
      setComments((prev) =>
        prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
      );
    });

    socket.on('comment-deleted', ({ commentId }: { commentId: string }) => {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    });

    socket.on('comment-liked', ({ commentId, likes }: { commentId: string; likes: number }) => {
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, likeCount: likes } : c))
      );
    });
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    const socket = getSocket();
    socket.emit('new-comment', { commentId: newComment._id });
```
