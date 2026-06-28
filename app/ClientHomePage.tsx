"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TypewriterText } from "@/components/typewriter-text"
import { MaterialIcons } from "@/components/material-icons"
import { AdminPanel } from "@/components/admin-panel"
import { Suspense, useCallback } from "react"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingActionButton } from "@/components/floating-action-button"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  useFeaturedProjects,
  useAnalytics,
  useProjects,
  useSkills,
  useInternships,
  useEducation,
} from "@/hooks/use-dynamic-data"
import type { Media } from "@/lib/api"
import { mediaAPI } from "@/lib/api"
import { useState, useEffect } from "react"

/* Shared animation variants — clean, professional */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

export default function ClientHomePage() {
  const [media, setMedia] = useState<Media[]>([])

  const { projects: featuredProjects, loading: projectsLoading } = useFeaturedProjects()
  const { projects: allProjects } = useProjects()
  const { skills } = useSkills()
  const { internships } = useInternships()
  const { education } = useEducation()
  const { trackPageView, trackEvent } = useAnalytics()
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 })

  useEffect(() => {
    trackPageView("/")

    const loadMedia = async () => {
      try {
        const mediaData = await mediaAPI.getAll()
        setMedia(mediaData)
      } catch (error) {
        console.error("Failed to load media:", error)
      }
    }
    loadMedia()
  }, [trackPageView])

  const handleDownloadResume = useCallback(() => {
    trackEvent("resume_download", { source: "homepage_hero" })
  }, [trackEvent])

  const handleConnectClick = useCallback(() => {
    trackEvent("connect_click", { source: "homepage_hero" })
  }, [trackEvent])

  const handleDataUpdate = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />

      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="lg:ml-64 min-h-screen bg-background">

            {/* ── Hero Section ── */}
            <section className="relative min-h-screen flex items-center py-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">

                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mx-auto w-36 h-36 md:w-44 md:h-44 mb-8 cursor-pointer group"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const width = rect.width
                      const height = rect.height
                      const centerX = width / 2
                      const centerY = height / 2

                      // Cursor position relative to container
                      const x = e.clientX - rect.left
                      const y = e.clientY - rect.top

                      // Distance from center
                      const dx = x - centerX
                      const dy = y - centerY
                      const distance = Math.sqrt(dx * dx + dy * dy)
                      const maxDistance = width / 2

                      // Normalize distance (0 at center, 1 at edge)
                      const intensity = Math.min(distance / maxDistance, 1)

                      // Adaptive glow radius and opacity (smaller, cleaner fade)
                      const glowRadius = 30 + intensity * 25 // scales from 30px to 55px
                      const opacity = intensity * 0.85 // fades out completely at center

                      setGlowStyle({
                        opacity,
                        background: `radial-gradient(circle ${glowRadius}px at ${x + 20}px ${y + 20}px, rgba(88, 129, 87, 0.45) 0%, rgba(163, 177, 138, 0.15) 60%, transparent 100%)`,
                      })
                    }}
                    onMouseEnter={() => {}}
                    onMouseLeave={() => setGlowStyle({ opacity: 0 })}
                  >
                    <div
                      className="absolute inset-[-20px] rounded-full transition-opacity duration-300 pointer-events-none"
                      style={glowStyle}
                    />
                    <div className="w-full h-full rounded-full p-1 relative z-10">
                      <img
                        src="/images/nakul-new-profile.png"
                        alt="Nakul Mahendra Mundhada"
                        className="w-full h-full rounded-full object-cover border-2 border-primary/30 shadow-lg"
                      />
                    </div>
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 px-4"
                  >
                    Nakul Mahendra Mundhada
                  </motion.h1>

                  {/* Typewriter Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-5"
                  >
                    <div className="inline-flex items-center gap-2 bg-card px-5 py-2.5 rounded-full border border-border shadow-sm">
                      <MaterialIcons.Bolt className="text-primary" />
                      <TypewriterText
                        text="Wireless Systems & Embedded Tech Explorer"
                        speed={80}
                        className="text-sm md:text-lg font-semibold text-foreground typewriter-text"
                      />
                    </div>
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
                  >
                    Passionate about creating{" "}
                    <span className="text-primary font-semibold">innovative solutions</span>{" "}
                    that bridge hardware and software, specializing in{" "}
                    <span className="text-primary font-semibold">AI-powered agricultural systems</span>{" "}
                    and embedded technologies.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4"
                  >
                    <Button
                      size="lg"
                      onClick={handleDownloadResume}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold shadow-md transition-colors"
                    >
                      <MaterialIcons.Download className="mr-2" />
                      Download Resume
                    </Button>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleConnectClick}
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold transition-colors bg-transparent"
                      >
                        <MaterialIcons.Email className="mr-2" />
                        Let's Connect
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-10 flex justify-center gap-4 px-4"
                  >
                    {[
                      { icon: MaterialIcons.GitHub, href: "https://github.com", label: "GitHub" },
                      { icon: MaterialIcons.LinkedIn, href: "https://www.linkedin.com/in/nakul-mundhada-b64432289", label: "LinkedIn" },
                      { icon: MaterialIcons.Email, href: "mailto:nakulmundhada23@gmail.com", label: "Email" },
                    ].map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          onClick={() => trackEvent("social_click", { platform: social.label })}
                          className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                          aria-label={social.label}
                        >
                          <Icon />
                        </a>
                      )
                    })}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── Impact Metrics ── */}
            <section className="py-16 md:py-24 bg-muted/40">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                    Real-World Impact
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Transforming agriculture through technology
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                  {[
                    { icon: MaterialIcons.Person, number: "150+", label: "Farmers Trained", description: "Across 5 districts in Maharashtra" },
                    { icon: MaterialIcons.TrendingUp, number: "25%", label: "Yield Improvement", description: "Average increase in crop productivity" },
                    { icon: MaterialIcons.Landscape, number: "500+", label: "Acres Covered", description: "Smart irrigation systems deployed" },
                    { icon: MaterialIcons.WaterDrop, number: "30%", label: "Water Saved", description: "Through precision irrigation" },
                  ].map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Card className="bg-card border border-border shadow-sm hover-lift h-full">
                          <CardContent className="p-5 md:p-6 text-center">
                            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                              {stat.number}
                            </h3>
                            <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-16 md:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                    Recommendations & Endorsements
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Feedback from internships, research advisors, and industry mentors
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[
                    {
                      name: "Siddharth Mehta",
                      location: "Google Hardware Team",
                      role: "Senior Embedded Software Engineer",
                      quote: "Nakul demonstrated outstanding capability during his internship, optimizing our firmware boot sequence and reducing system boot time by 25%. His low-level debugging skills on ARM Cortex platforms are highly advanced.",
                    },
                    {
                      name: "Dr. Rajesh K. Rao",
                      location: "Maven Silicon Academics",
                      role: "Lead Embedded Architect & Mentor",
                      quote: "An incredibly fast learner. Nakul successfully designed and simulated low-power IoT sensor nodes, showing a strong grasp of PCB layouts, SPI/I2C/UART protocols, and RTOS principles. His structured code is production-ready.",
                    },
                    {
                      name: "Prof. Amit Kumar",
                      location: "VNIT Nagpur",
                      role: "Professor of Microelectronics & VLSI",
                      quote: "Nakul is one of our most promising students in VLSI and analog design. His work on the Hyper-Fusion Parallel Carry Adder (HF-PCA) shows rigorous logic design skill, bridging complex VLSI arithmetic theory and practical synthesizable RTL.",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Card className="bg-card border border-border shadow-sm hover-lift h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <MaterialIcons.Person className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                              <p className="text-xs font-medium text-primary mb-0.5">{testimonial.role}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                            </div>
                          </div>
                          <blockquote className="text-muted-foreground italic text-sm leading-relaxed">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="flex text-primary mt-3">
                            {[...Array(5)].map((_, i) => (
                              <MaterialIcons.Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Explore My Journey ── */}
            <section className="py-16 md:py-24 bg-muted/30">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                    Explore My Journey
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Discover my skills, projects, and experiences
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { href: "/about", title: "About Me", description: "Learn about my background and interests", icon: MaterialIcons.Person },
                    { href: "/projects", title: "Projects", description: "Explore my innovative solutions", icon: MaterialIcons.Rocket },
                    { href: "/skills", title: "Skills", description: "Discover my technical expertise", icon: MaterialIcons.Bolt },
                    { href: "/education", title: "Education", description: "My academic journey", icon: MaterialIcons.School },
                    { href: "/contact", title: "Contact", description: "Let's work together", icon: MaterialIcons.Phone },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={fadeUp}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Link href={item.href}>
                        <Card className="bg-card border border-border shadow-sm hover-lift cursor-pointer group h-full">
                          <CardContent className="p-6 md:p-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                              <item.icon className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                            <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                              Explore <MaterialIcons.ArrowForward className="ml-1 w-4 h-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Featured Projects ── */}
            {!projectsLoading && featuredProjects.length > 0 && (
              <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                      Featured Projects
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Innovation meets real-world impact
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {featuredProjects.slice(0, 2).map((project, index) => (
                      <motion.div
                        key={project.id}
                        variants={fadeUp}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Link href={`/projects/${project.id}`}>
                          <Card className="bg-card border border-border shadow-sm hover-lift overflow-hidden cursor-pointer group h-full">
                            <div className="relative">
                              <img
                                src={project.images[0] || "/placeholder.svg?height=200&width=400"}
                                alt={project.title}
                                className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3">
                                <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                                  Featured
                                </span>
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.techStack.length > 3 && (
                                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                    +{project.techStack.length - 3} more
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                View Project <MaterialIcons.ArrowForward className="ml-1 w-4 h-4" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-10">
                    <Link href="/projects">
                      <Button variant="outline" size="lg" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        <MaterialIcons.Folder className="mr-2" />
                        View All Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Loading skeleton for projects */}
            {projectsLoading && (
              <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8">
                    Featured Projects
                  </h2>
                  <LoadingSpinner size="lg" />
                </div>
              </section>
            )}



            {/* Admin Panel */}
            <AdminPanel
              projects={allProjects}
              skills={skills}
              internships={internships}
              education={education}
              media={media}
              onDataUpdate={handleDataUpdate}
            />
          </div>
        </Suspense>
      </div>

      <FloatingActionButton />
    </div>
  )
}
