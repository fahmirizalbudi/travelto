import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'flat';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-2xl font-medium transition-colors duration-200 cursor-pointer text-center flex items-center justify-center";
  const variants = {
    primary: "bg-cta text-white hover:bg-cta/90",
    secondary: "bg-transparent text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-text hover:bg-black/5",
    flat: "bg-gray-50 text-text/80 hover:bg-gray-100"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
