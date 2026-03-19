import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { orders } from "@/src/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/orders/[id]/cancel - Cancel an order
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Get the order
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.userId, session.user.id)))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Check if order can be cancelled
    if (order.status === "cancelled") {
      return NextResponse.json(
        { success: false, error: "Order is already cancelled" },
        { status: 400 }
      );
    }

    if (order.status === "completed") {
      return NextResponse.json(
        { success: false, error: "Completed orders cannot be cancelled" },
        { status: 400 }
      );
    }

    // Cancel the order
    const [updatedOrder] = await db
      .update(orders)
      .set({
        status: "cancelled",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}
