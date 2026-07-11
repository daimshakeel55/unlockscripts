"use client";

import { useState, useEffect } from "react";
import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
  FaCheck,
  FaClock,
  FaLockOpen,
} from "react-icons/fa";

type Task = {
  id: string;
  type: string;
  title: string;
  url: string;
};

type Props = {
  tasks: Task[];
  destinationUrl: string;
  lockerId: string;
  ownerId: string;
};

export default function LockerTasks({
  tasks,
  destinationUrl,
  lockerId,
  ownerId,
}: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [running, setRunning] = useState<string[]>([]);

  const trackEvent = async (eventType: string) => {
    try {
      let country = "Unknown";

      try {
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        if (data.success) {
          country = data.country;
        }
      } catch {}

      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lockerId,
          ownerId,
          eventType,
          browser: navigator.userAgent,
          device: /Mobi/i.test(navigator.userAgent)
            ? "Mobile"
            : "Desktop",
          country,
          ipAddress: "",
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    trackEvent("view");
  }, []);

  function completeTask(task: Task) {
    if (
      completed.includes(task.id) ||
      running.includes(task.id)
    ) {
      return;
    }

    window.open(task.url, "_blank");

    setRunning((prev) => [...prev, task.id]);

    setTimeout(() => {
      setCompleted((prev) => [...prev, task.id]);
      setRunning((prev) =>
        prev.filter((id) => id !== task.id)
      );
    }, 35000);
  }

  const allCompleted =
    tasks.length > 0 &&
    completed.length === tasks.length;

  const percentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (completed.length / tasks.length) * 100
        );

  function getTaskStyle(type: string) {
    if (type.startsWith("youtube")) {
      return {
        bg: "bg-red-500/10",
        text: "text-red-500",
        icon: <FaYoutube className="text-xl" />,
        label: (() => {
          switch (type) {
            case "youtube_subscribe":
              return "Subscribe";
            case "youtube_like":
              return "Like";
            case "youtube_comment":
              return "Comment";
            case "youtube_watch":
              return "Watch";
            default:
              return "YouTube";
          }
        })(),
      };
    }

    if (type === "discord") {
      return {
        bg: "bg-indigo-500/10",
        text: "text-indigo-400",
        icon: <FaDiscord className="text-xl" />,
        label: "Discord",
      };
    }

    if (type === "telegram") {
      return {
        bg: "bg-sky-500/10",
        text: "text-sky-400",
        icon: <FaTelegram className="text-xl" />,
        label: "Telegram",
      };
    }

    return {
      bg: "bg-green-500/10",
      text: "text-green-400",
      icon: <FaGlobe className="text-xl" />,
      label: "Website",
    };
  }

  return (
    <div className="w-full">

      <div className="mb-8 text-center">

        <h2 className="text-3xl font-bold text-white">
          Complete the tasks below
        </h2>

        <p className="mt-2 text-gray-400">
          Finish every required task to unlock your content.
        </p>

      </div>

      <div className="space-y-4">        {tasks.map((task) => {
          const style = getTaskStyle(task.type);

          const isCompleted = completed.includes(task.id);
          const isRunning = running.includes(task.id);

          return (
            <div
              key={task.id}
              className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
                isCompleted
                  ? "border-green-500/30 bg-[#18181F]"
                  : "border-gray-700 bg-[#18181F] hover:border-violet-500"
              }`}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.text}`}
                >
                  {style.icon}
                </div>

                <div>

                  <h3 className="text-base font-semibold text-white">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-500">
                    {style.label}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => completeTask(task)}
                disabled={isCompleted || isRunning}
                className={`rounded-xl px-5 py-2 font-semibold transition-all ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isRunning
                    ? "bg-amber-500 text-black"
                    : "bg-violet-600 text-white hover:bg-violet-500"
                }`}
              >
                {isCompleted ? (
                  <span className="flex items-center gap-2">
                    <FaCheck />
                    Completed
                  </span>
                ) : isRunning ? (
                  <span className="flex items-center gap-2">
                    <FaClock className="animate-spin" />
                    Waiting...
                  </span>
                ) : (
                  "Complete Task"
                )}
              </button>

            </div>
          );
        })}
      </div>      <div className="mt-8 rounded-2xl border border-gray-700 bg-[#18181F] p-6">

<div className="mb-3 flex items-center justify-between">

  <span className="text-sm font-medium text-gray-400">
    Progress
  </span>

  <span className="text-sm font-bold text-white">
    {completed.length} / {tasks.length} • {percentage}%
  </span>

</div>

<div className="h-3 overflow-hidden rounded-full bg-gray-700">

  <div
    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
    style={{
      width: `${percentage}%`,
    }}
  />

</div>        {allCompleted ? (
          <button
            type="button"
            onClick={async () => {
              await trackEvent("unlock");
              window.open(destinationUrl, "_blank");
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-500"
          >
            <FaLockOpen />
            Unlock Content
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl bg-gray-700 py-4 font-bold text-gray-400"
          >
            Complete all tasks to unlock
          </button>
        )}
      </div>
    </div>
  );
}