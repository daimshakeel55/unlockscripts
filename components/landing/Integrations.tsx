"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaYoutube, FaDiscord, FaTelegram } from "react-icons/fa";
import { FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";

const integrations = [
  { name: "YouTube", Icon: FaYoutube, color: "text-red-400", glow: "group-hover:shadow-red-500/20" },
  { name: "Discord", Icon: FaDiscord, color: "text-indigo-400", glow: "group-hover:shadow-indigo-500/20" },
  { name: "Telegram", Icon: FaTelegram, color: "text-sky-400", glow: "group-hover:shadow-sky-500/20" },
  { name: "X", Icon: FaXTwitter, color: "text-white", glow: "group-hover:shadow-white/10" },
  { name: "TikTok", Icon: FaTiktok, color: "text-fuchsia-400", glow: "group-hover:shadow-fuchsia-500/20" },
  { name: "Instagram", Icon: FaInstagram, color: "text-pink-400", glow: "group-hover:shadow-pink-500/20" },
];

export default function Integrations() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Connect with every platform your audience uses.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {integrations.map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.div
                key={item.name}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={reducedMotion ? undefined : { y: -6, scale: 1.03 }}
                animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                className={`group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-shadow hover:border-violet-500/30 hover:shadow-lg ${item.glow}`}
              >
                <Icon className={`text-3xl ${item.color}`} aria-hidden="true" />
                <span className="text-sm font-medium text-gray-400 group-hover:text-white">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
