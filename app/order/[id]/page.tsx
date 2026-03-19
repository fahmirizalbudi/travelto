import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { packages } from '../../../src/data/packages';
import { Logo } from '../../../src/components/ui/Logo';
import { Input } from '../../../src/components/ui/Input';
import { Tick02Icon } from 'hugeicons-react';

export default async function OrderPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const pkg = packages.find(p => p.id === resolvedParams.id);

  if (!pkg) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col font-body">
      <header className="w-full bg-white  -100 py-4 px-6 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            
          </Link>
          <div className="hidden sm:flex items-center gap-3 text-sm font-bold text-text/40 tracking-wide translate-y-1">
            <span className="text-primary flex items-center gap-1.5"><Tick02Icon className="w-4 h-4" /> Details</span>
            <span className="w-8 h-px bg-slate-300"></span>
            <span className="text-text">Payment</span>
            <span className="w-8 h-px bg-slate-200"></span>
            <span>Confirmation</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Form: Contact & Payment */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <div className="bg-white p-8 rounded-[2rem]   -100 font-body">
            <h2 className="text-3xl font-extrabold font-heading mb-8 tracking-tight">Contact Details</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Input id="fname" label="First Name" placeholder="Ex. John" />
                <Input id="lname" label="Last Name" placeholder="Ex. Doe" />
              </div>
              <Input id="email" type="email" label="Email Address" placeholder="hello@example.com" />
              <Input id="phone" type="tel" label="Phone Number" placeholder="+1 (555) 000-0000" />
            </form>
          </div>

          <div className="bg-white p-8 rounded-[2rem]   -100">
            <h2 className="text-3xl font-extrabold font-heading mb-8 tracking-tight">Payment Method</h2>
            <div className="flex flex-col gap-4 mb-8">
              <label className="flex items-center justify-between p-5   rounded-2xl bg-primary/5 cursor-pointer transition-all">
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" className="w-5 h-5 accent-primary cursor-pointer" defaultChecked />
                  <span className="font-bold text-lg">Credit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md opacity-90"></div>
                  <div className="w-10 h-6 bg-blue-600 rounded-md flex items-center justify-center italic text-white text-[9px] font-black">VISA</div>
                </div>
              </label>
              <label className="flex items-center justify-between p-5  -200 rounded-2xl hover:bg-white cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" className="w-5 h-5 accent-primary cursor-pointer" />
                  <span className="font-bold text-lg text-text/80">PayPal</span>
                </div>
              </label>
            </div>

            <form className="flex flex-col gap-6">
              <Input id="cc" label="Card Number" placeholder="0000 0000 0000 0000" />
              <div className="flex flex-col sm:flex-row gap-6">
                <Input id="exp" label="Expiry Date" placeholder="MM/YY" />
                <Input id="cvv" label="CVV" placeholder="123" />
              </div>
            </form>
          </div>

          <button className="w-full bg-[#1E293B] text-white hover:bg-[#0F172A] hover:-translate-y-1 py-5 rounded-2xl font-medium text-xl transition-all  flex justify-center items-center gap-2 h-16 cursor-pointer">
            Complete Booking
          </button>
        </div>

        {/* Right Info: Order Summary Sticky Widget */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-white p-8 rounded-[2rem]   -100 sticky top-10">
            <h3 className="text-2xl font-extrabold font-heading mb-8 tracking-tight">Order Summary</h3>
            <div className="flex gap-5 mb-8">
              <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0" style={{ backgroundImage: `url("${pkg.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-lg leading-tight mb-2">{pkg.title}</h4>
                <p className="text-text/60 text-sm font-medium">{pkg.duration} • {pkg.location}</p>
                <div className="mt-3 text-primary font-bold bg-primary/10 w-fit px-3 py-1 rounded-full text-xs">⭐ {pkg.rating} Excellent</div>
              </div>
            </div>

            <div className="flex flex-col gap-4  -100 py-6 mb-6 text-sm font-semibold text-text/70">
              <div className="flex justify-between items-center">
                <span>Date</span>
                <span className="text-text">Aug 15, 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Travelers</span>
                <span className="text-text">2 Adults</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm font-semibold mb-8">
              <div className="flex justify-between items-center">
                <span className="text-text/70">Package cost (x2)</span>
                <span>${pkg.price * 2}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text/70">Taxes & Fees</span>
                <span>${Math.round(pkg.price * 2 * 0.1)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6  -100 mt-auto bg-white -mx-8 -mb-8 px-8 pb-8 rounded-b-[2rem]">
              <div>
                <span className="block text-sm text-text/60 font-semibold mb-1">Total Payment</span>
                <span className="text-4xl font-black text-cta font-heading">${(pkg.price * 2) + Math.round(pkg.price * 2 * 0.1)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
