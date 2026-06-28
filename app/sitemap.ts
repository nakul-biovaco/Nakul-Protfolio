import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { seoKeywords } from '@/lib/seo-keywords'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nakulmundhada.site' // Verified Search Console Domain

  // 1. Fetch dynamic data from Supabase (Universal Setup)
  // Even if the API fails, we return an empty array to prevent the build from crashing
  let projects = []
  try {
    const { data } = await supabase.from('projects').select('id, updated_at')
    if (data) projects = data
  } catch (e) {
    console.error("Sitemap: Failed to fetch projects", e)
  }

  // 2. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/education`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/company`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]

  // 3. Dynamic Database Routes (Projects added by Admin)
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 4. Programmatic AI SEO Routes (From Excel Keywords)
  const seoRoutes: MetadataRoute.Sitemap = seoKeywords.map((keyword) => {
    const slug = encodeURIComponent(keyword.replace(/\s+/g, '-').toLowerCase())
    return {
      url: `${baseUrl}/explore/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  // 5. Combine and return universally
  return [...staticRoutes, ...projectRoutes, ...seoRoutes]
}
