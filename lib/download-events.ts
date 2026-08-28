import { supabase } from "./supabase"
import { ANALYTICS_CONFIG } from "./config"

export interface DownloadEvent {
  id?: string
  project_id: string
  event_type: string
  timestamp: string
  session_id: string
  referrer?: string | null
  source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  device_type?: string | null
  browser?: string | null
  country?: string | null
  created_at?: string
}

export interface AnalyticsSummary {
  projectId: string
  totalClicks: number
  uniqueSessions: number
  todayClicks: number
  thisWeekClicks: number
  thisMonthClicks: number
  recentEvents: DownloadEvent[]
  sourceBreakdown: { source: string; count: number; percentage: number }[]
  trend: { date: string; clicks: number; uniqueSessions: number }[]
}

// Global in-memory fallback store for when Supabase is not configured in local environment
declare global {
  // eslint-disable-next-line no-var
  var _inMemoryDownloadEvents: DownloadEvent[] | undefined
  // eslint-disable-next-line no-var
  var _rateLimitMap: Map<string, number[]> | undefined
}

const inMemoryEvents: DownloadEvent[] = globalThis._inMemoryDownloadEvents || (globalThis._inMemoryDownloadEvents = [])
const rateLimitMap: Map<string, number[]> = globalThis._rateLimitMap || (globalThis._rateLimitMap = new Map())

/**
 * Check if a client is rate limited
 */
export function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const windowStart = now - 60 * 1000 // 1 minute window
  const timestamps = (rateLimitMap.get(identifier) || []).filter((t) => t > windowStart)

  if (timestamps.length >= ANALYTICS_CONFIG.rateLimitPerMinute) {
    return true
  }

  timestamps.push(now)
  rateLimitMap.set(identifier, timestamps)
  return false
}

/**
 * Record a download event in the database (or fallback store)
 */
export async function recordDownloadEvent(event: DownloadEvent): Promise<{ success: boolean; eventId?: string }> {
  try {
    const isSupabaseActive = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    )

    const fullEvent: DownloadEvent = {
      ...event,
      id: event.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      created_at: event.created_at || new Date().toISOString(),
      timestamp: event.timestamp || new Date().toISOString(),
    }

    if (isSupabaseActive) {
      const { data, error } = await supabase.from("download_events").insert([
        {
          project_id: fullEvent.project_id,
          event_type: fullEvent.event_type,
          timestamp: fullEvent.timestamp,
          session_id: fullEvent.session_id,
          referrer: fullEvent.referrer || null,
          source: fullEvent.source || null,
          utm_medium: fullEvent.utm_medium || null,
          utm_campaign: fullEvent.utm_campaign || null,
          utm_term: fullEvent.utm_term || null,
          utm_content: fullEvent.utm_content || null,
          device_type: fullEvent.device_type || null,
          browser: fullEvent.browser || null,
          country: fullEvent.country || null,
        },
      ]).select("id").single()

      if (error) {
        console.warn("Supabase record failed, saving to local in-memory store:", error.message)
        inMemoryEvents.unshift(fullEvent)
        return { success: true, eventId: fullEvent.id }
      }

      console.log("[recordDownloadEvent] Successfully inserted into Supabase:", data?.id || fullEvent.id)
      return { success: true, eventId: data?.id || fullEvent.id }
    } else {
      // Local fallback
      inMemoryEvents.unshift(fullEvent)
      // Keep in-memory store bounded
      if (inMemoryEvents.length > 5000) {
        inMemoryEvents.pop()
      }
      return { success: true, eventId: fullEvent.id }
    }
  } catch (error) {
    console.error("Error recording download event:", error)
    inMemoryEvents.unshift(event)
    return { success: true, eventId: event.id }
  }
}

/**
 * Fetch all download events with optional date range filter
 */
