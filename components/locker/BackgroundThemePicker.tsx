"use client";

import {
  LOCKER_BACKGROUNDS,
  type LockerBackgroundTheme,
} from "@/lib/locker-backgrounds";

type Props = {
  value: LockerBackgroundTheme;
  onChange: (theme: LockerBackgroundTheme) => void;
};

export default function BackgroundThemePicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Locker Background
      </label>
      <p className="mb-4 text-xs text-gray-500">
        Choose the animated gradient visitors see on your locker page.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {LOCKER_BACKGROUNDS.map((theme) => {
          const selected = value === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              className={`group relative overflow-hidden rounded-xl border p-3 text-left transition-all ${
                selected
                  ? "border-violet-500 bg-violet-500/10 ring-1 ring-violet-500/50"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div
                className={`mb-3 h-14 rounded-lg bg-gradient-to-br ${theme.preview} opacity-80 transition-opacity group-hover:opacity-100`}
              />
              <span className="block text-sm font-medium text-white">{theme.name}</span>
              {selected && (
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-violet-300">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
