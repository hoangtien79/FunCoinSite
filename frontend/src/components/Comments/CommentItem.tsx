"use client";

import { useMemo, useState } from "react";
import { Edit, MessageCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Comment } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getSocket } from "@/lib/socket";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";

interface CommentItemProps {
  comment: Comment;
  depth: number;
  onReplyAdded: (comment: Comment) => void;
  onCommentUpdated: (comment: Comment) => void;
  onCommentDeleted: (commentId: string) => void;
  onLikeUpdated: (commentId: string, likes: number, likedBy?: string[]) => void;
}

export default function CommentItem({
  comment,
  depth,
  onReplyAdded,
  onCommentUpdated,
  onCommentDeleted,
  onLikeUpdated,
}: CommentItemProps) {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [submitting, setSubmitting] = useState(false);

  const isOwner = useMemo(
    () => user?.id === comment.author._id || user?.id === (comment as any).author?.id,
    [user?.id, comment.author._id]
  );

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to like comments");
      return;
    }

    try {
      const response = await api.post(`/comments/${comment._id}/like`);
      const likes = response.data.data.likes as number;
      const isLiked = response.data.data.isLiked as boolean;
      const updatedLikes = updateLikesArray(comment.likes, user?.id || "", isLiked);
      onLikeUpdated(comment._id, likes, updatedLikes);
      getSocket().emit("like-comment", { commentId: comment._id });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Unable to like comment";
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;

    try {
      await api.delete(`/comments/${comment._id}`);
      onCommentDeleted(comment._id);
      getSocket().emit("delete-comment", { commentId: comment._id });
      toast.success("Comment deleted");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Unable to delete comment";
      toast.error(message);
    }
  };

  const handleUpdate = async () => {
    if (!editContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setSubmitting(true);
    try {
      const response = await api.put(`/comments/${comment._id}`, {
        content: editContent,
      });
      if (response.data.success) {
        const updatedComment: Comment = {
          ...response.data.data,
          replies: comment.replies,
        };
        onCommentUpdated(updatedComment);
        getSocket().emit("update-comment", { commentId: comment._id });
        setIsEditing(false);
        toast.success("Comment updated");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Unable to update comment";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderReplies = () => {
    if (!comment.replies || comment.replies.length === 0) return null;
    return comment.replies.map((reply) => (
      <CommentItem
        key={reply._id}
        comment={reply}
        depth={depth + 1}
        onReplyAdded={onReplyAdded}
        onCommentUpdated={onCommentUpdated}
        onCommentDeleted={onCommentDeleted}
        onLikeUpdated={onLikeUpdated}
      />
    ));
  };

  const canManage = isOwner || isAdmin;
  const isLiked = user ? comment.likes.includes(user.id) : false;

  return (
    <div className={`glass p-4 rounded-xl ${depth > 0 ? "ml-6" : ""}`}>
      <div className="flex items-start gap-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.username}
          className="w-12 h-12 rounded-full border border-gold/50"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{comment.author.username}</p>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-dark p-3 rounded-lg border border-gold/20 focus:border-gold focus:outline-none text-sm"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={submitting}
                  className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-dark-light rounded-lg border border-gold/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-200 mt-2 whitespace-pre-wrap">{comment.content}</p>
          )}

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <LikeButton isLiked={isLiked} count={comment.likeCount ?? comment.likes.length} onToggle={handleLike} />
            <button
              onClick={() => setIsReplying((prev) => !prev)}
              className="flex items-center gap-2 hover:text-gold transition"
            >
              <MessageCircle size={16} /> Reply
            </button>
            {canManage && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 hover:text-gold transition"
              >
                <Edit size={16} /> Edit
              </button>
            )}
            {canManage && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 hover:text-red-500 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-4">
              <CommentForm
                parentId={comment._id}
                onSuccess={(newComment) => {
                  onReplyAdded(newComment);
                  setIsReplying(false);
                }}
                autoFocus
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-3 border-l border-gold/10 pl-4">
              {renderReplies()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function updateLikesArray(likes: string[], userId: string, isLiked: boolean) {
  const exists = likes.includes(userId);
  if (isLiked && !exists) return [...likes, userId];
  if (!isLiked && exists) return likes.filter((id) => id !== userId);
  return likes;
}
