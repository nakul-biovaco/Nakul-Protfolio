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
import { UserPlus, User, CheckCircle, AlertCircle, Send } from "lucide-react"
import { submitVolunteerApplication } from "@/lib/actions/volunteer-actions"

interface VolunteerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  location: string
  occupation: string
  experience: string
  skills: string[]
  availability: string
  preferredRole: string
  motivation: string
  languages: string[]
  hasTransport: boolean
  canTravel: boolean
}

export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    occupation: "",
    experience: "",
    skills: [],
    availability: "",
    preferredRole: "",
    motivation: "",
    languages: [],
    hasTransport: false,
    canTravel: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (field: keyof VolunteerFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      languages: checked ? [...prev.languages, language] : prev.languages.filter((l) => l !== language),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const result = await submitVolunteerApplication(formData)

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
          age: "",
          location: "",
          occupation: "",
          experience: "",
          skills: [],
          availability: "",
          preferredRole: "",
          motivation: "",
          languages: [],
          hasTransport: false,
          canTravel: false,
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

  const skillOptions = [
    "Agriculture/Farming",
    "Teaching/Training",
    "Technology/IT",
    "Marketing/Sales",
    "Finance/Accounting",
    "Project Management",
    "Communication",
    "Research",
  ]

  const languageOptions = ["Hindi", "Marathi", "English", "Gujarati", "Telugu", "Tamil", "Other"]

  return (
    <Card className="hover-lift hover-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Volunteer Application
        </CardTitle>
        <CardDescription>
          Join our team of dedicated volunteers working directly with farmers to create positive change.
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
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Your last name"
                  required
                />
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
                  placeholder="your.email@example.com"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-35">26-35</SelectItem>
                    <SelectItem value="36-45">36-45</SelectItem>
                    <SelectItem value="46-55">46-55</SelectItem>
                    <SelectItem value="55+">55+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input
                  id="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="Your profession"
                />
              </div>
            </div>
          </div>

          {/* Volunteer Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Volunteer Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredRole">Preferred Role *</Label>
                <Select
                  value={formData.preferredRole}
                  onValueChange={(value) => handleInputChange("preferredRole", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Field Coordinator">Field Coordinator</SelectItem>
                    <SelectItem value="Training Facilitator">Training Facilitator</SelectItem>
                    <SelectItem value="Technology Mentor">Technology Mentor</SelectItem>
                    <SelectItem value="Administrative Support">Administrative Support</SelectItem>
                    <SelectItem value="Marketing & Outreach">Marketing & Outreach</SelectItem>
                    <SelectItem value="Any Role">Any Role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time (40+ hours/week)</SelectItem>
                    <SelectItem value="Part-time">Part-time (20-40 hours/week)</SelectItem>
                    <SelectItem value="Weekends">Weekends only</SelectItem>
                    <SelectItem value="Flexible">Flexible (as needed)</SelectItem>
                    <SelectItem value="Project-based">Project-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills & Expertise *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.skills.includes(skill)}
                      onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Languages Spoken *</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languages.includes(language)}
                      onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    />
                    <Label htmlFor={language} className="text-sm">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTransport"
                  checked={formData.hasTransport}
                  onCheckedChange={(checked) => handleInputChange("hasTransport", checked as boolean)}
                />
                <Label htmlFor="hasTransport" className="text-sm">
                  I have my own transportation
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canTravel"
                  checked={formData.canTravel}
                  onCheckedChange={(checked) => handleInputChange("canTravel", checked as boolean)}
                />
                <Label htmlFor="canTravel" className="text-sm">
                  I can travel to rural areas for field work
                </Label>
              </div>
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Describe any relevant experience in agriculture, social work, volunteering, or related fields..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to volunteer with us? *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="Tell us about your motivation to help farmers and contribute to rural development..."
                rows={3}
                required
                className="resize-none"
              />
            </div>
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
                Submit Volunteer Application
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll review your application and contact you within 7 business days.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
