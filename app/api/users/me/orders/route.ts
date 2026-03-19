import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { orders, packages } from "@/src/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";

// GET /api/users/me/orders - Get current user's orders
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const userOrders = await db
      .select({
        id: orders.id,
        status: orders.status,
        adults: orders.adults,
        children: orders.children,
        travelDate: orders.travelDate,
        totalPrice: orders.totalPrice,
        createdAt: orders.createdAt,
        package: {
          id: packages.id,
          title: packages.title,
          location: packages.location,
          duration: packages.duration,
          image: packages.image,
        },
      })
      .from(orders)
      .leftJoin(packages, eq(orders.packageId, packages.id))
      .where(eq(orders.userId, session.user.id))
      .orderBy(desc(orders.createdAt));

    return NextResponse.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
