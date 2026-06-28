"use server"

import { supabase } from "@/lib/supabase"

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

export async function submitPartnershipApplication(formData: PartnershipFormData) {
  try {
    // Validate required fields
    const requiredFields = [
      "organizationName",
      "contactPerson",
      "email",
      "phone",
      "organizationType",
      "partnershipType",
      "annualCommitment",
      "message",
    ]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof PartnershipFormData])

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in all required fields: ${missingFields.join(", ")}`,
      }
    }

    // Validate focus areas
    if (!formData.focusAreas || formData.focusAreas.length === 0) {
      return {
        success: false,
        message: "Please select at least one focus area of interest",
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
      .from("partnership_applications")
      .insert({
        organization_name: formData.organizationName.trim(),
        contact_person: formData.contactPerson.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: cleanPhone,
        organization_type: formData.organizationType,
        partnership_type: formData.partnershipType,
        annual_commitment: formData.annualCommitment,
        focus_areas: formData.focusAreas,
        message: formData.message.trim(),
        website: formData.website.trim() || null,
        previous_csr: formData.previousCSR,
        status: "pending",
        source: "foundation_website",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to submit partnership application. Please try again or contact us directly.",
      }
    }

    return {
      success: true,
      message:
        "Thank you for your interest in partnering with us! We'll review your application and contact you within 5 business days to discuss partnership opportunities.",
      data: data?.[0],
    }
  } catch (error) {
    console.error("Partnership application error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later or contact us directly.",
    }
  }
}

export async function getPartnershipApplications() {
  try {
    const { data, error } = await supabase
      .from("partnership_applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to fetch partnership applications",
        data: [],
      }
    }

    return {
      success: true,
      data: data || [],
    }
  } catch (error) {
    console.error("Get partnership applications error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
      data: [],
    }
  }
}
