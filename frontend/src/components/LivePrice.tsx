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
