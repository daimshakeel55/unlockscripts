import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    const baseStyles =
      "w-full bg-[#18181F] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
    
    return (
      <input
        ref={ref}
        className={`${baseStyles} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;