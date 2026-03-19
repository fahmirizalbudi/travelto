import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-text/80">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-5 py-4 rounded-2xl bg-[#F8FAFC]  placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text ${error ? 'focus:ring-red-400/20' : ''
            } ${className}`}
          {...props}
        />
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
