"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, Github, Linkedin, Mail, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: MessageSquare, label: "Contact", href: "/contact" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Mail, label: "Email", href: "mailto:nakul@example.com" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 space-y-2 p-2 rounded-xl bg-card/90 border border-border backdrop-blur-sm shadow-lg"
          >
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                >
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-colors"
                    asChild
                  >
                    <a
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : "_self"}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  )
}
