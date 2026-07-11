"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FaYoutube, FaDiscord, FaTelegram } from "react-icons/fa";
import { FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";
import { FaLock, FaCheck } from "react-icons/fa";

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

const floatingSocialIcons = [
  { Icon: FaYoutube, color: "text-red-500/25", x: "6%", y: "14%", size: 26, duration: 14, delay: 0 },
  { Icon: FaDiscord, color: "text-indigo-400/25", x: "90%", y: "20%", size: 28, duration: 16, delay: 1 },
  { Icon: FaTelegram, color: "text-sky-400/25", x: "78%", y: "68%", size: 24, duration: 15, delay: 2 },
  { Icon: FaXTwitter, color: "text-white/20", x: "12%", y: "72%", size: 22, duration: 17, delay: 0.5 },
  { Icon: FaTiktok, color: "text-fuchsia-400/20", x: "48%", y: "10%", size: 20, duration: 13, delay: 1.5 },
  { Icon: FaInstagram, color: "text-pink-400/20", x: "88%", y: "48%", size: 22, duration: 18, delay: 2.5 },
  { Icon: FaYoutube, color: "text-red-500/15", x: "30%", y: "52%", size: 18, duration: 19, delay: 3 },
  { Icon: FaDiscord, color: "text-indigo-400/15", x: "62%", y: "82%", size: 20, duration: 14, delay: 1.2 },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 17 + 7) % 100}%`,
  y: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  duration: 10 + (i % 8),
  delay: (i % 6) * 0.4,
}));

function AuroraBackground({ reducedMotion }: { reducedMotion: boolean }) {
  const blobs = [
    { className: "bg-violet-600/20", x: [0, 50, 0], y: [0, -40, 0], duration: 14 },
    { className: "bg-fuchsia-600/15", x: [0, -60, 0], y: [0, 30, 0], duration: 16 },
    { className: "bg-indigo-600/15", x: [0, 30, 0], y: [0, 50, 0], duration: 18 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${blob.className}`}
          style={{
            width: i === 0 ? 600 : 500,
            height: i === 0 ? 600 : 500,
            top: i === 0 ? "-10%" : i === 1 ? "30%" : "50%",
            left: i === 0 ? "10%" : i === 1 ? "60%" : "20%",
          }}
          animate={
            reducedMotion
              ? undefined
              : { x: blob.x, y: blob.y, scale: [1, 1.08, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: blob.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/[0.04]"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -20, 0],
                  opacity: [0.03, 0.06, 0.03],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}

function FloatingSocialIcons({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {floatingSocialIcons.map(({ Icon, color, x, y, size, duration, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -16, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  opacity: [0.15, 0.3, 0.15],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration, repeat: Infinity, delay, ease: "easeInOut" }
          }
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
}

function LockerPreviewCard({ reducedMotion }: { reducedMotion: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useSpring(rotateXVal, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(rotateYVal, { stiffness: 120, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(normX * 12);
    mouseY.set(normY * 12);
    rotateYVal.set(normX * 4);
    rotateXVal.set(-normY * 4);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    rotateXVal.set(0);
    rotateYVal.set(0);
  }

  const tasks = [
    { label: "Subscribe to Channel", done: true },
    { label: "Join Discord Server", done: true },
    { label: "Follow on Instagram", done: false },
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: reducedMotion ? 0 : springX,
        y: reducedMotion ? 0 : springY,
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        perspective: 1000,
      }}
      className="relative mx-auto w-full max-w-sm lg:mx-0"
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-violet-950/30 backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20">
              <FaLock className="text-sm text-violet-300" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/40">UnlockScripts</p>
              <p className="text-sm font-semibold text-white">Premium Script Pack</p>
            </div>
          </div>
          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
            Active
          </span>
        </div>

        <div className="mb-4">
          <div className="mb-1.5 flex justify-between text-xs text-white/40">
            <span>Progress</span>
            <span>2 / 3</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
          </div>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.label}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
            >
              <span className="text-xs text-white/70">{task.label}</span>
              {task.done ? (
                <FaCheck className="text-xs text-green-400" aria-hidden="true" />
              ) : (
                <span className="rounded-md bg-violet-600/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Required
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80 py-3 text-center text-xs font-semibold text-white">
          Unlock Content
        </div>
      </motion.div>

      <div
        className="absolute -inset-4 -z-10 rounded-3xl bg-violet-600/10 blur-2xl"
        aria-hidden="true"
      />
    </motion.div>
  );
}

function PremiumButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={`group relative block w-full overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto ${
          isPrimary
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-900/40"
            : "border border-gray-700 bg-white/[0.03] text-white/80 backdrop-blur-sm"
        }`}
      >
        {isPrimary && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-violet-400/0 via-white/20 to-violet-400/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        <span
          className={`relative z-10 ${isPrimary ? "" : "transition-colors group-hover:text-white"}`}
        >
          {children}
        </span>
        {isPrimary && (
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Hero({ loggedIn }: HeroProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-6 pb-24 pt-12 sm:pt-16 lg:pb-32 lg:pt-20"
    >
      <AuroraBackground reducedMotion={reducedMotion} />
      <ParticleField reducedMotion={reducedMotion} />
      <FloatingSocialIcons reducedMotion={reducedMotion} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div initial="hidden" animate="visible">
          <motion.div custom={0} variants={fadeUp} className="mb-6 inline-flex">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-300 backdrop-blur-sm">
              The premium content locker platform
            </span>
          </motion.div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-48 w-72 rounded-full bg-violet-600/25 blur-[80px] sm:h-64 sm:w-96"
              aria-hidden="true"
            />
            <motion.h1
              id="hero-heading"
              custom={1}
              variants={fadeUp}
              className="relative text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Create powerful{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                content lockers
              </span>
            </motion.h1>
          </div>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            Share files securely, protect premium content, and track every unlock
            from one beautiful dashboard.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <PremiumButton href={loggedIn ? "/dashboard" : "/register"}>
              {loggedIn ? "Dashboard" : "Get Started"}
            </PremiumButton>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#features"
                className="group relative block w-full overflow-hidden rounded-xl border border-gray-700 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-auto"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-5 text-xs text-gray-500 sm:gap-8"
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
              <FaXTwitter className="text-white/50" aria-hidden="true" />X
            </span>
            <span className="flex items-center gap-2">
              <FaTiktok className="text-fuchsia-400/70" aria-hidden="true" />
              TikTok
            </span>
            <span className="flex items-center gap-2">
              <FaInstagram className="text-pink-400/70" aria-hidden="true" />
              Instagram
            </span>
          </motion.div>
        </motion.div>

        <LockerPreviewCard reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
