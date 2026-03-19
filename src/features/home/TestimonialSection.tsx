import React from 'react';
import { StarIcon } from 'hugeicons-react';

export function TestimonialSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 w-full relative h-[400px]">
        <div className="absolute inset-0 bg-[#E8F1FA] rounded-t-full rounded-b-full md:rounded-[4rem] overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </div>

      <div className="flex-1 w-full">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-text mb-8 tracking-tight">
          Client Review
        </h2>
        <p className="text-2xl text-text/80 italic leading-relaxed mb-8">
          "Our travel planner and her team pulled together an amazing trip in a challenging environment."
        </p>

        <div className="flex gap-1.5 mb-10">
          {[1, 2, 3, 4, 5].map(i => (
            <StarIcon key={i} className="w-6 h-6 fill-cta text-cta" />
          ))}
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-[#E8F1FA]   group-hover:scale-110 transition-all duration-300" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <span className="font-semibold text-primary">Helen</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:scale-110 transition-transform" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <span className="font-semibold text-text/60 group-hover:text-text transition-colors">Strand</span>
          </div>
          <div className="flex flex-col items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:scale-110 transition-transform" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <span className="font-semibold text-text/60 group-hover:text-text transition-colors">Peata</span>
          </div>
        </div>
      </div>
    </section>
  );
}
