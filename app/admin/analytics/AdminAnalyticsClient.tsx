"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Share2,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Eye,
  LogOut,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from "recharts"

interface DownloadEvent {
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
}

interface AnalyticsSummary {
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

export default function AdminAnalyticsClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [authToken, setAuthToken] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState<boolean>(false)

  // Analytics Filter States
  const [filter, setFilter] = useState<"today" | "7d" | "30d" | "all" | "custom">("30d")
  const [grouping, setGrouping] = useState<"day" | "week" | "month">("day")
  const [customStart, setCustomStart] = useState<string>("")
  const [customEnd, setCustomEnd] = useState<string>("")
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())

  // Check saved session on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_analytics_token")
    if (savedToken) {
      setAuthToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const fetchAnalytics = useCallback(async (token: string) => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      let url = `/api/analytics/downloads?filter=${filter}&grouping=${grouping}&project_id=attendance-insights`
      if (filter === "custom" && customStart) {
        url += `&start=${customStart}`
        if (customEnd) url += `&end=${customEnd}`
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false)
          sessionStorage.removeItem("admin_analytics_token")
          setAuthError("Session expired or invalid authentication key.")
          return
        }
        throw new Error(`Failed to load analytics: ${res.statusText}`)
      }

      const data: AnalyticsSummary = await res.json()
      setSummary(data)
      setLastRefreshed(new Date())
    } catch (err: any) {
      console.error("Error fetching analytics:", err)
      setError(err.message || "Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }, [filter, grouping, customStart, customEnd])

  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchAnalytics(authToken)
    }
  }, [isAuthenticated, authToken, fetchAnalytics])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setIsVerifying(true)

    try {
      const res = await fetch(`/api/analytics/downloads?filter=30d&project_id=attendance-insights`, {
        headers: {
          Authorization: `Bearer ${passwordInput.trim()}`,
        },
      })

      if (res.ok) {
        const token = passwordInput.trim()
        setAuthToken(token)
        sessionStorage.setItem("admin_analytics_token", token)
        setIsAuthenticated(true)
        const data = await res.json()
        setSummary(data)
        setLastRefreshed(new Date())
      } else {
        setAuthError("Incorrect password. Access denied.")
      }
    } catch {
      setAuthError("Network error validating admin access.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_analytics_token")
    setAuthToken("")
    setIsAuthenticated(false)
    setSummary(null)
  }

  const exportToCSV = () => {
    if (!summary || !summary.recentEvents.length) return
    const headers = ["Timestamp", "Project", "Event", "Source", "Campaign", "Medium", "Device", "Browser", "Country", "Session ID"]
    const rows = summary.recentEvents.map((evt) => [
      evt.timestamp,
      evt.project_id,
      evt.event_type,
      evt.source || "Direct",
      evt.utm_campaign || "",
      evt.utm_medium || "",
      evt.device_type || "",
      evt.browser || "",
      evt.country || "",
      evt.session_id,
    ])

    const csvContent = [headers.join(","), ...rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `attendance-insights-analytics-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="lg:ml-64 min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="border border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <CardTitle className="text-2xl font-bold text-highlight font-caveat">
                Admin Analytics Portal
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Enter your admin credentials to access Attendance Insights download metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Admin Passkey / Password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="pl-9 bg-muted/40 border-border"
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <Alert variant="destructive" className="py-2 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                >
                  {isVerifying ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Unlock className="w-4 h-4 mr-2" />
                  )}
                  {isVerifying ? "Verifying..." : "Access Analytics Dashboard"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Protected
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated {lastRefreshed.toLocaleTimeString()}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text font-caveat">
              Attendance Insights — Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Privacy-conscious download click tracking & traffic attribution dashboard
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAnalytics(authToken)}
              disabled={loading}
              className="text-xs hover-lift"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={!summary || !summary.recentEvents.length}
              className="text-xs hover-lift"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Analytics Distinction Notice */}
        <Alert className="bg-primary/5 border-primary/20 text-foreground">
          <Info className="w-4 h-4 text-primary" />
          <AlertTitle className="text-sm font-semibold text-primary">
            Important Analytics Distinction
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground mt-1">
            Metrics below represent <strong>Download Button Clicks & Server-side Chrome Web Store Redirects</strong> initiated through your portfolio. Extension installation success and active user telemetry remain managed independently within the official Google Chrome Web Store Developer Dashboard.
          </AlertDescription>
        </Alert>

        {/* Date Filters Bar */}
        <Card className="border border-border/80 bg-card/60 backdrop-blur-md shadow-sm">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {(["today", "7d", "30d", "all", "custom"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  className={`text-xs capitalize h-8 ${filter === f ? "bg-primary text-primary-foreground font-semibold" : ""}`}
                >
                  {f === "7d" ? "Last 7 Days" : f === "30d" ? "Last 30 Days" : f === "all" ? "All Time" : f}
                </Button>
              ))}
            </div>

            {filter === "custom" && (
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="h-8 text-xs w-36 bg-muted/30"
                />
                <span className="text-xs text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="h-8 text-xs w-36 bg-muted/30"
                />
                <Button
                  size="sm"
                  onClick={() => fetchAnalytics(authToken)}
                  className="h-8 text-xs bg-primary text-primary-foreground"
                >
                  Apply Range
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-semibold text-muted-foreground">Trend Group:</span>
              {(["day", "week", "month"] as const).map((g) => (
                <Button
                  key={g}
                  size="sm"
                  variant={grouping === g ? "secondary" : "ghost"}
                  onClick={() => setGrouping(g)}
                  className="text-xs capitalize h-7 px-2.5"
                >
                  {g}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border border-border hover-glow shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Total Download Clicks</span>
                <Download className="w-4 h-4 text-primary" />
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-primary">
                {summary ? summary.totalClicks.toLocaleString() : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground">All-time tracked redirects</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover-glow shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Unique Sessions</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-emerald-400">
                {summary ? summary.uniqueSessions.toLocaleString() : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground">Deduplicated clickers</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover-glow shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>Today</span>
                <Clock className="w-4 h-4 text-blue-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-blue-400">
                {summary ? summary.todayClicks.toLocaleString() : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground">Clicks in last 24h</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover-glow shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>This Week</span>
                <Calendar className="w-4 h-4 text-purple-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-purple-400">
                {summary ? summary.thisWeekClicks.toLocaleString() : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground">Current calendar week</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border hover-glow shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                <span>This Month</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-amber-400">
                {summary ? summary.thisMonthClicks.toLocaleString() : "..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground">Current month to date</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Source Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart (2 cols) */}
          <Card className="lg:col-span-2 bg-card border border-border shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-highlight flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Download Clicks Over Time
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Historical volume of button clicks and estimated unique sessions
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                  Grouped By {grouping}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full pt-4">
                {summary && summary.trend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={summary.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="date" stroke="#888888" fontSize={11} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={11} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          borderColor: "#27272a",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        name="Download Clicks"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#clicksGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="uniqueSessions"
                        name="Unique Sessions"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#sessionsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                    No download events recorded in this time range yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources (1 col) */}
          <Card className="bg-card border border-border shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-highlight flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Traffic Sources
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Distribution by channel, UTM campaign, or referral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {summary && summary.sourceBreakdown.length > 0 ? (
                  summary.sourceBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium flex items-center gap-1.5">
                          {item.source === "LinkedIn" && <span className="w-2 h-2 rounded-full bg-[#0A66C2]"></span>}
                          {item.source === "Instagram" && <span className="w-2 h-2 rounded-full bg-[#E1306C]"></span>}
                          {item.source === "Portfolio" && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                          {item.source === "Direct" && <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
                          {item.source}
                        </span>
                        <span className="text-muted-foreground">
                          <strong>{item.count}</strong> ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    No source data available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events Log Table */}
        <Card className="bg-card border border-border shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-highlight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Download Events
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Latest recorded download clicks and redirect requests
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                {summary ? summary.recentEvents.length : 0} Events Shown
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground">
                    <th className="pb-3 font-semibold">Timestamp</th>
                    <th className="pb-3 font-semibold">Source</th>
                    <th className="pb-3 font-semibold">Campaign / Medium</th>
                    <th className="pb-3 font-semibold">Device</th>
                    <th className="pb-3 font-semibold">Browser</th>
                    <th className="pb-3 font-semibold">Country</th>
                    <th className="pb-3 font-semibold">Session ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {summary && summary.recentEvents.length > 0 ? (
                    summary.recentEvents.map((evt, idx) => (
                      <tr key={idx} className="hover:bg-muted/20 transition-colors">
                        <td className="py-3 text-foreground whitespace-nowrap">
                          {new Date(evt.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 font-medium text-primary">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px]">
                            {evt.source || "Direct"}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {evt.utm_campaign || evt.utm_medium ? (
                            <span>{evt.utm_campaign || "—"} / {evt.utm_medium || "—"}</span>
                          ) : (
                            <span className="text-muted-foreground/60">—</span>
                          )}
                        </td>
                        <td className="py-3 text-foreground">
                          <span className="flex items-center gap-1">
                            {evt.device_type === "Mobile" ? (
                              <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
                            ) : evt.device_type === "Tablet" ? (
                              <Tablet className="w-3.5 h-3.5 text-muted-foreground" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                            {evt.device_type || "Desktop"}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {evt.browser || "Chrome"}
                        </td>
                        <td className="py-3 text-muted-foreground">
                          {evt.country ? (
                            <span className="px-1.5 py-0.5 bg-muted rounded text-[11px] font-mono">
                              {evt.country}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/60">—</span>
                          )}
                        </td>
                        <td className="py-3 font-mono text-muted-foreground text-[11px]">
                          {evt.session_id ? `${evt.session_id.substring(0, 10)}...` : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        No recent events found. Click "Download Extension" on your portfolio to test!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
