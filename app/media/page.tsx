import { Suspense } from "react"
import { mediaAPI } from "@/lib/api"
import { MediaPageClient } from "./MediaPageClient"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ParallaxContainer } from "@/components/parallax-container"
import { ParticleBackground } from "@/components/particle-background"

export const metadata = {
  title: "Media Gallery - Nakul Mahendra Mundhada",
  description:
    "Explore videos, photos, and documentation from my journey, projects, and startup endeavors. Visual insights into my work in embedded systems, IoT, and electroculture research.",
  keywords: ["media", "videos", "photos", "projects", "embedded systems", "IoT", "electroculture", "documentation"],
  openGraph: {
    title: "Media Gallery - Nakul Mahendra Mundhada",
    description: "Visual documentation of my technical journey and innovations",
    type: "website",
  },
}

export default async function MediaPage() {
  const mediaItems = await mediaAPI.getAll()

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      <ParticleBackground />
      <ParallaxContainer>
        <div className="relative z-10">
          <Suspense fallback={<LoadingSpinner />}>
            <MediaPageClient initialMedia={mediaItems} />
          </Suspense>
        </div>
      </ParallaxContainer>
    </div>
  )
}
