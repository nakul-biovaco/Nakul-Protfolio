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
  keywords: ["BiovaCo Nexus", "Biova Co Nexus", "BiovacoNexus", "BiovaCo Nexus Pvt Ltd", "Biovaco Nexus Private Limited", "BiovaCo Nexus Pvt. Ltd.", "Biovaco Nexus India", "BiovaCo Nexus Maharashtra", "BiovaCo Nexus Nagpur", "BiovaCo Nexus company", "Biovaco Nexus official website", "Biovaco Nexus contact number", "Biovaco Nexus CIN", "BiovaCo Nexus CIN U46300ME2026PTC475352", "BiovaCo Nexus ROC Nagpur", "BiovaCo Nexus director details", "BiovaCo Nexus startup", "BiovaCo Nexus biotech", "BiovaCo Nexus agriculture", "BiovaCo Nexus food brand", "BiovaCo Nexus review", "BiovaCo Nexus careers", "BiovaCo Nexus jobs", "BiovaCo Nexus hiring", "BiovaCo Nexus LinkedIn", "BiovaCo Nexus Instagram", "Biovaco Nexus founder", "Biovaco Nexus CEO", "Biovaco Nexus kya hai", "Biovaco Nexus kaisi company hai", "Biovaco Nexus products", "Cravora", "Cravora snacks", "Cravora seasoning", "Cravora masala", "Cravora India", "Cravora online", "Cravora buy online", "Cravora Achari Fire Dust", "Achari Fire Dust", "Achari Fire Dust seasoning", "Achari Fire Dust price", "Cravora makhana", "Cravora flavored makhana", "Cravora popcorn", "Cravora popcorn flavors", "Cravora snack seasoning brand", "Cravora D2C brand", "Cravora Nagpur", "Cravora Maharashtra", "Cravora Amazon", "Cravora Flipkart", "Cravora website", "Cravora order online", "Cravora distributor", "buy Achari Fire Dust online", "Cravora Instagram", "Cravora reviews", "Cravora taste", "Cravora ingredients", "Cravora FSSAI", "Cravora founder story", "Nakul Mundhada", "Nakul Mundhada Dhamangaon", "Nakul Mundhada Nagpur", "Nakul Mundhada Amravati", "Nakul Mundhada RCOEM", "Nakul Mundhada ECE", "Nakul Mundhada CEO", "Nakul Mundhada BiovaCo Nexus", "Nakul Mundhada LinkedIn", "Nakul Mundhada entrepreneur", "Nakul Mundhada Innovation House Industries", "Nakul from Dhamangaon", "Nakul in Dhamangaon", "Nakul Dhamangaon Railway", "Nakul ECE student Dhamangaon", "Nakul ECE RCOEM Nagpur", "Mundhada family Dhamangaon", "Mundhada Brothers Dhamangaon", "Mundhada Brothers Amravati", "Mundhada Brothers krushi kendra", "Mundhada Brothers agro", "Mundhada Brothers contact number", "Mundhada Brothers seeds fertilizer", "Nakul Mundhada startup founder", "Nakul Mundhada agri tech", "Nakul Mundhada biotech founder", "young entrepreneur Dhamangaon", "young entrepreneur Vidarbha", "startup founder Amravati district", "RCOEM alumni startup", "RCOEM ECE student entrepreneur", "Leena BiovaCo Nexus founder", "Leena Cravora founder", "RBU Nagpur ECE student entrepreneur", "Ramdeobaba University student startup", "ECE student founder Nagpur", "woman founder Nagpur food brand", "student entrepreneur Maharashtra", "BiovaCo Nexus founder journey", "Cravora founder interview", "Dhamangaon", "Dhamangaon Railway", "Dhamangaon Rly", "Dhamangaon Amravati", "Amravati", "Amravati district", "Chandur", "Chandur Railway", "Chandur Bazar", "Chandur Bazar Amravati", "Nagpur", "Vidarbha", "Vidarbha Maharashtra", "Morshi", "Warud", "Achalpur", "Daryapur", "Anjangaon Surji", "Teosa", "Yavatmal", "Akola", "Wardha", "near Dhamangaon Railway station", "Dhamangaon to Amravati distance", "Dhamangaon to Nagpur distance", "Dhamangaon railway station market", "Dhamangaon mandi", "Dhamangaon APMC", "krushi kendra", "krushi seva kendra", "krushi kendra near me", "krushi kendra Dhamangaon", "krushi kendra Amravati", "krushi kendra Chandur", "krushi kendra Nagpur", "krushi seva kendra near me", "krishi kendra Dhamangaon Railway", "agro center Dhamangaon", "agri input store Dhamangaon", "agri input store Amravati", "fertilizer dealer Dhamangaon", "fertilizer dealer Amravati", "fertilizer dealer Chandur", "seed dealer Dhamangaon", "seed dealer Amravati", "cotton seed dealer Amravati", "pesticide dealer Dhamangaon", "pesticide dealer Amravati", "bio pesticide dealer Vidarbha", "fertilizer shop near me", "krushi dukan Dhamangaon", "khate beej dukan Dhamangaon", "beej bhandar Amravati", "khat vikreta Dhamangaon", "krushi seva kendra license", "krushi kendra license Maharashtra", "fertilizer dealer license Maharashtra", "agri retail license Maharashtra", "krushi kendra business plan", "krushi kendra franchise", "agri input distributor Vidarbha", "organic fertilizer dealer Amravati", "bio fertilizer Dhamangaon", "crop protection dealer Amravati", "soyabean seed dealer Amravati", "cotton farming input Vidarbha", "tur dal seed dealer Amravati", "krushi kendra rate list", "krushi kendra contact number Dhamangaon", "Om Agro Dhamangaon", "Om Agro Amravati", "Om Agro krushi kendra", "Om Agro contact number", "Balaji Krushi Kendra", "Balaji Krushi Kendra Dhamangaon", "Balaji Krushi Kendra Amravati", "Balaji Krushi Kendra contact", "Krushi Kranti Kendra", "Krushi Kranti Kendra Dhamangaon", "Krushi Kranti Kendra Amravati", "Krushi Kranti Kendra near me", "Giriraj Krushi Seva Kendra", "Giriraj Krushi Seva Kendra Dhamangaon", "Giriraj Krushi Seva Kendra Amravati", "Giriraj Krushi Seva Kendra contact", "Vidarbha Krushi Kendra Amravati", "Rajaram Krushi Kendra Amravati", "Vaishnavi Krushi Kendra", "Vyankatesh Krushi Kendra", "best snack seasoning brand India", "best Indian masala seasoning for snacks", "spicy seasoning for makhana", "flavored makhana brands India", "healthy roasted makhana snacks", "popcorn seasoning India", "Indian style popcorn flavors", "achari flavor seasoning", "tangy spicy snack seasoning", "chaat masala seasoning packets", "D2C snack brand India", "homegrown snack brand India", "Indian snack startup brand", "natural snack seasoning no preservatives", "snack seasoning gift pack", "seasoning for roasted chana", "namkeen seasoning brand", "flavor dust for snacks", "snack flavor sachets India", "FSSAI certified snack brand", "premium Indian seasoning brand", "data driven flavor brand", "flavor intelligence company India", "snack seasoning subscription India", "best makhana brand India", "healthy popcorn brand India", "Indian flavored nuts and seeds brand", "guilt free snacking India", "clean label snacks India", "Nagpur snack brand", "Maharashtra snack startup", "Vidarbha food startup", "biotech startup India agriculture", "agri biotech company Maharashtra", "agri biotech startup Nagpur", "food and agri biotech company India", "multi sector biotech company India", "agritech startup Vidarbha", "food tech startup Nagpur", "bio-input company India", "crop science startup India", "agri innovation company Maharashtra", "sustainable agriculture startup India", "biotech research company Nagpur", "private limited agri company Maharashtra", "Maharashtra agri startup registration", "food processing startup Maharashtra", "value added agri products Vidarbha", "farmer network startup Maharashtra", "agri supply chain startup India", "biotech and food company Nagpur", "RCOEM Nagpur ECE department", "RCOEM Nagpur placements", "RCOEM startup incubation", "ECE student startup India", "engineering student entrepreneur India", "campus startup founder India", "student founder balancing college and business", "Ramdeobaba University Nagpur ECE", "RBU Nagpur startup cell", "TiE U Startup Showcase", "Lions Club young entrepreneur award", "engineering college startup success story India", "BiovaCo Nexus investment", "invest in Indian snack startup", "D2C snack brand investor pitch", "FMCG startup funding India", "seed funding snack brand India", "angel investors FMCG India", "startup pitch deck D2C brand", "founder agreement template India", "founders agreement India startup", "shareholders agreement vesting India", "private limited company compliance Maharashtra", "ROC compliance startup Maharashtra", "cap table management India startup", "IP assignment agreement startup India", "startup burn rate tracking template", "FSSAI registration snack brand", "FSSAI label compliance India", "food business registration Maharashtra", "startup incorporation Nagpur", "private limited company Meghalaya registration", "CIN lookup Maharashtra company", "who is the founder of Cravora", "who is Nakul Mundhada", "what is BiovaCo Nexus", "is Cravora a good snack brand", "where is Cravora made", "is Achari Fire Dust spicy", "how to start a krushi kendra business", "how to get krushi kendra license in Maharashtra", "what is a krushi seva kendra", "best krushi kendra near Dhamangaon", "how to start a snack brand in India", "how to start a D2C food brand India", "what is flavor intelligence company", "is BiovaCo Nexus a startup", "how to register a private limited company in Maharashtra", "what does BiovaCo Nexus do", "where can I buy Cravora online", "Bioavco Nexus", "Bivaco Nexus", "Biovako Nexus", "BiovacoNexsus", "Biovaco Nexsus", "Bio Vaco Nexus", "Biovaco Nexux", "Cravora spelling", "Kravora", "Cravorra", "krushi kendr", "krushi seva kendr", "krishi seva kendra", "krishi kendra", "dhamangaon railway station", "dhamngaon", "chandur railwy", "amrawati", "amrawati district", "krushi seva kendra Dhamangaon", "beej bhandar Dhamangaon", "krushi kendra Dhamangaon Railway", "krushi seva kendra Dhamangaon Railway", "fertilizer dealer Dhamangaon Railway", "seed dealer Dhamangaon Railway", "pesticide dealer Dhamangaon Railway", "agro center Dhamangaon Railway", "beej bhandar Dhamangaon Railway", "krushi seva kendra Amravati", "agro center Amravati", "krushi seva kendra Chandur", "seed dealer Chandur", "pesticide dealer Chandur", "agro center Chandur", "beej bhandar Chandur", "krushi kendra Chandur Bazar", "krushi seva kendra Chandur Bazar", "fertilizer dealer Chandur Bazar", "seed dealer Chandur Bazar", "pesticide dealer Chandur Bazar", "agro center Chandur Bazar", "beej bhandar Chandur Bazar", "krushi seva kendra Nagpur", "fertilizer dealer Nagpur", "seed dealer Nagpur", "pesticide dealer Nagpur", "agro center Nagpur", "beej bhandar Nagpur", "krushi kendra Morshi", "krushi seva kendra Morshi", "fertilizer dealer Morshi", "seed dealer Morshi", "pesticide dealer Morshi", "agro center Morshi", "beej bhandar Morshi", "krushi kendra Warud", "krushi seva kendra Warud", "fertilizer dealer Warud", "seed dealer Warud", "pesticide dealer Warud", "agro center Warud", "beej bhandar Warud", "krushi kendra Achalpur", "krushi seva kendra Achalpur", "fertilizer dealer Achalpur", "seed dealer Achalpur", "pesticide dealer Achalpur", "agro center Achalpur", "beej bhandar Achalpur", "krushi kendra Daryapur", "krushi seva kendra Daryapur", "fertilizer dealer Daryapur", "seed dealer Daryapur", "pesticide dealer Daryapur", "agro center Daryapur", "beej bhandar Daryapur", "Achari Fire Dust online price", "Achari Fire Dust buy online India", "Achari Fire Dust review", "Achari Fire Dust ingredients list", "Achari Fire Dust nutrition facts", "Achari Fire Dust where to buy", "Achari Fire Dust best price", "Achari Fire Dust combo pack", "Achari Fire Dust gift pack", "Mango Chili Dust online price", "Mango Chili Dust buy online India", "Mango Chili Dust review", "Mango Chili Dust ingredients list", "Mango Chili Dust nutrition facts", "Mango Chili Dust where to buy", "Mango Chili Dust best price", "Mango Chili Dust combo pack", "Mango Chili Dust gift pack", "Pepper Lime Blast online price", "Pepper Lime Blast buy online India", "Pepper Lime Blast review", "Pepper Lime Blast ingredients list", "Pepper Lime Blast nutrition facts", "Pepper Lime Blast where to buy", "Pepper Lime Blast best price", "Pepper Lime Blast combo pack", "Pepper Lime Blast gift pack", "Cravora kaisa hai", "Cravora kahan milega", "Cravora ka price kya hai", "Achari Fire Dust kaisa lagta hai", "BiovaCo Nexus company kaisi hai", "Nakul Mundhada kaun hai", "Dhamangaon mein krushi kendra kaun sa accha hai", "Amravati mein fertilizer dealer", "Chandur mein beej kahan milega", "best krushi kendra Vidarbha mein", "snack seasoning brand India mein", "naya snack brand Nagpur", "Maharashtra ka best D2C brand", "student startup India success story", "college se startup kaise banaye", "ECE student business kaise kare", "krushi kendra open now Dhamangaon", "krushi kendra timing Amravati", "krushi kendra reviews Dhamangaon", "krushi kendra Google Maps Amravati", "Mundhada Brothers Google reviews", "Mundhada Brothers timings", "Mundhada Brothers location map", "Om Agro location map", "Balaji Krushi Kendra reviews", "Giriraj Krushi Seva Kendra timings", "best rated krushi kendra Amravati district", "krushi kendra opening hours Chandur"].join(", "),
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
