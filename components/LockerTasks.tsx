"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import { getTaskDisplayTitle } from "@/lib/task-titles";
import {
  getLockerSessionId,
  hasTrackedUnlock,
  hasTrackedView,
  markUnlockTracked,
  markViewTracked,
} from "@/lib/locker-analytics";

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

const TASK_WAIT_MS = 12_000;

export default function LockerTasks({
  tasks,
  destinationUrl,
  lockerId,
  ownerId,
}: Props) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [waitSeconds, setWaitSeconds] = useState(0);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [unlockPending, setUnlockPending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const trackEvent = useCallback(
    async (eventType: "view" | "unlock") => {
      if (eventType === "view" && hasTrackedView(lockerId)) return;
      if (eventType === "unlock" && hasTrackedUnlock(lockerId)) return;

      if (eventType === "view") markViewTracked(lockerId);

      try {
        let country = "Unknown";
        try {
          const response = await fetch("https://ipwho.is/");
          const data = await response.json();
          if (data.success) country = data.country;
        } catch {}

        const response = await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lockerId,
            ownerId,
            eventType,
            browser: navigator.userAgent,
            device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
            country,
            sessionId: getLockerSessionId(lockerId),
          }),
        });

        if (!response.ok) return;

        if (eventType === "unlock") markUnlockTracked(lockerId);
      } catch (err) {
        console.error(err);
      }
    },
    [lockerId, ownerId]
  );

  useEffect(() => {
    setHasUnlocked(hasTrackedUnlock(lockerId));
    void trackEvent("view");
  }, [lockerId, trackEvent]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  function completeTask(task: Task) {
    if (completed.includes(task.id) || runningId !== null) return;

    if (task.url) {
      window.open(task.url, "_blank", "noopener,noreferrer");
    }

    setRunningId(task.id);
    setWaitSeconds(Math.ceil(TASK_WAIT_MS / 1000));

    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setWaitSeconds((s) => Math.max(0, s - 1));
    }, 1000);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (tickRef.current) clearInterval(tickRef.current);
      setCompleted((prev) => (prev.includes(task.id) ? prev : [...prev, task.id]));
      setRunningId(null);
      setWaitSeconds(0);
    }, TASK_WAIT_MS);
  }

  const allCompleted = tasks.length > 0 && completed.length === tasks.length;
  const percentage =
    tasks.length === 0 ? 0 : Math.round((completed.length / tasks.length) * 100);

  async function handleUnlock() {
    if (unlockPending || !allCompleted) return;
    setUnlockPending(true);
    try {
      if (!hasUnlocked) {
        await trackEvent("unlock");
        setHasUnlocked(true);
      }
      window.open(destinationUrl, "_blank", "noopener,noreferrer");
    } finally {
      setUnlockPending(false);
    }
  }

  function getTaskStyle(type: string) {
    if (type.startsWith("youtube")) {
      return {
        ring: "ring-red-500/30",
        bg: "bg-gradient-to-br from-red-500/20 to-red-600/5",
        text: "text-red-400",
        icon: <FaYoutube className="text-2xl" />,
        label: (() => {
          switch (type) {
            case "youtube_subscribe":
              return "Subscribe & Notify";
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
        ring: "ring-indigo-500/30",
        bg: "bg-gradient-to-br from-indigo-500/20 to-indigo-600/5",
        text: "text-indigo-400",
        icon: <FaDiscord className="text-2xl" />,
        label: "Discord",
      };
    }

    if (type === "telegram") {
      return {
        ring: "ring-sky-500/30",
        bg: "bg-gradient-to-br from-sky-500/20 to-sky-600/5",
        text: "text-sky-400",
        icon: <FaTelegram className="text-2xl" />,
        label: "Telegram",
      };
    }

    return {
      ring: "ring-green-500/30",
      bg: "bg-gradient-to-br from-green-500/20 to-green-600/5",
      text: "text-green-400",
      icon: <FaGlobe className="text-2xl" />,
      label: "Website",
    };
  }

  return (
    <div className="w-full">
      <p className="mb-5 text-sm text-gray-500">
        Complete {tasks.length} {tasks.length === 1 ? "task" : "tasks"} to unlock — one at a
        time
      </p>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const style = getTaskStyle(task.type);
          const isCompleted = completed.includes(task.id);
          const isRunning = runningId === task.id;
          const disabled = isCompleted || isRunning || (runningId !== null && !isRunning);

          return (
            <motion.div
              key={task.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
              className={`group relative overflow-hidden rounded-2xl border p-4 transition-all sm:p-5 ${
                isCompleted
                  ? "border-green-500/40 bg-green-500/[0.08]"
                  : isRunning
                    ? "border-amber-500/40 bg-amber-500/[0.08]"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-violet-500/40 hover:bg-white/[0.05]"
              }`}
            >
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ${style.ring} ${style.bg} ${style.text}`}
                  >
                    {style.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">
                      {getTaskDisplayTitle(task.type, task.title)}
                    </h3>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-gray-500">
                      {style.label}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => completeTask(task)}
                  disabled={disabled}
                  className={`relative shrink-0 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    isCompleted
                      ? "bg-green-600 text-white shadow-lg shadow-green-900/30"
                      : isRunning
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-900/30"
                        : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/40 hover:brightness-110"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {isCompleted ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaCheck aria-hidden="true" />
                      Done
                    </span>
                  ) : isRunning ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaClock className="animate-pulse" aria-hidden="true" />
                      {waitSeconds > 0 ? `${waitSeconds}s…` : "Waiting…"}
                    </span>
                  ) : (
                    "Complete Task"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Your progress</span>
          <span className="text-sm font-bold tabular-nums text-violet-300">
            {completed.length}/{tasks.length} · {percentage}%
          </span>
        </div>

        <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-400"
          />
        </div>

        {allCompleted ? (
          <motion.button
            type="button"
            onClick={() => void handleUnlock()}
            disabled={unlockPending}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 py-4 text-base font-bold text-white shadow-xl shadow-green-900/40 hover:brightness-110 disabled:opacity-70"
          >
            <FaLockOpen className="text-lg" aria-hidden="true" />
            {hasUnlocked ? "Open Content" : "Unlock Content Now"}
          </motion.button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl border border-white/[0.06] bg-white/[0.02] py-4 text-sm font-semibold text-gray-500"
          >
            Complete all tasks to unlock
          </button>
        )}
      </div>
    </div>
  );
}
