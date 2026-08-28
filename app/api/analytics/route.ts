import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const event = searchParams.get("event")

  try {
    // 1. If an event parameter is passed, record it
    if (event) {
      const { data, error } = await supabase.from("analytics").insert([{ 
        event_name: event,
        event_type: "custom_event",
        created_at: new Date().toISOString()
      }])

      if (error) {
        console.error("Error inserting analytics event:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ message: "Event recorded successfully", data }, { status: 200 })
    }

    // 2. Otherwise return general visitor stats
    const { data: allEvents, error } = await supabase
      .from("analytics")
      .select("session_id, created_at")

    if (error) {
      console.warn("Error fetching analytics stats, using baseline fallback:", error.message)
      return NextResponse.json({
        totalVisitors: 0,
        uniqueVisitors: 0,
        liveVisitors: 1,
      })
    }

    const totalVisitors = allEvents ? allEvents.length : 0
    const uniqueSessions = new Set(
      (allEvents || []).map((e) => e.session_id).filter(Boolean)
    ).size

    // Approximate live visitors within last 15 minutes
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString()
    const liveCount = (allEvents || []).filter((e) => e.created_at >= fifteenMinsAgo).length

    return NextResponse.json({
      totalVisitors: totalVisitors,
      uniqueVisitors: uniqueSessions || totalVisitors,
      liveVisitors: Math.max(1, liveCount),
    })
  } catch (error) {
    console.error("Unexpected error in analytics API:", error)
    return NextResponse.json({
      totalVisitors: 0,
      uniqueVisitors: 0,
      liveVisitors: 1,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { event_name, event_type, page, event_data, session_id } = body

    const { data, error } = await supabase.from("analytics").insert([{
      event_name: event_name || "page_view",
      event_type: event_type || "page_view",
      page: page || "/",
      event_data: event_data || {},
      session_id: session_id || "anonymous",
      created_at: new Date().toISOString(),
    }])

    if (error) {
      console.error("Error recording POST analytics:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in POST analytics:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
