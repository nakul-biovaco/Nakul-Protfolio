"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import { addCommentAction } from "@/lib/actions/media-actions"
import { toast } from "sonner"
import type { MediaComment } from "@/lib/api"

interface CommentSectionProps {
  mediaId: string
  initialComments?: MediaComment[]
  onCommentAdded?: (comment: MediaComment) => void
}

export function CommentSection({ mediaId, initialComments = [], onCommentAdded }: CommentSectionProps) {
  const [comments, setComments] = useState<MediaComment[]>(initialComments || [])
  const [newComment, setNewComment] = useState("")
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved user name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("commentUserName")
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !userName.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const { success, newComment: addedComment } = await addCommentAction(mediaId, userName.trim(), newComment.trim())

      if (success && addedComment) {
        setComments((prev) => [...prev, addedComment])
        setNewComment("")

        // Save user name for future comments
        localStorage.setItem("commentUserName", userName.trim())

        // Notify parent component
        onCommentAdded?.(addedComment)

        toast.success("Comment added successfully!")
      } else {
        toast.error("Failed to add comment")
      }
    } catch (error) {
      console.error("Failed to add comment:", error)
      toast.error("Failed to add comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      return "Just now"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !newComment.trim() || !userName.trim()}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                  </div>

                  <p className="text-sm leading-relaxed break-words">{comment.commentText}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
