import Sidebar from "@/components/Sidebar";
import CreateLockerForm from "@/components/CreateLockerForm";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0B0B0F] pb-20 text-white lg:flex-row lg:pb-0">
      <Sidebar />
      <section className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">

        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Create New Locker
        </h1>

        <p className="mt-2 text-gray-400">
          Create a locker and add unlock tasks.
        </p>


        <div className="mt-6 rounded-2xl border border-gray-800 bg-[#18181F] p-4 sm:mt-10 sm:p-6 md:p-8">

          <CreateLockerForm />

        </div>


      </section>

    </main>
  );
}