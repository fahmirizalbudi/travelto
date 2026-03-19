import React from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon, StarIcon } from 'hugeicons-react';
import Link from 'next/link';
import { packages } from '../../data/packages';

export function PopularDestinations() {
  // Hanya ambil 4 package pertama sebagai destinasi populer di beranda
  const destinations = packages.slice(0, 4);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-text tracking-tight">
          Popular Destinations
        </h2>
        <div className="hidden md:flex gap-4">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-text/60 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer">
            <ArrowLeft01Icon className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors">
            <ArrowRight01Icon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map(dest => (
          <Link href={`/packages/${dest.id}`} key={dest.id} className="group cursor-pointer block">
            <div className={`h-64 md:h-80 rounded-3xl mb-4 overflow-hidden relative transition-all duration-300 transform group-hover:-translate-y-2`}>
              <div className="absolute inset-0 bg-[#E8F1FA] hover:opacity-90 transition-opacity duration-500" style={{ backgroundImage: `url("${dest.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2 tracking-tight group-hover:text-primary transition-colors">{dest.title}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text/60"><span className="text-cta font-bold">${dest.price}</span> starting</span>
              <div className="flex items-center text-orange-400 gap-1">
                <StarIcon className="w-4 h-4 fill-current" />
                <span className="text-text font-medium">{dest.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
