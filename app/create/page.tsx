"use client";

import { motion, useReducedMotion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import PageBackground from "@/components/ui/PageBackground";
import CreateLockerForm from "@/components/CreateLockerForm";

export default function CreatePage() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="relative flex min-h-screen flex-col bg-[#0B0B0F] pb-20 text-white lg:flex-row lg:pb-0">
      <Sidebar />

      <section className="relative flex-1 overflow-y-auto">
        <PageBackground />

        <div className="relative z-10 p-4 sm:p-6 md:p-10 lg:p-12">
          <motion.header
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Create New{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Locker
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-400">
              Set up your locker, choose unlock tasks, and preview how it looks live.
            </p>
          </motion.header>

          <CreateLockerForm />
        </div>
      </section>
    </main>
  );
}
