import { supabase } from "@/lib/supabase";
import LockerTasks from "@/components/LockerTasks";
import LockerPageShell from "@/components/locker/LockerPageShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LockerPage({ params }: Props) {
  const { slug } = await params;

  const { data: locker, error } = await supabase
    .from("lockers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !locker) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0F] p-4 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="relative text-center">
          <h1 className="text-3xl font-bold">Locker not found</h1>
          <p className="mt-2 text-gray-400">
            The locker you are looking for does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("locker_id", locker.id);

  return (
    <LockerPageShell title={locker.title} description={locker.description}>
      <LockerTasks
        tasks={tasks || []}
        destinationUrl={locker.destination_url}
        lockerId={locker.id}
        ownerId={locker.user_id}
      />
    </LockerPageShell>
  );
}
