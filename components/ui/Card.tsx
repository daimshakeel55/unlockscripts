import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  const baseStyles = "bg-[#18181F] border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-violet-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10";
  const interactiveStyles = onClick ? "cursor-pointer" : "";
  const combinedClasses = `${baseStyles} ${interactiveStyles} ${className}`.trim();

  if (onClick) {
    return (
      <div 
        className={combinedClasses} 
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}