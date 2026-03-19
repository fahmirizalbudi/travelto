import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function PartnerLogos() {
  const partners = ['Expedia', 'TURKISH AIRLINES', 'Skyscanner', 'Airbnb'];

  return (
    <section className="py-6 px-6 max-w-7xl mx-auto w-full mt-12 md:mt-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 text-gray-400 font-semibold text-xl">
        <div className="flex items-center gap-4 text-text/60">
          <span className="text-sm font-medium mr-2">Follow</span>
          <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:text-primary transition-all shadow-sm">
            <Facebook className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:text-primary transition-all shadow-sm">
            <Instagram className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:text-primary transition-all shadow-sm">
            <Twitter className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center gap-2 cursor-pointer hover:text-text transition-all duration-300 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 group">
              {/* Fallback mock logo until assets are provided */}
              <div className="w-6 h-6 rounded-full bg-gray-200 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 group-hover:bg-primary rounded-sm transition-colors" />
              </div>
              <span className="text-lg tracking-wide">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
