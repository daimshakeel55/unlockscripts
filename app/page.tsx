"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
    }

    checkUser();
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0B0B0F]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <h1 className="text-2xl font-bold">
            Unlock<span className="text-violet-500">Scripts</span>
          </h1>

          <div className="hidden gap-8 text-gray-300 md:flex">
            <a href="#" className="hover:text-violet-500">
              Home
            </a>
            <a href="#features" className="hover:text-violet-500">
              Features
            </a>
            <a href="#pricing" className="hover:text-violet-500">
              Pricing
            </a>
            <a href="#footer" className="hover:text-violet-500">
              Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-gray-700 px-5 py-2 font-medium transition hover:bg-white hover:text-black"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-6xl font-extrabold leading-tight md:text-7xl">
          Create Powerful
          <span className="text-violet-500"> Content Lockers</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Share files securely, protect premium content, and track every unlock
          from one beautiful dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          {loggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-500"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-500"
            >
              Get Started
            </Link>
          )}

          <a
            href="#features"
            className="rounded-xl border border-gray-700 px-8 py-4 transition hover:bg-white hover:text-black"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#111118] py-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="text-center text-4xl font-bold">
            Why Choose{" "}
            <span className="text-violet-500">UnlockScripts?</span>
          </h2>

          <p className="mt-4 text-center text-gray-400">
            Everything you need to protect and monetize your content.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-8 transition hover:border-violet-500">
              <div className="text-4xl">🔒</div>

              <h3 className="mt-4 text-2xl font-semibold">
                Secure Lockers
              </h3>

              <p className="mt-3 text-gray-400">
                Lock files and links behind customizable actions.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-8 transition hover:border-violet-500">
              <div className="text-4xl">📊</div>

              <h3 className="mt-4 text-2xl font-semibold">
                Analytics
              </h3>

              <p className="mt-3 text-gray-400">
                Track views, unlocks and conversion rates.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-[#18181F] p-8 transition hover:border-violet-500">
              <div className="text-4xl">⚡</div>

              <h3 className="mt-4 text-2xl font-semibold">
                Fast Performance
              </h3>

              <p className="mt-3 text-gray-400">
                Lightning fast loading powered by modern technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="text-center text-4xl font-bold">
            How It Works
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            <div className="rounded-xl border border-gray-800 p-6 transition hover:border-violet-500">
              <h3 className="text-xl font-bold text-violet-500">1</h3>

              <p className="mt-3 font-semibold">
                Create Locker
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6 transition hover:border-violet-500">
              <h3 className="text-xl font-bold text-violet-500">2</h3>

              <p className="mt-3 font-semibold">
                Upload File
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6 transition hover:border-violet-500">
              <h3 className="text-xl font-bold text-violet-500">3</h3>

              <p className="mt-3 font-semibold">
                Share Link
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 p-6 transition hover:border-violet-500">
              <h3 className="text-xl font-bold text-violet-500">4</h3>

              <p className="mt-3 font-semibold">
                Track Unlocks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Placeholder */}
      <section
        id="pricing"
        className="border-t border-gray-800 py-24 text-center"
      >
        <h2 className="text-4xl font-bold">Pricing</h2>

        <p className="mt-4 text-gray-400">
          Coming Soon...
        </p>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="border-t border-gray-800 py-10 text-center text-gray-500"
      >
        © 2026 UnlockScripts. All rights reserved.
      </footer>
    </main>
  );
}