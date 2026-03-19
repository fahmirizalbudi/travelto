
import React from 'react';
import { Logo } from '../ui/Logo';

export function Header() {
  return (
    <header className="absolute top-6 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group">
          <Logo className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-105 transition-transform duration-300" />
          <h1 className="text-2xl md:text-[28px] font-bold font-heading text-text tracking-tight mt-1">
            Travel<span className="text-cta">to</span>
          </h1>
        </div>
        <nav className="hidden md:flex space-x-12">
          <a href="#" className="text-cta font-medium cursor-pointer">Home</a>
          <a href="#" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">About</a>
          <a href="#" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">Packages</a>
          <a href="#" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">Community</a>
        </nav>
        <div className="flex items-center">
          <button className="bg-[#1E293B] text-white hover:bg-[#0F172A] px-8 py-3 rounded-2xl font-medium transition-colors duration-200 cursor-pointer">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
