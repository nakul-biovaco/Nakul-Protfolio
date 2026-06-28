"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award, Target, Cpu, Waves, HeartPulse, Binary, Cctv, RadioTower, Maximize, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ParallaxContainer } from "@/components/parallax-container"

// Domain Icons Mapping
const domainIcons = {
  "Biomedical Signal Processing": HeartPulse,
  "Mixed-Signal Electronics": Cpu,
  "IoT": RadioTower,
  "Digital Electronics": Binary,
  "VLSI Design": Cpu,
  "Analog Electronics": Waves,
  "Bio-Sensing": HeartPulse,
  "Digital Design": Binary,
  "Verilog HDL": Cpu,
  "System-on-Chip": Cpu,
  "Embedded Programming": Cpu,
  "Communication Systems": RadioTower,
  "RTL Design": Cpu,
  "Boolean Logic": Binary,
  "Hardware Realization": Cpu
}

// Project data with deep technical details
const projectsData = {
  "smart-agc-system": {
    id: 1,
    title: "Smart Adaptive AGC System for Low-Power Sensing Applications",
    description: "Developed a Smart Adaptive AGC system optimized for low-power, noise-sensitive analog sensing applications.",
    longDescription: "AGC system with focus on biomedical signals like ECG, maintaining signal amplitude stability under fluctuating conditions.",
    detailedDescription: `
      This project involved the development of a sophisticated Automatic Gain Control system specifically designed for biomedical signal acquisition. The system dynamically adjusts gain to maintain optimal signal levels for processing, crucial for applications like ECG monitoring where signal quality is paramount.

      Technical Implementation Details:
      • Analog Front-End: Utilized LM358 op-amp in non-inverting configuration with variable feedback
      • Digital Control: Integrated MCP41010 digital potentiometer controlled via SPI from Arduino Uno
      • Control Algorithm: Implemented PID-based gain adjustment with amplitude tracking
      • Simulation: Validated design in Proteus 8 Professional with virtual oscilloscope
      • Testing: Applied 2V sine waves and synthesized ECG waveforms for validation

      Key Innovations:
      • Hybrid analog-digital gain control path
      • Ultra-low power consumption (<5mA) for wearable applications
      • Adaptive noise floor tracking
      • 40dB dynamic range with 0.5dB resolution
    `,
    techStack: ["LM358 Op-Amp", "MCP41010", "Arduino Uno", "SPI", "Proteus", "PID Control", "ECG Processing"],
    category: "Biomedical Signal Processing",
    domains: ["Biomedical Signal Processing", "Mixed-Signal Electronics", "IoT"],
    status: "Ongoing",
    duration: "June 2025 – Present",
    team: "Individual Project",
    highlights: [
      "Real-time hybrid AGC with 0.5dB resolution",
      "Validated with ECG waveforms",
      "Proteus simulation environment",
      "SPI-controlled digital potentiometer",
      "<5mA power consumption"
    ],
    challenges: [
      "Maintaining stability with varying bio-signals",
      "Minimizing noise in analog front-end",
      "Achieving fast settling time (<10ms)",
      "Power optimization for wearable use"
    ],
    outcomes: [
      "Successful prototype with 40dB dynamic range",
      "Accurate ECG signal preservation",
      "Ready for PCB integration",
      "Potential for clinical validation"
    ],
    images: ["/AGC.jpg", "/HPCA.png", "/T.png"],
    githubLink: "https://github.com/nakul/smart-agc-system",
    featured: true,
  },
  "hyper-fusion-adder": {
    id: 2,
    title: "Hyper-Fusion Parallel Carry Adder (HF-PCA)",
    description: "64-bit hybrid adder combining CLA, CSA, and CkSA architectures for high-speed arithmetic.",
    longDescription: "Optimized 64-bit adder fusing Carry Lookahead, Carry Select, and Carry Skip techniques.",
    detailedDescription: `
      This project developed a novel 64-bit adder architecture that combines the best features of three established adder types to achieve superior performance in VLSI implementations.

      Architectural Details:
      • Carry Lookahead (CLA) blocks for local fast carry
      • Carry Select (CSA) for parallel path computation
      • Carry Skip (CkSA) for predictable carry regions
      • 4-level hierarchical structure for optimal fan-out

      Design Metrics:
      • 64-bit operation at 1.2GHz in 45nm technology
      • 18% faster than conventional CLA
      • 22% lower power than pure CSA
      • Area overhead of only 8% vs. standard CLA

      Verification:
      • RTL implementation in Verilog-2001
      • Synthesized using Xilinx Vivado
      • Post-synthesis timing analysis in ModelSim
      • Compared against industry-standard adders

      Applications:
      • High-performance ALU design
      • Cryptographic accelerators
      • DSP processor cores
    `,
    techStack: ["Verilog", "Vivado", "ModelSim", "VLSI", "RTL Design", "Timing Analysis"],
    category: "Digital Electronics",
    domains: ["Digital Electronics", "High-Speed Arithmetic", "VLSI Design"],
    status: "Completed",
    duration: "October 2024 – June 2025",
    team: "Individual Project",
    highlights: [
      "64-bit hybrid adder architecture",
      "1.2GHz operation in 45nm",
      "18% speed improvement",
      "Formal verification complete",
      "Synthesizable RTL"
    ],
    challenges: [
      "Balancing speed vs. power tradeoffs",
      "Hierarchical timing closure",
      "Carry path optimization",
      "Verification coverage"
    ],
    outcomes: [
      "Working silicon prototype",
      "Conference paper published",
      "Potential patent filed",
      "Adopted in academic curriculum"
    ],
    images: ["/HPCA.png", "/ADDER.png", "/RTL.png"],
    githubLink: "https://github.com/nakul/hyper-fusion-adder",
    featured: true,
  },
  "human-electric-sensor": {
    id: 3,
    title: "Cascaded Three-Transistor Human Electric Field Sensor",
    description: "Sensitive detector for human electric fields using transistor amplification chain.",
    longDescription: "Three-stage NPN amplifier for detecting weak bio-electric fields from human body.",
    detailedDescription: `
      This analog design project created a sensitive detector for the weak electric fields naturally emitted by the human body, enabling touchless interaction.

      Circuit Design:
      • 3-stage common-emitter NPN amplifier
      • High-impedance input stage (10MΩ)
      • Bandwidth: 0.1Hz to 100kHz
      • Voltage gain: 86dB
      • Input-referred noise: 2μV/√Hz

      Performance Characteristics:
      • Detection range: 0.5m to 1.5m
      • Sensitivity: 10mV/m field strength
      • Power: 9V battery operation
      • Temperature stability: ±5% over 0-50°C

      Applications Demonstrated:
      • Touchless light switch
      • Presence detector
      • Simple gesture recognition
      • Sleep monitoring

      Future Enhancements:
      • CMOS implementation
      • Digital output interface
      • Array configuration for directionality
    `,
    techStack: ["BJT Circuits", "Analog Design", "SPICE", "Bio-Sensors", "PCB Design"],
    category: "Analog Electronics",
    domains: ["Analog Electronics", "Bio-Sensing", "Human-Body Detection"],
    status: "Completed",
    duration: "4 months",
    team: "2 members",
    highlights: [
      "3-stage transistor amplifier",
      "10MΩ input impedance",
      "86dB voltage gain",
      "0.5-1.5m detection range",
      "Battery-powered operation"
    ],
    challenges: [
      "Minimizing environmental noise",
      "Stability against oscillation",
      "Temperature compensation",
      "False trigger avoidance"
    ],
    outcomes: [
      "Working prototype demonstrated",
      "Published in college journal",
      "Potential for commercialization",
      "Foundation for advanced research"
    ],
    images: ["/T.png", "/AGC.jpg", "/MORSE.png"],
    githubLink: "https://github.com/nakul/human-electric-sensor",
  },
  "speculative-adder": {
    id: 4,
    title: "High-Speed 16-Bit Speculative Adder in Verilog",
    description: "16-bit adder using speculative carry prediction for faster computation.",
    longDescription: "Verilog implementation of speculative carry logic for arithmetic acceleration.",
    detailedDescription: `
      This digital design project explored speculative execution techniques applied to adder design, predicting carry bits to reduce critical path delay.

      Key Features:
      • 16-bit word length
      • 2-stage speculative carry
      • Misprediction recovery logic
      • Configurable speculation depth

      Performance Metrics:
      • 14% faster than conventional CLA
      • 5% area overhead
      • 8% power increase (justifiable by speed gain)
      • 92% prediction accuracy

      Implementation Details:
      • Verilog-2001 RTL
      • Synopsys Design Compiler synthesis
      • 65nm standard cell library
      • Formal verification using JasperGold

      Applications:
      • High-speed microprocessors
      • DSP coprocessors
      • FPGA accelerators
    `,
    techStack: ["Verilog", "SystemVerilog", "DC Synthesis", "Formal Verification", "ASIC Design"],
    category: "Digital Design",
    domains: ["Digital Design", "Verilog HDL", "System-on-Chip"],
    status: "Completed",
    duration: "3 months",
    team: "Individual Project",
    highlights: [
      "16-bit speculative architecture",
      "14% speed improvement",
      "92% prediction accuracy",
      "Formal verification",
      "Synthesizable RTL"
    ],
    challenges: [
      "Misprediction recovery logic",
      "Timing closure",
      "Power-area tradeoffs",
      "Verification complexity"
    ],
    outcomes: [
      "Working FPGA prototype",
      "Research paper in progress",
      "Potential for patent",
      "Teaching resource"
    ],
    images: ["/ADDER.png", "/HPCA.png", "/RTL.png"],
    githubLink: "https://github.com/nakul/speculative-adder",
  },
  "morse-converter": {
    id: 5,
    title: "Morse Code Converter Using C",
    description: "Bidirectional text-to-Morse converter with learning features.",
    longDescription: "C program for encoding/decoding Morse code with educational features.",
    detailedDescription: `
      This embedded software project created a comprehensive Morse code translation system with both encoding and decoding capabilities.

      System Features:
      • Text to Morse conversion
      • Morse to text translation
      • Adjustable speed (5-30 WPM)
      • Audio and visual output
      • Learning mode with progressive difficulty

      Technical Implementation:
      • ANSI C compliant code
      • Lookup tables for efficient encoding
      • State machine for decoding
      • PWM for tone generation
      • UART for serial interface

      Educational Value:
      • Used in amateur radio training
      • Adopted by campus radio club
      • Foundation for more complex projects

      Extensions:
      • ARM Cortex-M port
      • Bluetooth interface
      • Mobile app companion
    `,
    techStack: ["Embedded C", "AVR GCC", "PWM", "UART", "State Machines"],
    category: "Embedded Programming",
    domains: ["Embedded Programming", "Communication Systems"],
    status: "Completed",
    duration: "1 month",
    team: "Individual Project",
    highlights: [
      "Bidirectional conversion",
      "5-30 WPM adjustable speed",
      "Audio/visual output",
      "Learning mode",
      "Platform-independent C"
    ],
    challenges: [
      "Real-time decoding algorithm",
      "Timing accuracy",
      "User interface design",
      "Code size optimization"
    ],
    outcomes: [
      "Functional on multiple platforms",
      "Used in campus activities",
      "Open source release",
      "Foundation for advanced projects"
    ],
    images: ["/MORSE.png", "/T.png", "/AGC.jpg"],
    githubLink: "https://github.com/nakul/morse-converter",
  },
  "rtl-circuit-design": {
    id: 6,
    title: "RTL Circuit Design for Boolean Expression Realization",
    description: "Transistor-level implementation of Boolean logic gates.",
    longDescription: "Physical realization of logic functions using resistor-transistor logic.",
    detailedDescription: `
      This hands-on electronics project involved the physical implementation of digital logic gates at the transistor level, providing deep understanding of fundamental digital circuits.

      Implemented Gates:
      • NAND/NOR universal gates
      • AND/OR with diode-transistor logic
      • NOT gate with single transistor
      • XOR with hybrid approach

      Design Characteristics:
      • 5V TTL-compatible
      • Fan-out of 3
      • Propagation delay <50ns
      • Power <10mW/gate

      Practical Applications:
      • Educational demonstration
      • Custom logic prototyping
      • Understanding IC internals
      • Radiation-hardened logic basics

      Measurement Results:
      • Voh = 4.8V, Vol = 0.2V
      • Noise margin: 1.2V
      • Rise/fall time: 20ns
    `,
    techStack: ["Breadboarding", "Transistor Logic", "Boolean Algebra", "PCB Design", "SPICE"],
    category: "RTL Design",
    domains: ["RTL Design", "Boolean Logic", "Hardware Realization"],
    status: "Completed",
    duration: "2 months",
    team: "2 members",
    highlights: [
      "Transistor-level implementation",
      "All basic gates realized",
      "5V TTL compatible",
      "<50ns propagation delay",
      "Educational focus"
    ],
    challenges: [
      "Noise immunity",
      "Fan-out limitations",
      "Power consumption",
      "Signal integrity"
    ],
    outcomes: [
      "Working prototype on breadboard",
      "Used in lab demonstrations",
      "Foundation for ASIC study",
      "Research on variations"
    ],
    images: ["/RTL.png", "/ADDER.png", "/HPCA.png"],
    githubLink: "https://github.com/nakul/rtl-circuit-design",
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const project = projectsData[projectId as keyof typeof projectsData]

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (!isLightboxOpen || !project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false)
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isLightboxOpen, project?.images?.length])

  if (!project) {
    return (
      <div className="lg:ml-64 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-highlight mb-4">Project Not Found</h1>
          <p className="text-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/projects")} className="hover-target">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  // Get icons for domains
  const DomainIcons = project.domains?.map(domain => {
    const Icon = domainIcons[domain as keyof typeof domainIcons];
    return Icon ? <Icon key={domain} className="w-4 h-4 mr-1" /> : null;
  });

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
            <Button variant="outline" onClick={() => router.push("/projects")} className="hover-target hover-lift">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge variant="outline" className="border-primary text-primary text-sm md:text-base">
                {project.category}
              </Badge>
              <Badge
                variant={project.status === "Completed" ? "default" : "secondary"}
                className="text-sm md:text-base"
              >
                {project.status}
              </Badge>
              {project.featured && (
                <Badge className="bg-primary text-primary-foreground text-sm md:text-base">
                  <Award className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-caveat hover-target px-4">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-foreground max-w-4xl mx-auto px-4">{project.description}</p>

            {/* Project Meta */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {project.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {project.team}
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                {project.category}
              </div>
              {project.domains && (
                <div className="flex items-center">
                  {DomainIcons}
                  <span className="ml-1">{project.domains.join(" · ")}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Project Image Gallery */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="space-y-4">
                  {/* Main Featured Image / Slider */}
                  <Card 
                    className="bg-card border border-border shadow-xl hover-glow hover-target overflow-hidden relative group animate-scale"
                  >
                    <CardContent className="p-0 relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.39/1] max-h-[450px]">
                      {/* Image container with motion for smooth transition */}
                      <div 
                        className="w-full h-full cursor-zoom-in"
                        onClick={() => setIsLightboxOpen(true)}
                      >
                        <motion.img
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          src={project.images[currentImageIndex] || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Left Navigation Arrow */}
                      {project.images.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground/75 hover:text-foreground hover:scale-105 shadow-md border border-border transition-all duration-200 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}

                      {/* Right Navigation Arrow */}
                      {project.images.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground/75 hover:text-foreground hover:scale-105 shadow-md border border-border transition-all duration-200 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}

                      {/* Zoom Fullscreen trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="absolute bottom-4 right-4 z-10 bg-background/90 hover:bg-background text-foreground hover:text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-border backdrop-blur-sm transition-all duration-200 hover:scale-105"
                      >
                        <Maximize className="w-3.5 h-3.5" /> Fullscreen
                      </button>
                    </CardContent>
                  </Card>

                  {/* Thumbnail Row (only if multiple images exist) */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {project.images.map((img, index) => (
                        <Card 
                          key={index}
                          className={`bg-card border shadow-md hover-glow hover-target overflow-hidden cursor-pointer group relative aspect-[16/9] ${
                            currentImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                          }`}
                          onClick={() => {
                            setCurrentImageIndex(index)
                          }}
                        >
                          <CardContent className="p-0 h-full w-full">
                            <img
                              src={img}
                              alt={`${project.title} screenshot ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {currentImageIndex === index && (
                              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold scale-75">
                                  Active
                                </span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Detailed Description */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-highlight mb-6 font-caveat">
                      Technical Deep Dive 🛠️
                    </h2>
                    <div className="prose prose-lg max-w-none text-foreground">
                      <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {project.detailedDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Challenges & Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-2 gap-6 md:gap-8"
              >
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat">Engineering Challenges 🎯</h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start text-sm md:text-base">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat">Achievements & Outcomes 🚀</h3>
                    <ul className="space-y-3">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start text-sm md:text-base">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 md:space-y-8">
              {/* Tech Stack */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat">Technology Stack ⚡</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs md:text-sm hover-target">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Key Features */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat">Key Innovations ✨</h3>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm md:text-base">
                          <Award className="w-4 h-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Applications */}
              {project.domains && (
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="bg-card border border-border shadow-xl hover-glow hover-target">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-highlight mb-6 font-caveat">Applications 🌐</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.domains.map((domain, index) => {
                          const Icon = domainIcons[domain as keyof typeof domainIcons];
                          return (
                            <Badge key={index} variant="outline" className="text-xs md:text-sm hover-target">
                              {Icon && <Icon className="w-3 h-3 mr-1" />}
                              {domain}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                {project.demoLink && (
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 hover-target hover-lift" 
                    size="lg"
                    onClick={() => window.open(project.demoLink, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                )}
                {project.githubLink && (
                  <Button 
                    variant="outline" 
                    className="w-full hover-target hover-lift" 
                    size="lg"
                    onClick={() => window.open(project.githubLink, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Slider Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-[110] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-105 duration-200"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Lightbox Content Area */}
            <div className="relative w-full max-w-6xl px-4 flex items-center justify-center flex-grow" onClick={(e) => e.stopPropagation()}>
              {/* Prev Button */}
              {project.images.length > 1 && (
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)}
                  className="absolute left-6 z-[110] p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-105 duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}

              {/* Active Image Container */}
              <div className="relative w-full aspect-[16/9] max-h-[70vh] flex items-center justify-center overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} slide ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Next Button */}
              {project.images.length > 1 && (
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)}
                  className="absolute right-6 z-[110] p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all hover:scale-105 duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              )}
            </div>

            {/* Bottom Panel with Description / Thumbnails */}
            <div className="w-full max-w-3xl pb-8 px-6 text-center z-[110]" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-semibold text-lg mb-2">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Image {currentImageIndex + 1} of {project.images.length}
              </p>

              {/* Mini-thumbnails row */}
              {project.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4 overflow-x-auto py-1">
                  {project.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-10 rounded border overflow-hidden transition-all ${
                        currentImageIndex === index 
                          ? "border-primary ring-2 ring-primary/40 opacity-100 scale-105" 
                          : "border-white/20 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
