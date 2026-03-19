import React from "react";
import { notFound } from "next/navigation";
import { packages } from "../../../src/data/packages";
import { Header } from "../../../src/components/layout/Header";
import { Footer } from "../../../src/components/layout/Footer";
import { OrderForm } from "../../../src/components/order/OrderForm";
import { StarIcon, Location01Icon, Clock01Icon } from "hugeicons-react";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const pkg = packages.find((p) => p.id === resolvedParams.id);

  if (!pkg) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      <Header />

      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-slate-100 overflow-hidden rounded-b-[3rem]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("${pkg.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cta text-white px-4 py-1.5 rounded-full text-sm font-bold">
                {pkg.location}
              </span>
              <div className="flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                <StarIcon className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-bold">{pkg.rating}</span>
              </div>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold font-heading text-white tracking-tight leading-tight mb-4">
              Book {pkg.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Clock01Icon className="w-4 h-4" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Location01Icon className="w-4 h-4" />
                <span>{pkg.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto w-full px-6 py-16 flex flex-col lg:flex-row gap-12">
        <OrderForm pkg={pkg} />
      </main>

      <Footer />
    </div>
  );
}
