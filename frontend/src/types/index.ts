export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  parentComment: string | null;
  likes: string[];
  replies: Comment[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  replyCount: number;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
