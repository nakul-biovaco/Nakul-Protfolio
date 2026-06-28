import { Suspense } from "react"
import { mediaAPI } from "@/lib/api"
import { MediaDetailPageClient } from "./MediaDetailPageClient"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ParallaxContainer } from "@/components/parallax-container"
import { ParticleBackground } from "@/components/particle-background"
import { notFound } from "next/navigation"

interface MediaDetailPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: MediaDetailPageProps) {
  const mediaItem = await mediaAPI.getById(params.id)

  if (!mediaItem) {
    return {
      title: "Media Not Found - Nakul Mahendra Mundhada",
      description: "The requested media item could not be found.",
    }
  }

  return {
    title: `${mediaItem.title} - Nakul Mahendra Mundhada`,
    description: mediaItem.description,
    keywords: ["media", mediaItem.type, "embedded systems", "IoT", "electroculture", "projects"],
    openGraph: {
      title: `${mediaItem.title} - Nakul Mahendra Mundhada`,
      description: mediaItem.description,
      type: "article",
      images: mediaItem.type === "image" ? [mediaItem.url] : mediaItem.thumbnailUrl ? [mediaItem.thumbnailUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${mediaItem.title} - Nakul Mahendra Mundhada`,
      description: mediaItem.description,
      images: mediaItem.type === "image" ? [mediaItem.url] : mediaItem.thumbnailUrl ? [mediaItem.thumbnailUrl] : [],
    },
  }
}

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const mediaItem = await mediaAPI.getById(params.id)

  if (!mediaItem) {
    notFound()
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      <ParticleBackground />
      <ParallaxContainer>
        <div className="relative z-10">
          <Suspense fallback={<LoadingSpinner />}>
            <MediaDetailPageClient media={mediaItem} />
          </Suspense>
        </div>
      </ParallaxContainer>
    </div>
  )
}
