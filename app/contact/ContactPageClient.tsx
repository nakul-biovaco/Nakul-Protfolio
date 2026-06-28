"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { PartnershipForm } from "@/components/partnership-form"
import { VolunteerForm } from "@/components/volunteer-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ContactPageClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Or a loading spinner
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12 md:py-24 lg:py-32 max-w-6xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-highlight" variants={itemVariants}>
        Get in Touch
      </motion.h1>

      <motion.div className="grid lg:grid-cols-2 gap-12" variants={containerVariants}>
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-highlight">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>nakulmundhada23@gmail.com / ceo@biovaco.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+91 81778 06422 / 92265 95332</span>
                </div>
                {/* Additional contact information can be added here */}
              </CardContent>
            </Card>
          </motion.div>
          {/* Additional sections can be added here */}
        </div>
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="partnership">Partnership</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              </TabsList>
              <TabsContent value="contact">
                <ContactForm />
              </TabsContent>
              <TabsContent value="partnership">
                <PartnershipForm />
              </TabsContent>
              <TabsContent value="volunteer">
                <VolunteerForm />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
