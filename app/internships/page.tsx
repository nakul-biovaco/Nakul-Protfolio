"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Briefcase, Calendar, MapPin, Award, TrendingUp, Users, Target, ArrowRight, Cpu, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParallaxContainer } from "@/components/parallax-container"

export default function InternshipsPage() {
  const internships = [
    {
      id: "google",
      company: "Google",
      role: "Embedded Software Developer Intern",
      duration: "April 2025 - Present",
      location: "Bangalore, India (Hybrid)",
      type: "Full-time",
      status: "Ongoing",
      description:
        "Developing embedded software solutions for Google's hardware products, focusing on low-level system programming and hardware-software integration for next-generation devices.",
      responsibilities: [
        "Designing and implementing firmware for embedded systems",
        "Optimizing device drivers for better power efficiency",
        "Debugging hardware-software interface issues",
        "Collaborating with hardware engineers on board bring-up",
        "Writing unit tests and documentation for embedded code",
        "Participating in code reviews and design discussions"
      ],
      technologies: ["C/C++", "RTOS", "ARM Cortex", "Embedded Linux", "Protocol Buffers", "Git", "Python", "JTAG"],
      achievements: [
        "Reduced boot time by 25% through firmware optimization",
        "Implemented a power-saving feature saving 15% battery life",
        "Resolved critical timing issue in device communication",
        "Received recognition for quick adaptation to complex codebase"
      ],
      skills_gained: [
        "Embedded Systems Programming",
        "Low-level Debugging",
        "Hardware-Software Co-design",
        "Real-time Operating Systems",
        "Power Optimization",
        "Collaborative Development"
      ],
      mentor: "Senior Embedded Engineer - Google Hardware Team",
      certificate: false,
      icon: Cpu
    },
    {
      id: "maven-silicon",
      company: "Maven Silicon",
      role: "Embedded Systems Design Intern",
      duration: "January 2025 - March 2025",
      location: "Bangalore, India",
      type: "Full-time",
      status: "Completed",
      description:
        "Designed and implemented embedded systems solutions for IoT applications, working on both hardware and software components of embedded devices.",
      responsibilities: [
        "Developed firmware for ARM-based microcontrollers",
        "Designed PCB layouts for embedded systems",
        "Implemented communication protocols (I2C, SPI, UART)",
        "Created device drivers for custom hardware",
        "Optimized system performance and power consumption",
        "Conducted hardware testing and validation"
      ],
      technologies: ["STM32", "Arduino", "ESP32", "FreeRTOS", "KiCad", "Altium", "C", "Embedded C++", "Python"],
      achievements: [
        "Designed a power-efficient IoT node with 30% lower consumption",
        "Reduced BOM cost by 20% through component optimization",
        "Successfully led a team of 3 interns on a prototype project",
        "Received 'Innovation Award' for custom sensor interface design"
      ],
      skills_gained: [
        "Embedded Hardware Design",
        "PCB Development",
        "RTOS Implementation",
        "Sensor Integration",
        "Low-power Design",
        "Project Leadership"
      ],
      mentor: "Dr. Sanjay Patel - Head of Embedded Systems",
      certificate: true,
      icon: Code
    }
  ]

  const stats = [
    { label: "Embedded Projects", value: "6+", icon: Target },
    { label: "Firmware Optimizations", value: "4", icon: TrendingUp },
    { label: "Hardware Designs", value: "3", icon: Cpu },
    { label: "Technologies Mastered", value: "12+", icon: Code },
  ]

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0">
          <ParallaxContainer speed={0.2}>
            <div className="absolute top-20 left-10 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl animate-blob float"></div>
          </ParallaxContainer>
          <ParallaxContainer speed={0.3}>
            <div className="absolute bottom-20 right-10 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-3xl animate-blob float-delayed"></div>
          </ParallaxContainer>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-caveat hover-target">
              Embedded Systems Journey 🚀
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto px-4">
              Hands-on experience in embedded software development and hardware design at leading tech organizations
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="bg-card border border-border shadow-xl text-center hover-glow hover-target transition-all duration-300"
                >
                  <CardContent className="p-4 md:p-6">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-highlight mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-16">
            {internships.map((internship, index) => {
              const Icon = internship.icon || Briefcase
              return (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < internships.length - 1 && (
                    <div className="absolute left-4 md:left-8 top-24 md:top-32 w-0.5 h-32 md:h-40 bg-gradient-to-b from-primary to-accent hidden lg:block"></div>
                  )}

                  <Link href={`/internships/${internship.id}`}>
                    <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift hover-glow hover-target cursor-pointer">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row lg:space-x-6 md:lg:space-x-8">
                          {/* Company Logo & Basic Info */}
                          <div className="flex-shrink-0 mb-6 lg:mb-0">
                            <div className="flex items-center space-x-4 mb-6">
                              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                                <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                              </div>
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-highlight hover:gradient-text transition-all duration-300">
                                  {internship.role}
                                </h3>
                                <p className="text-base md:text-lg text-primary font-semibold">{internship.company}</p>
                              </div>
                            </div>

                            <div className="space-y-3 text-sm text-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{internship.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{internship.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={internship.status === "Completed" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {internship.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {internship.type}
                                </Badge>
                              </div>
                            </div>

                            {internship.certificate && (
                              <div className="mt-4">
                                <Badge className="bg-accent text-primary-foreground text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Certified
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Detailed Information */}
                          <div className="flex-1 space-y-6">
                            {/* Description */}
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-highlight mb-3">Overview</h4>
                              <p className="text-foreground text-sm md:text-base">{internship.description}</p>
                            </div>

                            {/* Responsibilities Preview */}
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-highlight mb-3">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {internship.responsibilities.slice(0, 3).map((responsibility, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                    <span className="text-foreground text-sm">{responsibility}</span>
                                  </li>
                                ))}
                                {internship.responsibilities.length > 3 && (
                                  <li className="text-primary text-sm font-medium">
                                    +{internship.responsibilities.length - 3} more responsibilities...
                                  </li>
                                )}
                              </ul>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Technologies Preview */}
                              <div>
                                <h4 className="text-base md:text-lg font-semibold text-highlight mb-3">
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {internship.technologies.slice(0, 5).map((tech, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {internship.technologies.length > 5 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{internship.technologies.length - 5} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Achievements Preview */}
                              <div>
                                <h4 className="text-base md:text-lg font-semibold text-highlight mb-3">
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {internship.achievements.slice(0, 2).map((achievement, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <Award className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-foreground text-sm">{achievement}</span>
                                    </li>
                                  ))}
                                  {internship.achievements.length > 2 && (
                                    <li className="text-accent text-sm font-medium">
                                      +{internship.achievements.length - 2} more achievements...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>

                            {/* View Details Link */}
                            <div className="flex items-center text-primary font-semibold hover:translate-x-2 transition-transform duration-300">
                              View Full Details <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-caveat">Technical Growth 🛠️</h2>
            <p className="text-lg md:text-xl text-foreground">
              How my internships shaped my embedded systems expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border shadow-xl text-center h-full hover-glow hover-target transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Cpu className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-highlight mb-4">Hardware-Software Integration</h3>
                  <p className="text-foreground text-sm md:text-base">
                    Developed expertise in bridging hardware and software layers, from writing low-level drivers at Google
                    to designing PCBs at Maven Silicon.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border shadow-xl text-center h-full hover-glow hover-target transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent to-highlight rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-highlight mb-4">Performance Optimization</h3>
                  <p className="text-foreground text-sm md:text-base">
                    Specialized in optimizing embedded systems for speed and power efficiency, achieving measurable
                    improvements in both internships through firmware enhancements.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border border-border shadow-xl text-center h-full hover-glow hover-target transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-highlight to-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Code className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-highlight mb-4">Full Embedded Stack</h3>
                  <p className="text-foreground text-sm md:text-base">
                    Gained comprehensive experience across the embedded stack - from silicon to software - allowing me to
                    understand and contribute at all system levels.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
