import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl relative z-20">
      <div className="flex-1 w-full text-left pl-4">
        <label className="text-[10px] text-text/50 font-semibold mb-1 block uppercase tracking-wider">Location</label>
        <div className="flex items-center justify-between cursor-pointer group">
          <span className="font-semibold text-text text-sm group-hover:text-primary transition-colors">Maldives</span>
          <ChevronDown className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>

      <div className="flex-1 w-full text-left">
        <label className="text-[10px] text-text/50 font-semibold mb-1 block uppercase tracking-wider">Date</label>
        <div className="flex items-center justify-between cursor-pointer group">
          <span className="font-semibold text-text text-sm group-hover:text-primary transition-colors">26 Mar, Fri</span>
          <ChevronDown className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>

      <div className="flex-1 w-full text-left">
        <label className="text-[10px] text-text/50 font-semibold mb-1 block uppercase tracking-wider">Price</label>
        <div className="flex items-center justify-between cursor-pointer group">
          <span className="font-semibold text-text text-sm group-hover:text-primary transition-colors">$600-2000</span>
          <ChevronDown className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>

      <button className="bg-cta rounded-2xl w-14 h-14 flex items-center justify-center shrink-0 hover:bg-cta/90 transition-colors cursor-pointer">
        <Search className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
