"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  MessageCircle,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  Zap,
  Shield,
  Play,
} from "lucide-react"
import Link from "next/link"

// Logo Component
const Logo = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "footer" }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <div className="relative">
      <img src="/images/mandaleen-logo.png" alt="Mandaleen AI Logo" className="h-10 w-10 rounded-full shadow-lg" />
    </div>
    <span className={`text-2xl font-bold ${variant === "footer" ? "text-white" : "text-black dark:text-white"}`}>
      Mandaleen
    </span>
  </div>
)

// Social Media Icons Component with Official Icons and Brand Colors
const SocialIcons = () => {
  // Official SVG Icons
  const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
    </svg>
  )

  const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )

  const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      url: "https://www.facebook.com/profile.php?id=61577583159694",
      color: "#1877F2",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      url: "https://instagram.com/mandaleen.ai",
      color: "#E4405F",
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      url: "https://wa.me/962796660020",
      color: "#25D366",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      url: "#",
      color: "#000000",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      url: "#",
      color: "#0A66C2",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: "#",
      color: "#000000",
    },
    {
      name: "YouTube",
      icon: YouTubeIcon,
      url: "#",
      color: "#FF0000",
    },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 dark:border-gray-700/30 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
            style={{ color: social.color }}
          >
            <social.icon />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF5C00]/10 to-[#FF8A00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {social.name}
          </div>
        </motion.a>
      ))}
    </div>
  )
}

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = saved === "dark" || (!saved && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newTheme)
  }

  return (
    <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Sun className="h-4 w-4 text-orange-500" />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FF5C00] data-[state=checked]:to-[#FF8A00]"
      />
      <Moon className="h-4 w-4 text-blue-500" />
    </motion.div>
  )
}

