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

      <div
        className="absolute inset-0"
        style={{ background: config.mesh }}
      />

      {config.blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            backgroundColor: blob.color,
            filter: `blur(${blob.blur ?? "130px"})`,
            transform: "translate(-50%, -50%)",
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, i % 2 === 0 ? 90 : -90, 0],
                  y: [0, i === 1 ? -70 : i === 2 ? 55 : -45, 0],
                  scale: [1, 1.22, 1],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 26 + i * 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 2,
                }
          }
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.04) 120deg, transparent 240deg)",
        }}
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 60, repeat: Infinity, ease: "linear" }
        }
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.22)_100%)]" />

      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}
