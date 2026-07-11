"use client";

import AppPageLayout from "@/components/layout/AppPageLayout";
import EditLockerForm from "@/components/EditLockerForm";

type Task = {
  type: string;
  title: string;
  url: string;
};

type Props = {
  lockerId: string;
  title: string;
  description: string;
  destinationUrl: string;
  backgroundTheme?: string | null;
  tasks: Task[];
};

export default function EditLockerView({
  lockerId,
  title,
  description,
  destinationUrl,
  backgroundTheme,
  tasks,
}: Props) {
  return (
    <AppPageLayout
      title={
        <>
          Edit{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Locker
          </span>
        </>
      }
      subtitle="Update your locker details, tasks, and preview changes live."
    >
      <EditLockerForm
        lockerId={lockerId}
        title={title}
        description={description}
        destinationUrl={destinationUrl}
        backgroundTheme={backgroundTheme}
        tasks={tasks}
      />
    </AppPageLayout>
  );
}
