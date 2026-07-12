"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaChartLine, FaEye, FaLockOpen, FaUsers } from "react-icons/fa";

type FloatingStat = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

const leftStats: FloatingStat[] = [
  { label: "Total Views", value: "12.4K", icon: FaEye },
  { label: "Active Users", value: "3.2K", icon: FaUsers },
];

const rightStats: FloatingStat[] = [
  { label: "Unlock Rate", value: "68%", icon: FaLockOpen },
  { label: "Conversion", value: "+24%", icon: FaChartLine },
];

function StatChip({
  stat,
  index,
  reducedMotion,
}: {
  stat: FloatingStat;
  index: number;
  reducedMotion: boolean;
}) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
      className="w-full max-w-[10.5rem] rounded-xl border border-white/10 bg-[#12121a]/90 px-3.5 py-2.5 shadow-lg shadow-black/30 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
          <Icon className="text-sm text-violet-400" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] text-gray-500">{stat.label}</p>
          <p className="text-sm font-bold text-white">{stat.value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-violet-950/30 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <p className="text-sm text-gray-500">Analytics Overview</p>
          <p className="text-xl font-bold text-white">Dashboard Preview</p>
        </div>
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Views", value: "12,483" },
          { label: "Unlocks", value: "8,492" },
          { label: "Lockers", value: "24" },
          { label: "Rate", value: "68%" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-lg font-bold text-white sm:text-xl">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex h-32 items-end gap-2">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <motion.div
            key={i}
            initial={reducedMotion ? false : { height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-400"
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardPreview() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Track every view, unlock, and conversion from one beautiful control center.
          </p>
        </motion.div>

        <div className="mx-auto w-full max-w-4xl lg:max-w-6xl">
          <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[10.5rem_minmax(0,1fr)_10.5rem]">
            <div className="flex flex-col items-end justify-center gap-16 py-6">
              {leftStats.map((stat, index) => (
                <StatChip
                  key={stat.label}
                  stat={stat}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            <PreviewCard reducedMotion={reducedMotion} />

            <div className="flex flex-col items-start justify-center gap-16 py-6">
              {rightStats.map((stat, index) => (
                <StatChip
                  key={stat.label}
                  stat={stat}
                  index={index + 2}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <PreviewCard reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
