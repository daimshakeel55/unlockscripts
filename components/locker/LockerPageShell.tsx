"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaYoutube, FaDiscord, FaTelegram, FaGlobe } from "react-icons/fa";
import { FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";

const floatingSocialIcons = [
  { Icon: FaYoutube, glow: "bg-red-500/30", color: "text-red-500", x: "8%", y: "12%", size: 32, duration: 14, delay: 0 },
  { Icon: FaDiscord, glow: "bg-indigo-500/30", color: "text-indigo-400", x: "88%", y: "18%", size: 34, duration: 16, delay: 1 },
  { Icon: FaTelegram, glow: "bg-sky-500/30", color: "text-sky-400", x: "82%", y: "72%", size: 30, duration: 15, delay: 2 },
  { Icon: FaXTwitter, glow: "bg-white/20", color: "text-white/70", x: "10%", y: "78%", size: 28, duration: 17, delay: 0.5 },
  { Icon: FaTiktok, glow: "bg-fuchsia-500/30", color: "text-fuchsia-400", x: "50%", y: "8%", size: 26, duration: 13, delay: 1.5 },
  { Icon: FaInstagram, glow: "bg-pink-500/30", color: "text-pink-400", x: "92%", y: "48%", size: 28, duration: 18, delay: 2.5 },
  { Icon: FaGlobe, glow: "bg-green-500/30", color: "text-green-400", x: "28%", y: "55%", size: 24, duration: 19, delay: 3 },
  { Icon: FaYoutube, glow: "bg-red-500/20", color: "text-red-400/80", x: "68%", y: "85%", size: 22, duration: 14, delay: 1.2 },
  { Icon: FaDiscord, glow: "bg-violet-500/30", color: "text-violet-400", x: "18%", y: "38%", size: 26, duration: 16, delay: 0.8 },
  { Icon: FaTelegram, glow: "bg-cyan-500/30", color: "text-cyan-400", x: "72%", y: "32%", size: 24, duration: 15, delay: 2.2 },
];

function LockerBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(217,70,239,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_60%,rgba(99,102,241,0.1),transparent_50%)]" />

      <motion.div
        className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]"
        animate={reducedMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={
          reducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]"
        animate={reducedMotion ? undefined : { x: [0, -25, 0], y: [0, 15, 0] }}
        transition={
          reducedMotion ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {floatingSocialIcons.map(({ Icon, glow, color, x, y, size, duration, delay }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  x: [0, i % 2 === 0 ? 12 : -12, 0],
                  opacity: [0.4, 0.85, 0.4],
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration, repeat: Infinity, delay, ease: "easeInOut" }
          }
        >
          <div className="relative flex items-center justify-center">
            <div className={`absolute h-12 w-12 rounded-full blur-2xl ${glow}`} />
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3 backdrop-blur-sm">
              <Icon className={color} size={size} aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

type LockerPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function LockerPageShell({
  title,
  description,
  children,
}: LockerPageShellProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0F] p-4 text-white sm:p-6">
      <LockerBackground reducedMotion={reducedMotion} />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/40 via-fuchsia-500/20 to-transparent opacity-60" />

        <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8 md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/40">
              <span className="text-2xl font-bold">🔒</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && (
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-400 sm:text-base">
                {description}
              </p>
            )}
          </div>

          {children}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Powered by{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
            UnlockScripts
          </span>
        </p>
      </motion.div>
    </main>
  );
}
