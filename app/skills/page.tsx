"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Globe, Database, Wrench, Brain, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SkillsPage() {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      color: "from-primary to-accent",
      skills: [
        { name: "C/C++", level: 50, experience: "1+ years" },
        { name: "Python", level: 45, experience: "1+ years" },
        { name: "JavaScript", level: 80, experience: "2+ years" },
        { name: "TypeScript", level: 75, experience: "1+ year" },
        { name: "Java", level: 50, experience: "1+ year" },
        { name: "Embedded C", level: 90, experience: "4+ years" },
      ],
    },
    {
      icon: Globe,
      title: "Web Development",
      color: "from-accent to-highlight",
      skills: [
        { name: "React", level: 85, experience: "1+ years" },
        { name: "Next.js", level: 80, experience: "1+ year" },
        { name: "HTML/CSS", level: 90, experience: "3+ years" },
        { name: "Tailwind CSS", level: 85, experience: "1+ year" },
        { name: "Node.js", level: 75, experience: "2+ year" },
        { name: "Express.js", level: 70, experience: "2+ year" },
      ],
    },
    {
      icon: Cpu,
      title: "Embedded Systems",
      color: "from-highlight to-primary",
      skills: [
        { name: "Arduino", level: 90, experience: "3+ years" },
        { name: "ESP32/ESP8266", level: 85, experience: "3+ years" },
        { name: "Raspberry Pi", level: 80, experience: "3+ years" },
        { name: "Verilog", level: 75, experience: "1+ year" },
        { name: "FPGA", level: 70, experience: "1+ year" },
        { name: "PCB Design", level: 65, experience: "1+ year" },
      ],
    },
    {
      icon: Brain,
      title: "AI/ML & Data Science",
      color: "from-primary to-accent",
      skills: [
        { name: "TensorFlow", level: 80, experience: "1+ year" },
        { name: "OpenCV", level: 75, experience: "1+ year" },
        { name: "Scikit-learn", level: 75, experience: "1+ year" },
        { name: "Pandas", level: 80, experience: "1+ year" },
        { name: "NumPy", level: 85, experience: "1+ years" },
        { name: "Matplotlib", level: 80, experience: "1+ year" },
      ],
    },
    {
      icon: Database,
      title: "Databases & Cloud",
      color: "from-accent to-highlight",
      skills: [
        { name: "MongoDB", level: 38, experience: "1+ year" },
        { name: "MySQL", level: 35, experience: "1+ year" },
        { name: "Firebase", level: 40, experience: "1+ year" },
        { name: "AWS IoT", level: 33, experience: "6 months" },
        { name: "Google Cloud", level: 30, experience: "6 months" },
        { name: "Docker", level: 33, experience: "6 months" },
      ],
    },
    {
      icon: Wrench,
      title: "Tools & Technologies",
      color: "from-highlight to-primary",
      skills: [
        { name: "Git/GitHub", level: 85, experience: "2+ years" },
        { name: "VS Code", level: 90, experience: "3+ years" },
        { name: "Linux", level: 75, experience: "3+ year" },
        { name: "Figma", level: 70, experience: "1+ year" },
        { name: "Postman", level: 75, experience: "1+ year" },
        { name: "MQTT", level: 80, experience: "1+ year" },
      ],
    },
  ]

  const certifications = [
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM",
      date: "2025",
      badge: "🏆",
    },
    {
      title: "Deep Learning",
      issuer: "Illinois Tech",
      date: "2024",
      badge: "🎓",
    },
    {
      title: "Introduction to AI and Machine Learning on Google Cloud",
      issuer: "Google Cloud",
      date: "2024",
      badge: "📜",
    },
    {
      title: "React Basics",
      issuer: "Meta",
      date: "2024",
      badge: "⚛️",
    },
  ]

  const achievements = [
    {
      title: "Hackathon Winner",
      description: "Smart Tourism - Cummins College",
      icon: Award,
      color: "text-accent",
    },
    {
      title: "Top 10 Finalist",
      description: "National Level Embedded Systems Competition",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Open Source Contributor",
      description: "Contributed to 5+ open source projects",
      icon: Code,
      color: "text-highlight",
    },
  ]

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-highlight mb-6">Skills & Expertise</h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and professional competencies
            </p>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">6+</div>
              <div className="text-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">6</div>
              <div className="text-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-highlight mb-2">2+</div>
              <div className="text-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8+</div>
              <div className="text-foreground">Projects</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold text-highlight">{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-highlight">{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {skill.experience}
                              </Badge>
                              <span className="text-sm text-foreground">{skill.level}%</span>
                            </div>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-highlight mb-6">Certifications & Achievements</h2>
            <p className="text-xl text-foreground">Professional certifications and notable achievements</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Certifications */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
              <h3 className="text-2xl font-bold text-highlight mb-8">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{cert.badge}</div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-highlight mb-1">{cert.title}</h4>
                          <p className="text-foreground mb-2">{cert.issuer}</p>
                          <Badge variant="outline">{cert.date}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              <h3 className="text-2xl font-bold text-highlight mb-8">Achievements</h3>
              <div className="space-y-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={index}
                      className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Icon className={`w-8 h-8 ${achievement.color}`} />
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-highlight mb-2">{achievement.title}</h4>
                            <p className="text-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Visualization */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-highlight mb-12">Skill Proficiency Overview</h2>

            <Card className="bg-card border border-border shadow-xl max-w-4xl mx-auto hover:border-primary transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-highlight mb-2">Frontend</h3>
                    <p className="text-foreground">Expert in modern web technologies and responsive design</p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-accent to-highlight rounded-full flex items-center justify-center mx-auto mb-4">
                      <Cpu className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-highlight mb-2">Embedded</h3>
                    <p className="text-foreground">Specialized in IoT and embedded system development</p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-highlight to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-highlight mb-2">AI/ML</h3>
                    <p className="text-foreground">Proficient in machine learning and computer vision</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
