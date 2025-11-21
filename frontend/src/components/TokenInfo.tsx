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
