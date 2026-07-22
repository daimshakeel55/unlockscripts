import { YOUTUBE_SUBSCRIBE_TITLE } from "@/lib/task-titles";

export type TaskType =
  | "youtube_subscribe"
  | "youtube_like"
  | "youtube_comment"
  | "youtube_watch"
  | "discord"
  | "telegram"
  | "website";

export const TASK_CATALOG: Record<
  TaskType,
  { title: string; defaultUrl?: string }
> = {
  youtube_subscribe: { title: YOUTUBE_SUBSCRIBE_TITLE },
  youtube_like: { title: "Like Video" },
  youtube_comment: { title: "Comment on Video" },
  youtube_watch: { title: "Watch Video" },
  discord: { title: "Join Discord" },
  telegram: { title: "Join Telegram" },
  website: { title: "Visit Website" },
};

export const DEFAULT_TASK_ORDER: TaskType[] = [
  "youtube_subscribe",
  "youtube_like",
  "youtube_comment",
  "youtube_watch",
  "discord",
  "telegram",
  "website",
];

export function isTaskType(value: string): value is TaskType {
  return value in TASK_CATALOG;
}

export function sortTasksByOrder<
  T extends { type: string; sort_order?: number | null },
>(tasks: T[]): T[] {
  return [...tasks].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );
}

export function buildTasksForInsert(
  taskOrder: TaskType[],
  urls: Partial<Record<TaskType, string>>,
  lockerId: string
) {
  return taskOrder.map((type, index) => ({
    locker_id: lockerId,
    type,
    title: TASK_CATALOG[type].title,
    url: urls[type]?.trim() || "",
    sort_order: index,
  }));
}
