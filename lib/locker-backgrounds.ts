export type LockerBackgroundTheme =
  | "violet"
  | "ocean"
  | "sunset"
  | "emerald"
  | "midnight"
  | "aurora";

export const DEFAULT_LOCKER_BACKGROUND: LockerBackgroundTheme = "violet";

export type LockerBackgroundConfig = {
  id: LockerBackgroundTheme;
  name: string;
  preview: string;
  base: string;
  blobs: { color: string; x: string; y: string; size: string }[];
};

export const LOCKER_BACKGROUNDS: LockerBackgroundConfig[] = [
  {
    id: "violet",
    name: "Violet Pulse",
    preview: "from-violet-600 via-fuchsia-600 to-purple-700",
    base: "#0B0B0F",
    blobs: [
      { color: "rgba(139,92,246,0.45)", x: "15%", y: "20%", size: "420px" },
      { color: "rgba(217,70,239,0.35)", x: "70%", y: "60%", size: "380px" },
      { color: "rgba(124,58,237,0.25)", x: "45%", y: "80%", size: "320px" },
    ],
  },
  {
    id: "ocean",
    name: "Ocean Flow",
    preview: "from-cyan-600 via-blue-600 to-indigo-700",
    base: "#060B12",
    blobs: [
      { color: "rgba(6,182,212,0.4)", x: "20%", y: "25%", size: "400px" },
      { color: "rgba(59,130,246,0.35)", x: "75%", y: "55%", size: "360px" },
      { color: "rgba(99,102,241,0.25)", x: "50%", y: "75%", size: "300px" },
    ],
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    preview: "from-orange-500 via-rose-500 to-pink-600",
    base: "#0F0A0B",
    blobs: [
      { color: "rgba(249,115,22,0.38)", x: "18%", y: "30%", size: "390px" },
      { color: "rgba(244,63,94,0.32)", x: "72%", y: "50%", size: "370px" },
      { color: "rgba(236,72,153,0.22)", x: "40%", y: "78%", size: "310px" },
    ],
  },
  {
    id: "emerald",
    name: "Emerald Mist",
    preview: "from-emerald-500 via-teal-500 to-green-700",
    base: "#060F0C",
    blobs: [
      { color: "rgba(16,185,129,0.38)", x: "22%", y: "22%", size: "400px" },
      { color: "rgba(20,184,166,0.32)", x: "68%", y: "58%", size: "360px" },
      { color: "rgba(34,197,94,0.22)", x: "48%", y: "82%", size: "300px" },
    ],
  },
  {
    id: "midnight",
    name: "Midnight",
    preview: "from-slate-700 via-indigo-800 to-blue-900",
    base: "#050508",
    blobs: [
      { color: "rgba(71,85,105,0.45)", x: "25%", y: "28%", size: "380px" },
      { color: "rgba(67,56,202,0.3)", x: "70%", y: "52%", size: "350px" },
      { color: "rgba(30,58,138,0.25)", x: "42%", y: "76%", size: "320px" },
    ],
  },
  {
    id: "aurora",
    name: "Aurora",
    preview: "from-teal-400 via-violet-500 to-fuchsia-500",
    base: "#080810",
    blobs: [
      { color: "rgba(45,212,191,0.32)", x: "12%", y: "35%", size: "400px" },
      { color: "rgba(139,92,246,0.38)", x: "65%", y: "25%", size: "370px" },
      { color: "rgba(232,121,249,0.28)", x: "55%", y: "70%", size: "340px" },
    ],
  },
];

export function getLockerBackground(theme?: string | null): LockerBackgroundConfig {
  const found = LOCKER_BACKGROUNDS.find((t) => t.id === theme);
  return found ?? LOCKER_BACKGROUNDS[0];
}

export function isLockerBackgroundTheme(value: string): value is LockerBackgroundTheme {
  return LOCKER_BACKGROUNDS.some((t) => t.id === value);
}
