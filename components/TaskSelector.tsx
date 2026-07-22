"use client";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import { YOUTUBE_SUBSCRIBE_TITLE } from "@/lib/task-titles";
import { type TaskType } from "@/lib/task-catalog";

function toggleTask(
  type: TaskType,
  active: boolean,
  setActive: (v: boolean) => void,
  setUrl: (v: string) => void,
  taskOrder: TaskType[],
  onTaskOrderChange: (order: TaskType[]) => void
) {
  if (active) {
    setUrl("");
    setActive(false);
    onTaskOrderChange(taskOrder.filter((t) => t !== type));
  } else {
    setActive(true);
    onTaskOrderChange(taskOrder.includes(type) ? taskOrder : [...taskOrder, type]);
  }
}

type TaskCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  url?: string;
  onUrlChange?: (value: string) => void;
  urlPlaceholder?: string;
  urlLabel?: string;
};

function TaskCard({
  title,
  description,
  icon,
  active,
  onClick,
  url,
  onUrlChange,
  urlPlaceholder,
  urlLabel,
}: TaskCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 ${
        active
          ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-900/20"
          : "border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04]"
      }`}
    >
      <button type="button" onClick={onClick} className="w-full p-4 text-left">
        <div className="flex items-center gap-4">
          <div>{icon}</div>

          <div className="flex-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              active
                ? "bg-violet-600 text-white"
                : "border border-white/10 bg-white/[0.04] text-gray-400"
            }`}
          >
            {active ? "Selected" : "Select"}
          </span>
        </div>
      </button>

      {active && onUrlChange && (
        <div className="border-t border-violet-500/20 bg-violet-500/5 px-4 py-3">
          <label className="mb-2 block text-xs font-medium text-violet-300">
            {urlLabel ?? "Task URL"}
          </label>
          <input
            type="url"
            value={url ?? ""}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={urlPlaceholder}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-violet-500/50 focus:bg-white/[0.05]"
          />
        </div>
      )}
    </div>
  );
}

type Props = {
  ytSubscribe: boolean;
  setYtSubscribe: (v: boolean) => void;
  ytSubscribeUrl: string;
  setYtSubscribeUrl: (v: string) => void;

  ytLike: boolean;
  setYtLike: (v: boolean) => void;
  ytLikeUrl: string;
  setYtLikeUrl: (v: string) => void;

  ytComment: boolean;
  setYtComment: (v: boolean) => void;
  ytCommentUrl: string;
  setYtCommentUrl: (v: string) => void;

  ytWatch: boolean;
  setYtWatch: (v: boolean) => void;
  ytWatchUrl: string;
  setYtWatchUrl: (v: string) => void;

  discord: boolean;
  setDiscord: (v: boolean) => void;
  discordUrl: string;
  setDiscordUrl: (v: string) => void;

  telegram: boolean;
  setTelegram: (v: boolean) => void;
  telegramUrl: string;
  setTelegramUrl: (v: string) => void;

  website: boolean;
  setWebsite: (v: boolean) => void;
  websiteUrl: string;
  setWebsiteUrl: (v: string) => void;

  taskOrder: TaskType[];
  onTaskOrderChange: (order: TaskType[]) => void;
};

