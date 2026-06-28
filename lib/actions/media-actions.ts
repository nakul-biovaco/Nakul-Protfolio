"use server"

import { mediaAPI } from "@/lib/api"
import type { MediaComment } from "@/lib/api"

export async function likeMediaAction(mediaId: string): Promise<{ success: boolean; newLikesCount: number }> {
  try {
    // Get client IP for tracking (in a real app, you'd want to prevent duplicate likes)
    const headers = await import("next/headers")
    const headersList = headers.headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIP = headersList.get("x-real-ip")
    const ipAddress = forwardedFor?.split(",")[0] || realIP || "unknown"

    const result = await mediaAPI.likeMedia(mediaId, ipAddress)
    return result
  } catch (error) {
    console.error("Like media action failed:", error)
    return { success: false, newLikesCount: 0 }
  }
}

export async function addCommentAction(
  mediaId: string,
  userName: string,
  commentText: string,
): Promise<{ success: boolean; newComment: MediaComment | null }> {
  try {
    const result = await mediaAPI.addComment(mediaId, userName, commentText)
    return result
  } catch (error) {
    console.error("Add comment action failed:", error)
    return { success: false, newComment: null }
  }
}
