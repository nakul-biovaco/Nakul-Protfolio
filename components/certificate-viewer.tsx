"use client"

import { motion, AnimatePresence } from "framer-motion" 
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Download, ExternalLink, Award, CheckCircle } from "lucide-react"
import Image from "next/image"
import type { Certificate } from "@/lib/api"

interface CertificateViewerProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
}

export function CertificateViewer({ certificate, isOpen, onClose }: CertificateViewerProps) {
  if (!certificate) return null

  const handleDownload = () => {
    if (certificate.certificateUrl) {
      const link = document.createElement("a")
      link.href = certificate.certificateUrl
      link.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 overflow-hidden"
          onClick={onClose}
        >
          {/* Mobile-First Scrollable Container */}
          <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full flex items-start sm:items-center justify-center p-2 sm:p-4 py-4 sm:py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.4,
                }}
                className="relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Action Buttons - Fixed Position */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex gap-1 sm:gap-2">
                  {certificate.certificateUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownload}
                      className="bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 backdrop-blur-sm border border-white/20"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 backdrop-blur-sm border border-white/20"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* Certificate Card - Mobile Optimized */}
                <Card className="bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 border-2 sm:border-4 border-primary/20 shadow-2xl overflow-hidden">
                  <CardContent className="p-3 sm:p-6 md:p-8 lg:p-12 relative">
                    {/* Decorative Background - Responsive */}
                    <div className="absolute inset-0 opacity-3 sm:opacity-5">
                      <div className="absolute top-2 left-2 sm:top-8 sm:left-8 w-12 h-12 sm:w-32 sm:h-32 bg-primary rounded-full blur-xl sm:blur-3xl"></div>
                      <div className="absolute bottom-2 right-2 sm:bottom-8 sm:right-8 w-16 h-16 sm:w-40 sm:h-40 bg-accent rounded-full blur-xl sm:blur-3xl"></div>
                    </div>

                    {/* Certificate Header - Compact Mobile */}
                    <div className="text-center mb-4 sm:mb-8 relative z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary via-accent to-highlight rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 shadow-lg border-2 border-white/50"
                      >
                        <Award className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-1 sm:space-y-4"
                      >
                        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-caveat"
    style={{ color: "#FFB703" }}
  >
                          Certificate of Achievement
                        </h1>
                        <div className="flex justify-center">
                          <div className="w-16 h-0.5 sm:w-32 sm:h-1 md:w-48 md:h-2 bg-gradient-to-r from-primary via-accent to-highlight rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Certificate Content - Mobile Optimized */}
                    <div className="space-y-3 sm:space-y-6 md:space-y-8 relative z-10">
                      {/* Main Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                      >
                        <p className="text-xs sm:text-base md:text-xl text-foreground/80 mb-2 sm:mb-4">
                          This is to certify that
                        </p>

                        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-highlight/10 rounded-lg sm:rounded-2xl p-2 sm:p-6 mb-2 sm:mb-6 border border-primary/20">
  <h2
    className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-caveat"
    style={{ color: "#FFB703" }}
  >
    Nakul Mahendra Mundhada
  </h2>
</div>


                        <p className="text-xs sm:text-base md:text-xl text-foreground/80">
                          has successfully completed the requirements and demonstrated exceptional performance in
                        </p>
                      </motion.div>

                      {/* Certificate Image - Mobile Responsive */}
                      {certificate.certificateImageUrl && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                          className="flex justify-center mb-3 sm:mb-6"
                        >
                          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
                            <Image
                              src={certificate.certificateImageUrl || "/placeholder.svg"}
                              alt={`${certificate.title} Certificate`}
                              width={400}
                              height={300}
                              className="w-full h-auto object-contain bg-white"
                              priority
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Certificate Details - Compact */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-700/80 rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 shadow-xl border border-white/50 backdrop-blur-sm">
                          <h3 className="text-base sm:text-xl md:text-3xl font-bold text-highlight mb-2 sm:mb-4 font-caveat">
                            {certificate.title}
                          </h3>

                          {certificate.description && (
                            <p className="text-xs sm:text-sm md:text-lg text-foreground/90 mb-3 sm:mb-6 leading-relaxed">
                              {certificate.description}
                            </p>
                          )}

                          {certificate.skills.length > 0 && (
                            <div className="space-y-2 sm:space-y-3">
                              <h4 className="text-sm sm:text-base md:text-xl font-semibold text-highlight">
                                Skills & Competencies
                              </h4>
                              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                                {certificate.skills.map((skill, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
                                    >
                                      {skill}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Issuer and Date - Mobile Stack */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8 pt-3 sm:pt-8"
                      >
                        <div className="text-center">
                          <div className="space-y-1 sm:space-y-2">
                            <div className="w-16 h-0.5 sm:w-32 sm:h-1 bg-foreground/30 mx-auto"></div>
                            <div>
                              <p className="text-sm sm:text-base md:text-xl font-bold text-highlight">
                                {certificate.issuer}
                              </p>
                              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                                Issuing Organization
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="space-y-1 sm:space-y-2">
                            <div className="w-16 h-0.5 sm:w-32 sm:h-1 bg-foreground/30 mx-auto"></div>
                            <div>
                              <p className="text-sm sm:text-base md:text-xl font-bold text-highlight">
                                {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Date of Issue</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Credential Information - Compact */}
                      {(certificate.credentialId || certificate.verificationUrl) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          className="bg-gradient-to-r from-primary/5 via-accent/5 to-highlight/5 rounded-lg sm:rounded-xl p-3 sm:p-6 text-center border border-primary/20"
                        >
                          <h5 className="text-sm sm:text-base md:text-xl font-bold text-highlight mb-2 sm:mb-4 flex items-center justify-center gap-1 sm:gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5" />
                            Verification Details
                          </h5>

                          <div className="space-y-2 sm:space-y-3">
                            {certificate.credentialId && (
                              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3">
                                <p className="text-xs sm:text-sm md:text-base text-foreground break-all">
                                  <strong>Credential ID:</strong>{" "}
                                  <code className="bg-muted px-1 py-0.5 rounded text-xs sm:text-sm">
                                    {certificate.credentialId}
                                  </code>
                                </p>
                              </div>
                            )}

                            {certificate.verificationUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 shadow-lg text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2"
                              >
                                <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="ml-1 sm:ml-2">Verify Online</span>
                                </a>
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Decorative Elements - Responsive */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex justify-center space-x-2 sm:space-x-6 pt-2 sm:pt-6"
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{
                              delay: 1.2 + i * 0.1,
                              duration: 0.8,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-gradient-to-br from-primary via-accent to-highlight rounded-full shadow-lg"
                          />
                        ))}
                      </motion.div>
                    </div>

                    {/* Certificate Footer - Compact */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="text-center mt-4 sm:mt-8 pt-3 sm:pt-6 border-t border-primary/20 relative z-10"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground italic">
                        This certificate validates the completion of professional requirements and outstanding
                        achievements.
                      </p>

                      <div className="mt-2 sm:mt-4 flex justify-center space-x-2 sm:space-x-6">
                        <div className="w-6 h-0.5 sm:w-12 sm:h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                        <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-gradient-to-br from-accent to-highlight rounded-full"></div>
                        <div className="w-6 h-0.5 sm:w-12 sm:h-1 bg-gradient-to-r from-accent to-highlight rounded-full"></div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
