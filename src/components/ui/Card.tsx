import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false, ...props }: CardProps) {
  const baseStyles = "bg-slate-50 rounded-3xl p-md transition-colors duration-200";
  const hoverStyles = hoverable ? "cursor-pointer hover:bg-slate-100" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
