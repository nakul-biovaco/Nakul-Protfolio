"use server"

import { supabase } from "@/lib/supabase"

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

export async function scheduleDemoAction(formData: DemoFormData) {
  try {
    // Validate required fields
    const requiredFields = ["name", "email", "phone", "location", "preferredDate", "preferredTime", "demoType"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof DemoFormData])

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in all required fields: ${missingFields.join(", ")}`,
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

    // Validate phone format (basic validation for Indian numbers)
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    const cleanPhone = formData.phone.replace(/\s+/g, "").replace(/[-()]/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      return {
        success: false,
        message: "Please enter a valid Indian phone number",
      }
    }

    // Validate date (must be in future)
    const selectedDate = new Date(formData.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate <= today) {
      return {
        success: false,
        message: "Please select a future date for the demo",
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from("demo_requests")
      .insert({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: cleanPhone,
        farm_size: formData.farmSize,
        location: formData.location.trim(),
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        demo_type: formData.demoType,
        message: formData.message.trim(),
        status: "pending",
        source: "electroculture_website",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: "Failed to schedule demo. Please try again or contact us directly.",
      }
    }

    // Send notification email (you can implement this later)
    // await sendDemoNotificationEmail(formData)

    return {
      success: true,
      message: "Demo scheduled successfully! We'll contact you within 24 hours to confirm the details.",
      data: data[0],
    }
  } catch (error) {
    console.error("Demo scheduling error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

export async function getDemoRequests() {
  try {
    const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching demo requests:", error)
      return { success: false, data: [] }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching demo requests:", error)
    return { success: false, data: [] }
  }
}

export async function updateDemoStatus(id: string, status: string, notes?: string) {
  try {
    const { data, error } = await supabase
      .from("demo_requests")
      .update({
        status,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Error updating demo status:", error)
      return { success: false, message: "Failed to update demo status" }
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error updating demo status:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}
