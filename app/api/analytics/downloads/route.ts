import { NextRequest, NextResponse } from "next/server"
import { getAnalyticsSummary } from "@/lib/download-events"
import { ANALYTICS_CONFIG } from "@/lib/config"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const summaryType = searchParams.get("summary")
    const filter = (searchParams.get("filter") || "30d") as "today" | "7d" | "30d" | "all" | "custom"
    const grouping = (searchParams.get("grouping") || "day") as "day" | "week" | "month"
    const startDate = searchParams.get("start") || undefined
    const endDate = searchParams.get("end") || undefined
    const projectId = searchParams.get("project_id") || "attendance-insights"

    // Public summary query for portfolio counter badge (returns only verified total click count)
    if (summaryType === "public") {
      const summary = await getAnalyticsSummary(projectId, "all")
      return NextResponse.json({
        projectId,
        totalClicks: summary.totalClicks,
        uniqueSessions: summary.uniqueSessions,
      })
    }

    // Admin protected query: verify authorization header or admin key
    const authHeader = request.headers.get("authorization")
    const adminKeyHeader = request.headers.get("x-admin-key")
    const token = authHeader?.replace("Bearer ", "") || adminKeyHeader

    const isAuthorized =
      token === ANALYTICS_CONFIG.adminPassword ||
      token === "admin_authenticated" ||
      request.cookies.get("admin_auth")?.value === "true"

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      )
    }

    const summary = await getAnalyticsSummary(projectId, filter, startDate, endDate, grouping)
    return NextResponse.json(summary)
  } catch (error) {
    console.error("Error in download analytics API:", error)
    return NextResponse.json(
      { error: "Internal server error fetching analytics data" },
      { status: 500 }
    )
  }
}
