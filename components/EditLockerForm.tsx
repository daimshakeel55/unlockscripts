"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TaskSelector from "./TaskSelector";
import LockerPreview from "./LockerPreview";
import { FaYoutube, FaDiscord, FaTelegram, FaGlobe } from "react-icons/fa";

type Task = { type: string; title: string; url: string; };

type Props = { 
  lockerId: string; 
  title: string; 
  description: string; 
  destinationUrl: string; 
  tasks: Task[]; 
};

type NewTask = { 
  locker_id: string; 
  type: string; 
  title: string; 
  url: string; 
};

export default function EditLockerForm({ 
  lockerId, 
  title: defaultTitle, 
  description: defaultDescription, 
  destinationUrl: defaultDestinationUrl, 
  tasks 
}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [destinationUrl, setDestinationUrl] = useState(defaultDestinationUrl);

  const [youtube, setYoutube] = useState(tasks.some((t) => t.type === "youtube"));
  const [discord, setDiscord] = useState(tasks.some((t) => t.type === "discord"));
  const [telegram, setTelegram] = useState(tasks.some((t) => t.type === "telegram"));
  const [website, setWebsite] = useState(tasks.some((t) => t.type === "website"));

  const [youtubeUrl, setYoutubeUrl] = useState(tasks.find((t) => t.type === "youtube")?.url || "");
  const [discordUrl, setDiscordUrl] = useState(tasks.find((t) => t.type === "discord")?.url || "");
  const [telegramUrl, setTelegramUrl] = useState(tasks.find((t) => t.type === "telegram")?.url || "");
  const [websiteUrl, setWebsiteUrl] = useState(tasks.find((t) => t.type === "website")?.url || "");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateLocker(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("DEBUG: Initiating update for lockerId:", lockerId);

    try {
      // 1. Update Locker and verify result
      const { data, error: lockerError } = await supabase
        .from("lockers")
        .update({ 
          title, 
          description, 
          destination_url: destinationUrl 
        })
        .eq("id", lockerId)
        .select(); // Critical: returns the updated row(s)

      if (lockerError) throw lockerError;
      
      console.log("DEBUG: Locker update response (rows affected):", data);
      
      // If data is empty, the .eq('id', lockerId) filter matched zero rows
      if (!data || data.length === 0) {
        throw new Error("No locker found with this ID. Check your ID and RLS UPDATE policy.");
      }

      // 2. Clear old tasks
      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("locker_id", lockerId);

      if (deleteError) throw deleteError;

      // 3. Insert new tasks
      const newTasks: NewTask[] = [];
      if (youtube) newTasks.push({ locker_id: lockerId, type: "youtube", title: "Subscribe to YouTube", url: youtubeUrl });
      if (discord) newTasks.push({ locker_id: lockerId, type: "discord", title: "Join Discord", url: discordUrl });
      if (telegram) newTasks.push({ locker_id: lockerId, type: "telegram", title: "Join Telegram", url: telegramUrl });
      if (website) newTasks.push({ locker_id: lockerId, type: "website", title: "Visit Website", url: websiteUrl });

      if (newTasks.length > 0) {
        const { error: insertError } = await supabase.from("tasks").insert(newTasks);
        if (insertError) throw insertError;
      }

      setMessage("✅ Updated!");
      router.refresh();
    } catch (err: any) {
      console.error("DEBUG: Update failed:", err);
      setMessage(`❌ Error: ${err.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={updateLocker} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        <input value={destinationUrl} onChange={(e) => setDestinationUrl(e.target.value)} className="w-full rounded-xl border border-gray-700 bg-[#18181F] p-4 text-white" />
        <TaskSelector youtube={youtube} setYoutube={setYoutube} discord={discord} setDiscord={setDiscord} telegram={telegram} setTelegram={setTelegram} website={website} setWebsite={setWebsite} />
        {message && <p className={message.startsWith("❌") ? "text-red-500" : "text-green-500"}>{message}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-600 py-4 font-bold text-white hover:bg-violet-500 disabled:opacity-50">
          {loading ? "Updating..." : "Update Locker"}
        </button>
      </div>
      <LockerPreview title={title} description={description} tasks={[{ title: "Subscribe to YouTube", active: youtube, icon: <FaYoutube /> }, { title: "Join Discord", active: discord, icon: <FaDiscord /> }, { title: "Join Telegram", active: telegram, icon: <FaTelegram /> }, { title: "Visit Website", active: website, icon: <FaGlobe /> }]} />
    </form>
  );
}