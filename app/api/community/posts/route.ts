import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { posts, postLikes, user } from "@/src/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { getServerSession } from "@/src/lib/auth-server";
import { v4 as uuidv4 } from "uuid";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET /api/community/posts - Get all posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const session = await getServerSession();
    const currentUserId = session?.user?.id;

    const allPosts = await db
      .select({
        id: posts.id,
        content: posts.content,
        images: posts.images,
        location: posts.location,
        likesCount: posts.likesCount,
        commentsCount: posts.commentsCount,
        createdAt: posts.createdAt,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(posts)
      .leftJoin(user, eq(posts.userId, user.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // Check if current user has liked each post
    let postsWithLikeStatus = allPosts;
    if (currentUserId) {
      const userLikes = await db
        .select({ postId: postLikes.postId })
        .from(postLikes)
        .where(eq(postLikes.userId, currentUserId));

      const likedPostIds = new Set(userLikes.map((l) => l.postId));
      postsWithLikeStatus = allPosts.map((post) => ({
        ...post,
        isLiked: likedPostIds.has(post.id),
      }));
    }

    return NextResponse.json({
      success: true,
      data: postsWithLikeStatus,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/community/posts - Create a new post
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const content = formData.get("content") as string;
    const location = formData.get("location") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    if (!content || content.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    // Handle image uploads
    const imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "posts");
      await mkdir(uploadsDir, { recursive: true });

      for (const file of imageFiles) {
        if (file.size > 0) {
          // Validate file type
          const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
          if (!allowedTypes.includes(file.type)) {
            continue;
          }

          // Validate file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            continue;
          }

          const ext = file.name.split(".").pop() || "jpg";
          const filename = `${uuidv4()}.${ext}`;
          const filepath = path.join(uploadsDir, filename);

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);

          imageUrls.push(`/uploads/posts/${filename}`);
        }
      }
    }

    // Create post
    const postId = uuidv4();
    const [newPost] = await db
      .insert(posts)
      .values({
        id: postId,
        userId: session.user.id,
        content: content.trim(),
        images: imageUrls,
        location: location?.trim() || null,
      })
      .returning();

    // Fetch user info for response
    const [postUser] = await db
      .select({ id: user.id, name: user.name, image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id));

    return NextResponse.json({
      success: true,
      data: {
        ...newPost,
        user: postUser,
        isLiked: false,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
