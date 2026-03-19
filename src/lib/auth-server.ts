import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Get the current session from the server side
 * Use this in Server Components and API routes
 */
export async function getServerSession() {
  const headersList = await headers();
  return auth.api.getSession({
    headers: headersList,
  });
}

/**
 * Require authentication - throws if not authenticated
 * Use this to protect server-side routes
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
