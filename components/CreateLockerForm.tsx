"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getAbsoluteUrl } from "@/lib/site-url";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { useToast } from "@/components/ui/Toast";
import TaskSelector from "./TaskSelector";
import LockerPreview from "./LockerPreview";
import BackgroundThemePicker from "./locker/BackgroundThemePicker";
import {
  DEFAULT_LOCKER_BACKGROUND,
  type LockerBackgroundTheme,
} from "@/lib/locker-backgrounds";
import { YOUTUBE_SUBSCRIBE_TITLE } from "@/lib/task-titles";

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

export default function CreateLockerForm() {
  const router = useRouter();
  const { success, error } = useToast();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [destinationUrl, setDestinationUrl] = useState<string>("");
  const [backgroundTheme, setBackgroundTheme] = useState<LockerBackgroundTheme>(
    DEFAULT_LOCKER_BACKGROUND
  );

  const [ytSubscribe, setYtSubscribe] = useState<boolean>(false);
  const [ytLike, setYtLike] = useState<boolean>(false);
  const [ytComment, setYtComment] = useState<boolean>(false);
  const [ytWatch, setYtWatch] = useState<boolean>(false);

  const [discord, setDiscord] = useState<boolean>(false);
  const [telegram, setTelegram] = useState<boolean>(false);
  const [website, setWebsite] = useState<boolean>(false);

  const [ytSubscribeUrl, setYtSubscribeUrl] = useState<string>("");
  const [ytLikeUrl, setYtLikeUrl] = useState<string>("");
  const [ytCommentUrl, setYtCommentUrl] = useState<string>("");
  const [ytWatchUrl, setYtWatchUrl] = useState<string>("");

  const [discordUrl, setDiscordUrl] = useState<string>("");
  const [telegramUrl, setTelegramUrl] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const reducedMotion = useReducedMotion() ?? false;

  async function saveLocker(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (!title.trim() || !destinationUrl.trim()) {
      error("Missing required fields", "Title and destination URL are required.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      error("Login required", "Sign in to create a locker.");
      setLoading(false);
      return;
    }

    const activeTasks: Task[] = [];

    if (ytSubscribe)
      activeTasks.push({ type: "youtube_subscribe", title: YOUTUBE_SUBSCRIBE_TITLE, url: ytSubscribeUrl });
    if (ytLike)
      activeTasks.push({ type: "youtube_like", title: "Like Video", url: ytLikeUrl });
    if (ytComment)
      activeTasks.push({ type: "youtube_comment", title: "Comment on Video", url: ytCommentUrl });
    if (ytWatch)
      activeTasks.push({ type: "youtube_watch", title: "Watch Video", url: ytWatchUrl });
    if (discord)
      activeTasks.push({ type: "discord", title: "Join Discord", url: discordUrl });
    if (telegram)
      activeTasks.push({ type: "telegram", title: "Join Telegram", url: telegramUrl });
    if (website)
      activeTasks.push({ type: "website", title: "Visit Website", url: websiteUrl });

    try {
      const { data: locker, error: lockerError } = await supabase
        .from("lockers")
        .insert({
          user_id: user.id,
          title,
          description,
          destination_url: destinationUrl,
          background_theme: backgroundTheme,
        })
        .select()
        .single();

      if (lockerError) throw lockerError;

      if (activeTasks.length > 0) {
        const { error: taskError } = await supabase
          .from("tasks")
          .insert(
            activeTasks.map((task) => ({
              ...task,
              locker_id: locker.id,
            }))
          );

        if (taskError) throw taskError;
      }

      const lockerUrl = getAbsoluteUrl(`/l/${locker.slug}`);
      const copied = await copyToClipboard(lockerUrl);

      success(
        "Locker created",
        copied
          ? "Your locker link was copied to the clipboard."
          : "Opening your new locker page."
      );

      window.setTimeout(() => {
        router.push(`/l/${locker.slug}`);
      }, 400);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      error("Could not create locker", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const previewTasks: PreviewTask[] = [
    { title: YOUTUBE_SUBSCRIBE_TITLE, active: ytSubscribe, type: "youtube_subscribe" },
    { title: "Like Video", active: ytLike, type: "youtube_like" },
    { title: "Comment on Video", active: ytComment, type: "youtube_comment" },
    { title: "Watch Video", active: ytWatch, type: "youtube_watch" },
    { title: "Join Discord", active: discord, type: "discord" },
    { title: "Join Telegram", active: telegram, type: "telegram" },
    { title: "Visit Website", active: website, type: "website" },
  ];

  return (
    <form onSubmit={saveLocker} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
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
                placeholder="Enter locker title"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your locker..."
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Destination URL</label>
              <input
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="https://..."
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

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={reducedMotion ? undefined : { scale: 1.01 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition-all hover:brightness-110 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Locker"}
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