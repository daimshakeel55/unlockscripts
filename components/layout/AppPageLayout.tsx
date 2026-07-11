"use client";

import { motion, useReducedMotion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import PageBackground from "@/components/ui/PageBackground";

type AppPageLayoutProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
  headerAction?: React.ReactNode;
  contentClassName?: string;
};

export default function AppPageLayout({
  children,
  title,
  subtitle,
  headerAction,
  contentClassName = "",
}: AppPageLayoutProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="relative flex min-h-screen flex-col bg-[#0B0B0F] pb-20 text-white lg:flex-row lg:pb-0">
      <Sidebar />

      <section className="relative min-w-0 flex-1 overflow-y-auto">
        <PageBackground />

        <div
          className={`relative z-10 w-full p-4 sm:p-6 md:p-10 lg:p-12 ${contentClassName}`}
        >
          {(title || subtitle || headerAction) && (
            <motion.header
              initial={reducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col gap-6 sm:mb-10 md:flex-row md:items-start md:justify-between"
            >
              <div className="min-w-0">
                {title && (
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-2 max-w-xl text-gray-400">{subtitle}</p>
                )}
              </div>
              {headerAction && <div className="shrink-0">{headerAction}</div>}
            </motion.header>
          )}

          {children}
        </div>
      </section>
    </main>
  );
}
