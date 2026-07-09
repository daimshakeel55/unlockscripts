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

export default function CreateLockerForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");

  const [youtube, setYoutube] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [website, setWebsite] = useState(false);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

    const activeTasks: {
      type: string;
      title: string;
      url: string;
    }[] = [];

    if (youtube) activeTasks.push({ type: "youtube", title: "Subscribe to YouTube", url: youtubeUrl });
    if (discord) activeTasks.push({ type: "discord", title: "Join Discord", url: discordUrl });
    if (telegram) activeTasks.push({ type: "telegram", title: "Join Telegram", url: telegramUrl });
    if (website) activeTasks.push({ type: "website", title: "Visit Website", url: websiteUrl });

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
        const { error: taskError } = await supabase.from("tasks").insert(
          activeTasks.map((t) => ({ ...t, locker_id: locker.id }))
        );
        if (taskError) throw taskError;
      }

      setMessage("✅ Locker created successfully!");
      
      setTitle("");
      setDescription("");
      setDestinationUrl("");
      setYoutube(false);
      setDiscord(false);
      setTelegram(false);
      setWebsite(false);
      setYoutubeUrl("");
      setDiscordUrl("");
      setTelegramUrl("");
      setWebsiteUrl("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessage(`❌ Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  const previewTasks = [
    { title: "Subscribe to YouTube", active: youtube, icon: <FaYoutube /> },
    { title: "Join Discord", active: discord, icon: <FaDiscord /> },
    { title: "Join Telegram", active: telegram, icon: <FaTelegram /> },
    { title: "Visit Website", active: website, icon: <FaGlobe /> },
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
          youtube={youtube}
          setYoutube={setYoutube}
          discord={discord}
          setDiscord={setDiscord}
          telegram={telegram}
          setTelegram={setTelegram}
          website={website}
          setWebsite={setWebsite}
        />
        {(youtube || discord || telegram || website) && (
          <div className="space-y-4">
            {youtube && <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="YouTube Channel URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500" />}
            {discord && <input value={discordUrl} onChange={(e) => setDiscordUrl(e.target.value)} placeholder="Discord Invite URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500" />}
            {telegram && <input value={telegramUrl} onChange={(e) => setTelegramUrl(e.target.value)} placeholder="Telegram Channel URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500" />}
            {website && <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Website URL" className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white outline-none focus:border-violet-500" />}
          </div>
        )}
        {message && <p className={message.startsWith("❌") ? "text-red-400" : "text-green-400"}>{message}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white hover:bg-violet-500 disabled:opacity-50">
          {loading ? "Creating..." : "Create Locker"}
        </button>
      </div>
      <LockerPreview title={title} description={description} tasks={previewTasks} />
    </form>
  );
}