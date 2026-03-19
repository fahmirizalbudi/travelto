import { NextResponse } from "next/server";

// Static testimonials data (can be moved to database later)
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
    rating: 5,
    comment: "TravelTo made our honeymoon in Santorini absolutely magical! The attention to detail and local recommendations were outstanding.",
    tripTitle: "Santorini Getaway",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
    rating: 5,
    comment: "The Swiss Alps Explorer exceeded all expectations. Perfect organization and breathtaking experiences.",
    tripTitle: "Swiss Alps Explorer",
  },
  {
    id: "3",
    name: "Emma Williams",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150",
    rating: 5,
    comment: "Kyoto Heritage trip was a dream come true. The cultural experiences were authentic and unforgettable.",
    tripTitle: "Kyoto Heritage",
  },
  {
    id: "4",
    name: "James Rodriguez",
    location: "Miami, USA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150",
    rating: 4,
    comment: "Great experience at the Great Barrier Reef. The team was professional and the diving spots were amazing!",
    tripTitle: "Great Barrier Reef",
  },
];

// GET /api/testimonials - Get testimonials
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
