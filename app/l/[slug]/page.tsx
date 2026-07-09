import { supabase } from "@/lib/supabase";
import LockerTasks from "@/components/LockerTasks";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LockerPage({ params }: Props) {
  const { slug } = await params;

  // Debugging logs
  console.log("Received slug from params:", slug);

  // Get locker
  const { data: locker, error } = await supabase
    .from("lockers")
    .select("*")
    .eq("slug", slug)
    .single();

  // Debugging logs
  console.log("Supabase locker data:", locker);
  console.log("Supabase error (if any):", error);

  if (error || !locker) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Locker not found
          </h1>

          <p className="mt-2 text-gray-400">
            The locker you are looking for does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  // Get tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("locker_id", locker.id);

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center p-4">

      <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-[#18181F] p-8">

        <h1 className="text-4xl font-bold text-center">
          {locker.title}
        </h1>

        <p className="mt-4 text-center text-gray-400">
          {locker.description}
        </p>

        <LockerTasks
          tasks={tasks || []}
          destinationUrl={locker.destination_url}
          lockerId={locker.id}
          ownerId={locker.user_id}
        />

      </div>

    </main>
  );
}