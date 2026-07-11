"use client";

import Link from "next/link";
import { FaTwitter, FaDiscord, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "#footer" },
    { label: "Blog", href: "#footer" },
    { label: "Contact", href: "#footer" },
  ],
  Legal: [
    { label: "Privacy", href: "#footer" },
    { label: "Terms", href: "#footer" },
  ],
};

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-white/[0.06] bg-[#08080c]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-white">
              Unlock
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Scripts
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              The premium content locker platform for creators who want to protect,
              share, and monetize their content effortlessly.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-500 transition-colors hover:text-violet-400"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="text-gray-500 transition-colors hover:text-violet-400"
              >
                <FaDiscord size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-500 transition-colors hover:text-violet-400"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-gray-600">
            © 2026 UnlockScripts. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Built for creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
