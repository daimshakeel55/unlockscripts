"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

type Locker = {
  id: string;
  title: string;
  views: number;
};

type AnalyticsEvent = {
  id: string;
  country: string | null;
  event_type: string;
  created_at: string;
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLockers, setTotalLockers] = useState(0);
  const [totalUnlocks, setTotalUnlocks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const { data: { user } } = await supabase.auth.getUser();
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

  if (loading) {
    return <main className="min-h-screen bg-[#0B0B0F] flex items-center justify-center text-white">Loading...</main>;
  }

  const countryMap: Record<string, number> = {};
  events.forEach((e) => {
    const country = e.country || "Unknown";
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const topCountries = Object.entries(countryMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex">
      <Sidebar />
      <section className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Views", value: totalViews },
            { title: "Total Lockers", value: totalLockers },
            { title: "Total Unlocks", value: totalUnlocks },
            { title: "Conversion Rate", value: `${conversionRate}%` },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-gray-800 bg-[#18181F] p-6 transition-all duration-300 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10">
              <p className="text-gray-400 text-sm">{card.title}</p>
              <h2 className="mt-2 text-4xl font-bold">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-xl border border-gray-800 bg-[#18181F] p-6 transition-all duration-300 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10">
            <h2 className="text-xl font-bold mb-6">🌍 Top Countries</h2>
            {topCountries.length === 0 ? <p className="text-gray-500">No analytics yet.</p> : topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center justify-between border-b border-gray-800 py-3 last:border-none">
                <span className="font-medium">{country}</span>
                <span className="text-violet-400 font-semibold">{count} visits</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#18181F] p-6 transition-all duration-300 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10">
            <h2 className="text-xl font-bold mb-6">🏆 Top Performing Lockers</h2>
            {[...lockers].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5).map((locker) => (
              <div key={locker.id} className="flex items-center justify-between border-b border-gray-800 py-3 last:border-none">
                <span className="font-medium truncate mr-4">{locker.title}</span>
                <span className="text-violet-400 font-semibold whitespace-nowrap">{locker.views || 0} views</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}