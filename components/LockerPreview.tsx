"use client";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
  FaLock,
} from "react-icons/fa";

type Task = {
  title: string;
  active: boolean;
  icon: React.ReactNode;
};

type Props = {
  title: string;
  description: string;
  tasks: Task[];
};

export default function LockerPreview({
  title,
  description,
  tasks,
}: Props) {
  const enabled = tasks.filter((t) => t.active);

  return (
    <div className="sticky top-8 rounded-2xl border border-gray-800 bg-[#18181F] p-6">

      <h2 className="mb-6 text-center text-3xl font-bold">
        {title || "Locker Title"}
      </h2>

      <p className="mb-8 text-center text-gray-400">
        {description || "Complete the actions to unlock"}
      </p>

      <div className="space-y-3">
        {enabled.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-700 p-5 text-center text-gray-500">
            No tasks selected
          </div>
        ) : (
          enabled.map((task) => (
            <div
              key={task.title}
              className="flex items-center gap-3 rounded-xl bg-red-600 px-5 py-4 font-semibold"
            >
              {task.icon}
              {task.title}
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <div className="mb-2 flex justify-between text-sm">
          <span>Unlock progress</span>
          <span>0/{enabled.length} done</span>
        </div>

        <div className="h-2 rounded-full bg-gray-700">
          <div className="h-2 w-0 rounded-full bg-green-500"></div>
        </div>
      </div>

      <button
        disabled
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-700 py-4 font-bold text-gray-300"
      >
        <FaLock />
        Unlock Link
      </button>
    </div>
  );
}