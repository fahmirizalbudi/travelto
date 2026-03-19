import React from 'react';


import { Comment01Icon, FavouriteIcon, Share01Icon } from 'hugeicons-react';

const posts = [
  { id: 1, author: 'Alex Murphy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800', location: 'Swiss Alps', text: 'Just completed the 5-day explorer package! The fondue tasting at the alpine lodge was the highlight of our trip.', likes: 324, comments: 45 },
  { id: 2, author: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800', location: 'Santorini, Greece', text: 'Watching the sunset from our cliffside suite. This place is unbelievable. Thank you Travelto for setting this up!', likes: 856, comments: 112 },
  { id: 3, author: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', location: 'Kyoto, Japan', text: 'The bamboo forest in Arashiyama is so serene. Make sure to go early in the morning to beat the crowds.', likes: 215, comments: 28 },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-body"><main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-10 mb-32">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-[48px] md:text-[64px] font-bold font-heading text-text tracking-tight leading-tight mb-6">Traveler's Hub</h1>
        <p className="text-lg md:text-xl text-text/60 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">Connect with fellow adventurers, share your experiences, and get inspired for your next journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-[#F8FAFC] rounded-[2rem] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
            <div className="h-64 relative overflow-hidden isolate">
              <div className="absolute inset-0 hover:scale-105 transition-transform duration-700 cursor-pointer" style={{ backgroundImage: `url("${post.image}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-text ">
                {post.location}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-200   group-hover: transition-colors" style={{ backgroundImage: `url("${post.avatar}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <span className="font-bold text-text group-hover:text-primary transition-colors">{post.author}</span>
              </div>

              <p className="text-text/70 leading-relaxed mb-6 flex-1 font-medium">"{post.text}"</p>

              <div className="flex items-center justify-between text-text/40 pt-4  -100 font-medium">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 hover:text-cta transition-colors">
                    <FavouriteIcon className="w-5 h-5" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Comment01Icon className="w-5 h-5" /> {post.comments}
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

      <div className="mt-16 text-center">
        <button className="bg-primary text-white font-medium px-8 py-4 rounded-[1.5rem] hover:bg-blue-600 transition-colors cursor-pointer">
          Load More Stories
        </button>
      </div>
    </main></div>
  );
}
