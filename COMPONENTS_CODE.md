# 🎨 FunCoin Frontend Components Code

This document contains all the remaining frontend component code. Create these files in your `frontend/src/components/` directory.

## Hero.tsx

```typescript
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
```

## TokenInfo.tsx

```typescript
"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function TokenInfo() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">FunCoin</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FunCoin is more than just a cryptocurrency—it's a movement towards
            making blockchain technology accessible, enjoyable, and rewarding
            for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass p-8 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gold">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              We envision a world where cryptocurrency is fun, accessible, and
              beneficial for all. FunCoin combines cutting-edge blockchain
              technology with a community-first approach, creating a token
              that's both valuable and enjoyable to hold.
            </p>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gold">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To build a sustainable, community-driven cryptocurrency ecosystem
              that rewards holders, encourages participation, and brings
              innovation to the DeFi space. We're committed to transparency,
              security, and continuous development.
            </p>
          </motion.div>
        </div>

        {/* Contract Address */}
        <motion.div
          className="glass p-8 rounded-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">
            Contract Address
          </h3>
          <div className="flex items-center justify-between bg-dark p-4 rounded-lg">
            <code className="text-gold text-sm md:text-base break-all">
              {contractAddress}
            </code>
            <button
              onClick={copyToClipboard}
              className="ml-4 p-2 hover:bg-dark-light rounded-lg transition"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="text-green-500" />
              ) : (
                <Copy className="text-gold" />
              )}
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Always verify the contract address before making any transactions
          </p>
        </motion.div>

        {/* Tokenomics */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Total Supply", value: "1,000,000,000", suffix: "FUNC" },
            {
              label: "Circulating Supply",
              value: "750,000,000",
              suffix: "FUNC",
            },
            { label: "Market Cap", value: "$50M", suffix: "USD" },
          ].map((stat, index) => (
            <div key={index} className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-gold text-sm mt-1">{stat.suffix}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

## LivePrice.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function LivePrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Using Bitcoin as demo - replace with your token when listed
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();
        setPrice(data.bitcoin.usd);
        setChange24h(data.bitcoin.usd_24h_change);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching price:", error);
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-dark-lighter py-4 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">Loading price data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-dark-lighter py-4 border-y border-gold/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">FunCoin Price:</span>
          <span className="text-2xl font-bold text-gold">
            ${price?.toLocaleString() || "---"}
          </span>
        </div>

        {change24h !== null && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400">24h Change:</span>
            <span
              className={`flex items-center gap-1 font-bold ${
                change24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change24h >= 0 ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )}
              {Math.abs(change24h).toFixed(2)}%
            </span>
          </div>
        )}

        <p className="text-xs text-gray-500">*Demo data from CoinGecko API</p>
      </div>
    </motion.div>
  );
}
```

## Roadmap.tsx

```typescript
"use client";

import { motion } from "framer-motion";
import { Check, Clock, Rocket } from "lucide-react";

const roadmapData = [
  {
    quarter: "Q1 2024",
    title: "Foundation",
    items: [
      "Smart contract development",
      "Security audit",
      "Website launch",
      "Community building",
    ],
    status: "completed",
  },
  {
    quarter: "Q2 2024",
    title: "Launch",
    items: [
      "Token presale",
      "DEX listing",
      "Marketing campaign",
      "Partnership announcements",
    ],
    status: "in-progress",
  },
  {
    quarter: "Q3 2024",
    title: "Growth",
    items: [
      "CEX listings",
      "Mobile app development",
      "Staking platform",
      "NFT marketplace",
    ],
    status: "upcoming",
  },
  {
    quarter: "Q4 2024",
    title: "Expansion",
    items: [
      "Global partnerships",
      "DeFi integrations",
      "Governance launch",
      "Ecosystem expansion",
    ],
    status: "upcoming",
  },
];

