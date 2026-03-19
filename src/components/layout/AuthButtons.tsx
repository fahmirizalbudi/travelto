"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client";
import { Clock01Icon, Logout01Icon } from "hugeicons-react";

export function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {getInitials(session.user.name, session.user.email)}
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl py-2 z-50">
            {/* User info */}
            <div className="px-4 py-3">
              <p className="font-semibold text-text truncate">
                {session.user.name || "User"}
              </p>
              <p className="text-sm text-text/60 truncate">
                {session.user.email}
              </p>
            </div>

            <div className="h-px bg-slate-100 mx-4 my-1"></div>

            {/* Menu items */}
            <Link
              href="/history"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-text/80 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Clock01Icon className="w-5 h-5" />
              <span className="font-medium">Booking History</span>
            </Link>

            <div className="h-px bg-slate-100 mx-4 my-1"></div>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Logout01Icon className="w-5 h-5" />
              <span className="font-medium">Sign out</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/sign-in"
        className="text-text/80 font-medium hover:text-text transition-colors cursor-pointer hidden md:block"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="bg-[#1E293B] text-white hover:bg-[#0F172A] px-8 py-3 rounded-2xl font-medium transition-colors duration-200 cursor-pointer text-center"
      >
        Sign up
      </Link>
    </div>
  );
}
