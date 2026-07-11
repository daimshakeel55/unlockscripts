"use client";

import AppPageLayout from "@/components/layout/AppPageLayout";
import CreateLockerForm from "@/components/CreateLockerForm";

export default function CreatePage() {
  return (
    <AppPageLayout
      title={
        <>
          Create New{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Locker
          </span>
        </>
      }
      subtitle="Set up your locker, choose unlock tasks, and preview how it looks live."
    >
      <CreateLockerForm />
    </AppPageLayout>
  );
}