// Floating Orbs Background
const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-[#FF5C00]/20 to-[#FF8A00]/20 blur-xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 10])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900/20 transition-colors duration-500">
      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 z-50 w-full"
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Logo />
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-8">
              {["Solutions", "How It Works", "Contact"].map((item, index) => (
                <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF8A00] transition-colors duration-300 group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="relative overflow-hidden bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] hover:from-[#FF5C00]/90 hover:to-[#FF8A00]/90 text-white border-0 shadow-lg shadow-orange-500/25 px-6 py-2.5">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </nav>

            <motion.button
              className="lg:hidden relative h-10 w-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {["Solutions", "How It Works", "Contact"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="block text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF8A00] transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <FloatingOrbs />

        <motion.div
          className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-8 bg-gradient-to-r from-[#FF5C00]/10 to-[#FF8A00]/10 text-[#FF5C00] border-[#FF5C00]/20 hover:bg-gradient-to-r hover:from-[#FF5C00]/20 hover:to-[#FF8A00]/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              24/7 Arabic AI Customer Service
            </Badge>
          </motion.div>

          <motion.h1 className="mb-8 text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight" variants={itemVariants}>
            <span className="block text-gray-900 dark:text-white mb-4">Welcome to</span>
            <span className="block bg-gradient-to-r from-[#FF5C00] via-[#FF7A00] to-[#FF8A00] bg-clip-text text-transparent">
              Mandaleen AI
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-12 max-w-4xl text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            Your 24/7 Arabic-speaking AI Customer Service & Sales Team. Empower your business with intelligent,
            multilingual agents across WhatsApp, Facebook, Instagram, websites, and voice/video channels.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] hover:from-[#FF5C00]/90 hover:to-[#FF8A00]/90 text-white border-0 px-10 py-4 text-lg font-semibold shadow-2xl shadow-orange-500/25 rounded-2xl"
                asChild
              >
                <Link href="#contact">
                  <span className="relative z-10 flex items-center">
                    Get Started Today
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#FF5C00]/30 text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white px-10 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-center" variants={itemVariants}>
            <SocialIcons />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-[#FF5C00]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-[#FF5C00] to-[#FF8A00] rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Why Mandaleen AI Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Why
              <span className="block bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] bg-clip-text text-transparent">
                Mandaleen AI?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the future of Arabic customer service with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Seamless Arabic Support",
                features: [
                  "Modern Standard Arabic + all major dialects (Jordanian, Palestinian, Egyptian, Iraqi, Lebanese, Gulf)",
                  "Text, voice, and video understanding",
                ],
              },
              {
                icon: Smartphone,
                title: "Multi-Channel Coverage",
                features: [
                  "Social Media: Auto-reply to messages, comments, mentions",
                  "WhatsApp Business: Real-time, secure, API-integrated conversations",
                  "Premium Website Agents: High-touch, on-site AI concierge services",
                ],
              },
              {
                icon: BarChart3,
                title: "Easy Integration & Management",
                features: [
                  "Connect to your POS, CRM, booking systems",
                  "Unified dashboard for conversation streams, analytics, and agent tuning",
                  "Prebuilt industry templates for instant launch",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="group h-full border-0 shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF5C00]/10 to-[#FF8A00]/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />

                    <div className="relative mb-6">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A00] shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h3>

                    <ul className="space-y-4">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#FF5C00] mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Solutions Section */}
      <section
        id="solutions"
        className="py-32 bg-gradient-to-br from-gray-50 to-orange-50/30 dark:from-gray-900 dark:to-orange-900/20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FF5C00]/10 to-[#FF8A00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FF8A00]/10 to-[#FF5C00]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Our Core
              <span className="block bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive AI-powered solutions for every customer touchpoint
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                icon: MessageCircle,
                title: "Social Media AI Agents",
                features: [
                  { label: "Auto-Responses", desc: "to customer inquiries in comments & DMs" },
                  { label: "Sales & Booking Flows", desc: "handled end-to-end" },
                  { label: "Voice & Text Input", desc: "recognized across dialects" },
                ],
              },
              {
                number: "02",
                icon: Smartphone,
                title: "WhatsApp AI Agents",
                features: [
                  { label: "Smart Chatbots", desc: "for FAQs, sales, and reservations" },
                  { label: "Secure Integration", desc: "via WhatsApp Business API" },
                  { label: "24/7 Availability", desc: "with human-like conversational flow" },
                ],
              },
              {
                number: "03",
                icon: Monitor,
                title: "Premium Website AI Agents",
                features: [
                  { label: "Text, Voice & Video", desc: "customer interactions" },
                  { label: "Deep Customization", desc: "for clinics, salons, real estate, and more" },
                  { label: "Live Escalation", desc: "to human staff when needed" },
                ],
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="group h-full border-0 shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-[#FF5C00]/10 dark:text-[#FF8A00]/10">
                      {solution.number}
                    </div>

                    <div className="relative mb-6">
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A00] shadow-xl shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                        <solution.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>

                    <h3 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">{solution.title}</h3>

                    <ul className="space-y-6">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-[#FF5C00] mt-1 mr-4 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">{feature.label}</span>
                            <span className="text-gray-600 dark:text-gray-300"> {feature.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              How It
              <span className="block bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get your AI agents up and running in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Channels",
                description: "Select one or more: WhatsApp, Facebook/Instagram, Website.",
                icon: Smartphone,
              },
              {
                step: "02",
                title: "Deploy Prebuilt Templates",
                description: "Industry-ready conversational flows up and running in minutes.",
                icon: Zap,
              },
              {
                step: "03",
                title: "Train with Your Data",
                description: "Upload FAQs, PDFs, chat logs—teach your AI your brand voice.",
                icon: Shield,
              },
              {
                step: "04",
                title: "Monitor & Optimize",
                description: "Use our dashboard for real-time insights, analytics, and fine-tuning.",
                icon: BarChart3,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#FF5C00]/30 to-[#FF8A00]/30 z-0" />
                )}

                <div className="relative z-10">
                  <motion.div
                    className="mb-6 mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-[#FF5C00] to-[#FF8A00] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-orange-500/25 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <step.icon className="h-8 w-8" />
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-[#FF5C00] shadow-lg">
                      {step.step}
                    </div>
                  </motion.div>

                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 bg-gradient-to-br from-[#FF5C00] via-[#FF7A00] to-[#FF8A00] relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-4xl text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">Contact Us</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Ready to transform your customer service? Get in touch with our team today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h3>

                  <div className="space-y-6">
                    {[
                      { icon: Phone, label: "+962 79 666 0020", type: "phone" },
                      { icon: MessageCircle, label: "WhatsApp: +962 79 666 0020", type: "whatsapp" },
                      { icon: Mail, label: "hi@mandaleen.com", type: "email" },
                      { icon: MapPin, label: "Mecca Street, Amman, Jordan", type: "location" },
                    ].map((contact, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center group cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF5C00]/10 to-[#FF8A00]/10 flex items-center justify-center mr-4 group-hover:from-[#FF5C00]/20 group-hover:to-[#FF8A00]/20 transition-colors duration-300">
                          <contact.icon className="h-6 w-6 text-[#FF5C00]" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-[#FF5C00] transition-colors duration-300">
                          {contact.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Follow Us:</h4>
                    <SocialIcons />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ready to Get Started?</h3>

                  <div className="space-y-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] hover:from-[#FF5C00]/90 hover:to-[#FF8A00]/90 text-white border-0 py-4 text-lg font-semibold shadow-xl shadow-orange-500/25 rounded-2xl relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Book a Free Demo
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-2 border-[#FF5C00]/30 text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 transition-all duration-300"
                      >
                        Request Pricing
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-10 p-8 bg-gradient-to-br from-gray-50 to-orange-50/50 dark:from-gray-700/50 dark:to-orange-900/20 rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 text-[#FF5C00] mr-3" />
                      <span className="font-bold text-gray-900 dark:text-white text-lg">Quick Setup</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Get your AI agents up and running in under 30 minutes with our prebuilt templates and expert
                      support.
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FF5C00]/5 to-[#FF8A00]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FF8A00]/5 to-[#FF5C00]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Logo variant="footer" />
              </motion.div>
              <p className="text-gray-400 max-w-md leading-relaxed text-lg">
                Empowering businesses across the Middle East with intelligent, Arabic-speaking AI customer service and
                sales solutions.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-xl">Solutions</h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  { name: "Social Media AI Agents", href: "#solutions" },
                  { name: "WhatsApp AI Agents", href: "#solutions" },
                  { name: "Website AI Agents", href: "#solutions" },
                  { name: "Contact Us", href: "#contact" },
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link href={link.href} className="hover:text-[#FF5C00] transition-colors duration-300 text-lg">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-10 text-center">
            <p className="text-gray-400 text-lg">
              &copy; {new Date().getFullYear()} Mandaleen AI. All rights reserved. Transforming customer service with
              Arabic AI excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