export default function Roadmap() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="text-green-500" />;
      case "in-progress":
        return <Clock className="text-gold" />;
      default:
        return <Rocket className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500";
      case "in-progress":
        return "border-gold";
      default:
        return "border-gray-600";
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-300">
            Our journey to revolutionize cryptocurrency
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-gold hidden md:block" />

          <div className="space-y-12">
            {roadmapData.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1" />

                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-dark border-4 ${getStatusColor(phase.status)}">
                  {getStatusIcon(phase.status)}
                </div>

                <div className="flex-1">
                  <div
                    className={`glass p-6 rounded-xl border-2 ${getStatusColor(
                      phase.status
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gold">
                        {phase.quarter}
                      </h3>
                      <span className="text-sm px-3 py-1 rounded-full bg-gold/20 text-gold capitalize">
                        {phase.status.replace("-", " ")}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold mb-4">
                      {phase.title}
                    </h4>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-gold mt-1">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Team.tsx

```typescript
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    avatar:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    bio: "Blockchain expert with 10+ years in fintech",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Jane Smith",
    role: "CTO",
    avatar:
      "https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y",
    bio: "Former Google engineer, smart contract specialist",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Mike Johnson",
    role: "Head of Marketing",
    avatar:
      "https://www.gravatar.com/avatar/22222222222222222222222222222222?d=mp&f=y",
    bio: "Growth hacker with successful crypto launches",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Williams",
    role: "Lead Developer",
    avatar:
      "https://www.gravatar.com/avatar/33333333333333333333333333333333?d=mp&f=y",
    bio: "Full-stack developer, DeFi protocol architect",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-gray-300">
            The brilliant minds behind FunCoin
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl text-center hover:border-gold/50 transition"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-gold mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <a
                  href={member.social.linkedin}
                  className="p-2 hover:bg-dark-light rounded-lg transition"
                >
                  <Linkedin size={20} className="text-gold" />
                </a>
                <a
                  href={member.social.twitter}
                  className="p-2 hover:bg-dark-light rounded-lg transition"
                >
                  <Twitter size={20} className="text-gold" />
                </a>
                <a
                  href={member.social.github}
                  className="p-2 hover:bg-dark-light rounded-lg transition"
                >
                  <Github size={20} className="text-gold" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## FAQ.tsx

```typescript
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is FunCoin?",
    answer:
      "FunCoin is a revolutionary cryptocurrency designed to make blockchain technology accessible and enjoyable for everyone. Built on secure smart contracts, FunCoin combines innovation with community-driven development.",
  },
  {
    question: "How can I buy FunCoin?",
    answer:
      "You can purchase FunCoin on major decentralized exchanges (DEX) like Uniswap or PancakeSwap. Simply connect your wallet, enter the contract address, and swap your preferred cryptocurrency for FunCoin.",
  },
  {
    question: "Is FunCoin safe?",
    answer:
      "Yes! FunCoin has undergone comprehensive security audits by leading blockchain security firms. Our smart contracts are open-source and have been thoroughly tested to ensure the safety of your investments.",
  },
  {
    question: "What makes FunCoin different?",
    answer:
      "FunCoin stands out with its community-first approach, transparent development, regular holder rewards, and commitment to continuous innovation. We focus on creating real value and utility for our token holders.",
  },
  {
    question: "How do I store FunCoin?",
    answer:
      "FunCoin can be stored in any ERC-20 compatible wallet such as MetaMask, Trust Wallet, or hardware wallets like Ledger. Always ensure you keep your private keys secure and never share them with anyone.",
  },
  {
    question: "What are the tokenomics?",
    answer:
      "FunCoin has a total supply of 1 billion tokens. 75% is in circulation, 15% is reserved for development and marketing, and 10% is locked for liquidity. We have a deflationary mechanism with a 2% burn on transactions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about FunCoin
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-dark-light/50 transition"
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`flex-shrink-0 text-gold transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Footer.tsx

```typescript
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
```

---

## 📝 Next Steps

1. Create each component file in `frontend/src/components/`
2. Install dependencies: `cd frontend && npm install`
3. Create the comment system components (see next section)
4. Create authentication pages (login, signup, dashboard)
5. Create admin panel pages
6. Test the application

The comment system and authentication pages are more complex and will be provided in separate
