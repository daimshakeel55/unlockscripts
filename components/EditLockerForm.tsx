"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import TaskSelector from "./TaskSelector";
import LockerPreview from "./LockerPreview";

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
  tasks,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState<string>(defaultTitle);
  const [description, setDescription] = useState<string>(defaultDescription);
  const [destinationUrl, setDestinationUrl] = useState<string>(defaultDestinationUrl);

  const [ytSubscribe, setYtSubscribe] = useState<boolean>(tasks.some((t) => t.type === "youtube_subscribe"));
  const [ytLike, setYtLike] = useState<boolean>(tasks.some((t) => t.type === "youtube_like"));
  const [ytComment, setYtComment] = useState<boolean>(tasks.some((t) => t.type === "youtube_comment"));
  const [ytWatch, setYtWatch] = useState<boolean>(tasks.some((t) => t.type === "youtube_watch"));

  const [discord, setDiscord] = useState<boolean>(tasks.some((t) => t.type === "discord"));
  const [telegram, setTelegram] = useState<boolean>(tasks.some((t) => t.type === "telegram"));
  const [website, setWebsite] = useState<boolean>(tasks.some((t) => t.type === "website"));

  const [ytSubscribeUrl, setYtSubscribeUrl] = useState<string>(tasks.find((t) => t.type === "youtube_subscribe")?.url || "");
  const [ytLikeUrl, setYtLikeUrl] = useState<string>(tasks.find((t) => t.type === "youtube_like")?.url || "");
  const [ytCommentUrl, setYtCommentUrl] = useState<string>(tasks.find((t) => t.type === "youtube_comment")?.url || "");
  const [ytWatchUrl, setYtWatchUrl] = useState<string>(tasks.find((t) => t.type === "youtube_watch")?.url || "");

  const [discordUrl, setDiscordUrl] = useState<string>(tasks.find((t) => t.type === "discord")?.url || "");
  const [telegramUrl, setTelegramUrl] = useState<string>(tasks.find((t) => t.type === "telegram")?.url || "");
  const [websiteUrl, setWebsiteUrl] = useState<string>(tasks.find((t) => t.type === "website")?.url || "");

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

      if (ytSubscribe) newTasks.push({ locker_id: lockerId, type: "youtube_subscribe", title: "Subscribe to Channel", url: ytSubscribeUrl });
      if (ytLike) newTasks.push({ locker_id: lockerId, type: "youtube_like", title: "Like Video", url: ytLikeUrl });
      if (ytComment) newTasks.push({ locker_id: lockerId, type: "youtube_comment", title: "Comment on Video", url: ytCommentUrl });
      if (ytWatch) newTasks.push({ locker_id: lockerId, type: "youtube_watch", title: "Watch Video", url: ytWatchUrl });
      if (discord) newTasks.push({ locker_id: lockerId, type: "discord", title: "Join Discord", url: discordUrl });
      if (telegram) newTasks.push({ locker_id: lockerId, type: "telegram", title: "Join Telegram", url: telegramUrl });
      if (website) newTasks.push({ locker_id: lockerId, type: "website", title: "Visit Website", url: websiteUrl });

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
    <form onSubmit={updateLocker} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Locker Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Destination URL</label>
          <input value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        </div>

        <TaskSelector
          ytSubscribe={ytSubscribe}
          setYtSubscribe={setYtSubscribe}
          ytLike={ytLike}
          setYtLike={setYtLike}
          ytComment={ytComment}
          setYtComment={setYtComment}
          ytWatch={ytWatch}
          setYtWatch={setYtWatch}
          discord={discord}
          setDiscord={setDiscord}
          telegram={telegram}
          setTelegram={setTelegram}
          website={website}
          setWebsite={setWebsite}
        />

        {(ytSubscribe || ytLike || ytComment || ytWatch || discord || telegram || website) && (
          <div className="space-y-4">
            {ytSubscribe && <input value={ytSubscribeUrl} onChange={(e) => setYtSubscribeUrl(e.target.value)} placeholder="YouTube Subscribe URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {ytLike && <input value={ytLikeUrl} onChange={(e) => setYtLikeUrl(e.target.value)} placeholder="YouTube Like URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {ytComment && <input value={ytCommentUrl} onChange={(e) => setYtCommentUrl(e.target.value)} placeholder="YouTube Comment URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {ytWatch && <input value={ytWatchUrl} onChange={(e) => setYtWatchUrl(e.target.value)} placeholder="YouTube Watch URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {discord && <input value={discordUrl} onChange={(e) => setDiscordUrl(e.target.value)} placeholder="Discord Invite URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {telegram && <input value={telegramUrl} onChange={(e) => setTelegramUrl(e.target.value)} placeholder="Telegram Channel URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
            {website && <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Website URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />}
          </div>
        )}

        {message && <p className={message.startsWith("❌") ? "text-red-500" : "text-green-500"}>{message}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white hover:bg-violet-500 disabled:opacity-50">
          {loading ? "Updating..." : "Update Locker"}
        </button>
      </div>

      <LockerPreview title={title} description={description} tasks={previewTasks} />
    </form>
  );
}