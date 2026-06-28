"use client"

interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  verificationUrl?: string
  skills: string[]
  description: string
  certificateType: "internship" | "course" | "professional" | "achievement"
  certificateUrl?: string
  certificateImageUrl?: string
}

export function CertificationsClientPage() {
  return <div>Certifications Page</div>
}
