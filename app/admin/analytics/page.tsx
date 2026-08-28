import { Metadata } from "next"
import AdminAnalyticsClient from "./AdminAnalyticsClient"

export const metadata: Metadata = {
  title: "Admin Analytics | Attendance Insights | Nakul Mundhada",
  description: "Private analytics dashboard for Attendance Insights Chrome Extension download tracking.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsClient />
}
