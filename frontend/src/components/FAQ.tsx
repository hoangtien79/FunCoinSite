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
