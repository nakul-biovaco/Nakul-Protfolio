"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Phone, User, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { scheduleDemoAction } from "@/lib/actions/demo-actions"

interface DemoFormData {
  name: string
  email: string
  phone: string
  farmSize: string
  location: string
  preferredDate: string
  preferredTime: string
  demoType: string
  message: string
}

export function DemoScheduler() {
  const [formData, setFormData] = useState<DemoFormData>({
    name: "",
    email: "",
    phone: "",
    farmSize: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    demoType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (field: keyof DemoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await scheduleDemoAction(formData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Demo scheduled successfully! We'll contact you within 24 hours to confirm the details.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          farmSize: "",
          location: "",
          preferredDate: "",
          preferredTime: "",
          demoType: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to schedule demo. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <Card className="hover-lift hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Schedule a Demo
        </CardTitle>
        <CardDescription>Book a personalized demonstration of MittiMitra at our facility or your farm</CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus.type && (
          <Alert
            className={`mb-6 ${submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Select value={formData.farmSize} onValueChange={(value) => handleInputChange("farmSize", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select farm size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 acre</SelectItem>
                  <SelectItem value="1-5">1-5 acres</SelectItem>
                  <SelectItem value="5-10">5-10 acres</SelectItem>
                  <SelectItem value="10-25">10-25 acres</SelectItem>
                  <SelectItem value="more-than-25">More than 25 acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location (City, State) *
            </Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Nagpur, Maharashtra"
              required
              className="w-full"
            />
          </div>

          {/* Demo Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Date *
              </Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                min={minDate}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Preferred Time *
              </Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleInputChange("preferredTime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (2 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demoType">Demo Type *</Label>
            <Select value={formData.demoType} onValueChange={(value) => handleInputChange("demoType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select demo type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">Office Demo (RCOEM TBI, Nagpur)</SelectItem>
                <SelectItem value="farm">On-Farm Demo (Your Location)</SelectItem>
                <SelectItem value="virtual">Virtual Demo (Video Call)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your specific requirements, crops, or any questions you have..."
              rows={4}
              className="w-full resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Scheduling Demo...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Demo
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll contact you within 24 hours to confirm your demo appointment.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
