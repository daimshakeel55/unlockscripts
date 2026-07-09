import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10 ${className}`.trim()}
    >
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-white">{title}</h1>

        {description && (
          <p className="mt-2 text-gray-400 text-base">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}