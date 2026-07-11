"use client";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

type Task = {
  title: string;
  active: boolean;
  type: string;
};

interface LockerPreviewProps {
  title: string;
  description: string;
  tasks: Task[];
}

export default function LockerPreview({
  title,
  description,
  tasks,
}: LockerPreviewProps) {
  function getIcon(type: string) {
    switch (type) {
      case "youtube_subscribe":
      case "youtube_like":
      case "youtube_comment":
      case "youtube_watch":
        return <FaYoutube className="text-red-500" />;

      case "discord":
        return <FaDiscord className="text-indigo-400" />;

      case "telegram":
        return <FaTelegram className="text-sky-400" />;

      case "website":
        return <FaGlobe className="text-green-400" />;

      default:
        return <FaCheckCircle className="text-gray-400" />;
    }
  }

  const enabledTasks = tasks.filter((task) => task.active);

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111116] p-6">
      <h2 className="mb-6 text-2xl font-bold">Live Preview</h2>

      <div className="rounded-xl border border-gray-700 bg-[#18181F] p-6">
        <h1 className="text-3xl font-bold">
          {title || "Your Locker Title"}
        </h1>

        <p className="mt-3 text-gray-400">
          {description || "Locker description will appear here."}
        </p>

        <div className="mt-8 space-y-3">
          {enabledTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-700 p-6 text-center text-gray-500">
              No tasks selected
            </div>
          ) : (
            enabledTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-700 bg-[#202028] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">
                    {getIcon(task.type)}
                  </div>

                  <span>{task.title}</span>
                </div>

                <span className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold">
                  Required
                </span>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white"
        >
          Unlock Content
        </button>
      </div>
    </div>
  );
}