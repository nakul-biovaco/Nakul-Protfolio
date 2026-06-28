import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Caveat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { MaterialIconsProvider } from "@/components/material-icons"

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
  title: "Nakul Mahendra Mundhada | Embedded Systems & AI Engineer",
  description:
    "Portfolio of Nakul Mundhada - Aspiring Embedded Systems & AI Engineer specializing in IoT solutions for agriculture and smart technologies.",
  keywords: [
    "embedded systems",
    "AI engineer",
    "IoT solutions",
    "agriculture technology",
    "electronics engineering",
    "Nakul Mundhada",
    "portfolio",
    "smart devices",
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
    title: "Nakul Mahendra Mundhada | Embedded Systems & AI Engineer",
    description:
      "Portfolio of Nakul Mundhada - Aspiring Embedded Systems & AI Engineer specializing in IoT solutions for agriculture and smart technologies.",
    url: "https://yourdomain.com", // Replace with your actual domain
    siteName: "Nakul Mundhada Portfolio",
    images: [
      {
        url: "/nakul-og-image.png", // Updated to new OG image path
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
    title: "Nakul Mahendra Mundhada | Embedded Systems & AI Engineer",
    description:
      "Portfolio of Nakul Mundhada - Aspiring Embedded Systems & AI Engineer specializing in IoT solutions for agriculture and smart technologies.",
    creator: "@yourtwitterhandle", // Replace with your actual Twitter handle
    images: ["/nakul-og-image.png"], // Updated to new Twitter image path
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable} ${caveat.variable}`}>
        <MaterialIconsProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navigation />
            <main className="min-h-screen transition-colors duration-300 relative z-10">{children}</main>
          </ThemeProvider>
        </MaterialIconsProvider>
      </body>
    </html>
  )
}
