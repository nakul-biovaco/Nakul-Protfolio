import { supabase } from "./supabase"

// API Types
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  detailedDescription: string
  techStack: string[]
  category: string
  status: string
  duration: string
  team: string
  highlights: string[]
  challenges: string[]
  outcomes: string[]
  images: string[]
  demoLink?: string
  githubLink?: string
  featured: boolean
}

export interface Internship {
  id: string
  company: string
  role: string
  duration: string
  location: string
  type: string
  status: string
  description: string
  detailedDescription: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
  skills_gained: string[]
  projects_worked_on: Array<{
    name: string
    description: string
    role: string
  }>
  mentor: string
  certificate: boolean
  certificateUrl?: string
  certificateTitle?: string
  certificateIssuer?: string
  certificateDate?: string
  recommendation_letter?: boolean
  company_website?: string
  linkedin_post?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  duration: string
  status: string
  gpa?: string
  percentage?: string
  description: string
  coursework: string[]
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  level: number
  experience: string
  category: string
}

export interface ContactMessage {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description?: string
  skills: string[]
  certificateType?: string
  imageUrl?: string
  badgeUrl?: string
  verificationUrl?: string
  internshipId?: string
}

export interface Media {
  id: string
  title: string
  description: string
  type: "image" | "video"
  url: string
  thumbnailUrl?: string
  createdAt: string
  likesCount: number
  commentsCount: number
  comments?: MediaComment[]
}

export interface MediaComment {
  id: string
  mediaId: string
  userName: string
  commentText: string
  createdAt: string
}

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  liveVisitors: number
}

// Mock data that works immediately
const mockProjects: Project[] = [
  {
    id: "smart-agc-system",
    title: "Smart Adaptive AGC System",
    description: "Developed a Smart Adaptive AGC system optimized for low-power, noise-sensitive analog sensing applications.",
    longDescription: "AGC system with focus on biomedical signals like ECG, maintaining signal amplitude stability under fluctuating conditions.",
    detailedDescription: `This project involved the development of a sophisticated Automatic Gain Control system specifically designed for biomedical signal acquisition. The system dynamically adjusts gain to maintain optimal signal levels for processing, crucial for applications like ECG monitoring where signal quality is paramount.

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
• 40dB dynamic range with 0.5dB resolution`,
    techStack: ["LM358 Op-Amp", "MCP41010", "Arduino Uno", "SPI", "Proteus", "PID Control", "ECG Processing"],
    category: "Biomedical Signal Processing",
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
    images: ["/AGC.jpg"],
    githubLink: "https://github.com/nakul/smart-agc-system",
    featured: true,
  },
  {
    id: "hyper-fusion-adder",
    title: "Hyper-Fusion Parallel Carry Adder (HF-PCA)",
    description: "64-bit hybrid adder combining CLA, CSA, and CkSA architectures for high-speed arithmetic.",
    longDescription: "Optimized 64-bit adder fusing Carry Lookahead, Carry Select, and Carry Skip techniques.",
    detailedDescription: `This project developed a novel 64-bit adder architecture that combines the best features of three established adder types to achieve superior performance in VLSI implementations.

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
• DSP processor cores`,
    techStack: ["Verilog", "Vivado", "ModelSim", "VLSI", "RTL Design", "Timing Analysis"],
    category: "Digital Electronics",
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
    images: ["/HPCA.png"],
    githubLink: "https://github.com/nakul/hyper-fusion-adder",
    featured: true,
  },
  {
    id: "human-electric-sensor",
    title: "Cascaded Three-Transistor Human Electric Field Sensor",
    description: "Sensitive detector for human electric fields using transistor amplification chain.",
    longDescription: "Three-stage NPN amplifier for detecting weak bio-electric fields from human body.",
    detailedDescription: `This analog design project created a sensitive detector for the weak electric fields naturally emitted by the human body, enabling touchless interaction.

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
• Array configuration for directionality`,
    techStack: ["BJT Circuits", "Analog Design", "SPICE", "Bio-Sensors", "PCB Design"],
    category: "Analog Electronics",
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
    images: ["/T.png"],
    githubLink: "https://github.com/nakul/human-electric-sensor",
    featured: false,
  },
  {
    id: "speculative-adder",
    title: "High-Speed 16-Bit Speculative Adder in Verilog",
    description: "16-bit adder using speculative carry prediction for faster computation.",
    longDescription: "Verilog implementation of speculative carry logic for arithmetic acceleration.",
    detailedDescription: `This digital design project explored speculative execution techniques applied to adder design, predicting carry bits to reduce critical path delay.

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
• FPGA accelerators`,
    techStack: ["Verilog", "SystemVerilog", "DC Synthesis", "Formal Verification", "ASIC Design"],
    category: "Digital Design",
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
    images: ["/ADDER.png"],
    githubLink: "https://github.com/nakul/speculative-adder",
    featured: false,
  },
  {
    id: "morse-converter",
    title: "Morse Code Converter Using C",
    description: "Bidirectional text-to-Morse converter with learning features.",
    longDescription: "C program for encoding/decoding Morse code with educational features.",
    detailedDescription: `This embedded software project created a comprehensive Morse code translation system with both encoding and decoding capabilities.

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
• Mobile app companion`,
    techStack: ["Embedded C", "AVR GCC", "PWM", "UART", "State Machines"],
    category: "Embedded Programming",
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
    images: ["/MORSE.png"],
    githubLink: "https://github.com/nakul/morse-converter",
    featured: false,
  },
  {
    id: "rtl-circuit-design",
    title: "RTL Circuit Design for Boolean Expression Realization",
    description: "Transistor-level implementation of Boolean logic gates.",
    longDescription: "Physical realization of logic functions using resistor-transistor logic.",
    detailedDescription: `This hands-on electronics project involved the physical implementation of digital logic gates at the transistor level, providing deep understanding of fundamental digital circuits.

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
• Rise/fall time: 20ns`,
    techStack: ["Breadboarding", "Transistor Logic", "Boolean Algebra", "PCB Design", "SPICE"],
    category: "RTL Design",
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
    images: ["/RTL.png"],
    githubLink: "https://github.com/nakul/rtl-circuit-design",
    featured: false,
  }
]

