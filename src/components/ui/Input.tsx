import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  containerClassName?: string;
}

export function Input({ label, id, className = '', containerClassName = '', ...props }: InputProps) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-text/80 mb-sm">{label}</label>}
      <input
        id={id}
        className={`w-full px-4 py-3 border border-gray-200 rounded-lg text-base transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 ${className}`}
        {...props}
      />
    </div>
  );
}
