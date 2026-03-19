import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { reviews, packages, user } from "@/src/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";
import { v4 as uuidv4 } from "uuid";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/packages/[id]/reviews - Get reviews for a package
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verify package exists
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

    // Get reviews with user info
    const packageReviews = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(reviews)
      .leftJoin(user, eq(reviews.userId, user.id))
      .where(eq(reviews.packageId, id))
      .orderBy(desc(reviews.createdAt));

    return NextResponse.json({
      success: true,
      data: packageReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/packages/[id]/reviews - Create a review
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
    const body = await request.json();
    const { rating, comment } = body;

    // Validate inputs
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Comment must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Verify package exists
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

    // Create review
    const reviewId = uuidv4();
    const [newReview] = await db
      .insert(reviews)
      .values({
        id: reviewId,
        packageId: id,
        userId: session.user.id,
        rating,
        comment: comment.trim(),
      })
      .returning();

    // Update package rating and review count
    const allReviews = await db
      .select({ rating: reviews.rating })
      .from(reviews)
      .where(eq(reviews.packageId, id));

    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await db
      .update(packages)
      .set({
        rating: Math.round(avgRating * 10) / 10,
        reviews: allReviews.length,
        updatedAt: new Date(),
      })
      .where(eq(packages.id, id));

    return NextResponse.json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create review" },
      { status: 500 }
    );
  }
}
