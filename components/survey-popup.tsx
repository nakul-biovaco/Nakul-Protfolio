"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function SurveyPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the current date is before July 16, 2026 (Runs until July 15)
    const currentDate = new Date()
    const expiryDate = new Date("2026-07-16T00:00:00")

    // Check if user has already seen/closed it in this session to avoid annoyance
    const hasSeenPopup = sessionStorage.getItem("hasSeenSurveyPopup")

    if (currentDate < expiryDate && !hasSeenPopup) {
      // Delay popup slightly (1.5s) for a magical, sudden appearance ("ekdum se")
      const timer = setTimeout(() => setIsOpen(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem("hasSeenSurveyPopup", "true")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-[80vh] lg:h-[700px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header with Startup Branding */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-black/60 to-zinc-900/40">
              <div className="pr-8 sm:pr-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">
                    Our Startup
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    BiovaCo Nexus
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white leading-tight">Dust The Crave: Market Survey</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Your feedback directly shapes our upcoming consumer products. Thank you for supporting our journey!</p>
              </div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Iframe Content */}
            <div className="flex-1 w-full h-full bg-white relative overflow-hidden rounded-b-2xl">
              {/* Loader behind iframe */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-500 font-medium">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                Loading Survey...
              </div>
              <iframe 
                src="https://www.dustthecrave.shop/survey"
                className="relative z-10 w-full h-full border-0"
                title="Dust The Crave Survey"
                allow="camera; microphone; geolocation"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
