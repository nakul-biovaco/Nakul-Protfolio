import { Metadata } from "next"
import AdminAnalyticsClient from "./AdminAnalyticsClient"

export const metadata: Metadata = {
  title: "Admin Analytics | RCOEM/RBU Operations 75 | Nakul Mundhada",
  description: "Private analytics dashboard for RCOEM/RBU Operations 75 Chrome Extension download tracking.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsClient />
}
