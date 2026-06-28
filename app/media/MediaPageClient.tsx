"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, SortAsc, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MediaCard } from "@/components/media-card"
import { MaterialIcons } from "@/components/material-icons"
import { analyticsAPI } from "@/lib/api"
import type { Media } from "@/lib/api"

interface MediaPageClientProps {
  initialMedia: Media[]
}

export function MediaPageClient({ initialMedia }: MediaPageClientProps) {
  const [media, setMedia] = useState<Media[]>(initialMedia)
  const [filteredMedia, setFilteredMedia] = useState<Media[]>(initialMedia)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all")
  const [sortBy, setSortBy] = useState<"date" | "likes" | "comments">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter and sort media
  useEffect(() => {
    const filtered = media.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === "all" || item.type === selectedType
      return matchesSearch && matchesType
    })

    // Sort media
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case "likes":
          comparison = a.likesCount - b.likesCount
          break
        case "comments":
          comparison = a.commentsCount - b.commentsCount
          break
      }

      return sortOrder === "desc" ? -comparison : comparison
    })

    setFilteredMedia(filtered)
  }, [media, searchQuery, selectedType, sortBy, sortOrder])

  // Track page view
  useEffect(() => {
    analyticsAPI.trackPageView("/media")
  }, [])

  const handleMediaUpdate = (updatedMedia: Media) => {
    setMedia((prev) => prev.map((item) => (item.id === updatedMedia.id ? updatedMedia : item)))
  }

  const stats = {
    total: media.length,
    images: media.filter((item) => item.type === "image").length,
    videos: media.filter((item) => item.type === "video").length,
    totalLikes: media.reduce((sum, item) => sum + item.likesCount, 0),
    totalComments: media.reduce((sum, item) => sum + item.commentsCount, 0),
  }

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 font-caveat">Media Gallery</h1>
            <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Visual documentation of my technical journey, projects, and innovations in embedded systems and IoT
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent">{stats.images}</div>
                <div className="text-sm text-muted-foreground">Images</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-highlight">{stats.videos}</div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.totalLikes}</div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-accent">{stats.totalComments}</div>
                <div className="text-sm text-muted-foreground">Comments</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredMedia.length} of {media.length} items
          </div>
        </div>
      </section>

      {/* Media Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMedia.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <MaterialIcons.Search />
              <h3 className="text-xl font-semibold mt-4 mb-2">No media found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
            >
              {filteredMedia.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MediaCard media={item} onUpdate={handleMediaUpdate} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
