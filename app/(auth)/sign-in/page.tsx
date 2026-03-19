"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../../../src/components/ui/Logo";
import { Input } from "../../../src/components/ui/Input";
import { signIn } from "@/src/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password");
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

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-body relative z-[100]">
      {/* Left split - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-100 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-12">
          <h2 className="text-4xl font-bold font-heading text-white mb-4">
            Start your journey.
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Discover the most breathtaking destinations around the globe with
            Travelto.
          </p>
        </div>
      </div>

      {/* Right split - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative bg-white">
        <div className="p-8 w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          </Link>
          <div className="text-text/60 font-medium">
            New to Travelto?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline font-medium ml-1"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md flex flex-col">
            <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">
              Welcome back
            </h1>
            <p className="text-text/60 mb-10 text-lg">
              Enter your details to access your account.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
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
              <div>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-sm font-medium text-cta hover:text-orange-600 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1E293B] text-white hover:bg-[#0F172A] py-4 rounded-2xl font-medium text-lg mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in to account"}
              </button>

              <div className="relative flex items-center justify-center mt-6 mb-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-4 text-sm text-text/40 font-medium">
                  Or continue with
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white text-text hover:bg-slate-100 py-4 rounded-2xl font-medium text-base transition-colors border border-slate-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
