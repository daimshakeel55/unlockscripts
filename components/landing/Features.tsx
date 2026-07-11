"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaLock, FaChartLine, FaBolt } from "react-icons/fa";

const stats = [
  { value: "10K+", label: "Lockers created" },
  { value: "1M+", label: "Total unlocks" },
  { value: "99.9%", label: "Uptime" },
  { value: "50+", label: "Countries reached" },
];

const features = [
  {
    icon: FaLock,
    title: "Secure Lockers",
    description: "Lock files and links behind customizable actions.",
    gradient: "from-violet-500 to-purple-600",
    borderGradient: "from-violet-500/50 via-fuchsia-500/30 to-transparent",
  },
  {
    icon: FaChartLine,
    title: "Analytics",
    description: "Track views, unlocks and conversion rates.",
    gradient: "from-fuchsia-500 to-pink-600",
    borderGradient: "from-fuchsia-500/50 via-pink-500/30 to-transparent",
  },
  {
    icon: FaBolt,
    title: "Fast Performance",
    description: "Lightning fast loading powered by modern technology.",
    gradient: "from-indigo-500 to-violet-600",
    borderGradient: "from-indigo-500/50 via-violet-500/30 to-transparent",
  },
];

function AnimatedCounter({
  value,
  reducedMotion,
}: {
  value: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.span
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
    >
      {value}
    </motion.span>
  );
}

function FeatureCard({
  feature,
  index,
  reducedMotion,
}: {
  feature: (typeof features)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reducedMotion ? undefined : { y: -8, transition: { duration: 0.25 } }}
      className="group relative"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.borderGradient} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-300 group-hover:border-violet-500/20 group-hover:bg-white/[0.05]">
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg shadow-violet-950/30`}
        >
          <Icon className="text-xl text-white" aria-hidden="true" />
        </motion.div>

        <h3 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
          {feature.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function Features() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0B0B0F] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              UnlockScripts?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Everything you need to protect and monetize your content.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-6 text-center backdrop-blur-sm sm:px-6"
            >
              <AnimatedCounter value={stat.value} reducedMotion={reducedMotion} />
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8 lg:mt-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
