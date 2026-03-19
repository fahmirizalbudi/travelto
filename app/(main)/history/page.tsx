import React from "react";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { HistoryContent } from "@/src/components/history/HistoryContent";

export default async function HistoryPage() {
  // Server-side auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* Hero Section - Server rendered */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-4">
            Booking History
          </h1>
          <p className="text-lg md:text-xl text-text/60 max-w-2xl">
            View and manage all your travel bookings in one place.
          </p>
        </div>
      </section>

      {/* Content - Client component for interactivity */}
      <section className="pb-16 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <HistoryContent />
        </div>
      </section>
    </div>
  );
}
