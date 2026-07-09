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

  useEffect(() => {
    console.log("Analytics started");

    const sendAnalytics = async () => {
      console.log("Sending request");
      try {
        const response = await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lockerId,
            ownerId,
            eventType: "view",
            browser: navigator.userAgent,
            device: /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
            country: "",
            ipAddress: "",
          }),
        });

        const responseData = await response.text();
        console.log("Response status:", response.status);
        console.log("Response body:", responseData);
      } catch (error) {
        console.error("Fetch errors:", error);
      }
    };

    sendAnalytics();
  }, [lockerId, ownerId]);

  function completeTask(task: Task) {
    if (completed.includes(task.id) || running.includes(task.id)) {
      return;
    }

    window.open(task.url, "_blank");
    setRunning((prev) => [...prev, task.id]);

    setTimeout(() => {
      setCompleted((prev) => [...prev, task.id]);
      setRunning((prev) => prev.filter((id) => id !== task.id));
    }, 35000);
  }

  const allCompleted = tasks.length > 0 && completed.length === tasks.length;
  const percentage = tasks.length === 0 ? 0 : Math.round((completed.length / tasks.length) * 100);

  return (
    <div className="w-full">
      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const isCompleted = completed.includes(task.id);
          const isRunning = running.includes(task.id);

          return (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                isCompleted
                  ? "border-emerald-500/30 bg-[#18181F]"
                  : "border-gray-700 bg-[#18181F] hover:border-violet-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300 ${
                    task.type === "youtube"
                      ? "bg-red-500/10 text-red-500"
                      : task.type === "discord"
                      ? "bg-indigo-500/10 text-indigo-400"
                      : task.type === "telegram"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {task.type === "youtube" && <FaYoutube className="text-lg" />}
                  {task.type === "discord" && <FaDiscord className="text-lg" />}
                  {task.type === "telegram" && <FaTelegram className="text-lg" />}
                  {task.type === "website" && <FaGlobe className="text-lg" />}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">{task.title}</h3>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{task.type}</p>
                </div>
              </div>

              <button
                onClick={() => completeTask(task)}
                disabled={isCompleted || isRunning}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                    : isRunning
                    ? "bg-amber-600/10 text-amber-500 border border-amber-500/20 cursor-wait"
                    : "bg-violet-600 text-white hover:bg-violet-500 active:scale-[0.98]"
                }`}
              >
                {isCompleted ? (
                  <span className="flex items-center gap-1.5"><FaCheck /> Done</span>
                ) : isRunning ? (
                  <span className="flex items-center gap-1.5"><FaClock className="animate-spin" /> Waiting</span>
                ) : (
                  "Complete Task"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="mt-8 pt-6 border-t border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unlock Progress</span>
          <span className="text-xs font-bold text-white bg-gray-700/50 px-2 py-0.5 rounded">
            {completed.length} / {tasks.length} • {percentage}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700/50">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ease-in-out"
            style={{
              width: `${
                tasks.length === 0
                  ? 0
                  : (completed.length / tasks.length) * 100
              }%`,
            }}
          />
        </div>

        {allCompleted ? (
          <a
            href={destinationUrl}
            target="_blank"
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/20 active:scale-[0.99]"
          >
            <FaLockOpen /> Unlock Content
          </a>
        ) : (
          <button
            disabled
            className="mt-6 w-full rounded-xl bg-gray-700/30 py-3 text-sm font-bold text-gray-500 cursor-not-allowed border border-transparent"
          >
            Complete tasks to proceed
          </button>
        )}
      </div>
    </div>
  );
}