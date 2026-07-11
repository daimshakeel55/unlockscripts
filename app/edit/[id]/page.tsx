import { supabase } from "@/lib/supabase";
import EditLockerForm from "@/components/EditLockerForm";

// Forces Next.js to fetch fresh data from the database every time
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditLockerPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: locker, error } = await supabase
    .from("lockers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !locker) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white">
        <h1 className="text-3xl font-bold">
          Locker not found
        </h1>
      </main>
    );
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("locker_id", id);

  return (
      <main className="min-h-screen bg-[#0B0B0F] p-4 text-white sm:p-6 md:p-10">
      <h1 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-4xl">
        Edit Locker
      </h1>

      <EditLockerForm
        lockerId={locker.id}
        title={locker.title}
        description={locker.description}
        destinationUrl={locker.destination_url}
        tasks={tasks || []}
      />
    </main>
  );
}