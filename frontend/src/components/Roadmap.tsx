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
