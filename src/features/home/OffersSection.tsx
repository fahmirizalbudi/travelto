import React from 'react';
import { Plane, Wifi, Coffee } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function OffersSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 w-full relative">
        {/* Abstract images composition for "Choose the best offer" */}
        <div className="relative h-[600px] w-full hidden md:block">
          <div className="absolute top-0 right-0 w-[80%] h-[400px] bg-[#E8F1FA] rounded-[2rem] overflow-hidden cursor-pointer group" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-[70%] h-[320px] bg-[#FFF8E7] rounded-[2rem] overflow-hidden cursor-pointer group border-[12px] border-white" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582719478250-c89404bb2a0b?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
        {/* Mobile simple placeholder */}
        <div className="h-64 bg-slate-100 rounded-3xl w-full md:hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>

      <div className="flex-1 w-full pl-0 lg:pl-12">
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-text mb-6 leading-tight tracking-tight">
          Choose the best offer<br /> & enjoy your room.
        </h2>
        <p className="text-text/70 mb-10 max-w-lg leading-relaxed text-lg">
          We always make our customers happy by providing as many choices as possible top tourist destination.
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Plane className="w-6 h-6" />
            </div>
            <span className="font-medium text-text/80 text-lg group-hover:text-text transition-colors">Air Conditioner</span>
          </div>
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Wifi className="w-6 h-6" />
            </div>
            <span className="font-medium text-text/80 text-lg group-hover:text-text transition-colors">Internet/Wifi</span>
          </div>
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="font-medium text-text/80 text-lg group-hover:text-text transition-colors">Breakfast</span>
          </div>
        </div>

        <Button className="rounded-full px-10 py-4 bg-primary text-white hover:-translate-y-1">
          Book Now
        </Button>
      </div>
    </section>
  );
}
