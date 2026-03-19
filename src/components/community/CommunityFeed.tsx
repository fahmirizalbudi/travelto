"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Comment01Icon, FavouriteIcon, Share01Icon, Add01Icon } from "hugeicons-react";
import { useSession } from "@/src/lib/auth-client";

interface Post {
  id: string;
  content: string;
  images: string[];
  location: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

// Fallback static posts for when API is not available
const fallbackPosts: Post[] = [
  {
    id: "1",
    content: "Just completed the 5-day explorer package! The fondue tasting at the alpine lodge was the highlight of our trip.",
    images: ["https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800"],
    location: "Swiss Alps",
    likesCount: 324,
    commentsCount: 45,
    createdAt: new Date().toISOString(),
    user: {
      id: "1",
      name: "Alex Murphy",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    },
  },
  {
    id: "2",
    content: "Watching the sunset from our cliffside suite. This place is unbelievable. Thank you Travelto for setting this up!",
    images: ["https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"],
    location: "Santorini, Greece",
    likesCount: 856,
    commentsCount: 112,
    createdAt: new Date().toISOString(),
    user: {
      id: "2",
      name: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    },
  },
  {
    id: "3",
    content: "The bamboo forest in Arashiyama is so serene. Make sure to go early in the morning to beat the crowds.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800"],
    location: "Kyoto, Japan",
    likesCount: 215,
    commentsCount: 28,
    createdAt: new Date().toISOString(),
    user: {
      id: "3",
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    },
  },
];

export function CommunityFeed() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/community/posts");
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      // Keep using fallback posts
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    // Optimistic update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      )
    );

    try {
      await fetch(`/api/community/posts/${postId}/like`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Revert optimistic update
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
              }
            : post
        )
      );
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    if (!newPostContent.trim()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("content", newPostContent);
      if (newPostLocation) {
        formData.append("location", newPostLocation);
      }

      const response = await fetch("/api/community/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPosts((prev) => [data.data, ...prev]);
        setNewPostContent("");
        setNewPostLocation("");
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-10 mb-32">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">
          Traveler&apos;s Hub
        </h1>
        <p className="text-lg md:text-xl text-text/60 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
          Connect with fellow adventurers, share your experiences, and get inspired for your next journey.
        </p>

        {session?.user && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 bg-cta text-white font-medium px-6 py-3 rounded-2xl hover:bg-orange-600 transition-colors"
          >
            <Add01Icon className="w-5 h-5" />
            Share Your Story
          </button>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold font-heading mb-6">Share Your Adventure</h2>
            <form onSubmit={handleCreatePost}>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's your travel story?"
                className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text font-medium resize-none mb-4"
                rows={4}
                required
              />
              <input
                type="text"
                value={newPostLocation}
                onChange={(e) => setNewPostLocation(e.target.value)}
                placeholder="Location (optional)"
                className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text font-medium mb-6"
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 font-medium text-text/70 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-2xl bg-cta text-white font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-100 rounded-[2rem] overflow-hidden animate-pulse">
              <div className="h-64 bg-slate-200"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </div>
                <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#F8FAFC] rounded-[2rem] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              {post.images?.[0] && (
                <div className="h-64 relative overflow-hidden isolate">
                  <div
                    className="absolute inset-0 hover:scale-105 transition-transform duration-700 cursor-pointer"
                    style={{
                      backgroundImage: `url("${post.images[0]}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  {post.location && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text">
                      {post.location}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4 cursor-pointer group">
                  {post.user?.image ? (
                    <div
                      className="w-10 h-10 rounded-full bg-slate-200 group-hover:ring-2 group-hover:ring-primary transition-all"
                      style={{
                        backgroundImage: `url("${post.user.image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {post.user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                  <span className="font-bold text-text group-hover:text-primary transition-colors">
                    {post.user?.name || "Anonymous"}
                  </span>
                </div>

                <p className="text-text/70 leading-relaxed mb-6 flex-1 font-medium">
                  &quot;{post.content}&quot;
                </p>

                <div className="flex items-center justify-between text-text/40 pt-4 font-medium">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.isLiked ? "text-cta" : "hover:text-cta"
                      }`}
                    >
                      <FavouriteIcon className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} />
                      {post.likesCount}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Comment01Icon className="w-5 h-5" /> {post.commentsCount}
                    </button>
                  </div>
                  <button className="hover:text-text transition-colors">
                    <Share01Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <button className="bg-primary text-white font-medium px-8 py-4 rounded-[1.5rem] hover:bg-blue-600 transition-colors cursor-pointer">
          Load More Stories
        </button>
      </div>
    </main>
  );
}
