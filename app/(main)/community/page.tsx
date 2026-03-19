import React from "react";
import { CommunityFeed } from "@/src/components/community/CommunityFeed";

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      <CommunityFeed />
    </div>
  );
}
