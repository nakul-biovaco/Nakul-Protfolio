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
  keywords: ["6,BiovaCo Nexus Pvt. Ltd.,Brand - BiovaCo Nexus,Navigational,High,", "10,BiovaCo Nexus company,Brand - BiovaCo Nexus,Navigational,High,", "14,BiovaCo Nexus CIN U46300ME2026PTC475352,Brand - BiovaCo Nexus,Navigational,High,", "18,BiovaCo Nexus biotech,Brand - BiovaCo Nexus,Navigational,High,", "22,BiovaCo Nexus careers,Brand - BiovaCo Nexus,Navigational,High,", "26,BiovaCo Nexus Instagram,Brand - BiovaCo Nexus,Navigational,High,", "30,Biovaco Nexus kaisi company hai,Brand - BiovaCo Nexus,Navigational,High,", "34,Cravora seasoning,Brand - Cravora,Navigational / Commercial,High,", "38,Cravora buy online,Brand - Cravora,Navigational / Commercial,High,", "42,Achari Fire Dust price,Brand - Cravora,Navigational / Commercial,High,", "46,Cravora popcorn flavors,Brand - Cravora,Navigational / Commercial,High,", "50,Cravora Maharashtra,Brand - Cravora,Navigational / Commercial,High,", "54,Cravora order online,Brand - Cravora,Navigational / Commercial,High,", "58,Cravora reviews,Brand - Cravora,Navigational / Commercial,High,", "62,Cravora founder story,Brand - Cravora,Navigational / Commercial,High,", "66,Nakul Mundhada Amravati,Founder Personal Brand - Nakul,Navigational / Branding,High,", "70,Nakul Mundhada BiovaCo Nexus,Founder Personal Brand - Nakul,Navigational / Branding,High,", "74,Nakul from Dhamangaon,Founder Personal Brand - Nakul,Navigational / Branding,High,", "78,Nakul ECE RCOEM Nagpur,Founder Personal Brand - Nakul,Navigational / Branding,High,", "82,Mundhada Brothers krushi kendra,Founder Personal Brand - Nakul,Navigational / Branding,High,", "86,Nakul Mundhada startup founder,Founder Personal Brand - Nakul,Navigational / Branding,High,", "90,young entrepreneur Vidarbha,Founder Personal Brand - Nakul,Navigational / Branding,High,", "94,Leena BiovaCo Nexus founder,Founder Personal Brand - Leena,Branding,Medium,", "98,ECE student founder Nagpur,Founder Personal Brand - Leena,Branding,Medium,", "102,Cravora founder interview,Founder Personal Brand - Leena,Branding,Medium,", "106,Dhamangaon Amravati,Local Geo Modifier,Local,Medium,", "110,Chandur Railway,Local Geo Modifier,Local,Medium,", "114,Vidarbha,Local Geo Modifier,Local,Medium,", "118,Achalpur,Local Geo Modifier,Local,Medium,", "122,Yavatmal,Local Geo Modifier,Local,Medium,", "126,Dhamangaon to Amravati distance,Local Geo Modifier,Local,Medium,", "130,Dhamangaon APMC,Local Geo Modifier,Local,Medium,", "134,krushi kendra Dhamangaon,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "138,krushi seva kendra near me,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "142,agri input store Amravati,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "146,seed dealer Dhamangaon,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "150,pesticide dealer Amravati,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "154,khate beej dukan Dhamangaon,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "158,krushi kendra license Maharashtra,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "162,krushi kendra franchise,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "166,crop protection dealer Amravati,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "170,krushi kendra rate list,Krushi Kendra / Agri-Input Category,Local Commercial,High,", "174,Om Agro krushi kendra,Named Local Competitor / Category Anchor,Local Comparison,Medium,", "178,Balaji Krushi Kendra Amravati,Named Local Competitor / Category Anchor,Local Comparison,Medium,", "182,Krushi Kranti Kendra Amravati,Named Local Competitor / Category Anchor,Local Comparison,Medium,", "186,Giriraj Krushi Seva Kendra Amravati,Named Local Competitor / Category Anchor,Local Comparison,Medium,", "190,Vaishnavi Krushi Kendra,Named Local Competitor / Category Anchor,Local Comparison,Medium,", "194,spicy seasoning for makhana,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "198,Indian style popcorn flavors,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "202,D2C snack brand India,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "206,snack seasoning gift pack,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "210,snack flavor sachets India,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "214,flavor intelligence company India,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "218,Indian flavored nuts and seeds brand,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "222,Maharashtra snack startup,Product / Flavor Long-tail (Cravora),Commercial / Informational,Medium,", "226,agri biotech startup Nagpur,Biotech / Agri Vertical (BiovaCo),Informational / B2B,Medium,", "230,food tech startup Nagpur,Biotech / Agri Vertical (BiovaCo),Informational / B2B,Medium,", "234,sustainable agriculture startup India,Biotech / Agri Vertical (BiovaCo),Informational / B2B,Medium,", "238,food processing startup Maharashtra,Biotech / Agri Vertical (BiovaCo),Informational / B2B,Medium,", "242,biotech and food company Nagpur,Biotech / Agri Vertical (BiovaCo),Informational / B2B,Medium,", "246,ECE student startup India,Education / RCOEM-RBU Credibility,Branding / Informational,Low,", "250,Ramdeobaba University Nagpur ECE,Education / RCOEM-RBU Credibility,Branding / Informational,Low,", "254,engineering college startup success story India,Education / RCOEM-RBU Credibility,Branding / Informational,Low,", "258,FMCG startup funding India,Investor / B2B / Compliance,Commercial / Informational,Low,", "262,founder agreement template India,Investor / B2B / Compliance,Commercial / Informational,Low,", "266,ROC compliance startup Maharashtra,Investor / B2B / Compliance,Commercial / Informational,Low,", "270,FSSAI registration snack brand,Investor / B2B / Compliance,Commercial / Informational,Low,", "274,private limited company Meghalaya registration,Investor / B2B / Compliance,Commercial / Informational,Low,", "278,what is BiovaCo Nexus,Question-Based / Voice Search,Informational,Medium,", "282,how to start a krushi kendra business,Question-Based / Voice Search,Informational,Medium,", "286,how to start a snack brand in India,Question-Based / Voice Search,Informational,Medium,", "290,how to register a private limited company in Maharashtra,Question-Based / Voice Search,Informational,Medium,", "294,Bivaco Nexus,Misspelling / Transliteration Variant,Navigational,Low,", "298,Bio Vaco Nexus,Misspelling / Transliteration Variant,Navigational,Low,", "302,Cravorra,Misspelling / Transliteration Variant,Navigational,Low,", "306,krishi kendra,Misspelling / Transliteration Variant,Navigational,Low,", "310,amrawati,Misspelling / Transliteration Variant,Navigational,Low,", "314,krushi kendra Dhamangaon Railway,Geo x Krushi Cross-Product,Local Commercial,Medium,", "318,pesticide dealer Dhamangaon Railway,Geo x Krushi Cross-Product,Local Commercial,Medium,", "322,agro center Amravati,Geo x Krushi Cross-Product,Local Commercial,Medium,", "326,agro center Chandur,Geo x Krushi Cross-Product,Local Commercial,Medium,", "330,fertilizer dealer Chandur Bazar,Geo x Krushi Cross-Product,Local Commercial,Medium,", "334,beej bhandar Chandur Bazar,Geo x Krushi Cross-Product,Local Commercial,Medium,", "338,pesticide dealer Nagpur,Geo x Krushi Cross-Product,Local Commercial,Medium,", "342,krushi seva kendra Morshi,Geo x Krushi Cross-Product,Local Commercial,Medium,", "346,agro center Morshi,Geo x Krushi Cross-Product,Local Commercial,Medium,", "350,fertilizer dealer Warud,Geo x Krushi Cross-Product,Local Commercial,Medium,", "354,beej bhandar Warud,Geo x Krushi Cross-Product,Local Commercial,Medium,", "358,seed dealer Achalpur,Geo x Krushi Cross-Product,Local Commercial,Medium,", "362,krushi kendra Daryapur,Geo x Krushi Cross-Product,Local Commercial,Medium,", "366,pesticide dealer Daryapur,Geo x Krushi Cross-Product,Local Commercial,Medium,", "370,Achari Fire Dust buy online India,Cravora Flavor x Use-Case,Commercial,Medium,", "374,Achari Fire Dust where to buy,Cravora Flavor x Use-Case,Commercial,Medium,", "378,Mango Chili Dust online price,Cravora Flavor x Use-Case,Commercial,Medium,", "382,Mango Chili Dust nutrition facts,Cravora Flavor x Use-Case,Commercial,Medium,", "386,Mango Chili Dust gift pack,Cravora Flavor x Use-Case,Commercial,Medium,", "390,Pepper Lime Blast ingredients list,Cravora Flavor x Use-Case,Commercial,Medium,", "394,Pepper Lime Blast combo pack,Cravora Flavor x Use-Case,Commercial,Medium,", "398,Cravora ka price kya hai,Hinglish / Vernacular Search Pattern,Local / Branding,Medium,", "402,Dhamangaon mein krushi kendra kaun sa accha hai,Hinglish / Vernacular Search Pattern,Local / Branding,Medium,", "406,snack seasoning brand India mein,Hinglish / Vernacular Search Pattern,Local / Branding,Medium,", "410,college se startup kaise banaye,Hinglish / Vernacular Search Pattern,Local / Branding,Medium,", "414,krushi kendra reviews Dhamangaon,Local Maps / NAP Intent,Local,Medium,", "418,Mundhada Brothers location map,Local Maps / NAP Intent,Local,Medium,", "422,best rated krushi kendra Amravati district,Local Maps / NAP Intent,Local,Medium,"].join(", "),
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
    "google-site-verification": "googlea30bc07b0be2dcc1",
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
