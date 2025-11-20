import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FunCoin - The Future of Cryptocurrency",
  description:
    "Join the FunCoin revolution. A revolutionary cryptocurrency project bringing fun and innovation to the blockchain world.",
  keywords: "cryptocurrency, blockchain, FunCoin, crypto, token, investment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #FFD700",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
