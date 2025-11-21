"use client";

import { motion } from "framer-motion";
import { Coins, TrendingUp, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-gradient">FunCoin</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The revolutionary cryptocurrency bringing fun and innovation to the
            blockchain world
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.a
              href="#about"
              className="px-8 py-4 bg-gradient-gold text-black rounded-lg font-bold text-lg hover:opacity-90 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
            <motion.a
              href="/signup"
              className="px-8 py-4 glass border-2 border-gold rounded-lg font-bold text-lg hover:bg-gold/10 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              {
                icon: Coins,
                title: "Decentralized",
                desc: "Fully decentralized network",
              },
              {
                icon: TrendingUp,
                title: "High Growth",
                desc: "Exponential potential",
              },
              {
                icon: Shield,
                title: "Secure",
                desc: "Military-grade security",
              },
              { icon: Zap, title: "Fast", desc: "Lightning-fast transactions" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <feature.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
