import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { recordDownloadEvent, isRateLimited } from "@/lib/download-events"

export const dynamic = "force-dynamic"

function parseDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) {
    return "Mobile"
  }
  if (/ipad|android(?!.*mobile)|tablet/i.test(ua)) {
    return "Tablet"
  }
  return "Desktop"
}

function parseBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (ua.includes("edg/")) return "Edge"
  if (ua.includes("chrome/") && !ua.includes("edg/")) return "Chrome"
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari"
  if (ua.includes("firefox/")) return "Firefox"
  if (ua.includes("opr/") || ua.includes("opera/")) return "Opera"
  if (ua.includes("brave")) return "Brave"
  return "Other"
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Capture UTM & Campaign parameters
    const utmSource = searchParams.get("utm_source")
    const utmMedium = searchParams.get("utm_medium")
    const utmCampaign = searchParams.get("utm_campaign")
    const utmTerm = searchParams.get("utm_term")
    const utmContent = searchParams.get("utm_content")

    // Capture Referrer & Headers
    const refererHeader = request.headers.get("referer") || ""
    const userAgent = request.headers.get("user-agent") || ""
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-country-code") ||
      null

    // Determine Traffic Source
    let resolvedSource = utmSource || ""
    if (!resolvedSource) {
      if (refererHeader.includes("linkedin.com")) resolvedSource = "LinkedIn"
      else if (refererHeader.includes("instagram.com")) resolvedSource = "Instagram"
      else if (refererHeader.includes("github.com")) resolvedSource = "GitHub"
      else if (refererHeader.includes("twitter.com") || refererHeader.includes("x.com")) resolvedSource = "Twitter"
      else if (refererHeader.includes("nakulmundhada") || refererHeader.includes("localhost")) resolvedSource = "Portfolio"
      else if (refererHeader) {
        try {
          const url = new URL(refererHeader)
          resolvedSource = url.hostname.replace("www.", "")
        } catch {
          resolvedSource = "Referral"
        }
      } else {
        resolvedSource = "Direct"
      }
    }

    // Anonymous Session Handling via Cookie
    let sessionId = request.cookies.get("att_sid")?.value
    let isNewSession = false
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
      isNewSession = true
    }

    // Rate Limiting Check
    const rateLimited = isRateLimited(sessionId)

    if (!rateLimited) {
      // Record analytics event asynchronously
      await recordDownloadEvent({
        project_id: "attendance-insights",
        event_type: "attendance_extension_download_click",
        timestamp: new Date().toISOString(),
        session_id: sessionId,
        referrer: refererHeader || null,
        source: resolvedSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        device_type: parseDevice(userAgent),
        browser: parseBrowser(userAgent),
        country: country ? country.toUpperCase() : null,
      })
    }

    // Find and serve the Attendance Extension ZIP file
    const possiblePaths = [
      path.join(process.cwd(), "public", "downloads", "Attendance-Extension-RCOEM-main.zip"),
      path.join(process.cwd(), "ZIP_JUNO", "Attendance-Extension-RCOEM-main.zip"),
      path.join(process.cwd(), "public", "Attendance-Extension-RCOEM-main.zip"),
    ]

    let filePath: string | null = null
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        filePath = p
        break
      }
    }

    if (filePath) {
      const fileBuffer = await fs.promises.readFile(filePath)
      const response = new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="Attendance-Extension-RCOEM-main.zip"',
          "Content-Length": fileBuffer.byteLength.toString(),
          "Cache-Control": "no-store, max-age=0",
        },
      })

      if (isNewSession) {
        response.cookies.set("att_sid", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
      }

      return response
    }

    return NextResponse.redirect(new URL("/downloads/Attendance-Extension-RCOEM-main.zip", request.url))
  } catch (error) {
    console.error("Error in download route:", error)
    return NextResponse.redirect(new URL("/downloads/Attendance-Extension-RCOEM-main.zip", request.url))
  }
}
