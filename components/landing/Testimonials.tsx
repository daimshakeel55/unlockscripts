"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Content Creator",
    avatar: "AR",
    quote:
      "UnlockScripts transformed how I monetize my scripts. The analytics alone are worth it.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Jordan Kim",
    role: "Discord Community Owner",
    avatar: "JK",
    quote:
      "Setup took minutes. My community loves the smooth unlock flow. Conversion went up 40%.",
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    name: "Sam Chen",
    role: "YouTube Creator",
    avatar: "SC",
    quote:
      "Best content locker platform I've used. Clean dashboard, fast performance, zero hassle.",
    gradient: "from-indigo-500 to-violet-600",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(217,70,239,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Creators
            </span>
          </h2>
        </motion.div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="text-sm text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-gray-300 sm:text-xl">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonials[active].gradient} text-sm font-bold text-white`}
                >
                  {testimonials[active].avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[active].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View testimonial ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === active
                  ? "w-8 bg-violet-500"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
