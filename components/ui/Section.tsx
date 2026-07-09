import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`w-full rounded-2xl border border-gray-700 bg-[#18181F] p-8 space-y-6 transition-all duration-300 ${className}`}
    >
      {children}
    </section>
  );
}