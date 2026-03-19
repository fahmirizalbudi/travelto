import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { posts, postComments, user } from "@/src/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";
import { v4 as uuidv4 } from "uuid";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/community/posts/[id]/comments - Get comments for a post
export async function GET(request: Request, { params }: RouteParams) {
  try {
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

    // Get comments with user info
    const comments = await db
      .select({
        id: postComments.id,
        content: postComments.content,
        createdAt: postComments.createdAt,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(postComments)
      .leftJoin(user, eq(postComments.userId, user.id))
      .where(eq(postComments.postId, id))
      .orderBy(desc(postComments.createdAt));

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/community/posts/[id]/comments - Create a comment
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
    const { content } = body;

    if (!content || content.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: "Comment content is required" },
        { status: 400 }
      );
    }

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

    // Create comment
    const commentId = uuidv4();
    const [newComment] = await db
      .insert(postComments)
      .values({
        id: commentId,
        postId: id,
        userId: session.user.id,
        content: content.trim(),
      })
      .returning();

    // Update post comments count
    await db
      .update(posts)
      .set({
        commentsCount: post.commentsCount + 1,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id));

    // Get user info for response
    const [commentUser] = await db
      .select({ id: user.id, name: user.name, image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id));

    return NextResponse.json({
      success: true,
      data: {
        ...newComment,
        user: commentUser,
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
