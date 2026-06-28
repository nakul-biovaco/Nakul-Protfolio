import ClientHomePage from "./ClientHomePage"

export const metadata = {
  title: "Nakul Mahendra Mundhada - Embedded Systems Engineer & IoT Developer",
  description:
    "Passionate embedded systems engineer and IoT developer with expertise in innovative technology solutions, hardware design, and software development.",
  keywords: ["embedded systems", "IoT", "hardware", "software", "engineering", "technology", "innovation"],
  openGraph: {
    title: "Nakul Mahendra Mundhada - Embedded Systems Engineer & IoT Developer",
    description:
      "Passionate embedded systems engineer and IoT developer with expertise in innovative technology solutions.",
    type: "website",
    images: ["/nakul-og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nakul Mahendra Mundhada - Embedded Systems Engineer & IoT Developer",
    description:
      "Passionate embedded systems engineer and IoT developer with expertise in innovative technology solutions.",
    images: ["/nakul-og-image.png"],
  },
}

export default function HomePage() {
  return <ClientHomePage />
}
