import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="bg-slate-50 font-body pt-16 pb-0 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12 pb-16">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center mb-8 cursor-pointer group w-fit">
            <Logo className="w-12 h-12 group-hover:scale-105 transition-transform" />
          </Link>
          <p className="text-text/60 leading-relaxed font-medium">Your trusted partner in creating unforgettable travel experiences worldwide. Explore safely and boldly without boundaries.</p>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-24 lg:mr-10">
          <div>
            <h4 className="font-extrabold font-heading text-lg mb-6 tracking-tight">Company</h4>
            <ul className="space-y-4 text-text/60 font-medium list-none p-0 m-0">
              <li><Link href="/about" className="hover:text-primary transition-colors block">About Us</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors block">Packages</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors block">Community</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold font-heading text-lg mb-6 tracking-tight">Support</h4>
            <ul className="space-y-4 text-text/60 font-medium list-none p-0 m-0">
              <li><a href="#" className="hover:text-primary transition-colors block">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
