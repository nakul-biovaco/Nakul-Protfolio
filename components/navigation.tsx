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
  Code,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon,
  Award,
  Camera,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
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
  const [isOpen, setIsOpen] = useState(false) // mobile menu state
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false) // desktop slider collapse state
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Initialize and synchronize sidebar state with localStorage & body class
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("nakul_sidebar_collapsed")
    if (saved === "true") {
      setIsDesktopCollapsed(true)
      document.body.classList.add("sidebar-collapsed")
    } else {
      setIsDesktopCollapsed(false)
      document.body.classList.remove("sidebar-collapsed")
    }
  }, [])

  // Keyboard shortcut (Ctrl+B, Cmd+B, or [) to toggle slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault()
        toggleDesktopSidebar()
      } else if (e.key === "[" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        toggleDesktopSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isDesktopCollapsed])

  const toggleDesktopSidebar = () => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("nakul_sidebar_collapsed", next ? "true" : "false")
      if (next) {
        document.body.classList.add("sidebar-collapsed")
      } else {
        document.body.classList.remove("sidebar-collapsed")
      }
      return next
    })
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Desktop Slider Trigger (Visible when Sidebar is Collapsed) */}
      <AnimatePresence>
        {isDesktopCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 left-5 z-50 hidden lg:flex items-center"
          >
            <button
              onClick={toggleDesktopSidebar}
              title="Open Sidebar Navigation (Shortcut: [ or Ctrl+B)"
              className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card/90 hover:bg-card text-foreground border border-border shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-primary/10"
              aria-label="Open Sidebar Navigation"
            >
              <div className="relative flex items-center justify-center">
                <PanelLeftOpen className="w-5 h-5 text-primary group-hover:rotate-6 transition-transform" />
                <span className="animate-ping absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-primary opacity-60"></span>
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                Menu
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Slider) */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar/95 backdrop-blur-xl border-r border-border z-50 hidden lg:flex flex-col shadow-2xl transition-transform duration-350 ease-in-out ${
          isDesktopCollapsed ? "-translate-x-full pointer-events-none" : "translate-x-0"
        }`}
      >
        {/* Logo & Slider Close Button Header */}
        <div className="p-6 border-b border-border relative">
          {/* Slider Close Button */}
          <button
            onClick={toggleDesktopSidebar}
            title="Close / Slide Sidebar (Shortcut: [ or Ctrl+B)"
            aria-label="Close / Slide Sidebar"
            className="absolute top-4 right-4 p-2 rounded-lg bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60 hover:border-primary/40 transition-all duration-200 hover:scale-105"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>

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
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === "/company" && pathname.startsWith("/company"))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover-target group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold"
                    : "text-foreground hover:text-primary hover:bg-muted/70 font-medium"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate text-sm">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Theme Toggle & Slider Status Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex-1 justify-start hover-target group"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300 text-amber-400" />
                  <span className="truncate text-xs">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300 text-primary" />
                  <span className="truncate text-xs">Dark Mode</span>
                </>
              )}
            </Button>

            <button
              onClick={toggleDesktopSidebar}
              title="Slide / Collapse Sidebar"
              className="p-2 rounded-md border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground text-xs flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-[11px] text-muted-foreground">
            © 2026 Nakul Mahendra Mundhada
          </div>
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

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-primary hover-target"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-primary" />}
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

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-sidebar border-t border-border shadow-xl"
            >
              <div className="p-4 space-y-1.5 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
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
