import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const event = searchParams.get("event")

  if (!event) {
    return NextResponse.json({ error: "Event parameter is required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase.from("analytics").insert([{ event_name: event }])

    if (error) {
      console.error("Error inserting analytics event:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Event recorded successfully", data }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in analytics API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
