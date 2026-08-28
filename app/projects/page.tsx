"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Sparkles,
  Download,
  Github,
  ExternalLink,
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  X,
  Check
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ParallaxContainer } from "@/components/parallax-container"

export default function ProjectsPage() {
  const [downloadClicks, setDownloadClicks] = useState<number>(0)
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false)
  const [downloadState, setDownloadState] = useState<"idle" | "generating" | "downloading" | "completed">("idle")
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    fetch("/api/analytics/downloads?summary=public")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.uniqueSessions === "number") {
          setDownloadClicks(data.uniqueSessions)
        }
      })
      .catch(() => {})
  }, [])

  const handleCloseModal = () => {
    setIsNoticeModalOpen(false)
    setDownloadState("idle")
    setDownloadProgress(0)
    setCountdown(3)
  }

  const handleAgreeAndDownload = () => {
    // 1. Start generation phase
    setDownloadState("generating")
    setCountdown(3)
    
    // Optimistic UI updates
    setDownloadClicks((prev) => (prev !== null ? prev + 1 : 1))

    let currentCountdown = 3
    const countdownInterval = setInterval(() => {
      currentCountdown -= 1
      setCountdown(currentCountdown)
      if (currentCountdown <= 0) {
        clearInterval(countdownInterval)
        
        // 2. Trigger download in new tab
        window.open("/download/attendance-insights", "_blank")
        
        // 3. Start download progress phase (Play Store style)
        setDownloadState("downloading")
        setDownloadProgress(0)
        
        let currentProgress = 0
        const progressInterval = setInterval(() => {
          // Play Store style progress increment
          const increment = Math.floor(Math.random() * 15) + 5
          currentProgress = Math.min(currentProgress + increment, 100)
          setDownloadProgress(currentProgress)
          
          if (currentProgress >= 100) {
            clearInterval(progressInterval)
            setDownloadState("completed")
            
            // Re-verify unique sessions count with backend API
            fetch("/api/analytics/downloads?summary=public")
              .then((res) => res.json())
              .then((data) => {
                if (data && typeof data.uniqueSessions === "number") {
                  setDownloadClicks(data.uniqueSessions)
                }
              })
              .catch(() => {})

            // Auto close after 1.5s
            setTimeout(() => {
              handleCloseModal()
            }, 1500)
          }
        }, 300)
      }
    }, 1000)
  }

  const projects = [
    {
      id: "attendance-insights",
      title: "RCOEM/RBU Operations 75",
      description: "A privacy-first Manifest V3 Chrome extension providing students with instant attendance analytics, bunk calculations, and course trajectory projections.",
      longDescription: "RCOEM/RBU Operations 75 empowers students by computing real-time attendance analytics, bunk safety thresholds, and projection models directly inside college portals with zero telemetry.",
      techStack: [
        "JavaScript (ES6+)",
        "Chrome Extension — Manifest V3",
        "Chrome Extension APIs",
        "DOM Parsing",
        "MutationObserver",
        "Token-based matching",
        "Local browser storage",
        "Modular calculation / projection / risk engines"
      ],
      category: "Browser Extension & Web Tools",
      status: "Completed",
      duration: "Completed — August 28, 2026",
      team: "Solo Project",
      highlights: [
        "Real-time attendance calculations & bunk margin optimizer",
        "Strict client-side privacy with zero external tracking",
        "Seamless in-portal UI overlay with instant response time",
        "Manifest V3 compliant with background service workers",
        "Modular calculation, projection, and risk engines"
      ],
      image: "/projects/operations-75/shot-1.png",
      demoLink: "/download/attendance-insights",
      githubLink: "https://github.com/nakul-biovaco/Attendance-Extension-RCOEM",
      featured: true,
      icon: <Rocket className="w-4 h-4 mr-1 text-primary" />
    },
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
        "Predictive carry logic",
        "Optimized delay paths",
        "FPGA implementation"
      ],
      image: "/ADDER.png",
      demoLink: "#",
      githubLink: "#",
      featured: false,
      icon: <Cpu className="w-4 h-4 mr-1 text-primary" />
    },
    {
      id: "morse-code-converter",
      title: "Morse Code Converter in C",
      description: "Terminal-based text to Morse code and Morse code to text bi-directional converter in C.",
      longDescription: "Created a robust bi-directional Morse code converter in C that translates English text to Morse code and vice versa. Features include audio output simulation using system beeps, file input/output support, and real-time interactive translation mode.",
      techStack: ["C", "Data Structures", "Algorithms", "File I/O"],
      category: "Software Development",
      status: "Completed",
      duration: "1 month",
      team: "Solo Project",
      highlights: [
        "Bi-directional translation",
        "Audio playback simulation",
        "File processing support",
        "Interactive CLI interface"
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

  const categoryIcons: Record<string, React.ReactNode> = {
    "Browser Extension & Web Tools": <Rocket className="w-4 h-4 mr-1" />,
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

                          {project.id === "attendance-insights" ? (
                            <div className="space-y-4 pt-2">
                              <div className="flex flex-wrap items-center gap-3">
                                <Button
                                  size="sm"
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs md:text-sm px-4 py-2 flex items-center shadow-md hover-lift"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setIsNoticeModalOpen(true)
                                  }}
                                >
                                  <Download className="w-4 h-4 mr-1.5" />
                                  Download Extension ZIP
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="font-medium text-xs md:text-sm px-3 py-2 flex items-center hover-lift"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    window.open(project.githubLink, "_blank")
                                  }}
                                >
                                  <Github className="w-4 h-4 mr-1.5" />
                                  GitHub
                                </Button>
                                <span className="flex items-center text-primary font-semibold text-xs md:text-sm ml-auto group-hover:translate-x-1 transition-transform">
                                  View Details <ArrowRight className="ml-1.5 w-4 h-4" />
                                </span>
                              </div>
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-xs text-muted-foreground shadow-sm">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span>
                                  <strong className="text-foreground font-semibold">{(downloadClicks || 0).toLocaleString()}</strong> Downloaded
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                              View Details <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                          )}
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
                    <Card className="bg-card border border-border shadow-xl hover-shadow-2xl transition-all duration-300 hover-lift h-full hover-glow hover-target cursor-pointer flex flex-col">
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

                        {project.id === "attendance-insights" ? (
                          <div className="space-y-3 pt-2 mt-auto">
                            <div className="flex items-center justify-between gap-2">
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs px-3 py-1.5 flex items-center shadow-sm hover-lift"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setIsNoticeModalOpen(true)
                                }}
                              >
                                <Download className="w-3.5 h-3.5 mr-1" />
                                Download ZIP
                              </Button>
                              <div className="flex items-center text-primary text-xs font-semibold">
                                Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                              </div>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground bg-primary/10 px-2 py-1 rounded border border-primary/20">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                              </span>
                              <span><strong className="text-foreground font-semibold">{(downloadClicks || 0).toLocaleString()}</strong> Downloaded</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center text-primary font-semibold mt-auto">
                            View Details <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notice & License Download Modal */}
      <AnimatePresence>
        {isNoticeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              {downloadState !== "idle" ? (
                <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        className="stroke-muted-foreground/10"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      {downloadState === "downloading" && (
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          className="stroke-primary"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * downloadProgress) / 100}
                          style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
                        />
                      )}
                      {downloadState === "generating" && (
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          className="stroke-amber-500"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * (3 - countdown)) / 3}
                          style={{ transition: "stroke-dashoffset 1s linear" }}
                        />
                      )}
                      {downloadState === "completed" && (
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          className="stroke-green-500"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={251.2}
                          strokeDashoffset={0}
                        />
                      )}
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      {downloadState === "generating" && (
                        <span className="text-2xl font-bold text-amber-500 animate-pulse">{countdown}</span>
                      )}
                      {downloadState === "downloading" && (
                        <span className="text-xl font-bold text-foreground">{downloadProgress}%</span>
                      )}
                      {downloadState === "completed" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <Check className="w-8 h-8 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-highlight">
                      {downloadState === "generating" && "Generating Secure Download Link..."}
                      {downloadState === "downloading" && "Downloading Package..."}
                      {downloadState === "completed" && "Download Started!"}
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                      {downloadState === "generating" && "Preparing latest ZIP release build. Please wait..."}
                      {downloadState === "downloading" && `Attendance-Extension-RCOEM-main.zip (${(1.4 * downloadProgress / 100).toFixed(1)} MB / 1.4 MB)`}
                      {downloadState === "completed" && "Your download has started. Thank you!"}
                    </p>
                  </div>

                  <div className="w-full max-w-xs bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        downloadState === "generating" ? "bg-amber-500 w-1/3 animate-pulse" :
                        downloadState === "downloading" ? "bg-primary" : "bg-green-500 w-full"
                      }`}
                      style={{ width: downloadState === "downloading" ? `${downloadProgress}%` : undefined }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-highlight">
                          Notice & License Agreement
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Developer attribution & usage terms
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <div className="p-3.5 rounded-lg bg-muted/50 border border-border space-y-1">
                      <p className="font-semibold text-foreground flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-primary" />
                        Original Creation & Ownership
                      </p>
                      <p>
                        This extension was engineered and completed on <span className="font-medium text-foreground">August 28, 2026</span> by <span className="font-semibold text-foreground">Nakul Mundhada</span>.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-muted/50 border border-border space-y-1">
                      <p className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Free to Use & Test
                      </p>
                      <p>
                        You are free to download, test, and use this extension for personal and educational academic purposes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-1">
                      <p className="font-semibold text-amber-500 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        Modification & Redistribution Policy
                      </p>
                      <p className="text-foreground/90">
                        Intellectual property (IP) is held in the author's name. If you modify, fork, adapt, or distribute updates based on this codebase, you must provide explicit author attribution to Nakul Mundhada and notify the author.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleCloseModal}
                      className="hover-target"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover-target hover-lift shadow-md"
                      onClick={handleAgreeAndDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Agree & Download ZIP
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
