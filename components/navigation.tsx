"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  User,
  GraduationCap,
  FolderOpen,
  Briefcase,
  Code,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon,
  Award,
  Building2,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/certifications", label: "Certifications", icon: Award },
  { href: "/media", label: "Media", icon: Camera },
  { href: "/contact", label: "Contact", icon: MessageSquare },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-border z-50 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex flex-col items-center space-y-3 hover-target group">
            <div className="relative w-20 h-20 logo-container">
              <Image
                src="/images/nakul-logo-new.png"
                alt="Nakul Mundhada Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-primary">Portfolio</div>
              <div className="text-sm text-muted-foreground">Nakul Mundhada</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === "/company" && pathname.startsWith("/company"))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 hover-target group ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium truncate">{item.label}</span>

              </Link>
            )
          })}
        </div>

        {/* Theme Toggle & Footer */}
        <div className="p-4 border-t border-border space-y-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full justify-start hover-target group"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 mr-2 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
                <span className="truncate">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="truncate">Dark Mode</span>
              </>
            )}
          </Button>
          <div className="text-center text-xs text-muted-foreground">© 2026 Nakul Mahendra Mundhada</div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-md border-b border-border">
        <div className="flex justify-between items-center p-4">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-target group">
            <div className="relative w-10 h-10 logo-container">
              <Image
                src="/images/nakul-logo-new.png"
                alt="Nakul Mundhada Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span className="font-bold text-lg text-primary">Nakul</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-primary hover-target"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary hover-target"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-sidebar border-t border-border"
            >
              <div className="p-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    pathname === item.href || (item.href === "/company" && pathname.startsWith("/company"))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 hover-target ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>

                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for mobile navigation */}
      <div className="h-16 lg:hidden" />
    </>
  )
}
