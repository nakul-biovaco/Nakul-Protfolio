"use client"

import { useState, useEffect, useCallback } from "react"
import { projectsAPI, internshipsAPI, educationAPI, skillsAPI, analyticsAPI, certificatesAPI } from "@/lib/api"
import type { Project, Internship, Education, Skill, Certificate } from "@/lib/api"

// Custom hook for projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await projectsAPI.getAll()
        setProjects(data)
        analyticsAPI.trackEvent("projects_loaded", { count: data.length })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch projects"
        setError(errorMessage)
        console.error("Error in useProjects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: () => window.location.reload() }
}

// Custom hook for featured projects
export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await projectsAPI.getFeatured()
        setProjects(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch featured projects"
        setError(errorMessage)
        console.error("Error in useFeaturedProjects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  return { projects, loading, error }
}

// Custom hook for single project
export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await projectsAPI.getById(id)
        setProject(data)
        analyticsAPI.trackPageView(`/projects/${id}`)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch project"
        setError(errorMessage)
        console.error("Error in useProject:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  return { project, loading, error }
}

// Custom hook for internships
export function useInternships() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await internshipsAPI.getAll()
        setInternships(data)
        analyticsAPI.trackEvent("internships_loaded", { count: data.length })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch internships"
        setError(errorMessage)
        console.error("Error in useInternships:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  return { internships, loading, error }
}

// Custom hook for single internship
export function useInternship(id: string) {
  const [internship, setInternship] = useState<Internship | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await internshipsAPI.getById(id)
        setInternship(data)
        analyticsAPI.trackPageView(`/internships/${id}`)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch internship"
        setError(errorMessage)
        console.error("Error in useInternship:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchInternship()
    }
  }, [id])

  return { internship, loading, error }
}

// Custom hook for education
export function useEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await educationAPI.getAll()
        setEducation(data)
        analyticsAPI.trackEvent("education_loaded", { count: data.length })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch education"
        setError(errorMessage)
        console.error("Error in useEducation:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  return { education, loading, error }
}

// Custom hook for skills
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await skillsAPI.getAll()
        setSkills(data)
        analyticsAPI.trackEvent("skills_loaded", { count: data.length })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch skills"
        setError(errorMessage)
        console.error("Error in useSkills:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { skills, loading, error }
}

// Custom hook for certificates
export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await certificatesAPI.getAll()
        setCertificates(data)
        analyticsAPI.trackEvent("certificates_loaded", { count: data.length })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch certificates"
        setError(errorMessage)
        console.error("Error in useCertificates:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  return { certificates, loading, error }
}

// Custom hook for analytics
export function useAnalytics() {
  const trackPageView = useCallback((page: string) => {
    analyticsAPI.trackPageView(page)
  }, [])

  const trackEvent = useCallback((event: string, data?: any) => {
    analyticsAPI.trackEvent(event, data)
  }, [])

  return { trackPageView, trackEvent }
}
