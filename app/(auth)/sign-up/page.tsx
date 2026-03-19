"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../../../src/components/ui/Logo";
import { Input } from "../../../src/components/ui/Input";
import { Button } from "../../../src/components/ui/Button";
import { signUp } from "@/src/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`.trim(),
        callbackURL: "/",
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-body relative z-[100]">
      {/* Left split - Form */}
      <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1 relative bg-white">
        <div className="p-8 w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          </Link>
          <div className="text-text/60 font-medium">
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-primary hover:underline font-medium ml-1"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md flex flex-col">
            <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">
              Create an account
            </h1>
            <p className="text-text/60 mb-10 text-lg">
              Join Travelto and start planning your next adventure.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              <div className="flex flex-col sm:flex-row gap-6">
                <Input
                  id="firstName"
                  type="text"
                  label="First name"
                  placeholder="Ex. John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                />
                <Input
                  id="lastName"
                  type="text"
                  label="Last name"
                  placeholder="Ex. Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="Ex. hello@travelto.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Input
                id="password"
                type="password"
                label="Create a password"
                placeholder="At least 8 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <p className="text-xs text-center text-text/50 mt-2 font-medium">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline hover:text-text">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-text">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Right split - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-100 overflow-hidden order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-12">
          <h2 className="text-4xl font-bold font-heading text-white mb-4">
            Explore the Unseen.
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Create your personalized itinerary and let us handle the rest.
          </p>
        </div>
      </div>
    </div>
  );
}
