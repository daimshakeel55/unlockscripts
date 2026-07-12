"use client";

import { motion, useReducedMotion } from "framer-motion";
import LockerGradientBackground from "@/components/locker/LockerGradientBackground";
import LockerBannerAd from "@/components/locker/LockerBannerAd";
import type { LockerBackgroundTheme } from "@/lib/locker-backgrounds";

type LockerPageShellProps = {
  title: string;
  description: string;
  backgroundTheme?: LockerBackgroundTheme | string | null;
  children: React.ReactNode;
};

export default function LockerPageShell({
  title,
  description,
  backgroundTheme,
  children,
}: LockerPageShellProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const showDescription =
    description.trim().length > 0 &&
    description.trim().toLowerCase() !== title.trim().toLowerCase();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0B0F] text-white">
      <LockerGradientBackground theme={backgroundTheme} />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-10 sm:p-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-[728px] flex-col items-center"
        >
          <div className="group relative w-full max-w-lg">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent" />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B0B0F]/75 shadow-xl shadow-black/40 backdrop-blur-xl">
              <div className="px-6 pt-7 pb-1 sm:px-8 sm:pt-8">
                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {title}
                </h1>
                {showDescription && (
                  <p className="mt-1.5 text-sm text-gray-500">{description}</p>
                )}
              </div>

              <div className="px-6 pb-7 pt-4 sm:px-8 sm:pb-8">{children}</div>
            </div>
          </div>

          <LockerBannerAd />

          <p className="mt-4 w-full max-w-lg text-center text-[11px] text-gray-600">
            UnlockScripts
          </p>
        </motion.div>
      </div>
    </main>
  );
}
