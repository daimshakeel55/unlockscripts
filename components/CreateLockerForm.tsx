"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import TaskSelector from "./TaskSelector";
import LockerPreview from "./LockerPreview";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";

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
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [destinationUrl, setDestinationUrl] = useState<string>("");

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
  const [message, setMessage] = useState<string>("");

  async function saveLocker(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (!title.trim() || !destinationUrl.trim()) {
      setMessage("❌ Title and Destination URL are required.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("❌ Login required");
      setLoading(false);
      return;
    }

    const activeTasks: Task[] = [];

    if (ytSubscribe)
      activeTasks.push({ type: "youtube_subscribe", title: "Subscribe to Channel", url: ytSubscribeUrl });
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

      setMessage("✅ Locker created successfully!");
      setTitle("");
      setDescription("");
      setDestinationUrl("");
      setYtSubscribe(false);
      setYtLike(false);
      setYtComment(false);
      setYtWatch(false);
      setDiscord(false);
      setTelegram(false);
      setWebsite(false);
      setYtSubscribeUrl("");
      setYtLikeUrl("");
      setYtCommentUrl("");
      setYtWatchUrl("");
      setDiscordUrl("");
      setTelegramUrl("");
      setWebsiteUrl("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage(`❌ Error: ${errorMessage}`);
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
    <form onSubmit={saveLocker} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Locker Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter locker title"
            className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your locker..."
            className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Destination URL</label>
          <input
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500"
          />
        </div>

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

        {message && <p className={message.startsWith("❌") ? "text-red-400" : "text-green-400"}>{message}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white transition hover:bg-violet-500 disabled:opacity-50">
          {loading ? "Creating..." : "Create Locker"}
        </button>
      </div>

      <LockerPreview title={title} description={description} tasks={previewTasks} />
    </form>
  );
}