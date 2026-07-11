"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Integrations from "@/components/landing/Integrations";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

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
      <DashboardPreview />
      <Integrations />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
