"use client"

import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ParallaxContainer } from "@/components/parallax-container"
import { MaterialIcons } from "@/components/material-icons"
import { useInternship, useCertificates } from "@/hooks/use-dynamic-data"
import { LoadingPage } from "@/components/loading-spinner"
import { CertificateViewer } from "@/components/certificate-viewer"
import { useState } from "react"
import type { Certificate } from "@/lib/api"

export default function InternshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const internshipId = params.id as string
  const { internship, loading, error } = useInternship(internshipId)
  const { certificates } = useCertificates()
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isCertificateViewerOpen, setIsCertificateViewerOpen] = useState(false)

  // Filter certificates for this internship
  const internshipCertificates = certificates.filter((cert) => cert.internshipId === internshipId)

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsCertificateViewerOpen(true)
  }

  if (loading) {
    return <LoadingPage />
  }

  if (error || !internship) {
    return (
      <div className="lg:ml-64 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-highlight mb-4">Internship Not Found</h1>
          <p className="text-foreground mb-8">The internship you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/internships")} className="hover-target">
            <MaterialIcons.ArrowBack />
            <span className="ml-2">Back to Internships</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0">
          <ParallaxContainer speed={0.2}>
            <div className="absolute top-20 right-10 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl animate-blob float"></div>
          </ParallaxContainer>
          <ParallaxContainer speed={0.3}>
            <div className="absolute bottom-20 left-10 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-3xl animate-blob float-delayed"></div>
          </ParallaxContainer>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="outline" onClick={() => router.push("/internships")} className="hover-target hover-lift">
              <MaterialIcons.ArrowBack />
              <span className="ml-2">Back to Internships</span>
            </Button>
          </motion.div>

          {/* Internship Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge
                variant={internship.status === "Completed" ? "default" : "secondary"}
                className="text-sm md:text-base"
              >
                {internship.status}
              </Badge>
              <Badge variant="outline" className="text-sm md:text-base">
                {internship.type}
              </Badge>
              {internship.certificate && (
                <Badge className="bg-accent text-primary-foreground text-sm md:text-base">
                  <MaterialIcons.Award />
                  <span className="ml-1">Certified</span>
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 font-caveat hover-target px-4">
              {internship.role}
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 px-4">{internship.company}</h2>

            <p className="text-lg md:text-xl text-foreground max-w-4xl mx-auto px-4">{internship.description}</p>

            {/* Internship Meta */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center">
                <MaterialIcons.CalendarToday />
                <span className="ml-2">{internship.duration}</span>
              </div>
              <div className="flex items-center">
                <MaterialIcons.LocationOn />
                <span className="ml-2">{internship.location}</span>
              </div>
              <div className="flex items-center">
                <MaterialIcons.Work />
                <span className="ml-2">{internship.type}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Detailed Description */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.Assignment />
                      Experience Overview
                    </h2>
                    <div className="prose prose-lg max-w-none text-foreground">
                      <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {internship.detailedDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.Assignment />
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {internship.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start text-sm md:text-base">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-foreground">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Projects Worked On */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.Rocket />
                      Projects Worked On
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {internship.projects_worked_on.map((project, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg hover-lift hover-target">
                          <h4 className="font-semibold text-highlight mb-2">{project.name}</h4>
                          <p className="text-foreground text-sm mb-2">{project.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {project.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 md:space-y-8">
              {/* Technologies Used */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.Bolt />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {internship.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs md:text-sm hover-target">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Key Achievements */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.Award />
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {internship.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start text-sm md:text-base">
                          <MaterialIcons.Award />
                          <span className="text-foreground ml-2">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Gained */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                      <MaterialIcons.TrendingUp />
                      Skills Gained
                    </h3>
                    <div className="space-y-2">
                      {internship.skills_gained.map((skill, index) => (
                        <div key={index} className="flex items-center text-sm md:text-base">
                          <MaterialIcons.TrendingUp />
                          <span className="text-foreground ml-2">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Certificates */}
              {(internship.certificate || internshipCertificates.length > 0) && (
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat flex items-center gap-2">
                        <MaterialIcons.Award />
                        Certificates
                      </h3>
                      <div className="space-y-4">
                        {internshipCertificates.length > 0 ? (
                          internshipCertificates.map((certificate, index) => (
                            <div
                              key={index}
                              className="p-4 bg-muted/50 rounded-lg hover-lift hover-target cursor-pointer transition-all duration-300"
                              onClick={() => handleCertificateClick(certificate)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                  <MaterialIcons.Award />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-highlight">{certificate.title}</h4>
                                  <p className="text-sm text-foreground">{certificate.issuer}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(certificate.issueDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <MaterialIcons.Launch />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <MaterialIcons.Award />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-highlight">
                                  {internship.certificateTitle || "Certificate of Completion"}
                                </h4>
                                <p className="text-sm text-foreground">
                                  {internship.certificateIssuer || internship.company}
                                </p>
                                {internship.certificateDate && (
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(internship.certificateDate).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Mentor Info */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-4 font-caveat flex items-center gap-2">
                      <MaterialIcons.Person />
                      Mentor
                    </h3>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm md:text-base text-foreground font-medium">{internship.mentor}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Viewer */}
      <CertificateViewer
        certificate={selectedCertificate}
        isOpen={isCertificateViewerOpen}
        onClose={() => {
          setIsCertificateViewerOpen(false)
          setSelectedCertificate(null)
        }}
      />
    </div>
  )
}
