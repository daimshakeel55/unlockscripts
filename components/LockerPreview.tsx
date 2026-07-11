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
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
      <h2 className="mb-1 text-lg font-bold text-white sm:text-xl">Live Preview</h2>
      <p className="mb-6 text-sm text-gray-500">See how your locker will look</p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
          {title || "Your Locker Title"}
        </h1>

        <p className="mt-3 text-sm text-gray-400 sm:text-base">
          {description || "Locker description will appear here."}
        </p>

        <div className="mt-6 space-y-3 sm:mt-8">
          {enabledTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-gray-500">
              No tasks selected
            </div>
          ) : (
            enabledTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3 sm:px-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 text-lg sm:text-xl">{getIcon(task.type)}</div>
                  <span className="truncate text-sm sm:text-base">{task.title}</span>
                </div>
                <span className="shrink-0 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs">
                  Required
                </span>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white sm:mt-8"
        >
          Unlock Content
        </button>
      </div>
    </div>
  );
}
