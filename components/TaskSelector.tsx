"use client";

import {
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";

type Props = {
  youtube: boolean;
  setYoutube: (v: boolean) => void;

  discord: boolean;
  setDiscord: (v: boolean) => void;

  telegram: boolean;
  setTelegram: (v: boolean) => void;

  website: boolean;
  setWebsite: (v: boolean) => void;
};

export default function TaskSelector({
  youtube,
  setYoutube,
  discord,
  setDiscord,
  telegram,
  setTelegram,
  website,
  setWebsite,
}: Props) {
  const tasks = [
    {
      title: "Subscribe to YouTube",
      description: "Require users to subscribe.",
      icon: <FaYoutube className="text-red-500 text-3xl" />,
      active: youtube,
      setActive: setYoutube,
    },
    {
      title: "Join Discord",
      description: "Require users to join your server.",
      icon: <FaDiscord className="text-indigo-400 text-3xl" />,
      active: discord,
      setActive: setDiscord,
    },
    {
      title: "Join Telegram",
      description: "Require users to join your channel.",
      icon: <FaTelegram className="text-sky-400 text-3xl" />,
      active: telegram,
      setActive: setTelegram,
    },
    {
      title: "Visit Website",
      description: "Require users to visit your website.",
      icon: <FaGlobe className="text-green-400 text-3xl" />,
      active: website,
      setActive: setWebsite,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Required Tasks
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {tasks.map((task) => (

          <button
            key={task.title}
            type="button"
            onClick={() => task.setActive(!task.active)}
            className={`rounded-xl border p-5 text-left transition-all duration-300 ${
              task.active
                ? "border-violet-500 bg-violet-500/10"
                : "border-gray-700 hover:border-violet-500 hover:bg-[#20202A]"
            }`}
          >

            <div className="flex items-center gap-4">

              {task.icon}

              <div>

                <h3 className="font-semibold text-white">
                  {task.title}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {task.description}
                </p>

              </div>

            </div>

            <div className="mt-5">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  task.active
                    ? "bg-violet-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {task.active ? "Selected" : "Click to Enable"}
              </span>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}