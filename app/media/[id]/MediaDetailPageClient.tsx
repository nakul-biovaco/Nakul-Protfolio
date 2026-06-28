"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comment-section"
import { likeMediaAction } from "@/lib/actions/media-actions"
import { analyticsAPI } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { Media, MediaComment } from "@/lib/api"

interface MediaDetailPageClientProps {
  media: Media
}

// Helper function to detect and convert YouTube URLs
function getVideoEmbedUrl(url: string): { embedUrl: string; isYouTube: boolean; isEmbedded: boolean } {
  // Check if it's already an embed URL
  if (url.includes("/embed/")) {
    return {
      embedUrl: url,
      isYouTube: url.includes("youtube.com") || url.includes("youtu.be"),
      isEmbedded: true,
    }
  }

  // YouTube URL patterns
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(youtubeRegex)

  if (match) {
    const videoId = match[1]
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`,
      isYouTube: true,
      isEmbedded: false,
    }
  }

  // For other video URLs, return as is
  return {
    embedUrl: url,
    isYouTube: false,
    isEmbedded: false,
  }
}

export function MediaDetailPageClient({ media }: MediaDetailPageClientProps) {
  const [likesCount, setLikesCount] = useState(media.likesCount)
  const [isLiked, setIsLiked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [comments, setComments] = useState<MediaComment[]>(media.comments || [])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Get video embed information
  const videoInfo = media.type === "video" ? getVideoEmbedUrl(media.url) : null

  useEffect(() => {
    // Track page view
    analyticsAPI.trackPageView(`/media/${media.id}`)
    analyticsAPI.trackEvent("media_detail_view", {
      mediaId: media.id,
      mediaTitle: media.title,
      mediaType: media.type,
    })

    // Check if already liked
    const likedMedia = JSON.parse(localStorage.getItem("likedMedia") || "{}")
    if (likedMedia[media.id]) {
      setIsLiked(true)
    }
  }, [media.id, media.title, media.type])

  const handleLike = async () => {
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
        analyticsAPI.trackEvent("media_like_detail", {
          mediaId: media.id,
          mediaTitle: media.title,
          action: !isLiked ? "like" : "unlike",
        })
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

  const handleShare = async () => {
    const url = window.location.href
    const title = media.title

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: media.description,
          url,
        })
        analyticsAPI.trackEvent("media_share", { mediaId: media.id, method: "native" })
      } catch (error) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        analyticsAPI.trackEvent("media_share", { mediaId: media.id, method: "clipboard" })
        // You could show a toast here
      } catch (error) {
        console.error("Failed to copy to clipboard:", error)
      }
    }
  }

  const handleCommentAdded = (newComment: MediaComment) => {
    setComments((prev) => [...prev, newComment])
  }

  // Video control handlers for non-YouTube videos
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!media) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Media not found</h1>
        <p className="text-muted-foreground mb-6">The requested media item could not be found.</p>
        <Link href="/media">
          <Button variant="outline" className="hover-lift bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media Gallery
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16 max-w-6xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/media">
          <Button variant="outline" className="hover-lift bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Media Gallery
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative w-full bg-black">
              {media.type === "image" ? (
                <div className="relative aspect-video">
                  <Image
                    src={media.url || "/placeholder.svg"}
                    alt={media.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              ) : videoInfo?.isYouTube ? (
                // YouTube embed
                <div className="relative aspect-video">
                  <iframe
                    ref={iframeRef}
                    src={videoInfo.embedUrl}
                    title={media.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                // Regular video with custom controls
                <div className="relative aspect-video group">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster={media.thumbnailUrl || "/placeholder.svg?height=400&width=600"}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                    onLoadedMetadata={(e) => setDuration((e.target as HTMLVideoElement).duration)}
                    onVolumeChange={(e) => {
                      const video = e.target as HTMLVideoElement
                      setVolume(video.volume)
                      setIsMuted(video.muted)
                    }}
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={media.url} type="video/mp4" />
                    <source src={media.url} type="video/webm" />
                    <source src={media.url} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom video controls overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
                      <div className="flex items-center gap-2 text-white">
                        <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>

                        <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>

                        <div className="flex-1 mx-2">
                          <div className="text-xs">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleFullscreen}
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Badge variant="secondary" className="absolute top-4 left-4 capitalize bg-black/50 text-white">
                {media.type}
              </Badge>

              {videoInfo?.isYouTube && (
                <Badge variant="secondary" className="absolute top-4 right-4 bg-red-600 text-white">
                  YouTube
                </Badge>
              )}
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-3">{media.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{media.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(media.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    onClick={handleLike}
                    disabled={isLiking}
                    className={cn("hover-lift", isLiking && "opacity-50")}
                  >
                    <ThumbsUp className={cn("h-4 w-4 mr-2", isLiked && "fill-current")} />
                    {likesCount} {likesCount === 1 ? "Like" : "Likes"}
                  </Button>

                  <Button variant="outline" onClick={handleShare} className="hover-lift bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  {videoInfo?.isYouTube && (
                    <Button variant="outline" asChild className="hover-lift bg-transparent">
                      <a href={media.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Watch on YouTube
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Comments Section */}
              <CommentSection mediaId={media.id} initialComments={comments} onCommentAdded={handleCommentAdded} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Media Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Media Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Likes</span>
                <span className="font-medium">{likesCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Comments</span>
                <span className="font-medium">{comments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <Badge variant="outline" className="capitalize">
                  {media.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published</span>
                <span className="font-medium text-sm">{new Date(media.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Explore More</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/media" className="block">
                <Button variant="outline" className="w-full justify-start hover-lift bg-transparent">
                  View All Media
                </Button>
              </Link>
              <Link href="/projects" className="block">
                <Button variant="outline" className="w-full justify-start hover-lift bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Projects
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button variant="outline" className="w-full justify-start hover-lift bg-transparent">
                  Get in Touch
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
