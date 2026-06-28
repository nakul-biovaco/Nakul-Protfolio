"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Award, 
  Calendar, 
  Users, 
  ArrowRight,
  Cpu,
  CircuitBoard,
  Zap,
  Code2,
  Settings,
  Rocket,
  Laptop,
  Star,
  Sparkles
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParallaxContainer } from "@/components/parallax-container"

export default function ProjectsPage() {
  const projects = [
    {
      id: "smart-agc-system",
      title: "Smart Adaptive AGC System",
      description: "Developed a Smart Adaptive Automatic Gain Control system for low-power, noise-sensitive analog sensing applications like ECG.",
      longDescription: "This system integrates analog components (LM358 op-amps) with digital control (MCP41010 via SPI + Arduino Uno) for real-time gain adjustment. Designed for biomedical and other sensitive sensing applications, it was simulated in Proteus 8 and tested with 2V sine waves and ECG-like signals.",
      techStack: ["Analog Circuit Design", "Embedded Systems", "SPI", "Proteus", "Biomedical Electronics", "Arduino"],
      category: "Embedded Systems & Analog",
      status: "In Progress",
      duration: "Jun 2025 - Present",
      team: "Solo Project",
      highlights: [
        "Real-time adaptive gain control",
        "Low-power operation",
        "Biomedical application focused",
        "Hybrid analog-digital design"
      ],
      image: "/AGC.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: true,
      icon: <CircuitBoard className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "hyper-fusion-adder",
      title: "Hyper-Fusion Parallel Carry Adder",
      description: "Next-gen 64-bit adder combining CLA, CSA, and Carry-Skip techniques for improved performance.",
      longDescription: "Designed a high-performance 64-bit adder architecture that combines the benefits of Carry Look-Ahead (CLA), Carry-Skip, and Carry-Select Adders (CSA). This hybrid approach achieves reduced critical path delay while maintaining better scalability and power efficiency compared to traditional designs.",
      techStack: ["VLSI", "Digital Electronics", "High-Speed Arithmetic", "Verilog", "FPGA"],
      category: "Digital Design",
      status: "Completed",
      duration: "Oct 2024 - Jun 2025",
      team: "Solo Project",
      highlights: [
        "64-bit hybrid adder design",
        "Reduced critical path delay",
        "Improved power efficiency",
        "Scalable architecture"
      ],
      image: "/HPCA.png",
      demoLink: "#",
      githubLink: "#",
      featured: true,
      icon: <Cpu className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "human-electric-sensor",
      title: "Cascaded Three-Transistor Human Sensor",
      description: "Human presence detection system using cascaded transistors sensing body electric fields.",
      longDescription: "Developed a sensitive human presence detection system using three cascaded transistors that detect the natural electric fields emitted by the human body. The design includes amplification stages for improved sensitivity and can be used in security systems or smart home applications.",
      techStack: ["Analog Circuit Design", "PCB Design", "Electronic Sensors", "Transistor Circuits"],
      category: "Sensor Systems",
      status: "Completed",
      duration: "3 months",
      team: "Solo Project",
      highlights: [
        "Non-contact human detection",
        "Cascaded amplification",
        "High sensitivity design",
        "Low-cost implementation"
      ],
      image: "/T.png",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      icon: <Zap className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "speculative-adder",
      title: "16-Bit Speculative Adder in Verilog",
      description: "High-speed 16-bit speculative adder with optimized carry logic for digital systems.",
      longDescription: "Implemented a 16-bit speculative adder in Verilog that uses predictive carry logic to optimize performance. This design reduces computation delay in arithmetic operations and is suitable for integration in processors and other digital systems requiring high-speed addition.",
      techStack: ["Verilog", "Digital Design", "VLSI", "FPGA", "RTL Design"],
      category: "Digital Design",
      status: "Completed",
      duration: "2 months",
      team: "Solo Project",
      highlights: [
        "16-bit speculative architecture",
        "Optimized carry logic",
        "Reduced computation delay",
        "FPGA implementable"
      ],
      image: "/ADDER.png",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      icon: <Cpu className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "morse-converter",
      title: "Morse Code Converter in C",
      description: "Bi-directional Morse code converter with interactive interface implemented in C.",
      longDescription: "Created a comprehensive Morse code converter program in C that can translate both from text to Morse and vice versa. The program features an interactive command-line interface and handles all standard alphanumeric characters with proper timing for Morse code transmission.",
      techStack: ["C Programming", "Algorithms", "CLI Development", "Data Structures"],
      category: "Software Development",
      status: "Completed",
      duration: "1 month",
      team: "Solo Project",
      highlights: [
        "Bi-directional conversion",
        "Interactive CLI interface",
        "Proper timing implementation",
        "Educational tool"
      ],
      image: "/MORSE.png",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      icon: <Code2 className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "rtl-circuit-design",
      title: "RTL Boolean Expression Circuit",
      description: "Transistor-level implementation of logic gates for Boolean expression realization.",
      longDescription: "Designed and implemented a resistor-transistor logic (RTL) circuit to realize complex Boolean expressions. This project involved creating basic logic gates from discrete components and combining them to implement practical digital logic functions, bridging the gap between theoretical logic design and physical implementation.",
      techStack: ["RTL Design", "PCB Design", "Discrete Electronics", "Boolean Logic"],
      category: "Digital Electronics",
      status: "Completed",
      duration: "2 months",
      team: "Solo Project",
      highlights: [
        "Transistor-level implementation",
        "Boolean expression realization",
        "Practical logic design",
        "Discrete component design"
      ],
      image: "/RTL.png",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      icon: <Settings className="w-4 h-4 mr-1 text-primary" />
    },
  ]

  const categoryIcons = {
    "Embedded Systems & Analog": <CircuitBoard className="w-4 h-4 mr-1" />,
    "Digital Design": <Cpu className="w-4 h-4 mr-1" />,
    "Sensor Systems": <Zap className="w-4 h-4 mr-1" />,
    "Software Development": <Code2 className="w-4 h-4 mr-1" />,
    "Digital Electronics": <Settings className="w-4 h-4 mr-1" />
  }

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
              My Projects <Rocket className="w-8 h-8 inline ml-2" />
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto px-4">
              Hardware and embedded systems projects combining analog, digital, and software solutions
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16"
          >
            <div className="text-center bg-muted/50 p-4 rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{projects.length}+</div>
              <div className="text-sm md:text-base text-foreground flex items-center justify-center">
                <Laptop className="w-4 h-4 mr-1" /> Projects
              </div>
            </div>
            <div className="text-center bg-muted/50 p-4 rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-black">4</div>
              <div className="text-sm md:text-base text-foreground flex items-center justify-center">
                <Cpu className="w-4 h-4 mr-1" /> Categories
              </div>
            </div>
            <div className="text-center bg-muted/50 p-4 rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-highlight mb-2">20+</div>
              <div className="text-sm md:text-base text-foreground flex items-center justify-center">
                <Code2 className="w-4 h-4 mr-1" /> Technologies
              </div>
            </div>
            <div className="text-center bg-muted/50 p-4 rounded-lg border border-border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm md:text-base text-foreground flex items-center justify-center">
                <Settings className="w-4 h-4 mr-1" /> Hands-on
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 text-center font-caveat">
              Featured Projects <Star className="w-6 h-6 inline ml-2" />
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift overflow-hidden hover-glow hover-target cursor-pointer h-full">
                        <div className="relative h-48 md:h-64 w-full overflow-hidden border-b border-border">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center' }}
                          />
                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-primary text-primary-foreground">
                                <Award className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6 md:p-8">
                          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                            <Badge variant="outline" className="border-primary text-primary text-xs md:text-sm">
                              {categoryIcons[project.category]}
                              {project.category}
                            </Badge>
                            <Badge
                              variant={project.status === "Completed" ? "default" : "secondary"}
                              className="text-xs md:text-sm"
                            >
                              {project.status}
                            </Badge>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-highlight mb-4 hover:gradient-text transition-all duration-300">
                            {project.icon} {project.title}
                          </h3>
                          <p className="text-foreground mb-6 text-sm md:text-base line-clamp-3">
                            {project.longDescription}
                          </p>

                          <div className="space-y-4 mb-6">
                            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {project.duration}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {project.team}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-highlight text-sm md:text-base flex items-center">
                                <Sparkles className="w-4 h-4 mr-1" /> Key Highlights:
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs md:text-sm text-foreground">
                                {project.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.slice(0, 6).map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.techStack.length > 6 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.techStack.length - 6} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                            View Details <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-12 text-center font-caveat">
              All Projects <Laptop className="w-6 h-6 inline ml-2" />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/projects/${project.id}`}>
                    <Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift h-full hover-glow hover-target cursor-pointer flex flex-col">
                      <div className="relative h-40 md:h-48 w-full overflow-hidden border-b border-border">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center' }}
                        />
                        {project.featured && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryIcons[project.category]}
                            {project.category}
                          </Badge>
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="text-xs">
                            {project.status}
                          </Badge>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-highlight mb-3 hover:gradient-text transition-all duration-300">
                          {project.icon} {project.title}
                        </h3>
                        <p className="text-foreground mb-4 flex-grow text-sm line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.techStack.slice(0, 4).map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.techStack.length - 4}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center text-primary font-semibold mt-auto">
                          View Details <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