const mockInternships: Internship[] = [
  {
    id: "google",
    company: "Google",
    role: "Embedded Software Developer Intern",
    duration: "June 2024 - Present",
    location: "Bangalore, India (Hybrid)",
    type: "Full-time",
    status: "Ongoing",
    description:
      "Developing embedded software solutions for Google's hardware products, focusing on low-level system programming and hardware-software integration.",
    detailedDescription: `As an Embedded Software Developer Intern at Google, I'm working on cutting-edge hardware products that power millions of devices worldwide. This internship provides deep exposure to embedded systems development at scale, with a focus on performance optimization and hardware-software co-design.

My role involves developing and optimizing firmware for Google's proprietary hardware platforms. I work closely with hardware engineers to bring up new boards, implement device drivers, and ensure seamless integration between silicon and software layers.

Key aspects of my work include:
- Developing production-grade embedded software in C/C++
- Optimizing system performance and power efficiency
- Debugging complex hardware-software interaction issues
- Implementing robust communication protocols
- Writing comprehensive unit tests and documentation

The internship has significantly enhanced my understanding of real-world embedded systems challenges and best practices in a large-scale production environment.`,
    responsibilities: [
      "Design and implement firmware for ARM-based embedded systems",
      "Develop and optimize device drivers for peripherals",
      "Debug hardware-software interface issues using JTAG and logic analyzers",
      "Implement power management features to optimize battery life",
      "Write unit tests and integration tests for embedded code",
      "Participate in code reviews and design discussions",
      "Collaborate with hardware team on board bring-up",
      "Document software architecture and APIs",
    ],
    technologies: [
      "C/C++",
      "ARM Cortex",
      "Embedded Linux",
      "RTOS",
      "Protocol Buffers",
      "Git",
      "Python",
      "JTAG",
      "SPI/I2C/UART",
      "Device Trees",
    ],
    achievements: [
      "Reduced system boot time by 25% through firmware optimization",
      "Implemented power-saving feature saving 15% battery life",
      "Resolved critical timing issue in device communication",
      "Received recognition for quickly adapting to complex codebase",
      "Contributed to driver development for new hardware component",
    ],
    skills_gained: [
      "Embedded Systems Programming",
      "Low-level Debugging",
      "Hardware-Software Co-design",
      "Real-time Operating Systems",
      "Power Optimization",
      "Collaborative Development",
      "Production-grade Coding Practices",
      "Hardware Validation",
    ],
    projects_worked_on: [
      {
        name: "Bootloader Optimization",
        description: "Improved boot sequence and reduced boot time",
        role: "Firmware Developer",
      },
      {
        name: "Power Management Module",
        description: "Developed power-saving features for embedded system",
        role: "Software Developer",
      },
      {
        name: "Device Driver Development",
        description: "Created drivers for new hardware peripherals",
        role: "Embedded Software Engineer",
      },
    ],
    mentor: "Senior Embedded Engineer - Google Hardware Team",
    certificate: false,
    company_website: "https://about.google",
    linkedin_post: "https://linkedin.com/posts/google-internship",
  },
  {
    id: "maven-silicon",
    company: "Maven Silicon",
    role: "Embedded Systems Design Intern",
    duration: "January 2024 - May 2024",
    location: "Bangalore, India",
    type: "Full-time",
    status: "Completed",
    description:
      "Designed and implemented embedded systems solutions for IoT applications, working on both hardware and software components.",
    detailedDescription: `During my internship at Maven Silicon, I gained hands-on experience with the complete embedded systems development lifecycle - from concept to deployment. This intensive program focused on practical applications of embedded systems in IoT solutions.

I worked on multiple projects involving microcontroller programming, PCB design, and sensor integration. The internship provided valuable exposure to both the hardware and software aspects of embedded systems development.

Key learning experiences included:
- Developing firmware for ARM Cortex-M microcontrollers
- Designing and testing custom PCBs for embedded applications
- Implementing wireless communication protocols
- Optimizing system performance and power consumption
- Conducting hardware testing and validation

The internship culminated in a capstone project where I led a team to develop a complete IoT solution from scratch, integrating sensors, wireless communication, and cloud connectivity.`,
    responsibilities: [
      "Developed firmware for STM32 microcontrollers",
      "Designed PCB layouts for embedded systems using KiCad",
      "Implemented communication protocols (I2C, SPI, UART)",
      "Created device drivers for custom hardware",
      "Optimized system performance and power consumption",
      "Conducted hardware testing and validation",
      "Documented design specifications and test procedures",
      "Mentored junior interns on embedded systems concepts",
    ],
    technologies: [
      "STM32",
      "FreeRTOS",
      "KiCad",
      "C",
      "Embedded C++",
      "I2C/SPI/UART",
      "ESP32",
      "LoRa",
      "Sensors",
      "PCB Design",
    ],
    achievements: [
      "Designed power-efficient IoT node with 30% lower consumption",
      "Reduced BOM cost by 20% through component optimization",
      "Successfully led team of 3 interns on prototype project",
      "Received 'Innovation Award' for custom sensor interface",
      "Developed reusable driver library adopted by team",
      "Achieved 99.9% communication reliability in field tests",
    ],
    skills_gained: [
      "Embedded Hardware Design",
      "PCB Development",
      "RTOS Implementation",
      "Sensor Integration",
      "Low-power Design",
      "Project Leadership",
      "Hardware Debugging",
      "System Integration",
    ],
    projects_worked_on: [
      {
        name: "Smart Agriculture Node",
        description: "IoT device for soil monitoring and irrigation control",
        role: "Lead Developer",
      },
      {
        name: "Wireless Sensor Network",
        description: "Mesh network of environmental sensors using LoRa",
        role: "System Architect",
      },
      {
        name: "Power Management Board",
        description: "Custom PCB for low-power IoT applications",
        role: "Hardware Designer",
      },
    ],
    mentor: "Dr. Sanjay Patel - Head of Embedded Systems",
    certificate: true,
    certificateTitle: "Embedded Systems Design Internship",
    certificateIssuer: "Maven Silicon",
    certificateDate: "2024-05-15",
    recommendation_letter: true,
    company_website: "https://maven-silicon.com",
    linkedin_post: "https://linkedin.com/posts/maven-silicon-internship",
  },
]

