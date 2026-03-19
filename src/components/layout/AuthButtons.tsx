"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client";

export function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-20 h-8 bg-slate-200 rounded-lg animate-pulse hidden md:block"></div>
        <div className="w-24 h-11 bg-slate-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium text-sm">
                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <span className="text-text/80 font-medium max-w-[120px] truncate">
            {session.user.name || session.user.email}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-[#1E293B] text-white hover:bg-[#0F172A] px-6 py-2.5 rounded-2xl font-medium transition-colors duration-200 cursor-pointer text-center text-sm"
        >
          Sign out
        </button>
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
