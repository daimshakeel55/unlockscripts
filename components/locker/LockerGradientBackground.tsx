"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  getLockerBackground,
  type LockerBackgroundTheme,
} from "@/lib/locker-backgrounds";

type Props = {
  theme?: LockerBackgroundTheme | string | null;
};

export default function LockerGradientBackground({ theme }: Props) {
  const reducedMotion = useReducedMotion() ?? false;
  const config = getLockerBackground(theme);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ backgroundColor: config.base }} />

      {config.blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            backgroundColor: blob.color,
            transform: "translate(-50%, -50%)",
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, i % 2 === 0 ? 40 : -40, 0],
                  y: [0, i === 1 ? -35 : 30, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 18 + i * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 2,
                }
          }
        />
      ))}

      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={
          reducedMotion ? undefined : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 24, repeat: Infinity, ease: "linear" }
        }
      />

      <div className="absolute inset-0 bg-[#0B0B0F]/40" />
    </div>
  );
}