const mockEducation: Education[] = [
  {
    id: "btech-ece",
    degree: "Bachelor of Technology - Electronics and Communication Engineering",
    institution: "Ramdeobaba College of Engineering and Management (RCOEM)",
    location: "Nagpur, Maharashtra, India",
    duration: "2021 - 2025 (Expected)",
    status: "Current",
    gpa: "8.5/10",
    description:
      "Specializing in embedded systems, digital signal processing, and communication systems. Active participant in technical clubs and project development.",
    coursework: [
      "Digital Signal Processing",
      "Embedded Systems Design",
      "Communication Systems",
      "VLSI Design",
      "Microprocessors & Microcontrollers",
      "Control Systems",
      "Analog and Digital Electronics",
      "Signal Processing",
      "Computer Networks",
      "Database Management Systems",
    ],
    achievements: [
      "Dean's List for Academic Excellence (2022-2023)",
      "Best Project Award - Smart Agriculture System",
      "Active member of Electronics Club",
      "Participated in National Level Technical Competitions",
      "Published research paper on IoT in Agriculture",
      "Led team in Inter-college Hackathon",
    ],
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC) - Science",
    institution: "Somalwar High School and Junior College",
    location: "Nagpur, Maharashtra, India",
    duration: "2019 - 2021",
    status: "Completed",
    percentage: "92.5%",
    description:
      "Completed higher secondary education with focus on Physics, Chemistry, Mathematics, and Computer Science.",
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English", "Environmental Science"],
    achievements: [
      "Secured 92.5% in HSC Board Examinations",
      "District rank holder in Mathematics",
      "Participated in State Level Science Exhibition",
      "Member of School Science Club",
      "Winner of Inter-school Programming Competition",
    ],
  },
]

