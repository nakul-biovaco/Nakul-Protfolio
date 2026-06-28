import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Keep internal APIs hidden to focus crawl budget on content
    },
    sitemap: 'https://www.nakulmundhada.site/sitemap.xml',
  }
}
