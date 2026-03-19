import React from 'react';
import { Play } from 'lucide-react';
import { SearchBar } from './SearchBar';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-32 pb-16 px-6 max-w-7xl mx-auto flex items-center justify-center w-full">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
        {/* Left Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center relative z-10">
          <h1 className="text-6xl md:text-[5.5rem] font-bold font-heading text-text leading-[1.05] mb-6 tracking-tight">
            Let's <br className="hidden md:block" />
            <span className="relative inline-block px-1">
              travel
              <svg className="absolute w-full h-[18px] -bottom-2 left-0 text-cta" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 8 Q 50 0 100 8" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            the<br className="hidden md:block" /> world
          </h1>
          <p className="text-text/60 text-lg md:text-xl max-w-[28rem] mb-12 leading-relaxed">
            Enjoy the breathtaking view of the nature. Relax and cherish your dreams to the fullest.
          </p>

          {/* Flat Search Bar embedded below text */}
          <div className="w-full relative z-30">
            <SearchBar />
          </div>
        </div>

        {/* Right Content - Solid Flex/Grid Layout for Bento */}
        <div className="w-full lg:w-[45%] relative mt-16 lg:mt-0 flex items-center justify-center">
          <div className="flex gap-6 w-full items-center justify-center">

            {/* Column 1 */}
            <div className="flex flex-col gap-6 w-1/2">
              <div className="bg-[#B0CFF0] rounded-[2.5rem] h-[280px] md:h-[320px] w-full transform -rotate-2" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="bg-[#F2F1D5] rounded-[2.5rem] h-[180px] md:h-[220px] w-full transform rotate-3" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col w-1/2 relative mt-12">
              {/* Right Shape (Bright Blue) */}
              <div className="bg-[#22B3F6] rounded-[2.5rem] h-[380px] md:h-[440px] w-full flex flex-col justify-end p-6 z-10 transform translate-y-4 relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="bg-white/90 backdrop-blur-sm rounded-[1.5rem] px-5 py-3 w-fit flex flex-col gap-1 items-start shadow-sm relative z-10">
                  <span className="text-cta text-[13px] font-semibold leading-none">Best</span>
                  <span className="text-cta text-[14px] font-bold leading-none pb-0.5">Packages</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