const mockSkills: Skill[] = [
  // Programming Languages
  { id: "cpp", name: "C/C++", level: 90, experience: "3+ years", category: "Programming Languages" },
  { id: "python", name: "Python", level: 85, experience: "2+ years", category: "Programming Languages" },
  { id: "javascript", name: "JavaScript", level: 80, experience: "2+ years", category: "Programming Languages" },
  { id: "typescript", name: "TypeScript", level: 75, experience: "1+ years", category: "Programming Languages" },
  { id: "java", name: "Java", level: 70, experience: "1+ years", category: "Programming Languages" },

  // Web Development
  { id: "react", name: "React", level: 85, experience: "2+ years", category: "Web Development" },
  { id: "nextjs", name: "Next.js", level: 80, experience: "1+ years", category: "Web Development" },
  { id: "nodejs", name: "Node.js", level: 75, experience: "1+ years", category: "Web Development" },
  { id: "html", name: "HTML/CSS", level: 90, experience: "3+ years", category: "Web Development" },
  { id: "tailwind", name: "Tailwind CSS", level: 85, experience: "1+ years", category: "Web Development" },

  // Embedded Systems
  { id: "arduino", name: "Arduino", level: 90, experience: "3+ years", category: "Embedded Systems" },
  { id: "esp32", name: "ESP32", level: 85, experience: "2+ years", category: "Embedded Systems" },
  { id: "iot", name: "IoT", level: 80, experience: "2+ years", category: "Embedded Systems" },
  { id: "sensors", name: "Sensors & Actuators", level: 85, experience: "2+ years", category: "Embedded Systems" },

  // AI/ML
  { id: "tensorflow", name: "TensorFlow", level: 75, experience: "1+ years", category: "AI/ML" },
  { id: "opencv", name: "OpenCV", level: 70, experience: "1+ years", category: "AI/ML" },
  { id: "ml", name: "Machine Learning", level: 75, experience: "1+ years", category: "AI/ML" },

  // Databases & Cloud
  { id: "mongodb", name: "MongoDB", level: 38, experience: "1+ year", category: "Databases & Cloud" },
  { id: "mysql", name: "MySQL", level: 35, experience: "1+ year", category: "Databases & Cloud" },
  { id: "firebase", name: "Firebase", level: 40, experience: "1+ year", category: "Databases & Cloud" },
  { id: "aws-iot", name: "AWS IoT", level: 33, experience: "6 months", category: "Databases & Cloud" },
  { id: "gcp", name: "Google Cloud", level: 30, experience: "6 months", category: "Databases & Cloud" },
  { id: "docker", name: "Docker", level: 33, experience: "6 months", category: "Databases & Cloud" },

  // Tools & Others
  { id: "git", name: "Git", level: 85, experience: "2+ years", category: "Tools" },
  { id: "figma", name: "Figma", level: 70, experience: "1+ years", category: "Tools" },
]

