import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Mandaleen AI - 24/7 Arabic AI Customer Service & Sales Team",
  description:
    "Empower your business with intelligent, multilingual AI agents across WhatsApp, Facebook, Instagram, websites, and voice/video channels. Supporting all Arabic dialects.",
  keywords:
    "Arabic AI, customer service, WhatsApp chatbot, social media automation, AI agents, Arabic dialects, Jordan, Middle East",
  authors: [{ name: "Mandaleen AI Team" }],
  creator: "Mandaleen AI",
  publisher: "Mandaleen AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mandaleen.ai"),
  openGraph: {
    title: "Mandaleen AI - 24/7 Arabic AI Customer Service & Sales Team",
    description:
      "Empower your business with intelligent, multilingual AI agents across WhatsApp, Facebook, Instagram, websites, and voice/video channels.",
    url: "https://mandaleen.ai",
    siteName: "Mandaleen AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandaleen AI - 24/7 Arabic AI Customer Service & Sales Team",
    description:
      "Empower your business with intelligent, multilingual AI agents across WhatsApp, Facebook, Instagram, websites, and voice/video channels.",
    creator: "@mandaleen_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
