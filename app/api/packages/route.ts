import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { packages } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/packages - List all packages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let query = db.select().from(packages);

    // Apply filters if provided
    const allPackages = await query;

    let filteredPackages = allPackages;

    if (location) {
      filteredPackages = filteredPackages.filter((pkg) =>
        pkg.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minPrice) {
      filteredPackages = filteredPackages.filter(
        (pkg) => pkg.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredPackages = filteredPackages.filter(
        (pkg) => pkg.price <= parseInt(maxPrice)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredPackages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
