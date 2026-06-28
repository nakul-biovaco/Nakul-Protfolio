"use client"

import React from "react"
import Code from "@mui/icons-material/Code"
import Rocket from "@mui/icons-material/Rocket"
import Coffee from "@mui/icons-material/Coffee"
import Download from "@mui/icons-material/Download"
import Email from "@mui/icons-material/Email"
import GitHub from "@mui/icons-material/GitHub"
import LinkedIn from "@mui/icons-material/LinkedIn"
import Phone from "@mui/icons-material/Phone"
import Assignment from "@mui/icons-material/Assignment"
import Star from "@mui/icons-material/Star"
import Bolt from "@mui/icons-material/Bolt"
import Person from "@mui/icons-material/Person"
import School from "@mui/icons-material/School"
import Work from "@mui/icons-material/Work"
import ArrowForward from "@mui/icons-material/ArrowForward"
import Folder from "@mui/icons-material/Folder"
import Handshake from "@mui/icons-material/Handshake"
import TrendingUp from "@mui/icons-material/TrendingUp"
import Landscape from "@mui/icons-material/Landscape"
import WaterDrop from "@mui/icons-material/WaterDrop"
import Visibility from "@mui/icons-material/Visibility"
import Schedule from "@mui/icons-material/Schedule"
import Article from "@mui/icons-material/Article"
import Search from "@mui/icons-material/Search"

// Create a context for Material Icons
const MaterialIconsContext = React.createContext<any>(null)

export function MaterialIconsProvider({ children }: { children: React.ReactNode }) {
  return <MaterialIconsContext.Provider value={{}}>{children}</MaterialIconsContext.Provider>
}

// Export all icons as a single object for easy access
export const MaterialIcons = {
  Code,
  Rocket,
  Coffee,
  Download,
  Email,
  GitHub,
  LinkedIn,
  Phone,
  Assignment,
  Star,
  Bolt,
  Person,
  School,
  Work,
  ArrowForward,
  Folder,
  Handshake,
  TrendingUp,
  Landscape,
  WaterDrop,
  Visibility,
  Schedule,
  Article,
  Search,
}

// Individual icon exports for specific use cases
export {
  Code,
  Rocket,
  Coffee,
  Download,
  Email,
  GitHub,
  LinkedIn,
  Phone,
  Assignment,
  Star,
  Bolt,
  Person,
  School,
  Work,
  ArrowForward,
  Folder,
  Handshake,
  TrendingUp,
  Landscape,
  WaterDrop,
  Visibility,
  Schedule,
  Article,
  Search,
}
