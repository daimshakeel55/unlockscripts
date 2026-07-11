"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const reducedMotion = useReducedMotion() ?? false;

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
          device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
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
    if (completed.includes(task.id) || running.includes(task.id)) {
      return;
    }

    window.open(task.url, "_blank");

    setRunning((prev) => [...prev, task.id]);

    setTimeout(() => {
      setCompleted((prev) => [...prev, task.id]);
      setRunning((prev) => prev.filter((id) => id !== task.id));
    }, 10000);
  }

  const allCompleted = tasks.length > 0 && completed.length === tasks.length;

  const percentage =
    tasks.length === 0 ? 0 : Math.round((completed.length / tasks.length) * 100);

  function getTaskStyle(type: string) {
    if (type.startsWith("youtube")) {
      return {
        bg: "bg-red-500/15",
        text: "text-red-400",
        glow: "shadow-red-500/20",
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
        bg: "bg-indigo-500/15",
        text: "text-indigo-400",
        glow: "shadow-indigo-500/20",
        icon: <FaDiscord className="text-xl" />,
        label: "Discord",
      };
    }

    if (type === "telegram") {
      return {
        bg: "bg-sky-500/15",
        text: "text-sky-400",
        glow: "shadow-sky-500/20",
        icon: <FaTelegram className="text-xl" />,
        label: "Telegram",
      };
    }

    return {
      bg: "bg-green-500/15",
      text: "text-green-400",
      glow: "shadow-green-500/20",
      icon: <FaGlobe className="text-xl" />,
      label: "Website",
    };
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Complete the tasks below</h2>
        <p className="mt-2 text-sm text-gray-500">
          Finish every required task to unlock your content.
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const style = getTaskStyle(task.type);
          const isCompleted = completed.includes(task.id);
          const isRunning = running.includes(task.id);

          return (
            <motion.div
              key={task.id}
              initial={reducedMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
                isCompleted
                  ? "border-green-500/30 bg-green-500/[0.06]"
                  : isRunning
                    ? "border-amber-500/30 bg-amber-500/[0.06]"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-violet-500/30 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.bg} ${style.text} shadow-lg ${style.glow}`}
                >
                  {style.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-white">{task.title}</h3>
                  <p className="mt-0.5 text-xs font-medium text-gray-500">{style.label}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => completeTask(task)}
                disabled={isCompleted || isRunning}
                className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isCompleted
                    ? "bg-green-600/90 text-white"
                    : isRunning
                      ? "bg-amber-500/90 text-black"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30 hover:brightness-110"
                } disabled:opacity-80`}
              >
                {isCompleted ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaCheck aria-hidden="true" />
                    Completed
                  </span>
                ) : isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaClock className="animate-spin" aria-hidden="true" />
                    Waiting...
                  </span>
                ) : (
                  "Complete Task"
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm sm:mt-8 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Progress</span>
          <span className="text-sm font-bold text-violet-300">
            {completed.length} / {tasks.length} • {percentage}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          />
        </div>

        {allCompleted ? (
          <motion.button
            type="button"
            onClick={async () => {
              await trackEvent("unlock");
              window.open(destinationUrl, "_blank");
            }}
            whileHover={reducedMotion ? undefined : { scale: 1.01 }}
            whileTap={reducedMotion ? undefined : { scale: 0.99 }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/30 transition-all hover:brightness-110 sm:text-base"
          >
            <FaLockOpen aria-hidden="true" />
            Unlock Content
          </motion.button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl border border-white/[0.06] bg-white/[0.02] py-4 text-sm font-bold text-gray-500 sm:text-base"
          >
            Complete all tasks to unlock
          </button>
        )}
      </div>
    </div>
  );
}
