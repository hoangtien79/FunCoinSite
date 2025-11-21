"use client";

import { Heart } from "lucide-react";

interface LikeButtonProps {
  isLiked: boolean;
  count: number;
  onToggle: () => void;
}

export default function LikeButton({ isLiked, count, onToggle }: LikeButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 text-sm transition ${
        isLiked ? "text-red-500" : "text-gray-400 hover:text-gold"
      }`}
    >
      <Heart
        size={18}
        className={`transition ${isLiked ? "fill-red-500" : ""}`}
      />
      <span>{count}</span>
    </button>
  );
}
