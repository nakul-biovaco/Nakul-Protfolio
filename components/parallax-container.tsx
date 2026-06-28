"use client"

import type React from "react"

interface ParallaxContainerProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

/**
 * ParallaxContainer — simplified to a plain wrapper.
 * Removed the scroll-driven transform for performance.
 */
export function ParallaxContainer({ children, className = "" }: ParallaxContainerProps) {
  return <div className={className}>{children}</div>
}
