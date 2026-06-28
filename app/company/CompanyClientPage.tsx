"use client"
import Link from "next/link"
import Image from "next/image" // Import Image component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Target, Building2 } from "lucide-react"

export function CompanyClientPage() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Electroculture Solutions and Electroculture Foundation
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore Nakul Mahendra Mundhada's entrepreneurial ventures.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="https://electroculture.solutions" target="_blank">
                  <Button>Electroculture Solutions</Button>
                </Link>
                <Link href="https://electroculture.foundation" target="_blank">
                  <Button variant="outline">Electroculture Foundation</Button>
                </Link>
              </div>
            </div>
            <Image
              alt="Nakul Mahendra Mundhada"
              className="relative aspect-[16/9] overflow-hidden rounded-xl object-cover sm:w-[350px] md:w-[550px] lg:order-first"
              height={400}
              src="/images/nakul-profile.png"
              width={800}
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-5xl">Services &amp; Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Electroculture Solutions</CardTitle>
                <CardDescription>Sustainable Agriculture Solutions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4" />
                  Sustainable Farming Practices
                </div>
                <div className="flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Precision Agriculture Technologies
                </div>
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  Consultation and Implementation
                </div>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Electroculture Foundation</CardTitle>
                <CardDescription>Empowering Farmers Through Education</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4" />
                  Educational Programs
                </div>
                <div className="flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Community Outreach
                </div>
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  Research and Development
                </div>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Soil Health Monitoring</CardTitle>
                <CardDescription>Advanced Soil Analysis</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4" />
                  Real-time Data Analysis
                </div>
                <div className="flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Customized Recommendations
                </div>
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  Improved Crop Yields
                </div>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
