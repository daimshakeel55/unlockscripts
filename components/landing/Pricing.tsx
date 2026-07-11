"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started.",
    features: ["3 Lockers", "Basic Analytics", "Standard Support"],
    highlighted: false,
    cta: "Get Started",
    href: "/register",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For serious creators scaling up.",
    features: [
      "Unlimited Lockers",
      "Advanced Analytics",
      "Priority Support",
      "Custom Branding",
      "API Access",
    ],
    highlighted: true,
    cta: "Coming Soon",
    href: "#",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and large communities.",
    features: [
      "Everything in Pro",
      "Dedicated Support",
      "SLA Guarantee",
      "Custom Integrations",
    ],
    highlighted: false,
    cta: "Contact Us",
    href: "#footer",
  },
];

export default function Pricing() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section id="pricing" className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.1),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Start free. Upgrade when you&apos;re ready to scale.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={reducedMotion ? undefined : { y: -6 }}
              className={`relative ${plan.highlighted ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 opacity-80" />
              )}
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-xl ${
                  plan.highlighted
                    ? "border-transparent bg-[#12121a]"
                    : "border-white/[0.06] bg-white/[0.03]"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <FaCheck className="shrink-0 text-violet-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30 hover:brightness-110"
                      : "border border-white/10 bg-white/[0.03] text-white/80 hover:border-violet-500/30 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
