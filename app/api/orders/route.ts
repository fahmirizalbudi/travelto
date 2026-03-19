import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { orders, packages } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Validation schema for order creation
const createOrderSchema = z.object({
  packageId: z.string().min(1, "Package ID is required"),
  adults: z.number().int().min(1, "At least 1 adult required"),
  children: z.number().int().min(0).default(0),
  contactFirstName: z.string().min(2, "First name is required"),
  contactLastName: z.string().min(2, "Last name is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(10, "Valid phone number is required"),
  travelDate: z.string().transform((str) => new Date(str)),
  specialRequests: z.string().optional(),
});

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Verify package exists and get price
    const [pkg] = await db
      .select()
      .from(packages)
      .where(eq(packages.id, data.packageId))
      .limit(1);

    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    // Validate travel date is in the future
    if (data.travelDate <= new Date()) {
      return NextResponse.json(
        { success: false, error: "Travel date must be in the future" },
        { status: 400 }
      );
    }

    // Calculate prices
    const adultPrice = pkg.price;
    const childPrice = Math.round(pkg.price * 0.5);
    const subtotal = data.adults * adultPrice + data.children * childPrice;
    const taxes = Math.round(subtotal * 0.1);
    const total = subtotal + taxes;

    const priceBreakdown = {
      adults: data.adults,
      children: data.children,
      adultPrice,
      childPrice,
      subtotal,
      taxes,
      total,
    };

    // Create order
    const orderId = uuidv4();
    const [newOrder] = await db
      .insert(orders)
      .values({
        id: orderId,
        userId: session.user.id,
        packageId: data.packageId,
        status: "pending",
        adults: data.adults,
        children: data.children,
        contactFirstName: data.contactFirstName,
        contactLastName: data.contactLastName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        travelDate: data.travelDate,
        specialRequests: data.specialRequests,
        basePrice: pkg.price,
        totalPrice: total,
        priceBreakdown,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: {
        ...newOrder,
        package: {
          id: pkg.id,
          title: pkg.title,
          location: pkg.location,
          duration: pkg.duration,
          image: pkg.image,
        },
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get current user's orders (requires auth)
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
      .where(eq(orders.userId, session.user.id));

    return NextResponse.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
