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
