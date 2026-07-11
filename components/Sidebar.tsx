"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaPlusCircle,
  FaChartBar,
  FaCog,
  FaLock,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: FaHome, short: "Home" },
  { name: "Create Locker", href: "/create", icon: FaPlusCircle, short: "Create" },
  { name: "Analytics", href: "/analytics", icon: FaChartBar, short: "Stats" },
  { name: "Settings", href: "/settings", icon: FaCog, short: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex flex-col border-r border-white/[0.06] bg-[#0B0B0F]/90 backdrop-blur-xl lg:flex">
        <div className="border-b border-white/[0.06] p-6 xl:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/30">
              <FaLock className="text-lg text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">UnlockScripts</h1>
              <p className="text-xs text-gray-500">Locker Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 xl:p-6">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/20"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className="text-lg" aria-hidden="true" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto shrink-0 border-t border-white/[0.06] p-4 xl:p-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">UnlockScripts</p>
            <p className="mt-1 text-xs text-gray-500">Version 1.0</p>
          </div>
        </div>
      </aside>

      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#0B0B0F]/95 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors sm:text-xs ${
                  active ? "text-violet-400" : "text-gray-500 hover:text-white"
                }`}
              >
                <Icon className={`text-lg ${active ? "text-violet-400" : ""}`} aria-hidden="true" />
                <span className="truncate">{item.short}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
