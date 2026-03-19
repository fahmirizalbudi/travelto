import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { packages } from '../../../../src/data/packages';
import { StarIcon, Location01Icon, Clock01Icon, Tick02Icon } from 'hugeicons-react';
import { Input } from '../../../../src/components/ui/Input';
import { Button } from '../../../../src/components/ui/Button';

export default async function PackageDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const pkg = packages.find(p => p.id === resolvedParams.id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Header for Detail */}
      <div className="w-full h-[60vh] md:h-[70vh] relative mt-0 bg-slate-100 overflow-hidden rounded-b-[3rem]">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="w-full h-full" style={{ backgroundImage: `url("${pkg.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 h-full flex items-end pb-16">
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-cta text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide">{pkg.location}</span>
              <div className="flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                <StarIcon className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-bold">{pkg.rating} <span className="font-normal opacity-70">({pkg.reviews} reviews)</span></span>
              </div>
            </div>
            <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-white tracking-tight leading-tight">
              {pkg.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <main className="max-w-7xl mx-auto px-6 w-full py-16 flex flex-col lg:flex-row gap-16">
        {/* Left Column - Details */}
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          {/* Overview */}
          <section>
            <div className="flex flex-wrap gap-8 py-6 mb-8 bg-[#F8FAFC] px-8 rounded-[2rem]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary"><Clock01Icon className="w-5 h-5" /></div>
                <div><p className="text-sm text-text/50 font-normal">Duration</p><p className="font-bold text-lg">{pkg.duration}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-cta"><Location01Icon className="w-5 h-5" /></div>
                <div><p className="text-sm text-text/50 font-normal">Location</p><p className="font-bold text-lg">{pkg.location}</p></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold font-heading mb-4">Overview</h2>
            <p className="text-lg text-text/70 leading-relaxed font-normal">{pkg.description}</p>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-3xl font-bold font-heading mb-6">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-2xl">
                  <Tick02Icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-normal text-text/80">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="text-3xl font-bold font-heading mb-8">Itinerary</h2>
            <div className="flex flex-col gap-8 relative">
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-100 -z-10"></div>
              {pkg.itinerary.map((day, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 text-primary font-bold">
                    D{day.day}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-bold mb-2">{day.title}</h3>
                    <p className="text-text/60 leading-relaxed font-normal">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Booking Widget Adjusted Neutral Colors */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-10 bg-slate-100 p-8 rounded-[2.5rem] overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-cta text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase mb-6 relative z-10">
              <StarIcon className="w-4 h-4 fill-current" />
              Top Choice
            </div>

            <div className="flex items-end gap-2 mb-8 relative z-10">
              <span className="text-4xl font-bold font-heading text-text">${pkg.price}</span>
              <span className="text-text/60 font-normal tracking-wide mb-1 text-sm">/ PERSON</span>
            </div>

            <div className="flex flex-col gap-4 mb-8 relative z-10">
              <Input
                id="bookingDate"
                type="date"
                label="Select Date"
                className="bg-white"
              />
              <Input
                id="travelersCount"
                type="number"
                label="Travelers"
                placeholder="Number of travelers"
                min={1}
                defaultValue={2}
                className="bg-white"
              />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center font-normal text-text/80 mb-3 text-sm">
                <span>Total Overview</span>
                <span className="font-bold">${pkg.price * 2}</span>
              </div>
              <div className="flex justify-between items-center font-normal text-text/80 mb-6 text-sm">
                <span>Taxes & Fees</span>
                <span className="font-bold">${Math.round(pkg.price * 2 * 0.1)}</span>
              </div>

              <div className="w-full h-px bg-text/10 my-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-text font-heading text-lg">Total Payment</span>
                <span className="text-3xl font-bold text-primary font-heading leading-tight">${(pkg.price * 2) + Math.round(pkg.price * 2 * 0.1)}</span>
              </div>

              <Link href={`/order/${pkg.id}`} className="block w-full">
                <Button className="w-full py-4 text-base rounded-[1.5rem] cursor-pointer">
                  Confirm Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