const mockCertificates: Certificate[] = [
  {
    id: "cert-tech-innovation",
    title: "Outstanding Intern Certificate",
    issuer: "Tech Innovation Labs",
    issueDate: "2023-08-15",
    description:
      "Awarded for exceptional performance during the Embedded Systems Internship program, demonstrating outstanding technical skills and innovative problem-solving abilities.",
    skills: ["Embedded Systems", "IoT", "Arduino", "Project Management", "Team Leadership"],
    certificateType: "Internship",
    credentialId: "TIL-2023-OUT-001",
    verificationUrl: "https://verify.techinnovationlabs.com/cert/TIL-2023-OUT-001",
    internshipId: "tech-innovation-labs",
  },
  {
    id: "cert-agritech",
    title: "Software Development Internship Certificate",
    issuer: "AgriTech Solutions",
    issueDate: "2023-02-28",
    description:
      "Successfully completed the Software Development Internship program with focus on full-stack web development and agricultural technology solutions.",
    skills: ["Full-Stack Development", "React", "Node.js", "Database Design", "API Development"],
    certificateType: "Internship",
    credentialId: "ATS-2023-SDE-002",
    verificationUrl: "https://verify.agritechsolutions.com/cert/ATS-2023-SDE-002",
    internshipId: "agritech-solutions",
  },
  {
    id: "cert-aws-cloud",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2023-05-20",
    expiryDate: "2026-05-20",
    description:
      "Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.",
    skills: ["Cloud Computing", "AWS Services", "Cloud Security", "Cloud Architecture"],
    certificateType: "Professional",
    credentialId: "AWS-CCP-2023-05-001",
    verificationUrl: "https://aws.amazon.com/verification/cert/AWS-CCP-2023-05-001",
  },
  {
    id: "cert-python",
    title: "Python for Data Science",
    issuer: "Coursera - University of Michigan",
    issueDate: "2023-01-15",
    description:
      "Comprehensive course covering Python programming fundamentals, data analysis with pandas, and data visualization.",
    skills: ["Python", "Data Analysis", "Pandas", "Data Visualization", "NumPy"],
    certificateType: "Course",
    credentialId: "COURSERA-PY-DS-2023-001",
    verificationUrl: "https://coursera.org/verify/COURSERA-PY-DS-2023-001",
  },
]

const mockMedia: Media[] = []

// Projects API
export const projectsAPI = {
  getAll: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformProject)
    } catch (error) {
      console.log("Using mock projects data:", error)
      return mockProjects
    }
  },

  getById: async (id: string): Promise<Project> => {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

      if (error) throw error
      return transformProject(data)
    } catch (error) {
      console.log("Using mock project data:", error)
      return mockProjects.find((p) => p.id === id) || mockProjects[0]
    }
  },

  getFeatured: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformProject)
    } catch (error) {
      console.log("Using mock featured projects data:", error)
      return mockProjects.filter((p) => p.featured)
    }
  },
}

