import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get all lockers
  const { data: lockers, error } = await supabase
    .from("lockers")
    .select("id,title,views")
    .eq("user_id", user.id);

  if (error) {
    return (
      <div className="p-10 text-red-500">
        Failed to load analytics.
      </div>
    );
  }

  const totalViews =
    lockers?.reduce((sum, locker) => sum + (locker.views || 0), 0) || 0;

  const totalLockers = lockers?.length || 0;

  const averageViews =
    totalLockers > 0 ? Math.round(totalViews / totalLockers) : 0;

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-xl bg-[#18181F] border border-gray-800 p-6">
          <p className="text-gray-400">Total Views</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalViews}
          </h2>
        </div>

        <div className="rounded-xl bg-[#18181F] border border-gray-800 p-6">
          <p className="text-gray-400">Total Lockers</p>
          <h2 className="text-4xl font-bold mt-2">
            {totalLockers}
          </h2>
        </div>

        <div className="rounded-xl bg-[#18181F] border border-gray-800 p-6">
          <p className="text-gray-400">Average Views</p>
          <h2 className="text-4xl font-bold mt-2">
            {averageViews}
          </h2>
        </div>

      </div>
    </main>
  );
}