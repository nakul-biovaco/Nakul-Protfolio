"use client"

export function ElectrocultureClientPage() {
  return <div>Client Page</div>
}
"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Mic,
  WifiOff,
  Shield,
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  MapPin,
  Calendar,
  Phone,
} from "lucide-react"
import Image from "next/image" // Ensure Image is imported
import { DemoScheduler } from "@/components/demo-scheduler"

export default function ElectroculturePage() {
  const roadmapItems = [
    {
      title: "Prototype Tested",
      status: "completed",
      progress: 100,
      description: "Successfully tested MittiMitra v1 with 50+ farmers across Maharashtra",
      date: "Q2 2023",
    },
    {
      title: "AI Version in Progress",
      status: "current",
      progress: 75,
      description: "Developing AI-powered soil analysis and crop recommendation system",
      date: "Q4 2024",
    },
    {
      title: "Solar Crop Booster",
      status: "upcoming",
      progress: 0,
      description: "Solar-powered growth enhancement system for small farms",
      date: "Q2 2025",
    },
    {
      title: "Mobile Soil Kits",
      status: "upcoming",
      progress: 0,
      description: "Portable soil testing kits for field agents and extension workers",
      date: "Q3 2025",
    },
    {
      title: "Smart Irrigation",
      status: "upcoming",
      progress: 0,
      description: "IoT-based precision irrigation system with weather integration",
      date: "Q1 2026",
    },
  ]

  const features = [
    {
      icon: Mic,
      title: "Voice-guided in Hindi",
      description: "Easy to use for farmers with any literacy level",
      details: "Supports Hindi, Marathi, and Gujarati with more regional languages coming soon",
    },
    {
      icon: WifiOff,
      title: "Works offline",
      description: "No internet required for core functionality",
      details: "All processing happens locally with optional cloud sync when available",
    },
    {
      icon: Shield,
      title: "Rugged & portable",
      description: "Built to withstand harsh field conditions",
      details: "IP65 rated, dust-proof, water-resistant with 12-hour battery life",
    },
    {
      icon: DollarSign,
      title: "Affordable pricing",
      description: "Buy, rent, or share model options",
      details: "Starting at ₹15,000 or ₹500/month rental with village sharing programs",
    },
  ]

  const teamMembers = [
    {
      name: "Nakul Mundhada",
      role: "Founder & CTO",
      description:
        "Electronics & AI Engineer focused on agri-tech innovation. Leading product development and technical strategy.",
      image: "/images/nakul-profile.png",
      education: "B.Tech Electronics, RCOEM",
      experience: "5+ years in embedded systems and AI",
    },
    {
      name: "Co-Founder",
      role: "CEO & Operations",
      description:
        "Agricultural expert with deep rural market understanding. Managing operations and farmer relations.",
      image: "/images/co-founder-profile.png",
      education: "M.Sc Agriculture",
      experience: "8+ years in rural development",
    },
  ]

  const achievements = [
    { icon: Award, title: "RCOEM TBI Incubated", description: "Selected for prestigious incubation program" },
    { icon: Users, title: "1000+ Farmers Reached", description: "Direct impact across 3 states" },
    { icon: TrendingUp, title: "30% Yield Increase", description: "Average improvement reported by users" },
    { icon: Star, title: "4.8/5 Rating", description: "User satisfaction score from field trials" },
  ]

  const pricingPlans = [
    {
      name: "Individual Purchase",
      price: "₹15,000",
      period: "one-time",
      features: [
        "Complete MittiMitra v1 device",
        "1-year warranty",
        "Free training session",
        "Hindi voice support",
        "Basic soil analysis",
      ],
      popular: false,
    },
    {
      name: "Monthly Rental",
      price: "₹500",
      period: "per month",
      features: [
        "Device rental with maintenance",
        "Technical support",
        "Regular calibration",
        "Usage analytics",
        "Seasonal flexibility",
      ],
      popular: true,
    },
    {
      name: "Village Sharing",
      price: "₹2,000",
      period: "per village/month",
      features: [
        "Shared device for 20-30 farmers",
        "Community training program",
        "Local coordinator support",
        "Group analytics dashboard",
        "Bulk fertilizer discounts",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen lg:ml-64">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge
              variant="outline"
              className="mb-3 sm:mb-4 text-highlight border-highlight/30 bg-highlight/10 hover-glow"
            >
              {/* Replaced Building2 icon with Image */}
              <Image
                src="/images/electroculture-logo.png"
                alt="Electroculture Logo"
                width={16}
                height={16}
                className="mr-1"
              />
              Agri-Tech Startup
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6">
              Electroculture
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-highlight mb-3 sm:mb-4 font-medium">
              Electronics Empowering Agriculture
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Building smart agro-electronic tools for small farmers across India. Making precision farming accessible,
              affordable, and easy to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
              >
                <Leaf className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                See Our Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover-glow bg-transparent"
              >
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join the Mission
              </Button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover-lift hover-glow">
                <CardContent className="pt-6">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{achievement.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">About Electroculture</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              Electroculture is an agrotronic startup focused on affordable, field-ready agri-tech tools. We design
              offline, voice-guided devices that help Indian farmers practice precision farming without needing internet
              or digital literacy.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              Our mission is to make advanced agricultural technology accessible to every farmer, regardless of their
              technical background. We believe that technology should empower farmers, not complicate their lives.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Founded in 2023 and incubated at RCOEM TBI, we're building solutions that bridge the gap between
              cutting-edge agricultural science and practical farming needs in rural India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Product Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Meet MittiMitra</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Our flagship product line designed specifically for Indian farmers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* MittiMitra v1 */}
            <Card className="hover-lift border-border bg-card hover-glow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">Available Now</Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-highlight">MittiMitra v1</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Real-time soil NPK analyzer + powder fertilizer dispenser
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-primary" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Advanced soil analysis device that provides instant NPK readings and dispenses the right amount of
                  fertilizer based on soil conditions. Features voice guidance in Hindi for easy operation.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm sm:text-base">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>Real-time soil analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>Automated fertilizer dispensing</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>Voice guidance in Hindi</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>12-hour battery life</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Learn More</Button>
              </CardContent>
            </Card>

            {/* MittiMitra v2 */}
            <Card className="hover-lift border-border bg-card hover-glow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Coming Q4 2024
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-highlight">MittiMitra v2</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  AI-based fertilizer prediction & diagnosis tool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Zap className="h-12 w-12 text-accent" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Next-generation device powered by AI that predicts optimal fertilizer requirements and diagnoses soil
                  health issues before they become problems. Includes crop yield optimization.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm sm:text-base">Upcoming Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span>AI-powered predictions</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span>Disease diagnosis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span>Crop yield optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
                      <span>Weather integration</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent/10 bg-transparent"
                >
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardContent className="pt-6">
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base text-center">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-center mb-3">
                    {feature.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 text-center">{feature.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Flexible Pricing Options</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Choose the model that works best for your farming needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`hover-lift hover-glow relative ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Individual Purchase"
                      ? "Buy Now"
                      : plan.name === "Monthly Rental"
                        ? "Start Rental"
                        : "Contact Us"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Roadmap</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Building the future of agriculture, one innovation at a time
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {roadmapItems.map((item, index) => (
              <Card
                key={index}
                className={`hover-lift hover-glow ${
                  item.status === "completed"
                    ? "border-primary/30 bg-primary/5"
                    : item.status === "current"
                      ? "border-accent/30 bg-accent/5"
                      : "border-border"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {item.status === "completed" && <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                        {item.status === "current" && <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                        {item.status === "upcoming" && (
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "current"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="self-start sm:self-center"
                          >
                            {item.date}
                          </Badge>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "completed" ? "default" : item.status === "current" ? "secondary" : "outline"
                        }
                      >
                        {item.status === "completed"
                          ? "Completed"
                          : item.status === "current"
                            ? "In Progress"
                            : "Upcoming"}
                      </Badge>
                    </div>
                  </div>
                  {item.status === "current" && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Team</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Backed by RCOEM TBI & grassroots mentors</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2 text-sm sm:text-base">{member.role}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                        {member.description}
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>
                          <strong>Education:</strong> {member.education}
                        </p>
                        <p>
                          <strong>Experience:</strong> {member.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Contact Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Get in Touch</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Ready to transform your farming with MittiMitra?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Sales & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get product information, pricing, and technical support
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <a href="tel:+919876543210" className="text-sm text-primary hover:underline">
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a href="mailto:sales@electroculture.in" className="text-sm text-primary hover:underline">
                          sales@electroculture.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Sat, 9 AM - 6 PM</p>
                      </div>
                    </div>
                  </div>
                  <a href="tel:+919876543210">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Schedule a demo or visit our development center</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">RCOEM TBI, Nagpur, Maharashtra 440013</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Demo Days</p>
                        <p className="text-sm text-muted-foreground">Every Friday, 2 PM - 5 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Booking</p>
                        <p className="text-sm text-muted-foreground">24 hours advance required</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Demo Scheduler Form */}
            <div className="space-y-6">
              <DemoScheduler />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Partner with us in transforming farming
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Join us in making advanced agricultural technology accessible to every farmer in India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover-lift"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent hover-glow"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