export default function TaskSelector(props: Props) {
  const {
    ytSubscribe,
    setYtSubscribe,
    ytSubscribeUrl,
    setYtSubscribeUrl,
    ytLike,
    setYtLike,
    ytLikeUrl,
    setYtLikeUrl,
    ytComment,
    setYtComment,
    ytCommentUrl,
    setYtCommentUrl,
    ytWatch,
    setYtWatch,
    ytWatchUrl,
    setYtWatchUrl,
    discord,
    setDiscord,
    discordUrl,
    setDiscordUrl,
    telegram,
    setTelegram,
    telegramUrl,
    setTelegramUrl,
    website,
    setWebsite,
    websiteUrl,
    setWebsiteUrl,
    taskOrder,
    onTaskOrderChange,
  } = props;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
      <h2 className="mb-6 text-xl font-bold text-white sm:mb-8 sm:text-2xl">
        Required Tasks
      </h2>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <FaYoutube className="text-2xl text-red-500" />
          <h3 className="text-lg font-bold text-white sm:text-xl">YouTube</h3>
        </div>

        <div className="space-y-3">
          <TaskCard
            title={YOUTUBE_SUBSCRIBE_TITLE}
            description="Require users to subscribe and turn on notifications."
            icon={<FaYoutube className="text-3xl text-red-500" />}
            active={ytSubscribe}
            onClick={() =>
              toggleTask(
                "youtube_subscribe",
                ytSubscribe,
                setYtSubscribe,
                setYtSubscribeUrl,
                taskOrder,
                onTaskOrderChange
              )
            }
            url={ytSubscribeUrl}
            onUrlChange={setYtSubscribeUrl}
            urlLabel="YouTube channel link"
            urlPlaceholder="https://youtube.com/@yourchannel"
          />
          <TaskCard
            title="Like Video"
            description="Require users to like a video."
            icon={<FaYoutube className="text-3xl text-red-500" />}
            active={ytLike}
            onClick={() =>
              toggleTask("youtube_like", ytLike, setYtLike, setYtLikeUrl, taskOrder, onTaskOrderChange)
            }
            url={ytLikeUrl}
            onUrlChange={setYtLikeUrl}
            urlLabel="YouTube video link"
            urlPlaceholder="https://youtube.com/watch?v=..."
          />
          <TaskCard
            title="Comment on Video"
            description="Require users to comment."
            icon={<FaYoutube className="text-3xl text-red-500" />}
            active={ytComment}
            onClick={() =>
              toggleTask(
                "youtube_comment",
                ytComment,
                setYtComment,
                setYtCommentUrl,
                taskOrder,
                onTaskOrderChange
              )
            }
            url={ytCommentUrl}
            onUrlChange={setYtCommentUrl}
            urlLabel="YouTube video link"
            urlPlaceholder="https://youtube.com/watch?v=..."
          />
          <TaskCard
            title="Watch Video"
            description="Require users to watch the video."
            icon={<FaYoutube className="text-3xl text-red-500" />}
            active={ytWatch}
            onClick={() =>
              toggleTask("youtube_watch", ytWatch, setYtWatch, setYtWatchUrl, taskOrder, onTaskOrderChange)
            }
            url={ytWatchUrl}
            onUrlChange={setYtWatchUrl}
            urlLabel="YouTube video link"
            urlPlaceholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <FaDiscord className="text-2xl text-indigo-400" />
          <h3 className="text-lg font-bold text-white sm:text-xl">Discord</h3>
        </div>
        <TaskCard
          title="Join Discord Server"
          description="Require users to join your server."
          icon={<FaDiscord className="text-3xl text-indigo-400" />}
          active={discord}
          onClick={() =>
            toggleTask("discord", discord, setDiscord, setDiscordUrl, taskOrder, onTaskOrderChange)
          }
          url={discordUrl}
          onUrlChange={setDiscordUrl}
          urlLabel="Discord invite link"
          urlPlaceholder="https://discord.gg/..."
        />
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <FaTelegram className="text-2xl text-sky-400" />
          <h3 className="text-lg font-bold text-white sm:text-xl">Telegram</h3>
        </div>
        <TaskCard
          title="Join Telegram Channel"
          description="Require users to join your Telegram."
          icon={<FaTelegram className="text-3xl text-sky-400" />}
          active={telegram}
          onClick={() =>
            toggleTask("telegram", telegram, setTelegram, setTelegramUrl, taskOrder, onTaskOrderChange)
          }
          url={telegramUrl}
          onUrlChange={setTelegramUrl}
          urlLabel="Telegram channel link"
          urlPlaceholder="https://t.me/..."
        />
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <FaGlobe className="text-2xl text-green-400" />
          <h3 className="text-lg font-bold text-white sm:text-xl">Website</h3>
        </div>
        <TaskCard
          title="Visit Website"
          description="Require users to visit your website."
          icon={<FaGlobe className="text-3xl text-green-400" />}
          active={website}
          onClick={() =>
            toggleTask("website", website, setWebsite, setWebsiteUrl, taskOrder, onTaskOrderChange)
          }
          url={websiteUrl}
          onUrlChange={setWebsiteUrl}
          urlLabel="Website URL"
          urlPlaceholder="https://yourwebsite.com"
        />
      </div>
    </div>
  );
}
