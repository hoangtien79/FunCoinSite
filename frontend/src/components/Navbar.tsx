"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut, User, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">🪙 FunCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="hover:text-gold transition">
              About
            </Link>
            <Link href="/#roadmap" className="hover:text-gold transition">
              Roadmap
            </Link>
            <Link href="/#team" className="hover:text-gold transition">
              Team
            </Link>
            <Link href="/#faq" className="hover:text-gold transition">
              FAQ
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-gold transition flex items-center gap-2"
                >
                  <User size={18} />
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hover:text-gold transition flex items-center gap-2"
                  >
                    <Shield size={18} />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-black rounded-lg font-semibold hover:opacity-90 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gold transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-light transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gold/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/#about"
              className="block py-2 hover:text-gold transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#roadmap"
              className="block py-2 hover:text-gold transition"
              onClick={() => setIsOpen(false)}
            >
              Roadmap
            </Link>
            <Link
              href="/#team"
              className="block py-2 hover:text-gold transition"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
            <Link
              href="/#faq"
              className="block py-2 hover:text-gold transition"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 hover:text-gold transition"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block py-2 hover:text-gold transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 hover:text-gold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 hover:text-gold transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 px-4 bg-gradient-gold text-black rounded-lg font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
