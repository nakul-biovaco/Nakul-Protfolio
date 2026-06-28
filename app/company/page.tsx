"use client"
import Link from "next/link"
import Image from "next/image" // Import Image component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Target, Building2 } from "lucide-react"

export default function CompanyPage() {
  return (
    <div className="min-h-screen lg:ml-64">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <Badge
              variant="outline"
              className="mb-3 sm:mb-4 text-highlight border-highlight/30 bg-highlight/10 hover-glow"
            >
              <Building2 className="w-3 h-3 mr-1" />
              My Company
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 sm:mb-6">
              Empowering Agriculture
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Building the future of farming through innovative agri-tech solutions and farmer empowerment programs
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="text-center p-4 rounded-xl bg-card hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">2</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Active Ventures</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">1K+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Farmers Reached</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Products Developed</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-card hover-lift">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">3</div>
              <div className="text-xs sm:text-sm text-muted-foreground">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Ventures */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Ventures</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Two complementary organizations working together to revolutionize agriculture in India
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Electroculture Card */}
            <Card className="hover-lift group border-border bg-card/80 backdrop-blur-sm hover-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {/* Replaced Zap icon with Image */}
                    <Image
                      src="/images/electroculture-logo.png"
                      alt="Electroculture Logo"
                      width={24}
                      height={24}
                      className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
                    />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Startup
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-highlight">Electroculture</CardTitle>
                <CardDescription className="text-sm sm:text-base">Electronics Empowering Agriculture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  An agrotronic startup focused on affordable, field-ready agri-tech tools. We design offline,
                  voice-guided devices that help Indian farmers practice precision farming.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-highlight text-sm sm:text-base">Key Features:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Voice-guided in Hindi
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Works completely offline
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Rugged & portable design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      Affordable pricing models
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="/company/electroculture">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-lift">
                      <Leaf className="mr-2 h-4 w-4" />
                      Explore Electroculture
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Foundation Card */}
            <Card className="hover-lift group border-border bg-card/80 backdrop-blur-sm hover-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    {/* Replaced Users icon with Image */}
                    <Image
                      src="/images/electroculture-foundation-logo.png"
                      alt="Electroculture Foundation Logo"
                      width={24}
                      height={24}
                      className="h-5 w-5 sm:h-6 sm:w-6 text-accent"
                    />
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Foundation
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-highlight">Electroculture Foundation</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Training farmers. Restoring soil. Empowering Bharat.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Ensures that farmers don't just get access to tools — they learn how to use them. We train farmers
                  through demos, camps, and workshops across rural India.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-highlight text-sm sm:text-base">Our Impact:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      Rural field training camps
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      Partnership with FPOs & SHGs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      Regenerative farming promotion
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      Tech-literacy bridge programs
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="/company/foundation">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover-lift">
                      <Target className="mr-2 h-4 w-4" />
                      Explore Foundation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Mission</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            "To bridge the gap between advanced agricultural technology and the farmers who need it most, ensuring that
            innovation reaches every field, every farmer, and every community across India."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Join Our Journey</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
            Be part of the agricultural revolution. Whether you're a farmer, investor, or technology enthusiast, there's
            a place for you in our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
              >
                Partner With Us
              </Button>
            </Link>
            <Link href="/company/foundation">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 hover-glow bg-transparent"
              >
                Support Our Cause
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
