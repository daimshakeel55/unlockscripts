"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type NavbarProps = {
  loggedIn: boolean;
};

export default function Navbar({ loggedIn }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6 sm:py-3.5"
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          Unlock
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Scripts
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a
            href="#"
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Home
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Pricing
          </a>
          <a
            href="#footer"
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-violet-900/30 transition-all hover:shadow-violet-800/40 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:px-5"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:px-5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-violet-900/30 transition-all hover:shadow-violet-800/40 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:px-5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
