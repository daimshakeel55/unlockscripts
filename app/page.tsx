"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

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

      <HowItWorks />

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
