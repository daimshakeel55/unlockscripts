"use client";

import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaChartLine,
  FaEye,
  FaLock,
  FaUnlock,
  FaGlobeAmericas,
  FaDesktop,
  FaMobileAlt,
  FaTrophy,
} from "react-icons/fa";
import AppPageLayout from "@/components/layout/AppPageLayout";
import { supabase } from "@/lib/supabase";
import { getCountryFlag } from "@/lib/country-utils";

type Locker = {
  id: string;
  title: string;
  views: number;
};

type AnalyticsEvent = {
  id: string;
  locker_id: string;
  country: string | null;
  browser: string | null;
  device: string | null;
  event_type: string;
  created_at: string;
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
  icon: ComponentType<{ className?: string }>;
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

function TrafficChart({
  data,
  reducedMotion,
}: {
  data: { label: string; views: number; unlocks: number }[];
  reducedMotion: boolean;
}) {
  const max = Math.max(...data.flatMap((d) => [d.views, d.unlocks]), 1);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
          <p className="mt-1 text-sm text-gray-500">Views and unlocks over the last 7 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
            Views
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
            Unlocks
          </span>
        </div>
      </div>

      <div className="flex h-44 items-end justify-between gap-1 sm:gap-2">
        {data.map((item, index) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-full w-full items-end justify-center gap-0.5 sm:gap-1">
              <motion.div
                initial={reducedMotion ? false : { height: 0 }}
                animate={{ height: `${(item.views / max) * 100}%` }}
                transition={{ delay: 0.25 + index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-2 min-h-[4px] rounded-t-md bg-gradient-to-t from-violet-600 to-violet-400 sm:w-3"
                style={{ maxHeight: "100%" }}
                title={`${item.views} views`}
              />
              <motion.div
                initial={reducedMotion ? false : { height: 0 }}
                animate={{ height: `${(item.unlocks / max) * 100}%` }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-2 min-h-[4px] rounded-t-md bg-gradient-to-t from-fuchsia-600 to-fuchsia-400 sm:w-3"
                style={{ maxHeight: "100%" }}
                title={`${item.unlocks} unlocks`}
              />
            </div>
            <span className="text-[10px] text-gray-500 sm:text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CountryList({
  countries,
  total,
  reducedMotion,
}: {
  countries: { name: string; count: number }[];
  total: number;
  reducedMotion: boolean;
}) {
  const max = countries[0]?.count ?? 1;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Top Countries</h2>
          <p className="mt-1 text-sm text-gray-500">Where your visitors come from</p>
        </div>
        <FaGlobeAmericas className="text-violet-400/60" aria-hidden="true" />
      </div>

      {countries.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No country data yet.</p>
      ) : (
        <div className="space-y-4">
          {countries.map((item, index) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-xl leading-none" aria-hidden="true">
                      {getCountryFlag(item.name)}
                    </span>
                    <span className="truncate font-medium text-white">{item.name}</span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-semibold text-violet-300">{item.count}</span>
                    <span className="ml-2 text-xs text-gray-500">{pct}%</span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                  <motion.div
                    initial={reducedMotion ? false : { width: 0 }}
                    animate={{ width: `${(item.count / max) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function BreakdownChart({
  title,
  subtitle,
  items,
  icon: Icon,
  reducedMotion,
  delay = 0.25,
}: {
  title: string;
  subtitle: string;
  items: { label: string; count: number; icon?: ReactNode; color: string }[];
  icon: ComponentType<{ className?: string }>;
  reducedMotion: boolean;
  delay?: number;
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const max = items[0]?.count ?? 1;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <Icon className="text-violet-400/60" aria-hidden="true" />
      </div>

      {items.length === 0 || total === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No data yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => {
            const pct = Math.round((item.count / total) * 100);
            return (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {item.icon && <span className="text-base text-gray-300">{item.icon}</span>}
                    <span className="font-medium text-white">{item.label}</span>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-semibold text-violet-300">{item.count}</span>
                    <span className="ml-2 text-xs text-gray-500">{pct}%</span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                  <motion.div
                    initial={reducedMotion ? false : { width: 0 }}
                    animate={{ width: `${(item.count / max) * 100}%` }}
                    transition={{ delay: 0.35 + index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function TopLockers({
  lockers,
  reducedMotion,
}: {
  lockers: Locker[];
  reducedMotion: boolean;
}) {
  const sorted = [...lockers].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
  const max = sorted[0]?.views || 1;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Top Lockers</h2>
          <p className="mt-1 text-sm text-gray-500">Best performing content lockers</p>
        </div>
        <FaTrophy className="text-amber-400/70" aria-hidden="true" />
      </div>

      {sorted.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No lockers yet.</p>
      ) : (
        <div className="space-y-4">
          {sorted.map((locker, index) => (
            <div key={locker.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-300">
                    {index + 1}
                  </span>
                  <span className="truncate font-medium text-white">{locker.title}</span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-violet-300">
                  {locker.views || 0} views
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
                <motion.div
                  initial={reducedMotion ? false : { width: 0 }}
                  animate={{ width: `${((locker.views || 0) / max) * 100}%` }}
                  transition={{ delay: 0.4 + index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ConversionRing({
  rate,
  views,
  unlocks,
  reducedMotion,
}: {
  rate: number;
  views: number;
  unlocks: number;
  reducedMotion: boolean;
}) {
  const safeRate = Number.isFinite(rate) ? Math.min(100, Math.max(0, rate)) : 0;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Conversion</h2>
        <p className="mt-1 text-sm text-gray-500">Views that became unlocks</p>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, #7c3aed ${safeRate}%, rgba(255,255,255,0.06) ${safeRate}%)`,
            }}
          />
          <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#0B0B0F]">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
              {safeRate}%
            </span>
            <span className="text-xs text-gray-500">rate</span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <FaEye className="text-violet-400" />
            <div>
              <p className="text-gray-500">Total Views</p>
              <p className="font-semibold text-white">{views.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <FaUnlock className="text-fuchsia-400" />
            <div>
              <p className="text-gray-500">Total Unlocks</p>
              <p className="font-semibold text-white">{unlocks.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function parseBrowser(userAgent: string | null): string {
  if (!userAgent) return "Other";
  if (userAgent.includes("Edg/")) return "Edge";
  if (userAgent.includes("Firefox/")) return "Firefox";
  if (userAgent.includes("Chrome/")) return "Chrome";
  if (userAgent.includes("Safari/")) return "Safari";
  return "Other";
}

function browserIcon(name: string) {
  const colors: Record<string, string> = {
    Chrome: "bg-yellow-400",
    Firefox: "bg-orange-400",
    Safari: "bg-sky-400",
    Edge: "bg-blue-400",
    Other: "bg-gray-400",
  };

  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${colors[name] ?? colors.Other}`}
      aria-hidden="true"
    />
  );
}

function countByKey<T>(
  items: T[],
  getKey: (item: T) => string
): { label: string; count: number }[] {
  const map: Record<string, number> = {};
  items.forEach((item) => {
    const key = getKey(item);
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalViews, setTotalViews] = useState(0);
  const [totalLockers, setTotalLockers] = useState(0);
  const [totalUnlocks, setTotalUnlocks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/analytics/summary");
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to load analytics");
      }

      const lockerData = payload.lockers as Locker[];
      const analyticsData = payload.events as AnalyticsEvent[];

      const viewCounts = new Map<string, number>();
      analyticsData?.forEach((event) => {
        if (event.event_type !== "view") return;
        viewCounts.set(
          event.locker_id,
          (viewCounts.get(event.locker_id) || 0) + 1
        );
      });

      const lockersWithViews =
        lockerData?.map((locker) => ({
          ...locker,
          views: viewCounts.get(locker.id) || 0,
        })) || [];

      const views = analyticsData?.filter((e) => e.event_type === "view").length || 0;
      const unlocks =
        analyticsData?.filter((e) => e.event_type === "unlock").length || 0;

      setLockers(lockersWithViews);
      setEvents(analyticsData || []);
      setTotalViews(views);
      setTotalLockers(lockerData?.length || 0);
      setTotalUnlocks(unlocks);
      setConversionRate(views > 0 ? Math.round((unlocks / views) * 100) : 0);
    } catch (err) {
      console.error("Analytics load failed:", err);
      const message = err instanceof Error ? err.message : "Failed to load analytics";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const trafficData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    return days.map((day) => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayEvents = events.filter((e) => {
        const created = new Date(e.created_at);
        return created >= day && created < nextDay;
      });

      return {
        label: day.toLocaleDateString("en-US", { weekday: "short" }),
        views: dayEvents.filter((e) => e.event_type === "view").length,
        unlocks: dayEvents.filter((e) => e.event_type === "unlock").length,
      };
    });
  }, [events]);

  const topCountries = useMemo(() => {
    const map: Record<string, number> = {};
    events
      .filter((e) => e.event_type === "view")
      .forEach((e) => {
      const country = e.country || "Unknown";
      map[country] = (map[country] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [events]);

  const countryTotal = useMemo(
    () => topCountries.reduce((sum, c) => sum + c.count, 0),
    [topCountries]
  );

  const browserItems = useMemo(() => {
    return countByKey(
      events.filter((e) => e.event_type === "view"),
      (e) => parseBrowser(e.browser)
    ).map((item) => ({
      ...item,
      icon: browserIcon(item.label),
      color: "bg-gradient-to-r from-violet-600 to-indigo-500",
    }));
  }, [events]);

  const deviceItems = useMemo(() => {
    return countByKey(
      events.filter((e) => e.event_type === "view"),
      (e) => e.device || "Unknown"
    ).map((item) => ({
      ...item,
      icon:
        item.label === "Mobile" ? (
          <FaMobileAlt className="text-fuchsia-400" />
        ) : (
          <FaDesktop className="text-violet-400" />
        ),
      color: "bg-gradient-to-r from-fuchsia-600 to-violet-500",
    }));
  }, [events]);

  return (
    <AppPageLayout
      title={
        <>
          Analytics{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </>
      }
      subtitle="Track views, unlocks, traffic sources, and audience insights across your lockers."
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
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center backdrop-blur-xl">
              <p className="font-semibold text-red-300">Could not load analytics</p>
              <p className="mt-2 text-sm text-red-200/80">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  loadAnalytics();
                }}
                className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Total Views"
                  value={totalViews.toLocaleString()}
                  icon={FaEye}
                  gradient="from-violet-500 to-purple-600"
                  delay={0}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Total Lockers"
                  value={totalLockers}
                  icon={FaLock}
                  gradient="from-fuchsia-500 to-pink-600"
                  delay={0.05}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Total Unlocks"
                  value={totalUnlocks.toLocaleString()}
                  icon={FaUnlock}
                  gradient="from-indigo-500 to-violet-600"
                  delay={0.1}
                  reducedMotion={reducedMotion}
                />
                <StatCard
                  label="Conversion Rate"
                  value={`${conversionRate}%`}
                  icon={FaChartLine}
                  gradient="from-violet-600 to-fuchsia-600"
                  delay={0.15}
                  reducedMotion={reducedMotion}
                />
              </div>

              <div className="mb-8 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <TrafficChart data={trafficData} reducedMotion={reducedMotion} />
                </div>
                <ConversionRing
                  rate={conversionRate}
                  views={totalViews}
                  unlocks={totalUnlocks}
                  reducedMotion={reducedMotion}
                />
              </div>

              <div className="mb-8 grid gap-6 lg:grid-cols-2">
                <CountryList
                  countries={topCountries}
                  total={countryTotal}
                  reducedMotion={reducedMotion}
                />
                <TopLockers lockers={lockers} reducedMotion={reducedMotion} />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <BreakdownChart
                  title="Browsers"
                  subtitle="Which browsers your visitors use"
                  items={browserItems}
                  icon={FaGlobeAmericas}
                  reducedMotion={reducedMotion}
                  delay={0.35}
                />
                <BreakdownChart
                  title="Devices"
                  subtitle="Mobile vs desktop traffic"
                  items={deviceItems}
                  icon={FaMobileAlt}
                  reducedMotion={reducedMotion}
                  delay={0.4}
                />
              </div>
            </>
          )}
    </AppPageLayout>
  );
}
