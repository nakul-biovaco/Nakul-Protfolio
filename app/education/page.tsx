"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParallaxContainer } from "@/components/parallax-container"

export default function EducationPage() {
  const education = [
    {
      degree: "Bachelor of Technology - Electronics and Communication Engineering",
      institution: "Ramdeobaba College of Engineering and Management (RCOEM)",
      location: "Nagpur, Maharashtra, India",
      duration: "2023 - 2027 (Expected)",
      status: "Current",
      gpa: "8.16/10",
      description:
        "Specializing in embedded systems, digital signal processing, and communication systems.",
      coursework: [
        "Digital Signal Processing",
        "Embedded Systems Design",
        "Communication Systems",
        "VLSI Design",
        "Microprocessors & Microcontrollers",
        "Control Systems",
        "Electronic Circuit Design",
        "Computer Networks",
      ],
      achievements: [
        "Hackathon Winner",
        "Participated in National Level Technical Competitions",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "SFL Junior College",
      location: "Dhamangaon Railway, Maharashtra, India",
      duration: "2021 - 2023",
      status: "Completed",
      percentage: "61%",
      description:
        "Completed higher secondary education in Science stream, laying a strong foundation in Physics, Chemistry, and Mathematics.",
      coursework: ["Physics", "Chemistry", "Mathematics", "English", "Electronic"],
      achievements: [
        "School Topper in Electronic",
        "Participated in State Level Science Exhibition",
        "Member of School Science Club",
      ],
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "SFL High School and Junior College",
      location: "Dhamangaon, Maharashtra, India",
      duration: "2020 - 2021",
      status: "Completed",
      percentage: "70%",
      description: "Completed secondary education",
      coursework: ["Mathematics", "Science", "Social Studies", "English", "Hindi", "Marathi"],
      achievements: [
      ],
    },
  ]

  const extracurricular = [
    {
      title: "Founder, CEO & MD",
      organization: "BiovaCo Nexus PVT. LTD.",
      duration: "2026 - Present",
      description:
        "Leading the organization from the forefront, overseeing all legal compliances, and driving product innovation for the embedded systems and health-tech startup.",
      icon: Award,
    },
    {
      title: "Co-Founder and CMO",
      organization: "ELECTROCULTURE",
      duration: "2024 - Present",
      description:
        "Leading a team of 10+ freelancers in organizing technical workshops, designing innovative products, and executing strategic marketing initiatives.",
      icon: Users,
    },
    {
      title: "Technical & Operations Head",
      organization: "Nebula Innovations LLP",
      duration: "2023 - 2026",
      description:
        "Directed technology and operations for AI-enabled ERP and SaaS solutions, scaling the business to a multi-crore enterprise.",
      icon: Trophy,
    },
    {
      title: "Operational Manager",
      organization: "OM AGRO",
      duration: "2020 - 2023",
      description:
        "Supporting retail and wholesale distribution of agricultural inputs—seeds, fertilizers, and pesticides—and providing guidance to farmers on optimal usage and practices.",
      icon: BookOpen,
    },
  ]

  const skills_learned = [
    "Circuit Analysis & Design",
    "Embedded Programming",
    "Signal Processing",
    "Communication Protocols",
    "PCB Design",
    "MATLAB/Simulink",
    "Laboratory Techniques",
    "Technical Documentation",
    "Project Management",
    "Team Leadership",
  ]

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0">
          <ParallaxContainer speed={0.2}>
            <div className="absolute top-20 right-10 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
          </ParallaxContainer>
          <ParallaxContainer speed={0.3}>
            <div className="absolute bottom-20 left-10 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </ParallaxContainer>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 md:mb-6 font-caveat hover-target">
              Education Journey 🎓
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto px-4">
              My academic path and continuous learning in electronics, technology, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 md:space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < education.length - 1 && (
                  <div className="absolute left-4 md:left-8 top-20 md:top-24 w-0.5 h-24 md:h-32 bg-gradient-to-b from-primary to-accent hidden lg:block"></div>
                )}

                <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:space-x-6 md:lg:space-x-8">
                      {/* Icon */}
                      <div className="flex-shrink-0 mb-6 lg:mb-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-highlight mb-2 hover:gradient-text transition-all duration-300">
                              {edu.degree}
                            </h3>
                            <p className="text-base md:text-lg text-primary font-semibold mb-2">{edu.institution}</p>
                          </div>
                          <div className="flex flex-col lg:items-end space-y-2">
                            <Badge
                              variant={edu.status === "Current" ? "default" : "secondary"}
                              className="w-fit text-xs md:text-sm"
                            >
                              {edu.status}
                            </Badge>
                            {edu.gpa && (
                              <Badge variant="outline" className="w-fit text-xs md:text-sm">
                                GPA: {edu.gpa}
                              </Badge>
                            )}
                            {edu.percentage && (
                              <Badge variant="outline" className="w-fit text-xs md:text-sm">
                                {edu.percentage}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-sm md:text-base text-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            <span>{edu.location}</span>
                          </div>
                        </div>

                        <p className="text-foreground mb-4 md:mb-6 text-sm md:text-base">{edu.description}</p>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                          {/* Coursework */}
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-highlight mb-3 md:mb-4 font-caveat">
                              Key Coursework 📚
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.coursework.map((course, courseIndex) => (
                                <Badge key={courseIndex} variant="secondary" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Achievements */}
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-highlight mb-3 md:mb-4 font-caveat">
                              Achievements 🏆
                            </h4>
                            <ul className="space-y-2">
                              {edu.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <Award className="w-3 h-3 md:w-4 md:h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs md:text-sm text-foreground">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 md:mb-6 font-caveat">
              Beyond Academics 🌟
            </h2>
            <p className="text-lg md:text-xl text-foreground">
              Leadership roles and extracurricular activities that shaped my journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {extracurricular.map((activity, index) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift h-full hover-glow hover-target">
                    <CardContent className="p-4 md:p-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-highlight mb-2">{activity.title}</h3>
                      <p className="text-primary font-semibold mb-2 text-sm md:text-base">{activity.organization}</p>
                      <Badge variant="outline" className="mb-3 md:mb-4 text-xs">
                        {activity.duration}
                      </Badge>
                      <p className="text-foreground text-sm md:text-base">{activity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Developed */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 md:mb-6 font-caveat">
              Skills Developed 📈
            </h2>
            <p className="text-lg md:text-xl text-foreground">
              Technical and soft skills acquired through academic journey
            </p>
          </motion.div>

          <Card className="bg-card border border-border shadow-xl max-w-4xl mx-auto hover-glow hover-target transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                {skills_learned.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium hover-target hover:scale-110 transition-transform">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
