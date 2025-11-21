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
