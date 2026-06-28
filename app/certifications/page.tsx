"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Award,
  ExternalLink,
  Calendar,
  MapPin,
  Eye,
  Star,
  TrendingUp,
  BookOpen,
  Briefcase,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CertificateViewer } from "@/components/certificate-viewer"
import Image from "next/image"

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

const certificates: Certificate[] = [
  {
    id: "1",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM & Coursera",
    issueDate: "2025-04-08",
    credentialId: "1EZG7AOWHZZ1",
    verificationUrl: "https://coursera.org/verify/1EZG7AOWHZZ1",
    skills: ["Machine Learning", "Python", "TensorFlow", "Neural Networks"],
    description:
      "Comprehensive course covering supervised learning, unsupervised learning, and neural networks with hands-on projects.",
    certificateType: "course",
    certificateUrl: "/certificates/IBM py.pdf",
    certificateImageUrl: "/certificates/images/IBM py.png",
  },
  {
    id: "3",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2024-03-10",
    expiryDate: "2027-03-10",
    credentialId: "AWS-CP-2024-001",
    verificationUrl: "https://aws.amazon.com/verification/AWS-CP-2024-001",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
    description:
      "Foundational understanding of AWS Cloud services, architecture, and best practices for cloud deployment.",
    certificateType: "professional",
    certificateUrl: "/certificates/aws-cloud-practitioner.pdf",
    certificateImageUrl: "/certificates/images/aws-certificate.png",
  },
  {
    id: "4",
    title: "Best Innovation Award",
    issuer: "National Engineering Competition",
    issueDate: "2023-11-20",
    skills: ["Innovation", "Problem Solving", "Engineering Design", "AI"],
    description:
      "Awarded for developing an AI-powered crop monitoring system that revolutionizes precision agriculture.",
    certificateType: "achievement",
    certificateUrl: "/certificates/innovation-award.pdf",
    certificateImageUrl: "/certificates/images/innovation-award.png",
  },
  {
    id: "5",
    title: "Python for Data Science",
    issuer: "IBM & Coursera",
    issueDate: "2023-06-15",
    credentialId: "PY4DS2023IBM",
    verificationUrl: "https://coursera.org/verify/PY4DS2023IBM",
    skills: ["Python", "Data Science", "Pandas", "NumPy", "Matplotlib"],
    description:
      "Comprehensive Python programming course focused on data science applications and statistical analysis.",
    certificateType: "course",
    certificateUrl: "/certificates/python-data-science.pdf",
    certificateImageUrl: "/certificates/images/python-certificate.png",
  },
  {
    id: "6",
    title: "Embedded Systems Design",
    issuer: "University of California, Irvine",
    issueDate: "2023-09-25",
    credentialId: "ESD2023UCI",
    skills: ["Embedded Systems", "C Programming", "Microcontrollers", "RTOS"],
    description:
      "Advanced course on embedded systems design, real-time operating systems, and hardware-software integration.",
    certificateType: "course",
    certificateUrl: "/certificates/embedded-systems.pdf",
    certificateImageUrl: "/certificates/images/embedded-certificate.png",
  },
]

const categoryColors = {
  internship:
    "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800",
  course:
    "bg-green-500/10 text-green-600 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-800",
  professional:
    "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-800",
  achievement:
    "bg-orange-500/10 text-orange-600 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-800",
}

const categoryIcons = {
  internship: Briefcase,
  course: BookOpen,
  professional: Award,
  achievement: Star,
}

const stats = [
  { label: "Total Certificates", value: certificates.length, icon: Award, color: "text-blue-600" },
  {
    label: "Professional Certs",
    value: certificates.filter((c) => c.certificateType === "professional").length,
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    label: "Course Completions",
    value: certificates.filter((c) => c.certificateType === "course").length,
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    label: "Achievements",
    value: certificates.filter((c) => c.certificateType === "achievement").length,
    icon: Star,
    color: "text-orange-600",
  },
]

export default function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCertificates = certificates.filter((cert) => {
    const matchesCategory = selectedCategory === "all" || cert.certificateType === selectedCategory
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: "all", label: "All", count: certificates.length },
    {
      id: "internship",
      label: "Internships",
      count: certificates.filter((c) => c.certificateType === "internship").length,
    },
    { id: "course", label: "Courses", count: certificates.filter((c) => c.certificateType === "course").length },
    {
      id: "professional",
      label: "Professional",
      count: certificates.filter((c) => c.certificateType === "professional").length,
    },
    {
      id: "achievement",
      label: "Achievements",
      count: certificates.filter((c) => c.certificateType === "achievement").length,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="lg:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center mb-4 sm:mb-6"
              >
                <div className="relative">
                  <Award className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse" />
                  <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6"
              >
                <span className="gradient-text">Certifications</span>
                <br className="hidden sm:block" />
                <span className="text-foreground">& Achievements</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                A comprehensive collection of my professional certifications, course completions, and achievements that
                showcase my continuous learning journey and expertise across various domains.
              </motion.p>
            </div>
          </motion.section>

          {/* Statistics Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="text-center hover-lift group">
                      <CardContent className="p-4 sm:p-6">
                        <Icon
                          className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                        />
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>

          {/* Search and Filter Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 hover-glow"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="hover-target text-xs sm:text-sm"
                  >
                    <Filter className="w-3 h-3 mr-1 sm:mr-2" />
                    {category.label}
                    <span className="ml-1 sm:ml-2 text-xs opacity-70">({category.count})</span>
                  </Button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Certificates Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 sm:mb-12"
          >
            {filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredCertificates.map((certificate, index) => {
                  const CategoryIcon = categoryIcons[certificate.certificateType]
                  return (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Card className="h-full hover-lift group cursor-pointer">
                        <CardHeader className="space-y-3 sm:space-y-4">
                          <div className="flex items-start justify-between">
                            <Badge className={categoryColors[certificate.certificateType]}>
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              <span className="capitalize text-xs">{certificate.certificateType}</span>
                            </Badge>
                            <div className="text-xs sm:text-sm text-muted-foreground flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {new Date(certificate.issueDate).getFullYear()}
                            </div>
                          </div>

                          {/* Certificate Preview Image */}
                          {certificate.certificateImageUrl && (
                            <div className="relative w-full h-32 sm:h-40 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={certificate.certificateImageUrl || "/placeholder.svg"}
                                alt={`${certificate.title} preview`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )}

                          <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {certificate.title}
                          </CardTitle>
                          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{certificate.issuer}</span>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3 sm:space-y-4">
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                            {certificate.description}
                          </p>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-1">
                            {certificate.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {certificate.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{certificate.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Credential Info */}
                          {certificate.credentialId && (
                            <div className="text-xs text-muted-foreground">
                              <strong>ID:</strong> {certificate.credentialId}
                            </div>
                          )}

                          {/* Expiry Date */}
                          {certificate.expiryDate && (
                            <div className="text-xs text-muted-foreground">
                              <strong>Expires:</strong> {new Date(certificate.expiryDate).toLocaleDateString()}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              onClick={() => setSelectedCertificate(certificate)}
                              className="flex-1 hover-target text-xs sm:text-sm"
                              size="sm"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                            {certificate.verificationUrl && (
                              <Button variant="outline" size="sm" asChild className="hover-target bg-transparent">
                                <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-16 lg:py-20"
              >
                <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No certificates found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "No certificates match the selected category"}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  variant="outline"
                  className="hover-target"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </motion.section>
        </div>
      </main>

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <CertificateViewer
          certificate={selectedCertificate}
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  )
}
