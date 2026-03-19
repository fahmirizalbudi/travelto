"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/Input";
import { useSession } from "@/src/lib/auth-client";

interface Package {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  duration: string;
  image: string;
}

interface PriceBreakdown {
  adults: number;
  children: number;
  adultPrice: number;
  childPrice: number;
  subtotal: number;
  taxes: number;
  total: number;
}

interface OrderFormProps {
  pkg: Package;
}

export function OrderForm({ pkg }: OrderFormProps) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name) {
        const nameParts = session.user.name.split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
      }
    }
  }, [session]);

  // Calculate price when travelers change
  useEffect(() => {
    const calculatePrice = async () => {
      setIsCalculating(true);
      try {
        const response = await fetch(`/api/packages/${pkg.id}/calculate-price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adults, children }),
        });
        const data = await response.json();
        if (data.success) {
          setPriceBreakdown(data.data);
        }
      } catch (err) {
        console.error("Failed to calculate price:", err);
      } finally {
        setIsCalculating(false);
      }
    };

    calculatePrice();
  }, [pkg.id, adults, children]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    if (!travelDate) {
      setError("Please select a travel date");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkg.id,
          adults,
          children,
          contactFirstName: firstName,
          contactLastName: lastName,
          contactEmail: email,
          contactPhone: phone,
          travelDate,
          specialRequests: specialRequests || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to create booking");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for minimum date input
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  if (success) {
    return (
      <div className="w-full lg:w-[60%] flex flex-col gap-8">
        <div className="bg-green-50 border border-green-200 p-8 rounded-[2rem] text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold font-heading mb-4 text-green-800">Booking Confirmed!</h2>
          <p className="text-green-700 mb-6">
            Your booking for {pkg.title} has been successfully created. We&apos;ve sent a confirmation email to {email}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-2xl font-medium transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.push("/packages")}
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-2xl font-medium transition-colors border border-green-200"
            >
              Browse More Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Left Form: Contact & Booking */}
      <div className="w-full lg:w-[60%] flex flex-col gap-8">
        {!session?.user && !sessionLoading && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <p className="text-amber-800 font-medium">
              Please{" "}
              <button
                onClick={() => router.push("/sign-in")}
                className="text-amber-900 underline font-bold"
              >
                sign in
              </button>{" "}
              to complete your booking.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 font-body mb-8">
            <h2 className="text-3xl font-extrabold font-heading mb-8 tracking-tight">
              Contact Details
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Input
                  id="fname"
                  label="First Name"
                  placeholder="Ex. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  id="lname"
                  label="Last Name"
                  placeholder="Ex. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 mb-8">
            <h2 className="text-3xl font-extrabold font-heading mb-8 tracking-tight">
              Travel Details
            </h2>
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-text/70">
                  Travel Date
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-text font-medium"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-2 text-text/70">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-text font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-2 text-text/70">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-text font-medium"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n !== 1 ? "ren" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-text/70">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-text font-medium resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !session?.user}
            className="w-full bg-[#1E293B] text-white hover:bg-[#0F172A] hover:-translate-y-1 py-5 rounded-2xl font-medium text-xl transition-all flex justify-center items-center gap-2 h-16 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </button>
        </form>
      </div>

      {/* Right Info: Order Summary Sticky Widget */}
      <div className="w-full lg:w-[40%]">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 sticky top-10">
          <h3 className="text-2xl font-extrabold font-heading mb-8 tracking-tight">
            Order Summary
          </h3>
          <div className="flex gap-5 mb-8">
            <div
              className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                backgroundImage: `url("${pkg.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-lg leading-tight mb-2">{pkg.title}</h4>
              <p className="text-text/60 text-sm font-medium">
                {pkg.duration} &bull; {pkg.location}
              </p>
              <div className="mt-3 text-primary font-bold bg-primary/10 w-fit px-3 py-1 rounded-full text-xs">
                {pkg.rating} Excellent
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 py-6 mb-6 text-sm font-semibold text-text/70">
            <div className="flex justify-between items-center">
              <span>Date</span>
              <span className="text-text">
                {travelDate
                  ? new Date(travelDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select a date"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Travelers</span>
              <span className="text-text">
                {adults} Adult{adults > 1 ? "s" : ""}
                {children > 0 && `, ${children} Child${children > 1 ? "ren" : ""}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm font-semibold mb-8">
            {isCalculating ? (
              <div className="text-text/50 text-center py-4">Calculating...</div>
            ) : priceBreakdown ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-text/70">
                    Adults ({priceBreakdown.adults} x ${priceBreakdown.adultPrice})
                  </span>
                  <span>${priceBreakdown.adults * priceBreakdown.adultPrice}</span>
                </div>
                {priceBreakdown.children > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">
                      Children ({priceBreakdown.children} x ${priceBreakdown.childPrice})
                    </span>
                    <span>${priceBreakdown.children * priceBreakdown.childPrice}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-text/70">Taxes & Fees</span>
                  <span>${priceBreakdown.taxes}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-text/70">Package cost (x{adults})</span>
                  <span>${pkg.price * adults}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text/70">Taxes & Fees</span>
                  <span>${Math.round(pkg.price * adults * 0.1)}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto bg-white -mx-8 -mb-8 px-8 pb-8 rounded-b-[2rem]">
            <div>
              <span className="block text-sm text-text/60 font-semibold mb-1">
                Total Payment
              </span>
              <span className="text-4xl font-black text-cta font-heading">
                ${priceBreakdown?.total || pkg.price * adults + Math.round(pkg.price * adults * 0.1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
