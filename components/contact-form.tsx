"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle, Send } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { contactAPI } from "@/lib/api"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  inquiryType: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
        setSubmitStatus({
          type: "error",
          message: "Please fill in all required fields.",
        })
        return
      }

      // Create subject with inquiry type
      const fullSubject = formData.inquiryType ? `[${formData.inquiryType}] ${formData.subject}` : formData.subject

      const result = await contactAPI.sendMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: fullSubject,
        message: `${formData.message}${formData.phone ? `\n\nPhone: ${formData.phone}` : ""}`,
      })

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          inquiryType: "",
          message: "",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="hover-lift hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Send us a Message
        </CardTitle>
        <CardDescription>
          Have questions about our products or want to discuss a partnership? We'd love to hear from you.
        </CardDescription>
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
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210 (optional)"
                className="w-full"
              />
            </div>
          </div>

          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="inquiryType">Inquiry Type</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                <SelectItem value="Pricing">Pricing Information</SelectItem>
                <SelectItem value="Partnership">Partnership Opportunity</SelectItem>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Investment">Investment Inquiry</SelectItem>
                <SelectItem value="Media">Media & Press</SelectItem>
                <SelectItem value="General">General Question</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Brief description of your inquiry"
              required
              className="w-full"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please provide details about your inquiry, requirements, or questions..."
              rows={5}
              required
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
                <Send className="mr-2 h-4 w-4 animate-pulse" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We typically respond within 24 hours during business days.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
