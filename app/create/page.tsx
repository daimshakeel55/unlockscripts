import Sidebar from "@/components/Sidebar";
import CreateLockerForm from "@/components/CreateLockerForm";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          Create New Locker
        </h1>

        <p className="mt-2 text-gray-400">
          Create a locker and add unlock tasks.
        </p>


        <div className="mt-10 rounded-2xl border border-gray-800 bg-[#18181F] p-8">

          <CreateLockerForm />

        </div>


      </section>

    </main>
  );
}