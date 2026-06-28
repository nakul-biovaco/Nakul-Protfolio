"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Handshake, Building2, CheckCircle, AlertCircle, Send } from "lucide-react"
import { submitPartnershipApplication } from "@/lib/actions/partnership-actions"

interface PartnershipFormData {
  organizationName: string
  contactPerson: string
  email: string
  phone: string
  organizationType: string
  partnershipType: string
  annualCommitment: string
  focusAreas: string[]
  message: string
  website: string
  previousCSR: boolean
}

export function PartnershipForm() {
  const [formData, setFormData] = useState<PartnershipFormData>({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    organizationType: "",
    partnershipType: "",
    annualCommitment: "",
    focusAreas: [],
    message: "",
    website: "",
    previousCSR: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (field: keyof PartnershipFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: checked ? [...prev.focusAreas, area] : prev.focusAreas.filter((a) => a !== area),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitPartnershipApplication(formData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        })
        // Reset form
        setFormData({
          organizationName: "",
          contactPerson: "",
          email: "",
          phone: "",
          organizationType: "",
          partnershipType: "",
          annualCommitment: "",
          focusAreas: [],
          message: "",
          website: "",
          previousCSR: false,
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
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

  const focusAreaOptions = [
    "Farmer Education & Training",
    "Technology Access",
    "Sustainable Agriculture",
    "Market Linkage",
    "Financial Inclusion",
    "Women Empowerment",
    "Youth Development",
    "Research & Innovation",
  ]

  return (
    <Card className="hover-lift hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5 text-primary" />
          Partnership Application
        </CardTitle>
        <CardDescription>
          Partner with us to create sustainable impact in rural communities. Let's work together to empower farmers.
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
          {/* Organization Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organization Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                placeholder="Your organization name"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="Primary contact name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationType">Organization Type *</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) => handleInputChange("organizationType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate">Corporate/Company</SelectItem>
                    <SelectItem value="NGO">NGO/Non-Profit</SelectItem>
                    <SelectItem value="Government">Government Agency</SelectItem>
                    <SelectItem value="Foundation">Foundation/Trust</SelectItem>
                    <SelectItem value="Educational">Educational Institution</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="contact@organization.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://www.organization.com"
              />
            </div>
          </div>

          {/* Partnership Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Partnership Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnershipType">Partnership Type *</Label>
                <Select
                  value={formData.partnershipType}
                  onValueChange={(value) => handleInputChange("partnershipType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial Sponsor">Financial Sponsor</SelectItem>
                    <SelectItem value="Technology Partner">Technology Partner</SelectItem>
                    <SelectItem value="Implementation Partner">Implementation Partner</SelectItem>
                    <SelectItem value="Knowledge Partner">Knowledge Partner</SelectItem>
                    <SelectItem value="CSR Partnership">CSR Partnership</SelectItem>
                    <SelectItem value="Strategic Alliance">Strategic Alliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualCommitment">Annual Commitment *</Label>
                <Select
                  value={formData.annualCommitment}
                  onValueChange={(value) => handleInputChange("annualCommitment", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select commitment level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="₹1-5 Lakhs">₹1-5 Lakhs</SelectItem>
                    <SelectItem value="₹5-10 Lakhs">₹5-10 Lakhs</SelectItem>
                    <SelectItem value="₹10-25 Lakhs">₹10-25 Lakhs</SelectItem>
                    <SelectItem value="₹25-50 Lakhs">₹25-50 Lakhs</SelectItem>
                    <SelectItem value="₹50+ Lakhs">₹50+ Lakhs</SelectItem>
                    <SelectItem value="Non-Financial">Non-Financial Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Focus Areas of Interest *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {focusAreaOptions.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={formData.focusAreas.includes(area)}
                      onCheckedChange={(checked) => handleFocusAreaChange(area, checked as boolean)}
                    />
                    <Label htmlFor={area} className="text-sm">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousCSR"
                checked={formData.previousCSR}
                onCheckedChange={(checked) => handleInputChange("previousCSR", checked as boolean)}
              />
              <Label htmlFor="previousCSR" className="text-sm">
                Our organization has previous experience with CSR/social impact programs
              </Label>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Partnership Proposal *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your organization's goals, how you'd like to partner with us, and what impact you hope to create together..."
              rows={4}
              required
              className="resize-none"
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
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Partnership Application
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll review your application and contact you within 5 business days.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
