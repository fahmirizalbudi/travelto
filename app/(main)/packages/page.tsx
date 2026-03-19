import React from 'react';
import Link from 'next/link';
import { StarIcon, FilterIcon, Location01Icon, Clock01Icon, ArrowRight01Icon } from 'hugeicons-react';
import { packages } from '../../../src/data/packages';
import { Input } from '../../../src/components/ui/Input';
import { Button } from '../../../src/components/ui/Button';

export default function PackagesPage() {
  return (
    <div className="min-h-screen flex flex-col pt-0 relative text-text bg-white">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-slate-50 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white w-full h-full z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 mb-24 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
          <div>
            <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">Discover Deals</h1>
            <p className="text-lg md:text-xl text-text/60 leading-relaxed font-normal mb-10 max-w-2xl">Browse our exclusive selection of premium travel packages around the globe.</p>
          </div>

          <div className="flex items-end gap-4 mt-8 md:mt-0 w-full md:w-auto mb-10">
            <div className="w-full md:w-64">
              <Input
                id="searchDest"
                placeholder="Search destination..."
                className="bg-white"
              />
            </div>
            <Button className="px-6 h-[56px] flex items-center justify-center gap-2 rounded-2xl shrink-0 cursor-pointer">
              <FilterIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(dest => (
            <Link href={`/packages/${dest.id}`} key={dest.id} className="group cursor-pointer flex flex-col bg-[#F8FAFC] rounded-[2rem] overflow-hidden hover:-translate-y-1 transition-transform duration-300 isolate">
              <div className="h-64 relative overflow-hidden isolate">
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${dest.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 fill-cta text-cta" />
                  {dest.rating}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 bg-[#F8FAFC]">
                <h3 className="text-xl font-bold font-heading text-text mb-4 group-hover:text-primary transition-colors">{dest.title}</h3>

                <div className="flex flex-col gap-3 mb-6 flex-1">
                  <span className="flex items-center gap-2 text-sm text-text/60 font-normal"><Location01Icon className="w-4 h-4 text-text/40" /> {dest.location}</span>
                  <span className="flex items-center gap-2 text-sm text-text/60 font-normal"><Clock01Icon className="w-4 h-4 text-text/40" /> {dest.duration}</span>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary font-heading">${dest.price}</span>
                    <span className="text-xs text-text/50 font-normal tracking-widest uppercase">/ Person</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight01Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
