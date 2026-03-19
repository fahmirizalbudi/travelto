import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { packages, orders, user, posts } from "@/src/lib/db/schema";
import { sql, eq } from "drizzle-orm";

// GET /api/stats - Get platform statistics
export async function GET() {
  try {
    // Get counts from database
    const [packagesCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(packages);

    const [usersCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(user);

    const [ordersCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(orders)
      .where(eq(orders.status, "completed"));

    const [postsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts);

    // Calculate destinations (unique locations)
    const locations = await db
      .selectDistinct({ location: packages.location })
      .from(packages);

    return NextResponse.json({
      success: true,
      data: {
        totalPackages: Number(packagesCount.count),
        totalUsers: Number(usersCount.count),
        completedTrips: Number(ordersCount.count),
        communityPosts: Number(postsCount.count),
        destinations: locations.length,
        // Static stats for display (can be made dynamic later)
        customerSatisfaction: 98,
        yearsOfService: 5,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return default stats if database is not available
    return NextResponse.json({
      success: true,
      data: {
        totalPackages: 6,
        totalUsers: 0,
        completedTrips: 0,
        communityPosts: 0,
        destinations: 6,
        customerSatisfaction: 98,
        yearsOfService: 5,
      },
    });
  }
}
