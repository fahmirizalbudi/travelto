import React from 'react';

export function Footer() {
  return (
    <footer className="py-12 bg-background mt-3xl border-t border-gray-100">
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row justify-between items-center text-text/60 text-sm">
        <p>© 2026 Travellow. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
