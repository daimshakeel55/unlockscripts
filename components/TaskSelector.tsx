"use client";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";

type Props = {
  ytSubscribe: boolean;
  setYtSubscribe: (v: boolean) => void;

  ytLike: boolean;
  setYtLike: (v: boolean) => void;

  ytComment: boolean;
  setYtComment: (v: boolean) => void;

  ytWatch: boolean;
  setYtWatch: (v: boolean) => void;

  discord: boolean;
  setDiscord: (v: boolean) => void;

  telegram: boolean;
  setTelegram: (v: boolean) => void;

  website: boolean;
  setWebsite: (v: boolean) => void;
};

type TaskCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

function TaskCard({
  title,
  description,
  icon,
  active,
  onClick,
}: TaskCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
        active
          ? "border-violet-500 bg-violet-500/10"
          : "border-gray-700 bg-[#18181F] hover:border-violet-500 hover:bg-[#20202A]"
      }`}
    >
      <div className="flex items-center gap-4">

        <div>{icon}</div>

        <div className="flex-1">

          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            {description}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            active
              ? "bg-violet-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {active ? "Selected" : "Select"}
        </span>

      </div>
    </button>
  );
}

export default function TaskSelector({
  ytSubscribe,
  setYtSubscribe,

  ytLike,
  setYtLike,

  ytComment,
  setYtComment,

  ytWatch,
  setYtWatch,

  discord,
  setDiscord,

  telegram,
  setTelegram,

  website,
  setWebsite,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-6">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Required Tasks
      </h2>
            {/* ---------------- YouTube ---------------- */}

            <div className="mb-8">

<div className="mb-4 flex items-center gap-3">

  <FaYoutube className="text-2xl text-red-500" />

  <h3 className="text-xl font-bold text-white">
    YouTube
  </h3>

</div>

<div className="space-y-3">

  <TaskCard
    title="Subscribe to Channel"
    description="Require users to subscribe."
    icon={<FaYoutube className="text-3xl text-red-500" />}
    active={ytSubscribe}
    onClick={() => setYtSubscribe(!ytSubscribe)}
  />

  <TaskCard
    title="Like Video"
    description="Require users to like a video."
    icon={<FaYoutube className="text-3xl text-red-500" />}
    active={ytLike}
    onClick={() => setYtLike(!ytLike)}
  />

  <TaskCard
    title="Comment on Video"
    description="Require users to comment."
    icon={<FaYoutube className="text-3xl text-red-500" />}
    active={ytComment}
    onClick={() => setYtComment(!ytComment)}
  />

  <TaskCard
    title="Watch Video"
    description="Require users to watch the video."
    icon={<FaYoutube className="text-3xl text-red-500" />}
    active={ytWatch}
    onClick={() => setYtWatch(!ytWatch)}
  />

</div>

</div>

{/* ---------------- Discord ---------------- */}

<div className="mb-8">

<div className="mb-4 flex items-center gap-3">

  <FaDiscord className="text-2xl text-indigo-400" />

  <h3 className="text-xl font-bold text-white">
    Discord
  </h3>

</div>

<TaskCard
  title="Join Discord Server"
  description="Require users to join your server."
  icon={<FaDiscord className="text-3xl text-indigo-400" />}
  active={discord}
  onClick={() => setDiscord(!discord)}
/>

</div>
      {/* ---------------- Telegram ---------------- */}

      <div className="mb-8">

        <div className="mb-4 flex items-center gap-3">

          <FaTelegram className="text-2xl text-sky-400" />

          <h3 className="text-xl font-bold text-white">
            Telegram
          </h3>

        </div>

        <TaskCard
          title="Join Telegram Channel"
          description="Require users to join your Telegram."
          icon={<FaTelegram className="text-3xl text-sky-400" />}
          active={telegram}
          onClick={() => setTelegram(!telegram)}
        />

      </div>

      {/* ---------------- Website ---------------- */}

      <div>

        <div className="mb-4 flex items-center gap-3">

          <FaGlobe className="text-2xl text-green-400" />

          <h3 className="text-xl font-bold text-white">
            Website
          </h3>

        </div>

        <TaskCard
          title="Visit Website"
          description="Require users to visit your website."
          icon={<FaGlobe className="text-3xl text-green-400" />}
          active={website}
          onClick={() => setWebsite(!website)}
        />

      </div>

    </div>
  );
}