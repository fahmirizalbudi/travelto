import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { packages } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/packages/[id] - Get package by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    return NextResponse.json({
      success: true,
      data: pkg,
    });
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch package" },
      { status: 500 }
    );
  }
}
