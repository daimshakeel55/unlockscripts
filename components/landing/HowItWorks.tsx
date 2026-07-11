"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaPlusCircle,
  FaLink,
  FaShareAlt,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    step: "01",
    title: "Create Locker",
    description: "Set up your locker with a title, destination URL, and required tasks.",
    icon: FaPlusCircle,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    step: "02",
    title: "Add Content",
    description: "Link your destination URL and configure social unlock tasks.",
    icon: FaLink,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    step: "03",
    title: "Share Link",
    description: "Copy your unique locker link and share it anywhere online.",
    icon: FaShareAlt,
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    step: "04",
    title: "Track Unlocks",
    description: "Monitor views, unlocks, and conversions from your dashboard.",
    icon: FaChartLine,
    gradient: "from-violet-600 to-fuchsia-600",
  },
];

export default function HowItWorks() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(139,92,246,0.06),transparent_70%)]"
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
            How It{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Four simple steps to protect and share your content.
          </p>
        </motion.div>

        <div className="relative mt-16 lg:mt-20">
          <div
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.step}
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    reducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }
                  }
                  className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="relative mb-6">
                    <div
                      className={`absolute -inset-2 rounded-full bg-gradient-to-br ${item.gradient} opacity-30 blur-lg transition-opacity group-hover:opacity-60`}
                      aria-hidden="true"
                    />
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#0B0B0F] bg-gradient-to-br ${item.gradient} shadow-lg shadow-violet-950/40`}
                    >
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0B0B0F] text-[10px] font-bold text-violet-300 ring-1 ring-violet-500/40">
                        {item.step}
                      </span>
                      <Icon className="text-xl text-white" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="relative w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors group-hover:border-violet-500/20 group-hover:bg-white/[0.05]">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-violet-500/40 to-transparent lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
