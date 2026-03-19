import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { packages } from "../src/lib/db/schema/packages";
import { config } from "dotenv";

// Load environment variables (try .env.local first, then .env)
config({ path: ".env.local" });
config({ path: ".env" });

const seedPackages = [
  {
    id: "1",
    title: "Swiss Alps Explorer",
    location: "Switzerland",
    price: 460,
    rating: 4.8,
    reviews: 124,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800",
    description: "Discover the breathtaking beauty of the Swiss Alps. Experience thrilling mountain trails, serene lakes, and the charming alpine culture.",
    highlights: ["Panoramic train rides", "Guided hiking tours", "Premium alpine lodge stay", "Fondue tasting"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", description: "Transfer to your alpine resort and welcome dinner." },
      { day: 2, title: "Mountain Excursion", description: "Cable car ride to the peaks and scenic hiking." },
      { day: 3, title: "Lake Cruise", description: "Relaxing day cruising on a pristine alpine lake." },
      { day: 4, title: "Cultural Tour", description: "Visit traditional villages and cheese factories." },
      { day: 5, title: "Departure", description: "Transfer back to Zurich airport." }
    ]
  },
  {
    id: "2",
    title: "Great Barrier Reef",
    location: "Australia",
    price: 640,
    rating: 4.9,
    reviews: 312,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850d0a5?auto=format&fit=crop&q=80&w=800",
    description: "Dive into the world's largest coral reef system. A perfect blend of adventure and relaxation in tropical Queensland.",
    highlights: ["Scuba diving and snorkeling", "Luxury catamaran sailing", "Rainforest tours", "Beachside dining"],
    itinerary: [
      { day: 1, title: "Arrival in Cairns", description: "Check-in and evening harbor walk." },
      { day: 2, title: "Outer Reef Cruise", description: "Full day snorkeling and diving the outer reef." },
      { day: 3, title: "Daintree Rainforest", description: "Guided tour of the ancient Daintree." },
      { day: 4, title: "Island Hopping", description: "Visit Green Island and Fitzroy Island." },
      { day: 5, title: "Helicopter Tour", description: "Scenic flight over the reef and heart-shaped coral." },
      { day: 6, title: "Leisure Day", description: "Free day for beach relaxation or shopping." },
      { day: 7, title: "Departure", description: "Transfer to airport." }
    ]
  },
  {
    id: "3",
    title: "Venice Italy Romance",
    location: "Italy",
    price: 780,
    rating: 5.0,
    reviews: 428,
    duration: "4 Days",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800",
    description: "Experience the magic of Venice. Drift through romantic canals, admire historic architecture, and indulge in exquisite Italian cuisine.",
    highlights: ["Private gondola ride", "St. Mark's Basilica tour", "Murano glassblowing", "Wine tasting"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Water taxi to hotel and evening walking tour." },
      { day: 2, title: "Classic Venice", description: "Guided tour of Doge's Palace and St. Mark's." },
      { day: 3, title: "Island Tour", description: "Visit Murano and Burano islands." },
      { day: 4, title: "Departure", description: "Final espresso and transfer to airport." }
    ]
  },
  {
    id: "4",
    title: "Santorini Getaway",
    location: "Greece",
    price: 990,
    rating: 4.9,
    reviews: 284,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800",
    description: "Relax in the iconic white-washed villages of Santorini. Watch stunning sunsets over the caldera and sail the Aegean Sea.",
    highlights: ["Sunset catamaran cruise", "Wine tasting at cliffside vineyards", "Volcano hot springs", "Luxury cave suite"],
    itinerary: [
      { day: 1, title: "Arrival in Oia", description: "Check-in to your cliffside suite." },
      { day: 2, title: "Caldera Cruise", description: "Sail around the volcano and swim in hot springs." },
      { day: 3, title: "Wine Tour", description: "Taste Santorini's unique volcanic wines." },
      { day: 4, title: "Fira Exploration", description: "Explore the bustling capital, Fira." },
      { day: 5, title: "Beach Day", description: "Relax at the Red and Black sand beaches." },
      { day: 6, title: "Departure", description: "Transfer to airport or ferry." }
    ]
  },
  {
    id: "5",
    title: "Kyoto Heritage",
    location: "Japan",
    price: 850,
    rating: 4.9,
    reviews: 512,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    description: "Immerse yourself in Japan's cultural heart. Explore ancient temples, walk through bamboo forests, and experience traditional tea ceremonies.",
    highlights: ["Arashiyama Bamboo Grove", "Traditional Tea Ceremony", "Fushimi Inari Shrine", "Geisha district walking tour"],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto", description: "Check-in to a traditional Ryokan." },
      { day: 2, title: "Golden Pavilion & Ryoanji", description: "Visit Kinkaku-ji and the famous rock garden." },
      { day: 3, title: "Arashiyama", description: "Walk through the bamboo forest and monkey park." },
      { day: 4, title: "Fushimi Inari", description: "Hike through thousands of vermilion torii gates." },
      { day: 5, title: "Gion District", description: "Evening walking tour in the Geisha district." },
      { day: 6, title: "Departure", description: "Bullet train to Tokyo or Kansai airport." }
    ]
  },
  {
    id: "6",
    title: "Iceland Aurora",
    location: "Iceland",
    price: 1200,
    rating: 4.8,
    reviews: 195,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800",
    description: "Chase the Northern Lights and explore Iceland's dramatic landscapes of geysers, waterfalls, and black sand beaches.",
    highlights: ["Northern Lights hunting", "Golden Circle tour", "Blue Lagoon spa", "Glacier hiking"],
    itinerary: [
      { day: 1, title: "Arrival in Reykjavik", description: "Check-in and evening Aurora hunt." },
      { day: 2, title: "Golden Circle", description: "Visit Thingvellir, Geysir, and Gullfoss." },
      { day: 3, title: "South Coast", description: "Waterfalls and Reynisfjara black sand beach." },
      { day: 4, title: "Blue Lagoon", description: "Relaxation in the geothermal spa." },
      { day: 5, title: "Departure", description: "Transfer to Keflavik airport." }
    ]
  }
];

async function seed() {
  console.log("🌱 Starting database seed...");
  console.log("📡 Connecting to:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@"));

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("supabase") ? { rejectUnauthorized: false } : undefined,
  });

  const db = drizzle(pool);

  try {
    // Clear existing packages
    console.log("📦 Clearing existing packages...");
    await db.delete(packages);

    // Insert new packages
    console.log("📦 Inserting packages...");
    for (const pkg of seedPackages) {
      await db.insert(packages).values(pkg);
      console.log(`  ✓ Inserted: ${pkg.title}`);
    }

    console.log("\n✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
