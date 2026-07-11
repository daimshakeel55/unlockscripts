"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TaskSelector from "./TaskSelector";
import LockerPreview from "./LockerPreview";
import BackgroundThemePicker from "./locker/BackgroundThemePicker";
import {
  DEFAULT_LOCKER_BACKGROUND,
  isLockerBackgroundTheme,
  type LockerBackgroundTheme,
} from "@/lib/locker-backgrounds";

const inputClassName =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-white backdrop-blur-sm outline-none transition-colors placeholder:text-gray-500 focus:border-violet-500/50 focus:bg-white/[0.05]";

const labelClassName = "mb-2 block text-sm font-medium text-gray-300";

interface Task {
  type: string;
  title: string;
  url: string;
}

interface PreviewTask {
  title: string;
  active: boolean;
  type: string;
}

interface Props {
  lockerId: string;
  title: string;
  description: string;
  destinationUrl: string;
  backgroundTheme?: string | null;
  tasks: Task[];
}

interface NewTask {
  locker_id: string;
  type: string;
  title: string;
  url: string;
}

export default function EditLockerForm({
  lockerId,
  title: defaultTitle,
  description: defaultDescription,
  destinationUrl: defaultDestinationUrl,
  backgroundTheme: defaultBackgroundTheme,
  tasks,
}: Props) {
  const router = useRouter();
  const reducedMotion = useReducedMotion() ?? false;

  const initialTheme =
    defaultBackgroundTheme && isLockerBackgroundTheme(defaultBackgroundTheme)
      ? defaultBackgroundTheme
      : DEFAULT_LOCKER_BACKGROUND;

  const [title, setTitle] = useState<string>(defaultTitle);
  const [description, setDescription] = useState<string>(defaultDescription);
  const [destinationUrl, setDestinationUrl] = useState<string>(defaultDestinationUrl);
  const [backgroundTheme, setBackgroundTheme] =
    useState<LockerBackgroundTheme>(initialTheme);

  const [ytSubscribe, setYtSubscribe] = useState<boolean>(
    tasks.some((t) => t.type === "youtube_subscribe")
  );
  const [ytLike, setYtLike] = useState<boolean>(tasks.some((t) => t.type === "youtube_like"));
  const [ytComment, setYtComment] = useState<boolean>(
    tasks.some((t) => t.type === "youtube_comment")
  );
  const [ytWatch, setYtWatch] = useState<boolean>(tasks.some((t) => t.type === "youtube_watch"));

  const [discord, setDiscord] = useState<boolean>(tasks.some((t) => t.type === "discord"));
  const [telegram, setTelegram] = useState<boolean>(tasks.some((t) => t.type === "telegram"));
  const [website, setWebsite] = useState<boolean>(tasks.some((t) => t.type === "website"));

  const [ytSubscribeUrl, setYtSubscribeUrl] = useState<string>(
    tasks.find((t) => t.type === "youtube_subscribe")?.url || ""
  );
  const [ytLikeUrl, setYtLikeUrl] = useState<string>(
    tasks.find((t) => t.type === "youtube_like")?.url || ""
  );
  const [ytCommentUrl, setYtCommentUrl] = useState<string>(
    tasks.find((t) => t.type === "youtube_comment")?.url || ""
  );
  const [ytWatchUrl, setYtWatchUrl] = useState<string>(
    tasks.find((t) => t.type === "youtube_watch")?.url || ""
  );

  const [discordUrl, setDiscordUrl] = useState<string>(
    tasks.find((t) => t.type === "discord")?.url || ""
  );
  const [telegramUrl, setTelegramUrl] = useState<string>(
    tasks.find((t) => t.type === "telegram")?.url || ""
  );
  const [websiteUrl, setWebsiteUrl] = useState<string>(
    tasks.find((t) => t.type === "website")?.url || ""
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  async function updateLocker(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from("lockers")
        .update({
          title,
          description,
          destination_url: destinationUrl,
          background_theme: backgroundTheme,
        })
        .eq("id", lockerId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Locker not found.");

      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("locker_id", lockerId);

      if (deleteError) throw deleteError;

      const newTasks: NewTask[] = [];

      if (ytSubscribe)
        newTasks.push({
          locker_id: lockerId,
          type: "youtube_subscribe",
          title: "Subscribe to Channel",
          url: ytSubscribeUrl,
        });
      if (ytLike)
        newTasks.push({
          locker_id: lockerId,
          type: "youtube_like",
          title: "Like Video",
          url: ytLikeUrl,
        });
      if (ytComment)
        newTasks.push({
          locker_id: lockerId,
          type: "youtube_comment",
          title: "Comment on Video",
          url: ytCommentUrl,
        });
      if (ytWatch)
        newTasks.push({
          locker_id: lockerId,
          type: "youtube_watch",
          title: "Watch Video",
          url: ytWatchUrl,
        });
      if (discord)
        newTasks.push({
          locker_id: lockerId,
          type: "discord",
          title: "Join Discord",
          url: discordUrl,
        });
      if (telegram)
        newTasks.push({
          locker_id: lockerId,
          type: "telegram",
          title: "Join Telegram",
          url: telegramUrl,
        });
      if (website)
        newTasks.push({
          locker_id: lockerId,
          type: "website",
          title: "Visit Website",
          url: websiteUrl,
        });

      if (newTasks.length > 0) {
        const { error: insertError } = await supabase.from("tasks").insert(newTasks);
        if (insertError) throw insertError;
      }

      setMessage("✅ Locker updated successfully!");
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  const previewTasks: PreviewTask[] = [
    { title: "Subscribe to Channel", active: ytSubscribe, type: "youtube_subscribe" },
    { title: "Like Video", active: ytLike, type: "youtube_like" },
    { title: "Comment on Video", active: ytComment, type: "youtube_comment" },
    { title: "Watch Video", active: ytWatch, type: "youtube_watch" },
    { title: "Join Discord", active: discord, type: "discord" },
    { title: "Join Telegram", active: telegram, type: "telegram" },
    { title: "Visit Website", active: website, type: "website" },
  ];

  return (
    <form onSubmit={updateLocker} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="space-y-5">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6"
        >
          <h2 className="mb-5 text-lg font-semibold text-white">Locker Details</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClassName}>Locker Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Destination URL</label>
              <input
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="border-t border-white/[0.06] pt-5">
              <BackgroundThemePicker
                value={backgroundTheme}
                onChange={setBackgroundTheme}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <TaskSelector
            ytSubscribe={ytSubscribe}
            setYtSubscribe={setYtSubscribe}
            ytSubscribeUrl={ytSubscribeUrl}
            setYtSubscribeUrl={setYtSubscribeUrl}
            ytLike={ytLike}
            setYtLike={setYtLike}
            ytLikeUrl={ytLikeUrl}
            setYtLikeUrl={setYtLikeUrl}
            ytComment={ytComment}
            setYtComment={setYtComment}
            ytCommentUrl={ytCommentUrl}
            setYtCommentUrl={setYtCommentUrl}
            ytWatch={ytWatch}
            setYtWatch={setYtWatch}
            ytWatchUrl={ytWatchUrl}
            setYtWatchUrl={setYtWatchUrl}
            discord={discord}
            setDiscord={setDiscord}
            discordUrl={discordUrl}
            setDiscordUrl={setDiscordUrl}
            telegram={telegram}
            setTelegram={setTelegram}
            telegramUrl={telegramUrl}
            setTelegramUrl={setTelegramUrl}
            website={website}
            setWebsite={setWebsite}
            websiteUrl={websiteUrl}
            setWebsiteUrl={setWebsiteUrl}
          />
        </motion.div>

        {message && (
          <p className={`text-sm ${message.startsWith("❌") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={reducedMotion ? undefined : { scale: 1.01 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition-all hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Locker"}
        </motion.button>
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="lg:sticky lg:top-8 lg:self-start"
      >
        <LockerPreview
          title={title}
          description={description}
          tasks={previewTasks}
          backgroundTheme={backgroundTheme}
        />
      </motion.div>
    </form>
  );
}
