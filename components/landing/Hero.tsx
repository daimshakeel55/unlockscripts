"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";

type HeroProps = {
  loggedIn: boolean;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero({ loggedIn }: HeroProps) {
  return (
    <section className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-16 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl"
      >
        <motion.div custom={0} variants={fadeUp} className="mb-6 inline-flex">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-300 backdrop-blur-sm">
            The premium content locker platform
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl"
        >
          Create powerful{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            content lockers
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
        >
          Share files securely, protect premium content, and track every unlock
          from one beautiful dashboard.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-semibold shadow-xl shadow-violet-900/40 transition-all hover:shadow-violet-800/50 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto"
            >
              <span className="relative z-10">Dashboard</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-semibold shadow-xl shadow-violet-900/40 transition-all hover:shadow-violet-800/50 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          )}

          <a
            href="#features"
            className="w-full rounded-xl border border-gray-700 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 sm:gap-10"
        >
          <span className="flex items-center gap-2">
            <FaYoutube className="text-red-400/70" aria-hidden="true" />
            YouTube
          </span>
          <span className="flex items-center gap-2">
            <FaDiscord className="text-indigo-400/70" aria-hidden="true" />
            Discord
          </span>
          <span className="flex items-center gap-2">
            <FaTelegram className="text-sky-400/70" aria-hidden="true" />
            Telegram
          </span>
          <span className="flex items-center gap-2">
            <FaGlobe className="text-emerald-400/70" aria-hidden="true" />
            Website
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
