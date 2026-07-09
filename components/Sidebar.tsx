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

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Create Locker",
      href: "/create",
      icon: FaPlusCircle,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: FaChartBar,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: FaCog,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-800 bg-[#111118]">

      {/* Logo */}

      <div className="border-b border-gray-800 p-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">

            <FaLock className="text-white text-lg" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              UnlockScripts
            </h1>

            <p className="text-xs text-gray-400">
              Locker Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-6">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                pathname === item.href
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-[#1b1b24] hover:text-white"
              }`}
            >
              <Icon className="text-lg" />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-gray-800 p-6">

        <div className="rounded-xl bg-[#18181F] p-4">

          <p className="text-sm font-semibold">
            UnlockScripts
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Version 1.0
          </p>

        </div>

      </div>

    </aside>
  );
}