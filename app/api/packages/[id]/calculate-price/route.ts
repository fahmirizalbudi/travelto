import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { packages } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/packages/[id]/calculate-price - Calculate total price for booking
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { adults = 1, children = 0 } = body;

    // Validate inputs
    if (adults < 1) {
      return NextResponse.json(
        { success: false, error: "At least 1 adult is required" },
        { status: 400 }
      );
    }

    if (children < 0) {
      return NextResponse.json(
        { success: false, error: "Children count cannot be negative" },
        { status: 400 }
      );
    }

    // Get package details
    const [pkg] = await db
      .select()
      .from(packages)
      .where(eq(packages.id, id))
      .limit(1);

    if (!pkg) {
      return NextResponse.json(
        { success: false, error: "Package not found" },
        { status: 404 }
      );
    }

    // Calculate prices
    const adultPrice = pkg.price;
    const childPrice = Math.round(pkg.price * 0.5); // 50% discount for children
    const subtotal = adults * adultPrice + children * childPrice;
    const taxes = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + taxes;

    return NextResponse.json({
      success: true,
      data: {
        packageId: pkg.id,
        packageTitle: pkg.title,
        adults,
        children,
        adultPrice,
        childPrice,
        subtotal,
        taxes,
        total,
        currency: "USD",
      },
    });
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}
