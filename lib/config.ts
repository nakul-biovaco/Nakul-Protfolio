/**
 * Application Configuration
 */

// Centralized URLs for Attendance Insights
export const ATTENDANCE_INSIGHTS_GITHUB_URL =
  process.env.NEXT_PUBLIC_ATTENDANCE_INSIGHTS_GITHUB_URL ||
  "https://github.com/nakul-biovaco/Attendance-Extension-RCOEM"

export const ATTENDANCE_INSIGHTS_STORE_URL =
  process.env.NEXT_PUBLIC_ATTENDANCE_INSIGHTS_STORE_URL ||
  "https://github.com/nakul-biovaco/Attendance-Extension-RCOEM"

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Deduplication window in milliseconds (clicks within this window from same session count as 1 unique session)
  dedupWindowMs: 5 * 60 * 1000, // 5 minutes
  // Maximum requests per minute per IP for spam prevention
  rateLimitPerMinute: 30,
  // Admin password for protected analytics dashboard
  adminPassword: process.env.ADMIN_ANALYTICS_PASSWORD || "nakul-analytics-2025",
}
