"use client";

import { FaArrowDown, FaArrowUp, FaGripVertical } from "react-icons/fa";
import { TASK_CATALOG, type TaskType } from "@/lib/task-catalog";

type Props = {
  taskOrder: TaskType[];
  onChange: (order: TaskType[]) => void;
};

export default function TaskOrderEditor({ taskOrder, onChange }: Props) {
  if (taskOrder.length === 0) return null;

  function move(index: number, direction: -1 | 1) {
    const next = [...taskOrder];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 sm:p-5">
      <h3 className="mb-1 text-sm font-semibold text-violet-200">Task order on locker page</h3>
      <p className="mb-4 text-xs text-gray-400">
        Visitors complete tasks top to bottom. Use arrows to reorder.
      </p>
      <ul className="space-y-2">
        {taskOrder.map((type, index) => (
          <li
            key={type}
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0c0c12]/80 px-3 py-2.5"
          >
            <FaGripVertical className="shrink-0 text-gray-600" aria-hidden="true" />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-500/20 text-xs font-bold text-violet-300">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
              {TASK_CATALOG[type].title}
            </span>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label={`Move ${TASK_CATALOG[type].title} up`}
              >
                <FaArrowUp className="text-xs" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === taskOrder.length - 1}
                className="rounded-lg border border-white/10 p-2 text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label={`Move ${TASK_CATALOG[type].title} down`}
              >
                <FaArrowDown className="text-xs" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
