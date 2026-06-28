import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (...args) => {
      if (!isSupabaseConfigured) {
        return Promise.reject(new Error("Supabase not configured. Using mock data."));
      }
      return fetch(...args);
    }
  }
})

// Test connection function
export async function testConnection() {
  try {
    const { data, error } = await supabase.from("projects").select("count", { count: "exact", head: true })
    if (error) throw error
    return true
  } catch (error) {
    console.log("Supabase connection test failed:", error)
    return false
  }
}

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          title: string | null
          bio: string | null
          location: string | null
          phone: string | null
          website: string | null
          github: string | null
          linkedin: string | null
          twitter: string | null
          profile_image: string | null
          resume_url: string | null
          created_at: string
          updated_at: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string | null
          detailed_description: string | null
          tech_stack: string[]
          category: string | null
          status: string
          duration: string | null
          team: string | null
          highlights: string[]
          challenges: string[]
          outcomes: string[]
          images: string[]
          demo_link: string | null
          github_link: string | null
          featured: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
      }
      internships: {
        Row: {
          id: string
          company: string
          role: string
          duration: string | null
          location: string | null
          type: string
          status: string
          description: string | null
          detailed_description: string | null
          responsibilities: string[]
          technologies: string[]
          achievements: string[]
          skills_gained: string[]
          mentor: string | null
          certificate: boolean
          certificate_url: string | null
          certificate_title: string | null
          certificate_issuer: string | null
          certificate_date: string | null
          recommendation_letter: boolean
          company_website: string | null
          linkedin_post: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
      }
      education: {
        Row: {
          id: string
          degree: string
          institution: string
          location: string | null
          duration: string | null
          status: string
          gpa: string | null
          percentage: string | null
          description: string | null
          coursework: string[]
          achievements: string[]
          order_index: number
          created_at: string
          updated_at: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          level: number
          experience: string | null
          category: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          subject: string
          message: string
          status: string
          replied: boolean
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
      }
      certificates: {
        Row: {
          id: string
          title: string
          issuer: string
          issue_date: string
          expiry_date: string | null
          credential_id: string | null
          credential_url: string | null
          description: string | null
          skills: string[]
          certificate_type: string | null
          image_url: string | null
          badge_url: string | null
          verification_url: string | null
          internship_id: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
