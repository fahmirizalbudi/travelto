import React from 'react';


import { Globe02Icon, Shield01Icon } from 'hugeicons-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-body">{/* Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto w-full relative">
        <div className="max-w-4xl">
          <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">
            We make your travel dreams <span className="text-primary relative inline-block">
              come true
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cta" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 8 Q 50 0 100 8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" /></svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text/60 leading-relaxed font-normal mb-10 max-w-2xl">
            Founded in 2026, Travelto has grown to become a leading travel agency, providing exceptional experiences and unforgettable memories to thousands of travelers worldwide.
          </p>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full text-text mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#E8F1FA] p-12 rounded-[2.5rem] flex flex-col justify-between   -50">
            <div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-8 ">
                <Globe02Icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-heading mb-4">Global Reach</h3>
              <p className="text-lg text-text/70 leading-relaxed font-medium">With partners in over 120 countries, we offer exclusive access to destinations that most people only dream about. Our local experts ensure you experience the authentic culture of every place you visit.</p>
            </div>
          </div>

          <div className="bg-slate-100 p-12 rounded-[2.5rem] flex flex-col justify-between  relative overflow-hidden" >
            <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            {/* Image Placeholder */}
            <div className="h-64 relative z-10"></div>
          </div>

          <div className="bg-[#FFF8E7] p-12 rounded-[2.5rem] md:col-span-2 flex flex-col md:flex-row gap-12 items-center ">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-cta mb-8 ">
                <Shield01Icon className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold font-heading mb-4">Safe & Secure</h3>
              <p className="text-lg text-text/70 leading-relaxed font-medium">Your safety is our top priority. We provide 24/7 support throughout your journey, comprehensive travel insurance, and strict safety protocols for all our tours spanning the world.</p>
            </div>
            <div className="flex-1 w-full bg-white p-8 rounded-[2rem]  ml-0 lg:ml-12  -100">
              <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
                <div>
                  <span className="block text-5xl font-black font-heading text-primary mb-1">50k+</span>
                  <span className="text-text/50 font-bold uppercase tracking-wider text-xs">Happy Travelers</span>
                </div>
                <div>
                  <span className="block text-5xl font-black font-heading text-cta mb-1">120+</span>
                  <span className="text-text/50 font-bold uppercase tracking-wider text-xs">Destinations</span>
                </div>
                <div>
                  <span className="block text-5xl font-black font-heading text-[#2F6EEA] mb-1">15+</span>
                  <span className="text-text/50 font-bold uppercase tracking-wider text-xs">Years Experience</span>
                </div>
                <div>
                  <span className="block text-5xl font-black font-heading text-green-500 mb-1">4.9</span>
                  <span className="text-text/50 font-bold uppercase tracking-wider text-xs">Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></div>
  );
}
