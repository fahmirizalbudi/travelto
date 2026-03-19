import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { AuthButtons } from './AuthButtons';

export function Header() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white font-body">
      <div className="max-w-7xl mx-auto px-6 py-4 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <Logo className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300" />
        </Link>
        <nav className="hidden md:flex space-x-12">
          <Link href="/" className="text-cta font-medium cursor-pointer">Home</Link>
          <Link href="/about" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">About</Link>
          <Link href="/packages" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">Packages</Link>
          <Link href="/community" className="text-text/70 hover:text-text font-medium transition-colors cursor-pointer">Community</Link>
        </nav>
        <AuthButtons />
      </div>
    </header>
  );
}
