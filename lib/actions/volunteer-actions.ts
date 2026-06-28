"use server"

import { supabase } from "@/lib/supabase"

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

export async function submitVolunteerApplication(formData: VolunteerFormData) {
  try {
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "age", "location", "preferredRole", "motivation"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof VolunteerFormData])

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in all required fields: ${missingFields.join(", ")}`,
      }
    }

    // Validate skills and languages
    if (!formData.skills || formData.skills.length === 0) {
      return {
        success: false,
        message: "Please select at least one skill or area of expertise",
      }
    }

    if (!formData.languages || formData.languages.length === 0) {
      return {
        success: false,
        message: "Please select at least one language you can speak",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Validate phone format
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    const cleanPhone = formData.phone.replace(/\s+/g, "").replace(/[-()]/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      return {
        success: false,
        message: "Please enter a valid Indian phone number",
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: cleanPhone,
        age_range: formData.age,
        location: formData.location.trim(),
        occupation: formData.occupation.trim() || null,
        experience: formData.experience.trim() || null,
        skills: formData.skills,
        availability: formData.availability,
        preferred_role: formData.preferredRole,
        motivation: formData.motivation.trim(),
        languages: formData.languages,
        has_transport: formData.hasTransport,
        can_travel: formData.canTravel,
        status: "pending",
        source: "foundation_website",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to submit volunteer application. Please try again or contact us directly.",
      }
    }

    return {
      success: true,
      message:
        "Thank you for your volunteer application! We'll review your information and contact you within 7 business days to discuss next steps.",
      data: data?.[0],
    }
  } catch (error) {
    console.error("Volunteer application error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later or contact us directly.",
    }
  }
}

export async function getVolunteerApplications() {
  try {
    const { data, error } = await supabase
      .from("volunteer_applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to fetch volunteer applications",
        data: [],
      }
    }

    return {
      success: true,
      data: data || [],
    }
  } catch (error) {
    console.error("Get volunteer applications error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    }
  }
}
