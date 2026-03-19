import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { posts, postLikes } from "@/src/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";
import { v4 as uuidv4 } from "uuid";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/community/posts/[id]/like - Toggle like on a post
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

    // Check if post exists
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user already liked the post
    const [existingLike] = await db
      .select()
      .from(postLikes)
      .where(
        and(eq(postLikes.postId, id), eq(postLikes.userId, session.user.id))
      )
      .limit(1);

    let isLiked: boolean;
    let newLikesCount: number;

    if (existingLike) {
      // Unlike the post
      await db
        .delete(postLikes)
        .where(
          and(eq(postLikes.postId, id), eq(postLikes.userId, session.user.id))
        );

      newLikesCount = Math.max(0, post.likesCount - 1);
      isLiked = false;
    } else {
      // Like the post
      await db.insert(postLikes).values({
        id: uuidv4(),
        postId: id,
        userId: session.user.id,
      });

      newLikesCount = post.likesCount + 1;
      isLiked = true;
    }

    // Update post likes count
    await db
      .update(posts)
      .set({
        likesCount: newLikesCount,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id));

    return NextResponse.json({
      success: true,
      data: {
        isLiked,
        likesCount: newLikesCount,
      },
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
