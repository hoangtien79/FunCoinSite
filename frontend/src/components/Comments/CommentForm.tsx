"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Comment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getSocket } from "@/lib/socket";

interface CommentFormProps {
  parentId?: string;
  onSuccess: (comment: Comment) => void;
  autoFocus?: boolean;
}

export default function CommentForm({ parentId, onSuccess, autoFocus }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/comments", {
        content,
        parentComment: parentId || null,
      });

      if (response.data.success) {
        const comment: Comment = response.data.data;
        onSuccess(comment);
        getSocket().emit("new-comment", { commentId: comment._id });
        setContent("");
        toast.success("Comment posted!");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Unable to post comment. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="glass p-4 rounded-xl text-center text-gray-300">
        <p>
          Please <a href="/login" className="text-gold font-semibold">log in</a> to join the discussion.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-4 rounded-xl">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-dark p-3 rounded-lg border border-gold/20 focus:border-gold focus:outline-none text-sm"
        rows={parentId ? 3 : 4}
        placeholder={parentId ? "Write a reply..." : "Share your thoughts about FunCoin"}
        autoFocus={autoFocus}
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-gold text-black rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          <Send size={16} />
          {submitting ? "Posting..." : parentId ? "Reply" : "Comment"}
        </button>
      </div>
    </form>
  );
}
