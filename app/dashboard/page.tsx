"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaCopy,
  FaEdit,
  FaTrash,
  FaLock,
  FaChartLine,
  FaBolt,
  FaPlus,
  FaLink,
} from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { getAbsoluteUrl } from "@/lib/site-url";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AppPageLayout from "@/components/layout/AppPageLayout";

type Locker = {
  id: string;
  title: string;
  description: string;
  destination_url: string;
  slug: string;
  created_at: string;
  views?: number;
};

function StatCard({
  label,
  value,
  icon: Icon,
  gradient,
  delay,
  reducedMotion,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="group relative"
    >
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${gradient} opacity-20 transition-opacity group-hover:opacity-35`}
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c12]/90 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{label}</p>
            <p className="mt-2 text-4xl font-extrabold tabular-nums tracking-tight text-white">
              {value}
            </p>
          </div>
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
          >
            <Icon className="text-lg text-white" aria-hidden="true" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityChart({
  data,
  reducedMotion,
}: {
  data: { label: string; count: number }[];
  reducedMotion: boolean;
}) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Locker Activity</h2>
          <p className="mt-1 text-sm text-gray-500">Created over the last 7 days</p>
        </div>
        <FaChartLine className="text-violet-400/60" aria-hidden="true" />
      </div>
      <div className="flex h-36 items-end justify-between gap-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              initial={reducedMotion ? false : { height: 0 }}
              animate={{ height: `${(item.count / max) * 100}%` }}
              transition={{ delay: 0.3 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[4px] rounded-t-lg bg-gradient-to-t from-violet-600 to-fuchsia-400"
              style={{ maxHeight: "100%" }}
            />
            <span className="text-[10px] text-gray-500 sm:text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EmptyState({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto max-w-lg text-center"
    >
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-violet-600/10 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-14 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/30">
          <FaLock className="text-2xl text-white" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">No lockers yet</h2>
        <p className="mt-3 text-gray-400">
          Create your first content locker and start sharing protected links with your audience.
        </p>
        <Link
          href="/create"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-all hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <FaPlus aria-hidden="true" />
          Create Your First Locker
        </Link>
      </div>
    </motion.div>
  );
}

function LockerCard({
  locker,
  index,
  reducedMotion,
  onCopy,
  onDelete,
}: {
  locker: Locker;
  index: number;
  reducedMotion: boolean;
  onCopy: (slug: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="group relative"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-colors group-hover:border-violet-500/20 group-hover:bg-white/[0.05]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{locker.title}</h2>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-sm text-gray-400 sm:text-base">{locker.description}</p>
            <div className="mt-4 flex items-center gap-2 break-all text-sm text-violet-400/90">
              <FaLink className="shrink-0 text-xs" aria-hidden="true" />
              {locker.destination_url}
            </div>
          </div>
          <Badge variant="info" className="shrink-0 self-start">
            {locker.slug}
          </Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onCopy(locker.slug)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-gray-200 transition-all hover:border-violet-500/30 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:text-sm"
          >
            <FaCopy aria-hidden="true" />
            Copy Link
          </button>
          <Link
            href={`/edit/${locker.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600/90 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:text-sm"
          >
            <FaEdit aria-hidden="true" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(locker.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-all hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:text-sm"
          >
            <FaTrash aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function DashboardPage() {
  const { success, error } = useToast();
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    loadLockers();
  }, []);

  async function loadLockers() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error: loadError } = await supabase
      .from("lockers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    const { data: analyticsData } = await supabase
      .from("analytics_events")
      .select("event_type")
      .eq("owner_id", user.id);

    if (!loadError && data) {
      setLockers(data);
    }

    setTotalViews(
      analyticsData?.filter((event) => event.event_type === "view").length || 0
    );

    setLoading(false);
  }

  async function deleteLocker(id: string) {
    if (!confirm("Delete this locker?")) return;

    const { error: deleteError } = await supabase.from("lockers").delete().eq("id", id);

    if (deleteError) {
      error("Could not delete locker", deleteError.message);
      return;
    }

    success("Locker deleted");
    loadLockers();
  }

  async function copyLink(slug: string) {
    const lockerUrl = getAbsoluteUrl(`/l/${slug}`);
    const copied = await copyToClipboard(lockerUrl);

    if (copied) {
      success("Link copied", "Locker link copied to clipboard.");
    } else {
      error("Copy failed", "Could not copy the link. Please try again.");
    }
  }

  const stats = useMemo(() => {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const createdThisWeek = lockers.filter(
      (l) => new Date(l.created_at).getTime() >= weekAgo
    ).length;
    return {
      total: lockers.length,
      active: lockers.length,
      createdThisWeek,
      totalViews,
    };
  }, [lockers, totalViews]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    return days.map((day) => {
      const label = day.toLocaleDateString("en-US", { weekday: "short" });
      const count = lockers.filter((locker) => {
        const created = new Date(locker.created_at);
        return (
          created.getFullYear() === day.getFullYear() &&
          created.getMonth() === day.getMonth() &&
          created.getDate() === day.getDate()
        );
      }).length;
      return { label, count };
    });
  }, [lockers]);

  return (
    <AppPageLayout
      title={
        <>
          My{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Lockers
          </span>
        </>
      }
      subtitle="Manage your active content lockers and track performance."
      headerAction={
        <Button href="/create" variant="primary" size="md">
          + New Locker
        </Button>
      }
    >
      {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
                />
              ))}
            </div>
          ) : lockers.length === 0 ? (
            <EmptyState reducedMotion={reducedMotion} />
          ) : (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Total Lockers"
                  value={stats.total}
                  icon={FaLock}
                  gradient="from-violet-500 to-purple-600"
                  delay={0}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Active Lockers"
                  value={stats.active}
                  icon={FaBolt}
                  gradient="from-fuchsia-500 to-pink-600"
                  delay={0.05}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Created This Week"
                  value={stats.createdThisWeek}
                  icon={FaChartLine}
                  gradient="from-indigo-500 to-violet-600"
                  delay={0.1}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Total Views"
                  value={stats.totalViews}
                  icon={FaChartLine}
                  gradient="from-violet-600 to-fuchsia-600"
                  delay={0.15}
                  reducedMotion={reducedMotion}
                />
              </div>

              <div className="mb-10">
                <ActivityChart data={chartData} reducedMotion={reducedMotion} />
              </div>

              <div className="space-y-5">
                {lockers.map((locker, index) => (
                  <LockerCard
                    key={locker.id}
                    locker={locker}
                    index={index}
                    reducedMotion={reducedMotion}
                    onCopy={copyLink}
                    onDelete={deleteLocker}
                  />
                ))}
              </div>
            </>
          )}
    </AppPageLayout>
  );
}
