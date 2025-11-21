"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import api from "@/lib/api";
import { getSocket, initSocket } from "@/lib/socket";
import { Comment } from "@/types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initSocket();
    fetchComments();
    setupSocketListeners();

    return () => {
      const socket = getSocket();
      socket.off("comment-added");
      socket.off("comment-updated");
      socket.off("comment-deleted");
      socket.off("comment-liked");
    };
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.get("/comments");
      if (response.data.success) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    const socket = getSocket();

    socket.on("comment-added", (newComment: Comment) => {
      setComments((prev) => addCommentToTree(prev, newComment));
    });

    socket.on("comment-updated", (updatedComment: Comment) => {
      setComments((prev) => updateCommentInTree(prev, updatedComment));
    });

    socket.on("comment-deleted", ({ commentId }: { commentId: string }) => {
      setComments((prev) => removeCommentFromTree(prev, commentId));
    });

    socket.on(
      "comment-liked",
      ({ commentId, likes }: { commentId: string; likes: number }) => {
        setComments((prev) =>
          updateCommentInTree(prev, (comment) =>
            comment._id === commentId
              ? { ...comment, likeCount: likes }
              : comment
          )
        );
      }
    );
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => addCommentToTree(prev, newComment));
  };

  const handleCommentUpdated = (updated: Comment) => {
    setComments((prev) => updateCommentInTree(prev, updated));
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments((prev) => removeCommentFromTree(prev, commentId));
  };

  const handleLikeUpdated = (
    commentId: string,
    likes: number,
    likedBy?: string[]
  ) => {
    setComments((prev) =>
      updateCommentInTree(prev, (comment) =>
        comment._id === commentId
          ? { ...comment, likeCount: likes, likes: likedBy ?? comment.likes }
          : comment
      )
    );
  };

  const renderedComments = useMemo(
    () =>
      comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          depth={0}
          onReplyAdded={handleCommentAdded}
          onCommentUpdated={handleCommentUpdated}
          onCommentDeleted={handleCommentDeleted}
          onLikeUpdated={handleLikeUpdated}
        />
      )),
    [comments]
  );

  return (
    <section id="comments" className="py-20 bg-dark border-t border-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-4">
            <MessageSquare className="text-gold" />
            <span className="font-semibold">Community</span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Join the <span className="text-gradient">Conversation</span>
          </h2>
          <p className="text-gray-400">
            Share your thoughts about FunCoin with the community.
          </p>
        </motion.div>

        <CommentForm onSuccess={handleCommentAdded} />

        <div className="mt-10 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-500">No comments yet. Be the first to share!</div>
          ) : (
            renderedComments
          )}
        </div>
      </div>
    </section>
  );
}

function updateCommentInTree(
  list: Comment[],
  updater: Comment | ((comment: Comment) => Comment)
): Comment[] {
  return list.map((comment) => {
    const next =
      typeof updater === "function"
        ? (updater as (comment: Comment) => Comment)(comment)
        : comment._id === (updater as Comment)._id
          ? (updater as Comment)
          : comment;

    const replies = comment.replies?.length
      ? updateCommentInTree(comment.replies, updater)
      : next.replies ?? comment.replies ?? [];

    return { ...next, replies } as Comment;
  });
}

function addCommentToTree(list: Comment[], newComment: Comment): Comment[] {
  if (!newComment.parentComment) {
    return [normalizeComment(newComment), ...list];
  }

  return list.map((comment) => {
    if (comment._id === newComment.parentComment) {
      const replies = [normalizeComment(newComment), ...(comment.replies || [])];
      return { ...comment, replies } as Comment;
    }

    return {
      ...comment,
      replies: comment.replies?.length
        ? addCommentToTree(comment.replies, newComment)
        : comment.replies,
    } as Comment;
  });
}

function removeCommentFromTree(list: Comment[], id: string): Comment[] {
  return list
    .filter((comment) => comment._id !== id)
    .map((comment) => ({
      ...comment,
      replies: comment.replies?.length
        ? removeCommentFromTree(comment.replies, id)
        : comment.replies,
    })) as Comment[];
}

function normalizeComment(comment: Comment): Comment {
  return {
    ...comment,
    likes: comment.likes || [],
    replies: comment.replies || [],
    likeCount: comment.likeCount ?? comment.likes.length,
  };
}
