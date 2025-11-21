"use client";

import Link from "next/link";
import { Twitter, Github, Send, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              🪙 FunCoin
            </h3>
            <p className="text-gray-400 text-sm">
              Making cryptocurrency fun, accessible, and rewarding for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-gray-400 hover:text-gold transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#roadmap"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-gray-400 hover:text-gold transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Audit Report
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gold transition"
                >
                  Brand Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Community</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 glass rounded-lg hover:border-gold/50 transition"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-gold" />
              </a>
              <a
                href="#"
                className="p-3 glass rounded-lg hover:border-gold/50 transition"
                aria-label="Telegram"
              >
                <Send size={20} className="text-gold" />
              </a>
              <a
                href="#"
                className="p-3 glass rounded-lg hover:border-gold/50 transition"
                aria-label="Discord"
              >
                <MessageCircle size={20} className="text-gold" />
              </a>
              <a
                href="#"
                className="p-3 glass rounded-lg hover:border-gold/50 transition"
                aria-label="GitHub"
              >
                <Github size={20} className="text-gold" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 FunCoin. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-gold transition">
              Privacy Policy
            </Link>
            {" • "}
            <Link href="/terms" className="hover:text-gold transition">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