export async function getDownloadEvents(
  projectId: string = "attendance-insights",
  filter: "today" | "7d" | "30d" | "all" | "custom" = "30d",
  customStart?: string,
  customEnd?: string
): Promise<DownloadEvent[]> {
  const isSupabaseActive = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
  )

  let startDate: Date | null = null
  let endDate: Date | null = null
  const now = new Date()

  if (filter === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  } else if (filter === "7d") {
    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  } else if (filter === "30d") {
    startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  } else if (filter === "custom" && customStart) {
    startDate = new Date(customStart)
    if (customEnd) {
      endDate = new Date(customEnd)
      endDate.setHours(23, 59, 59, 999)
    }
  }

  if (isSupabaseActive) {
    try {
      let query = supabase
        .from("download_events")
        .select("*")
        .eq("project_id", projectId)
        .order("timestamp", { ascending: false })

      if (startDate) {
        query = query.gte("timestamp", startDate.toISOString())
      }
      if (endDate) {
        query = query.lte("timestamp", endDate.toISOString())
      }

      const { data, error } = await query
      if (error) {
        console.error("Supabase query error:", error)
        throw error
      }
      if (data) {
        console.log(`[getDownloadEvents] Loaded ${data.length} events from Supabase for project: ${projectId}`)
        return data as DownloadEvent[]
      }
    } catch (err) {
      console.warn("Supabase query failed, using in-memory store:", err)
    }
  }

  // Filter in-memory events
  return inMemoryEvents.filter((evt) => {
    if (evt.project_id !== projectId) return false
    const evtDate = new Date(evt.timestamp)
    if (startDate && evtDate < startDate) return false
    if (endDate && evtDate > endDate) return false
    return true
  })
}

/**
 * Compute analytics summary metrics
 */
export async function getAnalyticsSummary(
  projectId: string = "attendance-insights",
  filter: "today" | "7d" | "30d" | "all" | "custom" = "30d",
  customStart?: string,
  customEnd?: string,
  grouping: "day" | "week" | "month" = "day"
): Promise<AnalyticsSummary> {
  const allEvents = await getDownloadEvents(projectId, "all")
  const filteredEvents = await getDownloadEvents(projectId, filter, customStart, customEnd)

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).setHours(0, 0, 0, 0)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

  let todayClicks = 0
  let thisWeekClicks = 0
  let thisMonthClicks = 0

  allEvents.forEach((evt) => {
    const t = new Date(evt.timestamp).getTime()
    if (t >= startOfToday) todayClicks++
    if (t >= startOfWeek) thisWeekClicks++
    if (t >= startOfMonth) thisMonthClicks++
  })

  // Calculate unique sessions with de-duplication
  const uniqueSessionMap = new Map<string, number>()
  filteredEvents.forEach((evt) => {
    const sid = evt.session_id || "anonymous"
    const t = new Date(evt.timestamp).getTime()
    const lastT = uniqueSessionMap.get(sid)
    if (!lastT || Math.abs(t - lastT) > ANALYTICS_CONFIG.dedupWindowMs) {
      uniqueSessionMap.set(sid, t)
    }
  })

  // Traffic Source Breakdown
  const sourceCountMap = new Map<string, number>()
  filteredEvents.forEach((evt) => {
    let src = (evt.source || "direct").toLowerCase()
    if (src.includes("linkedin")) src = "LinkedIn"
    else if (src.includes("instagram")) src = "Instagram"
    else if (src.includes("portfolio")) src = "Portfolio"
    else if (src.includes("direct") || !src) src = "Direct"
    else src = src.charAt(0).toUpperCase() + src.slice(1)

    sourceCountMap.set(src, (sourceCountMap.get(src) || 0) + 1)
  })

  const totalFilteredClicks = filteredEvents.length
  const sourceBreakdown = Array.from(sourceCountMap.entries())
    .map(([source, count]) => ({
      source,
      count,
      percentage: totalFilteredClicks > 0 ? Math.round((count / totalFilteredClicks) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)

  // Trend Grouping (by Day, Week, Month)
  const trendMap = new Map<string, { clicks: number; sessions: Set<string> }>()

  // Sort chronologically for trend
  const sortedChronological = [...filteredEvents].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  sortedChronological.forEach((evt) => {
    const d = new Date(evt.timestamp)
    let key: string

    if (grouping === "month") {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    } else if (grouping === "week") {
      // Get week number
      const oneJan = new Date(d.getFullYear(), 0, 1)
      const weekNum = Math.ceil(((d.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7)
      key = `W${weekNum} ${d.getFullYear()}`
    } else {
      // Day format: YYYY-MM-DD
      key = d.toISOString().split("T")[0]
    }

    if (!trendMap.has(key)) {
      trendMap.set(key, { clicks: 0, sessions: new Set() })
    }
    const curr = trendMap.get(key)!
    curr.clicks += 1
    curr.sessions.add(evt.session_id)
  })

  const trend = Array.from(trendMap.entries()).map(([date, data]) => ({
    date,
    clicks: data.clicks,
    uniqueSessions: data.sessions.size,
  }))

  return {
    projectId,
    totalClicks: allEvents.length,
    uniqueSessions: uniqueSessionMap.size,
    todayClicks,
    thisWeekClicks,
    thisMonthClicks,
    recentEvents: filteredEvents.slice(0, 50),
    sourceBreakdown,
    trend,
  }
}
