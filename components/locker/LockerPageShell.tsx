"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaYoutube, FaDiscord, FaTelegram, FaGlobe, FaLock } from "react-icons/fa";

const floatingSocialIcons = [
  { Icon: FaYoutube, glow: "from-red-600/50 to-red-400/20", color: "text-red-500", x: "5%", y: "10%", size: 36 },
  { Icon: FaDiscord, glow: "from-indigo-600/50 to-indigo-400/20", color: "text-indigo-400", x: "90%", y: "15%", size: 38 },
  { Icon: FaTelegram, glow: "from-sky-600/50 to-sky-400/20", color: "text-sky-400", x: "85%", y: "70%", size: 34 },
  { Icon: FaYoutube, glow: "from-red-500/40 to-orange-400/20", color: "text-red-400", x: "12%", y: "75%", size: 30 },
  { Icon: FaGlobe, glow: "from-green-600/50 to-emerald-400/20", color: "text-green-400", x: "25%", y: "45%", size: 28 },
  { Icon: FaDiscord, glow: "from-violet-600/50 to-purple-400/20", color: "text-violet-400", x: "70%", y: "35%", size: 32 },
  { Icon: FaTelegram, glow: "from-cyan-600/50 to-cyan-400/20", color: "text-cyan-400", x: "55%", y: "85%", size: 28 },
  { Icon: FaYoutube, glow: "from-red-600/40 to-pink-400/20", color: "text-red-500", x: "75%", y: "55%", size: 26 },
  { Icon: FaDiscord, glow: "from-indigo-500/40 to-violet-400/20", color: "text-indigo-300", x: "40%", y: "8%", size: 24 },
  { Icon: FaTelegram, glow: "from-sky-500/40 to-blue-400/20", color: "text-sky-300", x: "8%", y: "35%", size: 26 },
  { Icon: FaGlobe, glow: "from-emerald-600/40 to-green-400/20", color: "text-emerald-400", x: "92%", y: "42%", size: 24 },
  { Icon: FaYoutube, glow: "from-red-500/35 to-red-300/15", color: "text-red-400", x: "48%", y: "22%", size: 22 },
];

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${(i * 13 + 5) % 100}%`,
  y: `${(i * 19 + 7) % 100}%`,
  size: 2 + (i % 4),
  duration: 8 + (i % 10),
  delay: (i % 8) * 0.3,
}));

function LockerBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(217,70,239,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(99,102,241,0.18),transparent_50%)]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={reducedMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={
          reducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-fuchsia-600/20 blur-[120px]"
        animate={reducedMotion ? undefined : { x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={
          reducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400/30"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={
            reducedMotion
              ? undefined
              : { y: [0, -24, 0], opacity: [0.2, 0.6, 0.2] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }
          }
        />
      ))}

      {floatingSocialIcons.map(({ Icon, glow, color, x, y, size }, i) => (
        <motion.div
          key={i}
          className="absolute z-[1]"
          style={{ left: x, top: y }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -22, 0],
                  x: [0, i % 2 === 0 ? 14 : -14, 0],
                  rotate: [0, i % 2 === 0 ? 6 : -6, 0],
                }
          }
          transition={{
            duration: 10 + (i % 5),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div
              className={`absolute -inset-4 rounded-full bg-gradient-to-br ${glow} blur-2xl`}
            />
            <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-md">
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
  const showDescription =
    description.trim().length > 0 &&
    description.trim().toLowerCase() !== title.trim().toLowerCase();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0B0F] text-white">
      <LockerBackground reducedMotion={reducedMotion} />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-10 sm:p-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
        >
          <div className="group relative">
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 opacity-50 blur-lg transition-opacity group-hover:opacity-70" />
            <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-violet-500/50 via-fuchsia-500/30 to-transparent" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0F]/80 shadow-2xl shadow-violet-950/50 backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

              <div className="border-b border-white/[0.06] px-6 py-8 text-center sm:px-8 sm:py-10">
                <motion.div
                  initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-xl shadow-violet-900/50"
                >
                  <FaLock className="text-2xl text-white" aria-hidden="true" />
                </motion.div>

                <h1 className="bg-gradient-to-r from-white via-violet-100 to-fuchsia-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {title}
                </h1>

                {showDescription && (
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-400 sm:text-base">
                    {description}
                  </p>
                )}

                <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              </div>

              <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            Secured by{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
              UnlockScripts
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
