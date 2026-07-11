"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PageBackground() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(217,70,239,0.08),transparent_50%)]" />
      <motion.div
        className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]"
        animate={reducedMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
