"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { User, AuthResponse } from "@/types";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await api.get("/auth/me");
        if (response.data.success) {
          setUser(response.data.data);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setUser(response.data.user);
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", {
        username,
        email,
        password,
      });
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setUser(response.data.user);
        toast.success("Registration successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      Cookies.remove("token");
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Cookies.remove("token");
      setUser(null);
      router.push("/");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
