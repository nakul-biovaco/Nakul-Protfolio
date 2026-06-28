"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Sprout,
  BookOpen,
  Award,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Building2,
  HandHeart,
  CheckCircle,
  Star,
  UserPlus,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import { PartnershipForm } from "@/components/partnership-form"
import { VolunteerForm } from "@/components/volunteer-form"

export default function FoundationPage() {
  const impactStats = [
    { icon: Users, title: "5,000+ Farmers", description: "Directly impacted across rural India" },
    { icon: Sprout, title: "15,000 Acres", description: "Land under sustainable farming practices" },
    { icon: BookOpen, title: "200+ Training", description: "Sessions conducted in local languages" },
    { icon: Award, title: "85% Success", description: "Rate in crop yield improvement" },
  ]

  const programs = [
    {
      title: "Sustainable Farming Education",
      description: "Training programs on organic farming, soil health, and sustainable practices",
      impact: "2,500+ farmers trained",
      status: "ongoing",
      image: "/placeholder.svg",
      details: [
        "Organic farming techniques",
        "Soil health management",
        "Water conservation methods",
        "Pest management without chemicals",
      ],
    },
    {
      title: "Technology Access Initiative",
      description: "Providing affordable access to modern farming tools and equipment",
      impact: "1,200+ farmers benefited",
      status: "expanding",
      image: "/placeholder.svg",
      details: [
        "Equipment sharing programs",
        "Technology training workshops",
        "Maintenance and support services",
        "Financing assistance",
      ],
    },
    {
      title: "Market Linkage Program",
      description: "Connecting farmers directly with buyers to ensure fair pricing",
      impact: "800+ farmers connected",
      status: "growing",
      image: "/placeholder.svg",
      details: [
        "Direct buyer connections",
        "Price negotiation support",
        "Quality certification assistance",
        "Transportation coordination",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Ramesh Patil",
      location: "Nashik, Maharashtra",
      quote:
        "The foundation's training helped me increase my crop yield by 40% while reducing chemical usage. My family's income has doubled in just two years.",
      crop: "Organic Vegetables",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Sunita Devi",
      location: "Aurangabad, Maharashtra",
      quote:
        "Through the technology access program, I got access to modern equipment that I couldn't afford. Now I can process my crops better and get higher prices.",
      crop: "Wheat & Pulses",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Kisan Singh",
      location: "Wardha, Maharashtra",
      quote:
        "The market linkage program connected me directly with buyers. No more middlemen taking away my profits. I'm earning 30% more now.",
      crop: "Cotton & Soybean",
      image: "/placeholder-user.jpg",
    },
  ]

  const challenges = [
    {
      challenge: "Limited access to modern farming technology",
      solution: "Equipment sharing and training programs",
      impact: "60% reduction in farming costs",
    },
    {
      challenge: "Lack of market knowledge and fair pricing",
      solution: "Direct market linkage and price transparency",
      impact: "35% increase in farmer income",
    },
    {
      challenge: "Insufficient knowledge of sustainable practices",
      solution: "Comprehensive education and mentorship",
      impact: "50% improvement in soil health",
    },
  ]

  const partnershipTypes = [
    {
      type: "Corporate Partnership",
      description: "Partner with us to create sustainable impact in rural communities",
      benefits: [
        "CSR compliance and reporting",
        "Brand visibility in rural markets",
        "Employee engagement opportunities",
        "Tax benefits under 80G",
      ],
      commitment: "₹5 Lakhs+ annually",
      icon: Building2,
    },
    {
      type: "Individual Sponsorship",
      description: "Sponsor a farmer's journey towards sustainable agriculture",
      benefits: [
        "Direct impact tracking",
        "Regular progress updates",
        "Meet your sponsored farmer",
        "Tax deduction certificates",
      ],
      commitment: "₹25,000+ annually",
      icon: Heart,
    },
    {
      type: "Technical Partnership",
      description: "Share your expertise to help farmers adopt new technologies",
      benefits: [
        "Knowledge sharing platform",
        "Field implementation support",
        "Research collaboration",
        "Innovation showcase",
      ],
      commitment: "Time & expertise",
      icon: Briefcase,
    },
  ]

  const volunteerOpportunities = [
    {
      role: "Field Coordinator",
      description: "Work directly with farmers to implement programs",
      requirements: ["Agricultural background preferred", "Local language skills", "2+ years experience"],
      commitment: "Full-time",
      location: "Rural Maharashtra",
    },
    {
      role: "Training Facilitator",
      description: "Conduct workshops and training sessions for farmers",
      requirements: ["Teaching/training experience", "Subject matter expertise", "Communication skills"],
      commitment: "Part-time/Project-based",
      location: "Multiple locations",
    },
    {
      role: "Technology Mentor",
      description: "Help farmers adopt and use modern farming technologies",
      requirements: ["Technical background", "Patience and empathy", "Problem-solving skills"],
      commitment: "Flexible",
      location: "Remote + Field visits",
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
              <Image
                src="/images/electroculture-foundation-logo.png"
                alt="Electroculture Foundation Logo"
                width={16}
                height={16}
                className="mr-1"
              />
              Non-Profit Foundation
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6">
              Electroculture Foundation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-highlight mb-3 sm:mb-4 font-medium">
              Empowering Farmers, Transforming Lives
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              A non-profit organization dedicated to empowering small farmers through education, technology access, and
              sustainable farming practices across rural India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
              >
                <Image
                  src="/images/electroculture-foundation-logo.png"
                  alt="Electroculture Foundation Logo"
                  width={20}
                  height={20}
                  className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                />
                Support Our Mission
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover-glow bg-transparent"
              >
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Become a Volunteer
              </Button>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center hover-lift hover-glow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{stat.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">About Our Foundation</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              The Electroculture Foundation was established with a vision to bridge the gap between traditional farming
              practices and modern agricultural technology. We believe that every farmer, regardless of their economic
              background, deserves access to the tools and knowledge needed for sustainable farming.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              Our foundation works directly with farming communities across Maharashtra and neighboring states,
              providing education, resources, and ongoing support to help farmers transition to more sustainable and
              profitable farming methods.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Through partnerships with local organizations, government agencies, and corporate sponsors, we've been
              able to create lasting impact in rural communities while preserving traditional agricultural wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Programs</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Comprehensive initiatives designed to support farmers at every stage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={program.status === "ongoing" ? "default" : "secondary"}
                      className={
                        program.status === "ongoing"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent/10 text-accent border-accent/20"
                      }
                    >
                      {program.status === "ongoing"
                        ? "Ongoing"
                        : program.status === "expanding"
                          ? "Expanding"
                          : "Growing"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{program.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="text-sm font-medium text-primary">Impact: {program.impact}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Components:</h4>
                    <ul className="space-y-1">
                      {program.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Challenges We Address</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Identifying problems and implementing sustainable solutions
            </p>
          </div>

          <div className="space-y-6">
            {challenges.map((item, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-red-600 mb-2 text-sm sm:text-base">Challenge</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-600 mb-2 text-sm sm:text-base">Our Solution</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.solution}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2 text-sm sm:text-base">Impact</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Farmer Stories</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Real stories from farmers whose lives have been transformed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {testimonial.crop}
                      </Badge>
                    </div>
                  </div>
                  <blockquote className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How You Can Help</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Join us in empowering farmers across India</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {partnershipTypes.map((partnership, index) => (
              <Card key={index} className="hover-lift hover-glow relative">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <partnership.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{partnership.type}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{partnership.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-center">
                      <strong>Commitment:</strong> {partnership.commitment}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefits:</h4>
                    <ul className="space-y-1">
                      {partnership.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partnership Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Partner with us to create sustainable impact in rural communities. Fill out the form to start the
                conversation.
              </p>
              <PartnershipForm />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Volunteer With Us</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Join our team of dedicated volunteers working directly with farmers to create positive change.
              </p>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Volunteer Opportunities</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Make a direct impact by volunteering your time and skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">{opportunity.role}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Requirements:</h4>
                    <ul className="space-y-1">
                      {opportunity.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="font-medium">Commitment:</p>
                      <p className="text-muted-foreground">{opportunity.commitment}</p>
                    </div>
                    <div>
                      <p className="font-medium">Location:</p>
                      <p className="text-muted-foreground">{opportunity.location}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Get in Touch</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Ready to make a difference in farmers' lives?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Foundation Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Contact us for partnerships, donations, or volunteer opportunities
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href="tel:+919876543211" className="text-sm text-primary hover:underline">
                        +91 98765 43211
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a href="mailto:foundation@electroculture.org" className="text-sm text-primary hover:underline">
                        foundation@electroculture.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        Electroculture Foundation
                        <br />
                        RCOEM Campus, Nagpur
                        <br />
                        Maharashtra 440013
                      </p>
                    </div>
                  </div>
                </div>
                <a href="tel:+919876543211">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Foundation
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Visit Our Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Visit our field programs and see the impact firsthand</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Field Visits</p>
                      <p className="text-sm text-muted-foreground">Every Saturday, 10 AM - 4 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Locations</p>
                      <p className="text-sm text-muted-foreground">Various villages in Maharashtra</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Group Size</p>
                      <p className="text-sm text-muted-foreground">Maximum 15 people per visit</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Join us in empowering farmers across India
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Every contribution, big or small, makes a difference in a farmer's life. Be part of the change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover-lift"
            >
              <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Donate Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent hover-glow"
            >
              <HandHeart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Become a Partner
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
