"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useSession } from "@/src/lib/auth-client";
import { Tick02Icon, Location01Icon, Clock01Icon, StarIcon, Calendar03Icon } from "hugeicons-react";

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
  const dateInputRef = useRef<HTMLInputElement>(null);

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

  // Format displayed date
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (success) {
    return (
      <div className="w-full flex flex-col items-center py-16">
        <div className="max-w-xl w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Tick02Icon className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-[48px] font-bold font-heading mb-6 text-text tracking-tight">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-text/60 mb-10 leading-relaxed">
            Your booking for <span className="font-semibold text-text">{pkg.title}</span> has been successfully created. We&apos;ve sent a confirmation email to <span className="font-semibold text-text">{email}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button variant="flat" onClick={() => router.push("/packages")}>
              Browse More Packages
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Left Column - Form */}
      <div className="w-full lg:w-[60%] flex flex-col gap-8">
        {!session?.user && !sessionLoading && (
          <div className="bg-amber-50 p-6 rounded-2xl">
            <p className="text-amber-800 font-medium">
              Please{" "}
              <button
                onClick={() => router.push("/sign-in")}
                className="text-amber-900 underline font-bold cursor-pointer"
              >
                sign in
              </button>{" "}
              to complete your booking.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 p-6 rounded-2xl">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Contact Details Section */}
          <div className="bg-slate-100 p-8 rounded-[2rem] mb-8">
            <h2 className="text-3xl font-bold font-heading mb-8 tracking-tight">
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
                  className="bg-white"
                  required
                />
                <Input
                  id="lname"
                  label="Last Name"
                  placeholder="Ex. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white"
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
                className="bg-white"
                required
              />
              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white"
                required
              />
            </div>
          </div>

          {/* Travel Details Section */}
          <div className="bg-slate-100 p-8 rounded-[2rem] mb-8">
            <h2 className="text-3xl font-bold font-heading mb-8 tracking-tight">
              Travel Details
            </h2>
            <div className="flex flex-col gap-6">
              {/* Custom Date Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-text/80">
                  Travel Date
                </label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    min={minDate}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    required
                  />
                  <div
                    onClick={() => dateInputRef.current?.showPicker()}
                    className="w-full px-5 py-4 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span className={travelDate ? "text-text" : "text-text/40"}>
                      {travelDate ? formatDisplayDate(travelDate) : "Select travel date"}
                    </span>
                    <Calendar03Icon className="w-5 h-5 text-text/40" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2 text-text/80">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text font-medium cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2 text-text/80">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text font-medium cursor-pointer"
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
                <label className="block text-sm font-semibold mb-2 text-text/80">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                  className="w-full px-5 py-4 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text font-medium resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !session?.user}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </Button>
        </form>
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full lg:w-[40%]">
        <div className="sticky top-10 bg-[#F8FAFC] p-8 rounded-[2.5rem]">
          <h3 className="text-2xl font-bold font-heading mb-8 tracking-tight">
            Order Summary
          </h3>
          
          {/* Package Preview */}
          <div className="flex gap-5 mb-8">
            <div
              className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${pkg.image}")` }}
            ></div>
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-lg leading-tight mb-2">{pkg.title}</h4>
              <div className="flex items-center gap-2 text-text/60 text-sm mb-2">
                <Location01Icon className="w-4 h-4" />
                <span>{pkg.location}</span>
              </div>
              <div className="flex items-center gap-2 text-text/60 text-sm">
                <Clock01Icon className="w-4 h-4" />
                <span>{pkg.duration}</span>
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-2 rounded-full mb-8">
            <StarIcon className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary font-bold text-sm">{pkg.rating} Excellent</span>
          </div>

          {/* Trip Details */}
          <div className="flex flex-col gap-4 py-6 mb-6 text-sm font-semibold text-text/70">
            <div className="w-full h-px bg-text/10"></div>
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
            <div className="w-full h-px bg-text/10"></div>
          </div>

          {/* Price Breakdown */}
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

          {/* Total */}
          <div className="w-full h-px bg-text/10 mb-6"></div>
          <div className="flex justify-between items-end">
            <span className="font-bold text-text font-heading text-lg">Total Payment</span>
            <span className="text-3xl font-bold text-primary font-heading">
              ${priceBreakdown?.total || pkg.price * adults + Math.round(pkg.price * adults * 0.1)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
