"use client"

// Admin configuration - Update with your actual IP addresses
const ADMIN_CONFIG = {
  allowedIPs: [
    "127.0.0.1", // localhost for development
    "::1", // IPv6 localhost
    "192.168.1.100", // Replace with your actual local IP
    // Add your actual public IP here
  ],
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
}

// Admin authentication and IP detection
export interface AdminSession {
  isAdmin: boolean
  sessionId: string
  expiresAt: number
}

// Get client IP address with multiple fallbacks
async function getClientIP(): Promise<string> {
  try {
    // Try multiple IP detection services
    const services = ["https://api.ipify.org?format=json", "https://ipapi.co/json/", "https://httpbin.org/ip"]

    for (const service of services) {
      try {
        const response = await fetch(service)
        const data = await response.json()
        const ip = data.ip || data.origin
        if (ip) return ip
      } catch (error) {
        console.warn(`IP service ${service} failed:`, error)
        continue
      }
    }

    // Fallback to localhost for development
    return "127.0.0.1"
  } catch (error) {
    console.error("All IP detection services failed:", error)
    return "127.0.0.1"
  }
}

// Generate device fingerprint
function generateDeviceFingerprint(): string {
  if (typeof window === "undefined") return "server"

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  ctx?.fillText("fingerprint", 10, 10)

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|")

  return btoa(fingerprint).slice(0, 32)
}

// Check if current user is admin
export async function checkAdminAccess(): Promise<AdminSession> {
  try {
    const clientIP = await getClientIP()
    const deviceFingerprint = generateDeviceFingerprint()

    console.log("Admin check - IP:", clientIP, "Device:", deviceFingerprint)

    // Check if IP is in allowed list
    const isAllowedIP = ADMIN_CONFIG.allowedIPs.includes(clientIP)

    if (isAllowedIP) {
      const sessionId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const expiresAt = Date.now() + ADMIN_CONFIG.sessionDuration

      const session: AdminSession = {
        isAdmin: true,
        sessionId,
        expiresAt,
      }

      // Store session in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("adminSession", JSON.stringify(session))
      }

      return session
    }

    return {
      isAdmin: false,
      sessionId: "",
      expiresAt: 0,
    }
  } catch (error) {
    console.error("Admin access check failed:", error)
    return {
      isAdmin: false,
      sessionId: "",
      expiresAt: 0,
    }
  }
}

// Validate existing admin session
export function validateAdminSession(): AdminSession {
  if (typeof window === "undefined") {
    return { isAdmin: false, sessionId: "", expiresAt: 0 }
  }

  try {
    const stored = localStorage.getItem("adminSession")
    if (!stored) {
      return { isAdmin: false, sessionId: "", expiresAt: 0 }
    }

    const session: AdminSession = JSON.parse(stored)

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem("adminSession")
      return { isAdmin: false, sessionId: "", expiresAt: 0 }
    }

    return session
  } catch (error) {
    console.error("Session validation failed:", error)
    localStorage.removeItem("adminSession")
    return { isAdmin: false, sessionId: "", expiresAt: 0 }
  }
}

// Clear admin session
export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminSession")
  }
}

// Check if user is admin (convenience function)
export async function isAdmin(): Promise<boolean> {
  // First check existing session
  const existingSession = validateAdminSession()
  if (existingSession.isAdmin) {
    return true
  }

  // If no valid session, check admin access
  const newSession = await checkAdminAccess()
  return newSession.isAdmin
}

// Hook for admin access
import React from "react"

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    isAdmin().then((adminStatus) => {
      setIsAdmin(adminStatus)
      setIsLoading(false)
    })
  }, [])

  return { isAdmin, isLoading }
}
