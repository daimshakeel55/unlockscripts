import { supabase } from "@/lib/supabase";
import EditLockerView from "@/components/EditLockerView";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditLockerPage({ params }: Props) {
  const { id } = await params;

  const { data: locker, error } = await supabase
    .from("lockers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !locker) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0B0F] text-white">
        <h1 className="text-3xl font-bold">Locker not found</h1>
      </main>
    );
  }

  const { data: tasks } = await supabase.from("tasks").select("*").eq("locker_id", id);

  return (
    <EditLockerView
      lockerId={locker.id}
      title={locker.title}
      description={locker.description}
      destinationUrl={locker.destination_url}
      backgroundTheme={locker.background_theme}
      tasks={tasks || []}
    />
  );
}
