import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { packages } from "../../../src/data/packages";
import { Logo } from "../../../src/components/ui/Logo";
import { OrderForm } from "../../../src/components/order/OrderForm";
import { Tick02Icon } from "hugeicons-react";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const pkg = packages.find((p) => p.id === resolvedParams.id);

  if (!pkg) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col font-body">
      <header className="w-full bg-white border-b border-slate-100 py-4 px-6 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <div className="hidden sm:flex items-center gap-3 text-sm font-bold text-text/40 tracking-wide translate-y-1">
            <span className="text-primary flex items-center gap-1.5">
              <Tick02Icon className="w-4 h-4" /> Details
            </span>
            <span className="w-8 h-px bg-slate-300"></span>
            <span className="text-text">Booking</span>
            <span className="w-8 h-px bg-slate-200"></span>
            <span>Confirmation</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <OrderForm pkg={pkg} />
      </main>
    </div>
  );
}
