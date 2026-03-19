import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { orders, packages } from "@/src/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Get order details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const [order] = await db
      .select({
        id: orders.id,
        status: orders.status,
        adults: orders.adults,
        children: orders.children,
        contactFirstName: orders.contactFirstName,
        contactLastName: orders.contactLastName,
        contactEmail: orders.contactEmail,
        contactPhone: orders.contactPhone,
        travelDate: orders.travelDate,
        specialRequests: orders.specialRequests,
        basePrice: orders.basePrice,
        totalPrice: orders.totalPrice,
        priceBreakdown: orders.priceBreakdown,
        createdAt: orders.createdAt,
        package: {
          id: packages.id,
          title: packages.title,
          location: packages.location,
          duration: packages.duration,
          image: packages.image,
          description: packages.description,
          highlights: packages.highlights,
          itinerary: packages.itinerary,
        },
      })
      .from(orders)
      .leftJoin(packages, eq(orders.packageId, packages.id))
      .where(and(eq(orders.id, id), eq(orders.userId, session.user.id)))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
