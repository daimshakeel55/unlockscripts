export type LockerBackgroundTheme =
  | "violet"
  | "ocean"
  | "sunset"
  | "emerald"
  | "midnight"
  | "aurora";

export const DEFAULT_LOCKER_BACKGROUND: LockerBackgroundTheme = "violet";

export type LockerBackgroundBlob = {
  color: string;
  x: string;
  y: string;
  size: string;
  blur?: string;
};

export type LockerBackgroundConfig = {
  id: LockerBackgroundTheme;
  name: string;
  preview: string;
  mesh: string;
  base: string;
  blobs: LockerBackgroundBlob[];
};

export const LOCKER_BACKGROUNDS: LockerBackgroundConfig[] = [
  {
    id: "violet",
    name: "Violet Pulse",
    preview: "from-violet-500 via-fuchsia-500 to-purple-600",
    mesh: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(139,92,246,0.55), transparent 55%), radial-gradient(ellipse 90% 70% at 100% 50%, rgba(217,70,239,0.4), transparent 50%), radial-gradient(ellipse 80% 60% at 0% 100%, rgba(124,58,237,0.35), transparent 50%)",
    base: "#07070c",
    blobs: [
      { color: "rgba(139,92,246,0.82)", x: "-8%", y: "8%", size: "920px", blur: "160px" },
      { color: "rgba(217,70,239,0.68)", x: "88%", y: "12%", size: "880px", blur: "150px" },
      { color: "rgba(168,85,247,0.55)", x: "50%", y: "88%", size: "960px", blur: "170px" },
      { color: "rgba(91,33,182,0.42)", x: "72%", y: "62%", size: "680px", blur: "140px" },
    ],
  },
  {
    id: "ocean",
    name: "Ocean Flow",
    preview: "from-cyan-400 via-blue-500 to-indigo-600",
    mesh: "radial-gradient(ellipse 120% 80% at 30% -10%, rgba(34,211,238,0.5), transparent 55%), radial-gradient(ellipse 100% 70% at 90% 40%, rgba(59,130,246,0.45), transparent 50%), radial-gradient(ellipse 80% 60% at 10% 90%, rgba(99,102,241,0.35), transparent 50%)",
    base: "#040810",
    blobs: [
      { color: "rgba(34,211,238,0.78)", x: "-5%", y: "18%", size: "900px", blur: "160px" },
      { color: "rgba(59,130,246,0.72)", x: "92%", y: "28%", size: "880px", blur: "150px" },
      { color: "rgba(14,165,233,0.52)", x: "45%", y: "92%", size: "860px", blur: "165px" },
      { color: "rgba(79,70,229,0.48)", x: "62%", y: "52%", size: "700px", blur: "140px" },
    ],
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    preview: "from-orange-400 via-rose-500 to-pink-600",
    mesh: "radial-gradient(ellipse 110% 75% at 50% -15%, rgba(251,146,60,0.5), transparent 55%), radial-gradient(ellipse 90% 65% at 100% 60%, rgba(244,63,94,0.42), transparent 50%), radial-gradient(ellipse 85% 55% at 0% 80%, rgba(236,72,153,0.38), transparent 50%)",
    base: "#0c0608",
    blobs: [
      { color: "rgba(251,146,60,0.75)", x: "6%", y: "12%", size: "900px", blur: "160px" },
      { color: "rgba(244,63,94,0.68)", x: "90%", y: "22%", size: "880px", blur: "150px" },
      { color: "rgba(236,72,153,0.58)", x: "55%", y: "90%", size: "920px", blur: "170px" },
      { color: "rgba(249,115,22,0.42)", x: "35%", y: "48%", size: "680px", blur: "140px" },
    ],
  },
  {
    id: "emerald",
    name: "Emerald Mist",
    preview: "from-emerald-400 via-teal-500 to-green-600",
    mesh: "radial-gradient(ellipse 115% 80% at 40% -10%, rgba(52,211,153,0.48), transparent 55%), radial-gradient(ellipse 95% 70% at 95% 45%, rgba(20,184,166,0.42), transparent 50%), radial-gradient(ellipse 80% 60% at 5% 85%, rgba(34,197,94,0.35), transparent 50%)",
    base: "#040c0a",
    blobs: [
      { color: "rgba(52,211,153,0.72)", x: "2%", y: "15%", size: "880px", blur: "160px" },
      { color: "rgba(20,184,166,0.65)", x: "94%", y: "32%", size: "860px", blur: "150px" },
      { color: "rgba(16,185,129,0.55)", x: "48%", y: "94%", size: "900px", blur: "165px" },
      { color: "rgba(5,150,105,0.45)", x: "68%", y: "58%", size: "680px", blur: "140px" },
    ],
  },
  {
    id: "midnight",
    name: "Midnight",
    preview: "from-indigo-500 via-blue-700 to-slate-900",
    mesh: "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99,102,241,0.45), transparent 55%), radial-gradient(ellipse 90% 70% at 100% 50%, rgba(37,99,235,0.38), transparent 50%), radial-gradient(ellipse 85% 55% at 0% 90%, rgba(67,56,202,0.32), transparent 50%)",
    base: "#030308",
    blobs: [
      { color: "rgba(99,102,241,0.68)", x: "5%", y: "10%", size: "860px", blur: "160px" },
      { color: "rgba(37,99,235,0.62)", x: "90%", y: "18%", size: "880px", blur: "150px" },
      { color: "rgba(67,56,202,0.52)", x: "50%", y: "88%", size: "920px", blur: "170px" },
      { color: "rgba(30,58,138,0.45)", x: "74%", y: "55%", size: "700px", blur: "140px" },
    ],
  },
  {
    id: "aurora",
    name: "Aurora",
    preview: "from-teal-400 via-violet-500 to-fuchsia-500",
    mesh: "radial-gradient(ellipse 110% 75% at 20% -10%, rgba(45,212,191,0.45), transparent 55%), radial-gradient(ellipse 100% 70% at 80% 20%, rgba(139,92,246,0.5), transparent 50%), radial-gradient(ellipse 90% 65% at 50% 100%, rgba(232,121,249,0.42), transparent 50%)",
    base: "#06060f",
    blobs: [
      { color: "rgba(45,212,191,0.68)", x: "-3%", y: "22%", size: "880px", blur: "160px" },
      { color: "rgba(139,92,246,0.75)", x: "96%", y: "8%", size: "900px", blur: "150px" },
      { color: "rgba(232,121,249,0.62)", x: "55%", y: "92%", size: "920px", blur: "170px" },
      { color: "rgba(59,130,246,0.45)", x: "42%", y: "42%", size: "720px", blur: "140px" },
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
