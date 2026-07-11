"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

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
      <Navbar loggedIn={loggedIn} />
      <Hero loggedIn={loggedIn} />

      <Features />

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