// Internships API
export const internshipsAPI = {
  getAll: async (): Promise<Internship[]> => {
    try {
      const { data, error } = await supabase
        .from("internships")
        .select(`
          *,
          projects_worked_on (
            name,
            description,
            role
          )
        `)
        .order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformInternship)
    } catch (error) {
      console.log("Using mock internships data:", error)
      return mockInternships
    }
  },

  getById: async (id: string): Promise<Internship> => {
    try {
      const { data, error } = await supabase
        .from("internships")
        .select(`
          *,
          projects_worked_on (
            name,
            description,
            role
          )
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      return transformInternship(data)
    } catch (error) {
      console.log("Using mock internship data:", error)
      return mockInternships.find((i) => i.id === id) || mockInternships[0]
    }
  },
}

// Education API
export const educationAPI = {
  getAll: async (): Promise<Education[]> => {
    try {
      const { data, error } = await supabase.from("education").select("*").order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformEducation)
    } catch (error) {
      console.log("Using mock education data:", error)
      return mockEducation
    }
  },
}

// Skills API
export const skillsAPI = {
  getAll: async (): Promise<Skill[]> => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformSkill)
    } catch (error) {
      console.log("Using mock skills data:", error)
      return mockSkills
    }
  },

  getByCategory: async (category: string): Promise<Skill[]> => {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("category", category)
        .order("order_index", { ascending: true })

      if (error) throw error
      return data.map(transformSkill)
    } catch (error) {
      console.log("Using mock skills by category data:", error)
      return mockSkills.filter((s) => s.category === category)
    }
  },
}

// Contact API - This will work with Supabase
export const contactAPI = {
  sendMessage: async (message: ContactMessage): Promise<{ success: boolean; message: string }> => {
    try {
      const { error } = await supabase.from("contact_messages").insert({
        first_name: message.firstName,
        last_name: message.lastName,
        email: message.email,
        subject: message.subject,
        message: message.message,
        status: "unread",
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Supabase contact error:", error)
        throw error
      }

      return {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      }
    } catch (error) {
      console.error("Contact API error:", error)
      throw new Error("Failed to send message. Please try again.")
    }
  },
}

// Certificates API
export const certificatesAPI = {
  getAll: async (): Promise<Certificate[]> => {
    try {
      const { data, error } = await supabase.from("certificates").select("*").order("issue_date", { ascending: false })

      if (error) throw error
      return data.map(transformCertificate)
    } catch (error) {
      console.log("Using mock certificates data:", error)
      return mockCertificates
    }
  },

  getByInternshipId: async (internshipId: string): Promise<Certificate[]> => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("internship_id", internshipId)
        .order("issue_date", { ascending: false })

      if (error) throw error
      return data.map(transformCertificate)
    } catch (error) {
      console.log("Using mock certificates by internship data:", error)
      return mockCertificates.filter((c) => c.internshipId === internshipId)
    }
  },
}

// Media API
export const mediaAPI = {
  getAll: async (): Promise<Media[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockMedia
  },

  getById: async (id: string): Promise<Media | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockMedia.find((media) => media.id === id) || null
  },

  likeMedia: async (mediaId: string, ipAddress: string): Promise<{ success: boolean; newLikesCount: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const media = mockMedia.find((m) => m.id === mediaId)
    if (media) {
      // In a real app, you'd check if the IP has already liked this media
      // For now, we'll just increment/decrement based on localStorage state
      const likedMedia = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("likedMedia") || "{}") : {}
      const isCurrentlyLiked = likedMedia[mediaId]

      if (isCurrentlyLiked) {
        media.likesCount = Math.max(0, media.likesCount - 1)
      } else {
        media.likesCount += 1
      }

      return { success: true, newLikesCount: media.likesCount }
    }

    return { success: false, newLikesCount: 0 }
  },

  addComment: async (
    mediaId: string,
    userName: string,
    commentText: string,
  ): Promise<{ success: boolean; newComment: MediaComment | null }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const media = mockMedia.find((m) => m.id === mediaId)
    if (media) {
      const newComment: MediaComment = {
        id: `c${Date.now()}`,
        mediaId,
        userName,
        commentText,
        createdAt: new Date().toISOString(),
      }

      if (!media.comments) media.comments = []
      media.comments.push(newComment)
      media.commentsCount += 1

      return { success: true, newComment }
    }

    return { success: false, newComment: null }
  },
}

// Analytics API
export const analyticsAPI = {
  trackPageView: async (page: string): Promise<void> => {
    try {
      await supabase.from("visitor_analytics").insert({
        event_type: "page_view",
        page,
        event_name: "page_view",
        event_data: { page },
        user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
        session_id: typeof window !== "undefined" ? sessionStorage.getItem("session_id") || "anonymous" : "anonymous",
        created_at: new Date().toISOString(),
      })
    } catch (error) {
      console.log("Analytics tracking failed:", error)
    }
  },

  trackEvent: async (event: string, data?: any): Promise<void> => {
    try {
      await supabase.from("visitor_analytics").insert({
        event_type: "custom_event",
        event_name: event,
        event_data: data || {},
        user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
        session_id: typeof window !== "undefined" ? sessionStorage.getItem("session_id") || "anonymous" : "anonymous",
        created_at: new Date().toISOString(),
      })
    } catch (error) {
      console.log("Analytics event tracking failed:", error)
    }
  },

  getVisitorStats: async (): Promise<VisitorStats> => {
    try {
      const response = await fetch("/api/analytics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Ensure fresh data
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch visitor stats")
      }

      const data: VisitorStats = await response.json()
      return data
    } catch (error) {
      console.error("Error in getVisitorStats:", error)
      // Fallback to mock data or default values in case of API failure
      return { totalVisitors: 0, uniqueVisitors: 0, liveVisitors: 0 }
    }
  },
}

// Transform functions
function transformProject(data: any): Project {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    longDescription: data.long_description || data.description,
    detailedDescription: data.detailed_description || data.description,
    techStack: data.tech_stack || [],
    category: data.category || "Other",
    status: data.status,
    duration: data.duration || "Unknown",
    team: data.team || "Solo",
    highlights: data.highlights || [],
    challenges: data.challenges || [],
    outcomes: data.outcomes || [],
    images: data.images || ["/placeholder.svg?height=400&width=600"],
    demoLink: data.demo_link,
    githubLink: data.github_link,
    featured: data.featured,
  }
}

function transformInternship(data: any): Internship {
  return {
    id: data.id,
    company: data.company,
    role: data.role,
    duration: data.duration || "Unknown",
    location: data.location || "Remote",
    type: data.type,
    status: data.status,
    description: data.description || "",
    detailedDescription: data.detailed_description || data.description || "",
    responsibilities: data.responsibilities || [],
    technologies: data.technologies || [],
    achievements: data.achievements || [],
    skills_gained: data.skills_gained || [],
    projects_worked_on: data.projects_worked_on || [],
    mentor: data.mentor || "Not specified",
    certificate: data.certificate,
    certificateUrl: data.certificate_url,
    certificateTitle: data.certificate_title,
    certificateIssuer: data.certificate_issuer,
    certificateDate: data.certificate_date,
    recommendation_letter: data.recommendation_letter,
    company_website: data.company_website,
    linkedin_post: data.linkedin_post,
  }
}

function transformEducation(data: any): Education {
  return {
    id: data.id,
    degree: data.degree,
    institution: data.institution,
    location: data.location || "Unknown",
    duration: data.duration || "Unknown",
    status: data.status,
    gpa: data.gpa,
    percentage: data.percentage,
    description: data.description || "",
    coursework: data.coursework || [],
    achievements: data.achievements || [],
  }
}

function transformSkill(data: any): Skill {
  return {
    id: data.id,
    name: data.name,
    level: data.level,
    experience: data.experience || "Unknown",
    category: data.category || "Other",
  }
}

function transformCertificate(data: any): Certificate {
  return {
    id: data.id,
    title: data.title,
    issuer: data.issuer,
    issueDate: data.issue_date,
    expiryDate: data.expiry_date,
    credentialId: data.credential_id,
    credentialUrl: data.credential_url,
    description: data.description,
    skills: data.skills || [],
    certificateType: data.certificate_type,
    imageUrl: data.image_url,
    badgeUrl: data.badge_url,
    verificationUrl: data.verification_url,
    internshipId: data.internship_id,
  }
}
