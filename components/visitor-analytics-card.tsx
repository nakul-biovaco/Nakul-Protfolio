"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Users, Eye, Activity, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { analyticsAPI } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  liveVisitors: number
}

export default function VisitorAnalyticsCard() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    uniqueVisitors: 0,
    liveVisitors: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await analyticsAPI.getVisitorStats()
      setStats(data)
    } catch (err) {
      console.error("Failed to fetch visitor stats:", err)
      setError("Failed to load visitor stats.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats() // Initial fetch

    const interval = setInterval(() => {
      fetchStats() // Refresh every 10 seconds for live data
    }, 10000) // Fetch every 10 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <h3 className="font-semibold text-purple-500">Visitor Analytics</h3>
        </div>
        {loading ? (
          <div className="text-sm text-muted-foreground flex items-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading stats...
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Users className="w-6 h-6 mx-auto text-purple-400" />
              <div className="text-2xl font-bold text-purple-500">{stats.totalVisitors}</div>
              <div className="text-sm text-muted-foreground">Total Visitors</div>
            </div>
            <div className="space-y-1">
              <Eye className="w-6 h-6 mx-auto text-purple-400" />
              <div className="text-2xl font-bold text-purple-500">{stats.uniqueVisitors}</div>
              <div className="text-sm text-muted-foreground">Unique Visitors</div>
            </div>
            <div className="space-y-1">
              <Activity className="w-6 h-6 mx-auto text-purple-400" />
              <div className="text-2xl font-bold text-purple-500">{stats.liveVisitors}</div>
              <div className="text-sm text-muted-foreground">Live Visitors</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
