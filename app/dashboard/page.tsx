"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getAbsoluteUrl } from "@/lib/site-url";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Sidebar from "@/components/Sidebar";

type Locker = {
  id: string;
  title: string;
  description: string;
  destination_url: string;
  slug: string;
  created_at: string;
};

export default function DashboardPage() {
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [loading, setLoading] = useState(true);

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

    const { data, error } = await supabase
      .from("lockers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLockers(data);
    }

    setLoading(false);
  }

  async function deleteLocker(id: string) {
    if (!confirm("Delete this locker?")) return;

    await supabase.from("lockers").delete().eq("id", id);

    loadLockers();
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(getAbsoluteUrl(`/l/${slug}`));
    alert("✅ Link copied!");
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-8 md:p-12">
        <PageHeader
          title="My Lockers"
          description="Manage your active content lockers and track performance."
        >
          <Button href="/create" variant="primary" size="md">
            + New Locker
          </Button>
        </PageHeader>

        {loading ? (
          <p className="text-gray-400">Loading your data...</p>
        ) : lockers.length === 0 ? (
          <Section>
            <p className="text-center text-gray-400">
              You haven't created any lockers yet.
            </p>
          </Section>
        ) : (
          <div className="space-y-6">
            {lockers.map((locker) => (
              <Card key={locker.id} className="hover:border-violet-500">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">
                        {locker.title}
                      </h2>

                      <Badge variant="success">Active</Badge>
                    </div>

                    <p className="text-base text-gray-400">
                      {locker.description}
                    </p>

                    <p className="mt-4 break-all text-sm text-violet-400">
                      {locker.destination_url}
                    </p>
                  </div>

                  <Badge variant="info">{locker.slug}</Badge>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={() => copyLink(locker.slug)}
                    variant="secondary"
                    size="sm"
                  >
                    📋 Copy Link
                  </Button>

                  <Link
                    href={`/edit/${locker.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500"
                  >
                    ✏️ Edit
                  </Link>

                  <Button
                    onClick={() => deleteLocker(locker.id)}
                    variant="danger"
                    size="sm"
                  >
                    🗑 Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}