import { supabase } from "./supabase"

// Admin API types
export interface AdminProject {
  id?: string
  title: string
  description: string
  longDescription?: string
  detailedDescription?: string
  technologies: string[]
  category?: string
  status: string
  duration?: string
  team?: string
  highlights?: string[]
  challenges?: string[]
  outcomes?: string[]
  images?: string[]
  demoLink?: string
  githubLink?: string
  featured: boolean
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface AdminSkill {
  id?: string
  name: string
  level: number
  experience?: string
  category: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface AdminInternship {
  id?: string
  company: string
  role: string
  duration: string
  location?: string
  type?: string
  status: string
  description: string
  detailedDescription?: string
  responsibilities?: string[]
  technologies?: string[]
  achievements?: string[]
  skillsGained?: string[]
  projectsWorkedOn?: Array<{
    name: string
    description: string
    role: string
  }>
  mentor?: string
  certificate?: boolean
  certificateUrl?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface AdminEducation {
  id?: string
  degree: string
  institution: string
  location?: string
  duration: string
  status: string
  gpa?: string
  percentage?: string
  description?: string
  coursework?: string[]
  achievements?: string[]
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface AdminMedia {
  id?: string
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnailUrl?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface SiteSettings {
  id?: string
  profileImage: string
  aboutContent: string
  heroTitle: string
  heroSubtitle: string
  contactEmail?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
  }
  updatedAt?: string
}

// Projects API
export const adminProjectsAPI = {
  async getAll(): Promise<AdminProject[]> {
    const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

    if (error) throw error
    return data || []
  },

  async create(project: AdminProject): Promise<AdminProject> {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: project.title,
        description: project.description,
        long_description: project.longDescription,
        detailed_description: project.detailedDescription,
        tech_stack: project.technologies,
        category: project.category,
        status: project.status,
        duration: project.duration,
        team: project.team,
        highlights: project.highlights,
        challenges: project.challenges,
        outcomes: project.outcomes,
        images: project.images,
        demo_link: project.demoLink,
        github_link: project.githubLink,
        featured: project.featured,
        order_index: project.order,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, project: AdminProject): Promise<AdminProject> {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        description: project.description,
        long_description: project.longDescription,
        detailed_description: project.detailedDescription,
        tech_stack: project.technologies,
        category: project.category,
        status: project.status,
        duration: project.duration,
        team: project.team,
        highlights: project.highlights,
        challenges: project.challenges,
        outcomes: project.outcomes,
        images: project.images,
        demo_link: project.demoLink,
        github_link: project.githubLink,
        featured: project.featured,
        order_index: project.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
  },
}

// Skills API
export const adminSkillsAPI = {
  async getAll(): Promise<AdminSkill[]> {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("order_index", { ascending: true })

    if (error) throw error
    return data || []
  },

  async create(skill: AdminSkill): Promise<AdminSkill> {
    const { data, error } = await supabase
      .from("skills")
      .insert({
        name: skill.name,
        level: skill.level,
        experience: skill.experience,
        category: skill.category,
        order_index: skill.order,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, skill: AdminSkill): Promise<AdminSkill> {
    const { data, error } = await supabase
      .from("skills")
      .update({
        name: skill.name,
        level: skill.level,
        experience: skill.experience,
        category: skill.category,
        order_index: skill.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) throw error
  },
}

// Internships API
export const adminInternshipsAPI = {
  async getAll(): Promise<AdminInternship[]> {
    const { data, error } = await supabase.from("internships").select("*").order("order_index", { ascending: true })

    if (error) throw error
    return data || []
  },

  async create(internship: AdminInternship): Promise<AdminInternship> {
    const { data, error } = await supabase
      .from("internships")
      .insert({
        company: internship.company,
        role: internship.role,
        duration: internship.duration,
        location: internship.location,
        type: internship.type,
        status: internship.status,
        description: internship.description,
        detailed_description: internship.detailedDescription,
        responsibilities: internship.responsibilities,
        technologies: internship.technologies,
        achievements: internship.achievements,
        skills_gained: internship.skillsGained,
        projects_worked_on: internship.projectsWorkedOn,
        mentor: internship.mentor,
        certificate: internship.certificate,
        certificate_url: internship.certificateUrl,
        order_index: internship.order,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, internship: AdminInternship): Promise<AdminInternship> {
    const { data, error } = await supabase
      .from("internships")
      .update({
        company: internship.company,
        role: internship.role,
        duration: internship.duration,
        location: internship.location,
        type: internship.type,
        status: internship.status,
        description: internship.description,
        detailed_description: internship.detailedDescription,
        responsibilities: internship.responsibilities,
        technologies: internship.technologies,
        achievements: internship.achievements,
        skills_gained: internship.skillsGained,
        projects_worked_on: internship.projectsWorkedOn,
        mentor: internship.mentor,
        certificate: internship.certificate,
        certificate_url: internship.certificateUrl,
        order_index: internship.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("internships").delete().eq("id", id)

    if (error) throw error
  },
}

// Education API
export const adminEducationAPI = {
  async getAll(): Promise<AdminEducation[]> {
    const { data, error } = await supabase.from("education").select("*").order("order_index", { ascending: true })

    if (error) throw error
    return data || []
  },

  async create(education: AdminEducation): Promise<AdminEducation> {
    const { data, error } = await supabase
      .from("education")
      .insert({
        degree: education.degree,
        institution: education.institution,
        location: education.location,
        duration: education.duration,
        status: education.status,
        gpa: education.gpa,
        percentage: education.percentage,
        description: education.description,
        coursework: education.coursework,
        achievements: education.achievements,
        order_index: education.order,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, education: AdminEducation): Promise<AdminEducation> {
    const { data, error } = await supabase
      .from("education")
      .update({
        degree: education.degree,
        institution: education.institution,
        location: education.location,
        duration: education.duration,
        status: education.status,
        gpa: education.gpa,
        percentage: education.percentage,
        description: education.description,
        coursework: education.coursework,
        achievements: education.achievements,
        order_index: education.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("education").delete().eq("id", id)

    if (error) throw error
  },
}

// Media API
export const adminMediaAPI = {
  async getAll(): Promise<AdminMedia[]> {
    const { data, error } = await supabase.from("media").select("*").order("order_index", { ascending: true })

    if (error) throw error
    return data || []
  },

  async create(media: AdminMedia): Promise<AdminMedia> {
    const { data, error } = await supabase
      .from("media")
      .insert({
        title: media.title,
        description: media.description,
        type: media.type,
        url: media.url,
        thumbnail_url: media.thumbnailUrl,
        order_index: media.order,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, media: AdminMedia): Promise<AdminMedia> {
    const { data, error } = await supabase
      .from("media")
      .update({
        title: media.title,
        description: media.description,
        type: media.type,
        url: media.url,
        thumbnail_url: media.thumbnailUrl,
        order_index: media.order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("media").delete().eq("id", id)

    if (error) throw error
  },
}

// Settings API
export const adminSettingsAPI = {
  async get(): Promise<SiteSettings> {
    const { data, error } = await supabase.from("site_settings").select("*").single()

    if (error) {
      // If no settings exist, create default ones
      if (error.code === "PGRST116") {
        return this.create({
          profileImage: "/images/nakul-profile.png",
          aboutContent:
            "Passionate Electronics and Communication Engineering student with expertise in embedded systems, IoT, and full-stack development.",
          heroTitle: "Nakul Mahendra Mundhada",
          heroSubtitle: "Electronics & Communication Engineering Student | Embedded Systems Developer | IoT Enthusiast",
        })
      }
      throw error
    }

    return {
      id: data.id,
      profileImage: data.profile_image,
      aboutContent: data.about_content,
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      contactEmail: data.contact_email,
      socialLinks: data.social_links,
      updatedAt: data.updated_at,
    }
  },

  async create(settings: Omit<SiteSettings, "id" | "updatedAt">): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from("site_settings")
      .insert({
        profile_image: settings.profileImage,
        about_content: settings.aboutContent,
        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        contact_email: settings.contactEmail,
        social_links: settings.socialLinks,
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      profileImage: data.profile_image,
      aboutContent: data.about_content,
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      contactEmail: data.contact_email,
      socialLinks: data.social_links,
      updatedAt: data.updated_at,
    }
  },

  async update(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from("site_settings")
      .update({
        profile_image: settings.profileImage,
        about_content: settings.aboutContent,
        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        contact_email: settings.contactEmail,
        social_links: settings.socialLinks,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id || 1)
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      profileImage: data.profile_image,
      aboutContent: data.about_content,
      heroTitle: data.hero_title,
      heroSubtitle: data.hero_subtitle,
      contactEmail: data.contact_email,
      socialLinks: data.social_links,
      updatedAt: data.updated_at,
    }
  },
}

// File upload API
export const adminFileAPI = {
  async uploadFile(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from("media").getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteFile(url: string): Promise<void> {
    // Extract file path from URL
    const urlParts = url.split("/")
    const filePath = urlParts.slice(-2).join("/")

    const { error } = await supabase.storage.from("media").remove([filePath])

    if (error) throw error
  },
}
