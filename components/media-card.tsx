"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ThumbsUp, MessageCircle, Play, Calendar, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { likeMediaAction } from "@/lib/actions/media-actions"
import { analyticsAPI } from "@/lib/api"
import type { Media } from "@/lib/api"

interface MediaCardProps {
  media: Media
  onUpdate?: (updatedMedia: Media) => void
  viewMode?: "grid" | "list"
}

// Helper function to detect and convert YouTube URLs
function getVideoEmbedUrl(url: string): { embedUrl: string; isYouTube: boolean; thumbnailUrl: string } {
  // YouTube URL patterns
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(youtubeRegex)

  if (match) {
    const videoId = match[1]
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      isYouTube: true,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }
  }

  return {
    embedUrl: url,
    isYouTube: false,
    thumbnailUrl: url,
  }
}

export function MediaCard({ media, onUpdate, viewMode = "grid" }: MediaCardProps) {
  const [likesCount, setLikesCount] = React.useState(media.likesCount)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isLiking, setIsLiking] = React.useState(false)

  // Get video information if it's a video
  const videoInfo = media.type === "video" ? getVideoEmbedUrl(media.url) : null

  // Check if already liked on mount
  React.useEffect(() => {
    const likedMedia = JSON.parse(localStorage.getItem("likedMedia") || "{}")
    if (likedMedia[media.id]) {
      setIsLiked(true)
    }
  }, [media.id])

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLiking) return

    setIsLiking(true)
    const previousLiked = isLiked
    const previousCount = likesCount

    // Optimistic update
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))

    try {
      const { success, newLikesCount } = await likeMediaAction(media.id)

      if (success) {
        setLikesCount(newLikesCount)

        // Update localStorage
        const likedMedia = JSON.parse(localStorage.getItem("likedMedia") || "{}")
        if (!isLiked) {
          likedMedia[media.id] = true
        } else {
          delete likedMedia[media.id]
        }
        localStorage.setItem("likedMedia", JSON.stringify(likedMedia))

        // Track analytics
        analyticsAPI.trackEvent("media_like", {
          mediaId: media.id,
          mediaTitle: media.title,
          action: !isLiked ? "like" : "unlike",
        })

        // Update parent component if callback provided
        if (onUpdate) {
          onUpdate({ ...media, likesCount: newLikesCount })
        }
      } else {
        // Revert on failure
        setIsLiked(previousLiked)
        setLikesCount(previousCount)
      }
    } catch (error) {
      // Revert on error
      setIsLiked(previousLiked)
      setLikesCount(previousCount)
      console.error("Failed to like media:", error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleCardClick = () => {
    analyticsAPI.trackEvent("media_view", {
      mediaId: media.id,
      mediaTitle: media.title,
      mediaType: media.type,
    })
  }

  const getThumbnailUrl = () => {
    if (media.type === "video" && videoInfo?.isYouTube) {
      return videoInfo.thumbnailUrl
    }
    return media.thumbnailUrl || media.url || "/placeholder.svg"
  }

  if (viewMode === "list") {
    return (
      <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift">
        <Link href={`/media/${media.id}`} className="block md:w-80 flex-shrink-0" onClick={handleCardClick}>
          <div className="relative w-full h-48 md:h-full bg-muted">
            {media.type === "image" ? (
              <Image
                src={getThumbnailUrl() || "/placeholder.svg"}
                alt={media.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={getThumbnailUrl() || "/placeholder.svg"}
                  alt={media.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-6 w-6 text-gray-900 ml-1" />
                  </div>
                </div>
                {videoInfo?.isYouTube && (
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-red-600 text-white">
                    YouTube
                  </Badge>
                )}
              </div>
            )}
            <Badge variant="secondary" className="absolute top-3 left-3 capitalize">
              {media.type}
            </Badge>
          </div>
        </Link>

        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-semibold line-clamp-2 mb-2">
                  <Link href={`/media/${media.id}`} className="hover:underline" onClick={handleCardClick}>
                    {media.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3 mb-3">{media.description}</CardDescription>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(media.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardFooter className="pt-0 mt-auto">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  disabled={isLiking}
                  className={cn(
                    "flex items-center gap-2 hover-lift",
                    isLiked && "text-primary",
                    isLiking && "opacity-50",
                  )}
                  aria-label={isLiked ? "Unlike" : "Like"}
                >
                  <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-primary")} />
                  <span className="text-sm font-medium">{likesCount}</span>
                </Button>

                <Link href={`/media/${media.id}#comments`} onClick={handleCardClick}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover-lift">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{media.commentsCount}</span>
                  </Button>
                </Link>
              </div>

              <Link href={`/media/${media.id}`} onClick={handleCardClick}>
                <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </Link>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift group">
      <Link href={`/media/${media.id}`} className="block" onClick={handleCardClick}>
        <div className="relative w-full aspect-video bg-muted overflow-hidden">
          {media.type === "image" ? (
            <Image
              src={getThumbnailUrl() || "/placeholder.svg"}
              alt={media.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={getThumbnailUrl() || "/placeholder.svg"}
                alt={media.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="h-6 w-6 text-gray-900 ml-1" />
                </div>
              </div>
              {videoInfo?.isYouTube && (
                <Badge variant="secondary" className="absolute top-3 right-3 bg-red-600 text-white opacity-90">
                  YouTube
                </Badge>
              )}
            </div>
          )}
          <Badge variant="secondary" className="absolute top-3 left-3 capitalize opacity-90">
            {media.type}
          </Badge>
        </div>
      </Link>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
          <Link href={`/media/${media.id}`} className="hover:underline" onClick={handleCardClick}>
            {media.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm line-clamp-3">{media.description}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {new Date(media.createdAt).toLocaleDateString()}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={cn("flex items-center gap-1 hover-lift", isLiked && "text-primary", isLiking && "opacity-50")}
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-primary")} />
            <span className="text-sm">{likesCount}</span>
          </Button>

          <Link href={`/media/${media.id}#comments`} onClick={handleCardClick}>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 hover-lift">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{media.commentsCount}</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
