import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Calendar,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Contact - Nakul Mahendra Mundhada",
  description:
    "Get in touch with Nakul Mahendra Mundhada for collaborations, tech consulting, or inquiries about software development, AI, and enterprise solutions.",
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call for immediate assistance",
      value: "+91 81778 06422 / 92265 95332",
      href: "tel:+918177806422",
      available: "Mon-Fri, 9 AM - 6 PM IST",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send detailed inquiries",
      value: "nakulmundhada23@gmail.com",
      href: "mailto:nakulmundhada23@gmail.com",
      available: "Response within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick messages and updates",
      value: "+91 92265 95332",
      href: "https://wa.me/919226595332",
      available: "Available 24/7",
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a consultation call",
      value: "30-min slots available",
      href: "#",
      available: "Weekdays preferred",
    },
  ]

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/nakul-mundhada",
      description: "Professional network and updates",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/nakul-mundhada",
      description: "Code repositories and projects",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/nakul_mundhada",
      description: "Thoughts and industry insights",
    },
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  return (
    <div className="min-h-screen lg:ml-64">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 text-highlight border-highlight/30 bg-highlight/10 hover-glow">
            <Image src="/images/nakul-logo-new.png" alt="Nakul Logo" width={16} height={16} className="mr-1" />
            Let's Connect
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-highlight mb-4 font-medium">
            Ready to build the next generation of scalable technology?
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for an enterprise tech partnership, need a consultant for your AI/SaaS startup, or just want to discuss software innovation, I'd love to connect with you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How to Reach Me</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Choose the method that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover-lift hover-glow text-center">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription className="text-sm">{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium text-sm">{method.value}</p>
                  <p className="text-xs text-muted-foreground">{method.available}</p>
                  <a href={method.href}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Contact
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="hover-glow">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Office Hours */}
              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">All times are in Indian Standard Time (IST)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">Primary Office</p>
                    <p className="text-sm text-muted-foreground">
                      RCOEM Campus
                      <br />
                      Nagpur, Maharashtra
                      <br />
                      India 440013
                    </p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">Available for meetings by appointment</p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle>Connect on Social</CardTitle>
                  <CardDescription>Follow my work and stay updated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <social.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.description}</p>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Quick answers to common inquiries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I typically respond to emails within 24 hours during business days. For urgent matters, please call or
                  use WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="text-lg">Collaboration Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I'm always open to discussing partnerships in enterprise SaaS, AI-driven solutions, and next-generation software development.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="text-lg">Speaking Engagements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Available for speaking at conferences, conducting technical workshops, and sharing insights on entrepreneurship, ERP architecture, and embedded systems.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="text-lg">Consultation Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Offering strategic technical consultation for scaling SaaS platforms, managing enterprise databases, and building robust IT infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start a Conversation?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Whether it's a quick technical question or a detailed discussion about your next big enterprise software project, I'm here to help you scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:nakulmundhada23@gmail.com">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover-lift"
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Send Email
              </Button>
            </a>
            <a href="tel:+918177806422">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent hover-glow"
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
