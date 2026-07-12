"use client";

import { useEffect, useRef } from "react";

const AD_KEY = "c8884e299ef7c320a31b7a1ce42942b4";
const AD_SCRIPT_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;
const AD_WIDTH = 728;
const AD_HEIGHT = 90;

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function LockerBannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.dataset.loaded === "true") return;

    window.atOptions = {
      key: AD_KEY,
      format: "iframe",
      height: AD_HEIGHT,
      width: AD_WIDTH,
      params: {},
    };

    const script = document.createElement("script");
    script.src = AD_SCRIPT_SRC;
    script.async = true;
    script.dataset.lockerAd = "true";
    container.appendChild(script);
    container.dataset.loaded = "true";

    return () => {
      script.remove();
      delete window.atOptions;
      container.dataset.loaded = "false";
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="mt-6 w-full">
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="mx-auto w-[728px] min-w-[728px]">
          <div
            ref={containerRef}
            className="h-[90px] w-[728px] overflow-hidden rounded-lg border border-white/[0.06] bg-black/20"
            aria-label="Advertisement"
          />
        </div>
      </div>
    </div>
  );
}
