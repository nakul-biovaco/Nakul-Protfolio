"use client"

import { motion } from "framer-motion"
import { MapPin, GraduationCap, Heart, Lightbulb, Target, Rocket, Coffee, Music, Book, Gamepad2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParallaxContainer } from "@/components/parallax-container"
import { CupSoda, Users, Film } from "lucide-react"

export default function AboutPage() {
  const interests = [
    {
      icon: Heart,
      title: "Health-Tech & Neuro-monitoring",
      description: "Monitoring neural activity and physiological signals",
      color: "from-primary to-accent",
    },
    {
      icon: Target,
      title: "Embedded Systems",
      description: "Creating efficient, low-power hardware integrations",
      color: "from-accent to-highlight",
    },
    {
      icon: Lightbulb,
      title: "AI/ML in Engineering",
      description: "Applying AI algorithms for complex signal processing",
      color: "from-highlight to-primary",
    },
    {
      icon: Rocket,
      title: "Enterprise SaaS & ERP",
      description: "Building scalable, data-driven software solutions",
      color: "from-primary to-accent",
    },
  ]

  const values = [
    { title: "Innovation through Simplicity", desc: "Keep solutions simple and effective." },
    { title: "Continuous Learning", desc: "Learn, adapt, and improve every day." },
    { title: "Integrity First", desc: "Do the right thing, even when it's hard." },
    { title: "Customer-Centric Thinking", desc: "Build products that solve real problems." },
    { title: "Ownership & Accountability", desc: "Take responsibility for actions and outcomes." },
    { title: "Long-Term Vision", desc: "Focus on sustainable impact over short-term gains." },
  ]

  const hobbies = [
    { icon: CupSoda, name: "Milk Lover", description: "A glass of milk keeps me going" },
    { icon: Music, name: "Clapbox & Keyboard", description: "Rhythms that energize my day" },
    { icon: Users, name: "Evening Walks", description: "Chilling with friends every sunset" },
    { icon: Film, name: "Horror Movies", description: "Adrenaline rush through chilling tales" },
  ];

  const funFacts = [
    { 
      icon: Rocket, 
      text: "Founded my first company at 18",
      badgeClass: "bg-primary text-primary-foreground"
    },
    { 
      icon: Book, 
      text: "Passionate about urban farming",
      badgeClass: "bg-accent text-accent-foreground"
    },
    { 
      icon: Book, 
      text: "Love reading sci-fi novels",
      badgeClass: "bg-primary text-primary-foreground"
    },
    { 
      icon: Music, 
      text: "Code better with lo-fi music",
      badgeClass: "bg-accent text-accent-foreground"
    },
    { 
      icon: Gamepad2, 
      text: "Morning runner and fitness enthusiast",
      badgeClass: "bg-primary text-primary-foreground"
    },
    { 
      icon: Coffee, 
      text: "Coffee connoisseur (3 cups minimum!)",
      badgeClass: "bg-accent text-accent-foreground"
    },
  ];

  const timeline = [
    {
      year: "2026-Present",
      title: "Founder, CEO & MD",
      institution: "BiovaCo Nexus PVT. LTD.",
      description: "Leading the organization from the forefront and overseeing all legal and regulatory compliances for the startup. (DIN: 11781675)",
      icon: Target,
      color: "text-primary"
    },
    {
      year: "2023-Present",
      title: "B.Tech in ECE",
      institution: "RCOEM, Nagpur",
      description: "Pursuing degree with focus on embedded systems and communication technologies",
      icon: GraduationCap,
      color: "text-primary"
    },
    {
      year: "2023",
      title: "Co-Founder & CMO",
      institution: "Electroculture",
      description: "Leading marketing and product strategy for agricultural tech startup",
      icon: Rocket,
      color: "text-accent"
    },
    {
      year: "2023-2026",
      title: "Technical & Operations Head",
      institution: "Nebula Innovations LLP",
      description: "Directed technology and operations for AI-enabled ERP and SaaS solutions, scaling the business to a multi-crore enterprise.",
      icon: Lightbulb,
      color: "text-highlight"
    },
  ];

  const domains = [
    {
      name: "Embedded Systems & VLSI",
      description: "ARM Cortex-M, Verilog, SystemVerilog, PCB Design, Microcontrollers",
      icon: Target
    },
    {
      name: "Biomedical & Signal Processing",
      description: "Smart Adaptive AGC Systems, Neural Signal Monitoring, EEG, Circuit Design",
      icon: Heart
    },
    {
      name: "AI & Enterprise Software",
      description: "AI Integration, SaaS, ERP, Linux Servers, C/C++ Development",
      icon: Lightbulb
    },
    {
      name: "Business Strategy & Ops",
      description: "Product Innovation, Strategic Planning, Operations Management",
      icon: Rocket
    }
  ];

  return (
    <div className="lg:ml-64 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <ParallaxContainer speed={0.2}>
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl animate-blob float"></div>
          </ParallaxContainer>
          <ParallaxContainer speed={0.3}>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl animate-blob float-delayed"></div>
          </ParallaxContainer>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-32 left-20 text-primary/20"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart size={30} />
          </motion.div>
          <motion.div
            className="absolute bottom-40 right-32 text-accent/20"
            animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            <Rocket size={35} />
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 font-caveat hover-target">About Me</h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Passionate engineer bridging the gap between innovation and implementation
            </p>
          </motion.div>

          {/* Personal Introduction */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <motion.div 
              className="lg:w-1/3 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl hover:border-primary/50 transition-all duration-300">
  <img 
    src="/images/nakul-profile.png"  // public/images/ में फोटो होनी चाहिए
    alt="Nakul's Profile"
    className="w-full h-full object-cover"
  />
</div>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-card border border-border shadow-xl hover:border-primary transition-all duration-300 hover-lift hover-glow hover-target">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-highlight mb-6 font-caveat">My Mission</h2>
                  <div className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      I see the brain as the most complex signal-processing system we know. My mission is to use hardware, data, and algorithms to better understand and monitor critical human states.
                    </p>
                    <p>
                      At the intersection of hardware and software, I build systems that bridge the gap between cutting-edge research and practical field applications—from smart adaptive AGC systems for low-power sensing to enterprise-scale SaaS platforms.
                    </p>
                    <p>
                      I believe technology should serve humanity's most fundamental needs. I am committed to developing tools that empower people through data-driven decisions and life-saving health-tech innovations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="bg-card border border-border shadow-xl hover:border-primary transition-all duration-300 hover-lift hover-glow hover-target">
                <CardContent className="p-8">
                  <motion.h2
                    className="text-3xl font-bold text-highlight mb-6 font-caveat"
                    whileHover={{ scale: 1.05 }}
                  >
                    My Story
                  </motion.h2>
                  <div className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      I am a final year Electronics & Communication Engineering student at Shri Ramdeobaba College of Engineering and Management and the Founder & Director at BiovaCo Nexus PVT. LTD. My core work revolves around embedded systems, RF communication, and signal processing, with a strong interest in AI/ML engineering applications.
                    </p>
                    <p>
                      Alongside my core engineering work, I am deeply curious about how the human brain behaves in extreme conditions — such as seizures, loss of consciousness, trauma, and the final moments of life. I’m interested in how neural activity, micro-signals, and subconscious processes change under stress, and how these changes can be captured through EEG, motion, and other physiological signals.
                    </p>
                    <p>
                      I am always open to internships, research, and collaborative projects in embedded systems, signal processing, and health-tech. Let's build the future together!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Domains of Expertise */}
              <Card className="bg-card border border-border shadow-xl hover:border-primary transition-all duration-300 hover-lift hover-glow hover-target">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-highlight mb-6 font-caveat">Domains of Expertise</h3>
                  <div className="space-y-6">
                    {domains.map((domain, index) => {
                      const Icon = domain.icon;
                      return (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors hover-target"
                          whileHover={{ x: 5 }}
                        >
                          <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${domain.icon === Lightbulb ? 'text-highlight' : domain.icon === Target ? 'text-primary' : 'text-accent'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-highlight">{domain.name}</h4>
                            <p className="text-sm text-muted-foreground">{domain.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Hobbies Section */}
              <Card className="bg-card border border-border shadow-xl hover:border-primary transition-all duration-300 hover-lift hover-glow hover-target">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-highlight mb-6 font-caveat">When I'm Not Coding</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {hobbies.map((hobby, index) => {
                      const Icon = hobby.icon
                      return (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover-target"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-semibold text-highlight text-sm">{hobby.name}</div>
                            <div className="text-xs text-muted-foreground">{hobby.description}</div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Interests & Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-highlight text-center font-caveat">Areas of Interest</h2>
              <div className="grid gap-6">
                {interests.map((interest, index) => {
                  const Icon = interest.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift hover-glow hover-target tilt">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <motion.div
                              className={`w-12 h-12 bg-gradient-to-br ${interest.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-6 h-6 text-primary-foreground" />
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-semibold text-highlight mb-2">{interest.title}</h3>
                              <p className="text-foreground">{interest.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>

              {/* Timeline Section */}
              <Card className="bg-card border border-border shadow-xl hover:border-primary transition-all duration-300 hover-lift hover-glow hover-target">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-highlight mb-6 font-caveat">My Journey</h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/20 to-highlight/20"></div>
                    
                    {timeline.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div 
                          key={index}
                          className="relative pl-12 pb-8 last:pb-0 group"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {/* Timeline dot */}
                          <div className={`absolute left-0 w-4 h-4 rounded-full ${item.color} bg-current border-4 border-background z-10`}></div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-5 h-5 ${item.color}`} />
                              <span className="font-bold text-highlight">{item.year}</span>
                            </div>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <p className="font-medium text-primary">{item.institution}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50 relative overflow-hidden">
        <ParallaxContainer speed={0.1}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 border border-primary rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 border border-accent rounded-full animate-pulse animation-delay-2000"></div>
          </div>
        </ParallaxContainer>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6 font-caveat">My Values & Principles</h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              The core beliefs that guide my work and decision-making
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift h-full hover-glow hover-target magnetic">
                  <CardContent className="p-6 flex items-center justify-center text-center h-full">
                    <div>
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <p className="text-lg font-semibold text-highlight">{value.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">{value.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold gradient-text mb-12 font-caveat">Fun Facts About Me</h2>

            <Card className="bg-card border border-border shadow-xl max-w-4xl mx-auto hover-glow hover-target transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {[0, 1, 2].map((colIndex) => (
                    <div key={colIndex} className="space-y-6">
                      {funFacts.slice(colIndex * 3, colIndex * 3 + 3).map((fact, index) => {
                        const Icon = fact.icon;
                        return (
                          <motion.div 
                            key={index} 
                            className="flex items-center space-x-4" 
                            whileHover={{ x: 10 }}
                          >
                            <Badge className={`${fact.badgeClass} hover-wiggle hover-target`}>
                              <Icon className="h-4 w-4" />
                            </Badge>
                            <span className="text-foreground">{fact.text}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
