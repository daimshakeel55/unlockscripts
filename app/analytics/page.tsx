"use client";

import { useEffect, useMemo, useState } from "react";
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
import { FaChrome, FaFirefox, FaSafari, FaEdge } from "react-icons/fa6";
import Sidebar from "@/components/Sidebar";
import PageBackground from "@/components/ui/PageBackground";
import { supabase } from "@/lib/supabase";
import { getCountryFlag } from "@/lib/country-utils";

type Locker = {
  id: string;
  title: string;
  views: number;
};

type AnalyticsEvent = {
  id: string;
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
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${gradient} opacity-40 transition-opacity group-hover:opacity-70`}
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
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
  items: { label: string; count: number; icon?: React.ReactNode; color: string }[];
  icon: React.ComponentType<{ className?: string }>;
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
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (rate / 100) * circumference;

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
        <div className="relative h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#conversionGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reducedMotion ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
              {rate}%
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
  switch (name) {
    case "Chrome":
      return <FaChrome className="text-yellow-400" />;
    case "Firefox":
      return <FaFirefox className="text-orange-400" />;
    case "Safari":
      return <FaSafari className="text-sky-400" />;
    case "Edge":
      return <FaEdge className="text-blue-400" />;
    default:
      return <FaGlobeAmericas className="text-gray-400" />;
  }
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: lockerData } = await supabase
      .from("lockers")
      .select("id, title, views")
      .eq("user_id", user.id);

    const { data: analyticsData } = await supabase
      .from("analytics_events")
      .select("*")
      .eq("owner_id", user.id);

    const views = lockerData?.reduce((sum, locker) => sum + (locker.views || 0), 0) || 0;
    const unlocks = analyticsData?.filter((e) => e.event_type === "unlock").length || 0;

    setLockers(lockerData || []);
    setEvents(analyticsData || []);
    setTotalViews(views);
    setTotalLockers(lockerData?.length || 0);
    setTotalUnlocks(unlocks);
    setConversionRate(views > 0 ? Math.round((unlocks / views) * 100) : 0);
    setLoading(false);
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
    events.forEach((e) => {
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
    return countByKey(events, (e) => parseBrowser(e.browser)).map((item) => ({
      ...item,
      icon: browserIcon(item.label),
      color: "bg-gradient-to-r from-violet-600 to-indigo-500",
    }));
  }, [events]);

  const deviceItems = useMemo(() => {
    return countByKey(events, (e) => e.device || "Unknown").map((item) => ({
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
    <main className="relative flex min-h-screen flex-col bg-[#0B0B0F] pb-20 text-white lg:flex-row lg:pb-0">
      <Sidebar />

      <section className="relative flex-1 overflow-y-auto">
        <PageBackground />

        <div className="relative z-10 p-4 sm:p-6 md:p-10 lg:p-12">
          <motion.header
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Analytics{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-gray-400">
              Track views, unlocks, traffic sources, and audience insights across your lockers.
            </p>
          </motion.header>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
                />
              ))}
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
        </div>
      </section>
    </main>
  );
}
