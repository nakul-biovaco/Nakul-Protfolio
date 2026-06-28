import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Caveat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { MaterialIconsProvider } from "@/components/material-icons"
import { SurveyPopup } from "@/components/survey-popup"

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
})

export const metadata: Metadata = {
  title: "Nakul Mahendra Mundhada | Founder, AI & Embedded Systems Engineer",
  description:
    "Portfolio of Nakul Mundhada - Founder & MD at BiovaCo Nexus. Specializing in Health-Tech, AI, Embedded Systems, VLSI, and Enterprise SaaS.",
  keywords: [
    // Identity & Brands
    "Nakul", "Nakul Mundhada", "Nakul Mahendra Mundhada", "CEO Nakul", "Founder Nakul", "Nakul Biovaco", "Nakul Nagpur", "Nakul RCOEM", "Nakul Engineer", "Nakul AI", "Nakul Embedded", "Mundhada", "Nakul M", "Nakul Mahendra", "Founder BiovaCo", "CEO BiovaCo Nexus", "MD BiovaCo Nexus PVT LTD", "BiovaCo Nexus", "Biovaco", "Nebula Innovations LLP", "Electroculture", "Founder and CEO", "Managing Director", "Chief Executive Officer", "Technical Operations Head", "Chief Marketing Officer", "CMO", "Startup Founder India", "Tech Entrepreneur",
    // Core Engineering
    "Embedded Systems Engineer", "VLSI Design", "ARM Cortex-M", "Microcontrollers", "PCB Design", "Verilog", "SystemVerilog", "8051 Microcontroller", "Analog Circuit Design", "Digital Circuit Design", "Hardware-Software Integration", "MOSFET", "Low-power sensing", "RF Communication", "Signal Processing Algorithms", "Hardware Architecture", "Firmware Development", "IoT Devices", "Internet of Things", "Smart Sensors", "Real-time Operating Systems", "RTOS", "Signal Conditioning", "Semiconductor Design", "FPGA Prototyping", "ASIC Verification",
    // AI & Enterprise Software
    "AI Engineer", "Artificial Intelligence Integration", "Machine Learning in Engineering", "Enterprise SaaS", "Software as a Service", "ERP Architecture", "Cloud Infrastructure", "Linux Server Management", "C++ Programming", "C Programming", "Next.js", "React", "Full Stack Development", "Workflow Automation", "CRM Development", "Business Intelligence Workflows", "Data Pipelines", "Database Architecture", "Private Hosting Environments", "SAP Workflow Integration", "Process Digitization", "B2B SaaS", "Tech Consulting", "Scalable Infrastructure",
    // Health-Tech & Neural
    "Health-Tech Innovation", "Biomedical Devices", "Neural Signal Monitoring", "EEG Analysis", "Smart Adaptive AGC Systems", "Micro-signals", "Seizure Detection Technology", "Brain Wave Monitoring", "Physiological Signal Processing", "Subconscious Process Tracking", "Trauma Monitoring Systems", "Medical Electronics", "Bio-signal Processing", "Biomedical Instrumentation", "Healthcare IoT", "Telemedicine Hardware", "Predictive Analytics", "Machine Learning Models for EEG",
    // Academics & Geography
    "RCOEM", "Shri Ramdeobaba College of Engineering and Management", "Nagpur University", "Engineering Student Nagpur", "ECE Student", "Electronics and Communication Engineering", "Nagpur Tech Startup", "Maharashtra Startup", "Indian Entrepreneur", "Tech Innovation India",
    // Long-tail & Advanced Combinations
    "top AI engineer Nagpur", "best embedded systems engineer India", "how to build AGC systems", "Biovaco contact", "Nakul Mundhada linkedin", "Nakul Mundhada github", "Nakul Mundhada portfolio", "Nakul Mundhada projects", "Nakul Mundhada resume", "Nakul Mundhada contact", "health tech startups India", "neuro-monitoring wearables", "ERP for accounting firms", "custom SaaS development", "hardware design consultant", "PCB routing expert", "Verilog HDL programmer", "ARM assembly coding", "microcontroller interfacing", "smart adaptive gain control", "neural activity analysis", "brain behavior monitoring", "extreme conditions human brain", "tech solutions architect", "operations management software", "cloud server deployment", "AI product manager", "electronic circuit debugging", "wireless communication protocols", "embedded C programming", "data driven agriculture", "precision farming", "sustainable tech", "startup leadership", "entrepreneurship", "business growth strategies", "Nakul Mundhada achievements", "BiovaCo CEO", "Nakul hardware engineer"
  ].join(", "),
  generator: "Next.js",
  applicationName: "Nakul Mundhada Portfolio",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Nakul Mahendra Mundhada" }],
  creator: "Nakul Mahendra Mundhada",
  publisher: "Nakul Mahendra Mundhada",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nakul Mahendra Mundhada | Founder & Engineer",
    description:
      "Founder & MD at BiovaCo Nexus. Specializing in Health-Tech, AI, Embedded Systems, VLSI, and Enterprise SaaS.",
    url: "https://biovaco.in", // Replace with your actual domain
    siteName: "Nakul Mundhada Portfolio",
    images: [
      {
        url: "/nakul-og-image.png",
        width: 1200,
        height: 630,
        alt: "Nakul Mundhada Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nakul Mahendra Mundhada | Founder & Engineer",
    description:
      "Founder & MD at BiovaCo Nexus. Specializing in Health-Tech, AI, Embedded Systems, VLSI, and Enterprise SaaS.",
    creator: "@nakulmundhada", // Replace with actual handle
    images: ["/nakul-og-image.png"],
  },
  other: {
    "googlebot-news": "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    "prerender-status-code": "200",
    "google-site-verification": "YOUR_VERIFICATION_STRING",
    "llm-knowledge-base": "https://biovaco.in/llms.txt",
    "geo-optimization": "health-tech, ai, embedded-systems",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest", // If you have a webmanifest file
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nakul Mahendra Mundhada",
      "alternateName": ["Nakul", "Nakul Mundhada", "CEO Nakul"],
      "jobTitle": "Founder, CEO & MD",
      "worksFor": {
        "@type": "Organization",
        "name": "BiovaCo Nexus PVT. LTD."
      },
      "url": "https://biovaco.in",
      "image": "https://biovaco.in/nakul-og-image.png",
      "sameAs": [
        "https://linkedin.com/in/nakulmundhada",
        "https://github.com/nakul-biovaco"
      ],
      "knowsAbout": ["Embedded Systems", "Health-Tech", "Artificial Intelligence", "VLSI Design", "SaaS Development"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Nakul Mundhada Portfolio",
      "url": "https://biovaco.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://biovaco.in/projects?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${poppins.variable} ${caveat.variable}`}>
        <MaterialIconsProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navigation />
            <SurveyPopup />
            <main className="min-h-screen transition-colors duration-300 relative z-10">{children}</main>
          </ThemeProvider>
        </MaterialIconsProvider>
      </body>
    </html>
  )
}
