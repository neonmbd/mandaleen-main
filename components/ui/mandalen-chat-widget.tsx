"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MessageCircle, X, Minimize2, Maximize2, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// Add Tajawal font loading
const loadTajawalFont = () => {
  if (typeof document !== "undefined") {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
    link.rel = "stylesheet"
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link)
    }
  }
}

// Load font when module loads
if (typeof window !== "undefined") {
  loadTajawalFont()
}

// Utility function to detect Arabic text
const isArabicText = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
  return arabicRegex.test(text)
}

// Get appropriate font family based on text content
const getFontFamily = (text: string): string => {
  return isArabicText(text) ? "'Tajawal', sans-serif" : "'Inter', sans-serif"
}

// Theme Context
interface ThemeContextType {
  theme: "light" | "dark"
  isRTL: boolean
  setIsRTL: (rtl: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    // Auto-detect theme from document class
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    }

    // Initial theme detection
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          updateTheme()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // Auto-detect RTL based on document direction or language
  useEffect(() => {
    const htmlDir = document.documentElement.dir
    const htmlLang = document.documentElement.lang
    const rtlLanguages = ["ar", "he", "fa", "ur"]

    if (htmlDir === "rtl" || rtlLanguages.some((lang) => htmlLang.startsWith(lang))) {
      setIsRTL(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.setAttribute("data-theme", theme)
  }, [isRTL, theme])

  return <ThemeContext.Provider value={{ theme, isRTL, setIsRTL }}>{children}</ThemeContext.Provider>
}

// Theme-aware color utilities
const getThemeColors = (theme: "light" | "dark") => ({
  background: theme === "light" ? "bg-white" : "bg-gray-900",
  backgroundSecondary: theme === "light" ? "bg-gray-50" : "bg-gray-800",
  text: theme === "light" ? "text-gray-800" : "text-gray-100",
  textSecondary: theme === "light" ? "text-gray-600" : "text-gray-300",
  textMuted: theme === "light" ? "text-gray-500" : "text-gray-400",
  border: theme === "light" ? "border-gray-200" : "border-gray-700",
  borderLight: theme === "light" ? "border-gray-100" : "border-gray-600",
  shadow: theme === "light" ? "shadow-2xl" : "shadow-2xl shadow-black/50",
  chatBubbleAI: theme === "light" ? "bg-white border border-gray-100" : "bg-gray-800 border border-gray-700",
  inputBg: theme === "light" ? "bg-white" : "bg-gray-800",
  inputBorder: theme === "light" ? "border-gray-200 focus:border-[#FF5C00]" : "border-gray-600 focus:border-[#FF5C00]",
})

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  typing?: boolean
}

interface ChatWidgetProps {
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
  className?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  brandName?: string
  welcomeMessage?: string
  placeholder?: string
  enableRTLToggle?: boolean
}

const useAutoResizeTextarea = (minHeight = 40, maxHeight = 120) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = `${minHeight}px`
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight))
    textarea.style.height = `${newHeight}px`
  }, [minHeight, maxHeight])

  return { textareaRef, adjustHeight }
}

// Markdown renderer component
const MarkdownRenderer = ({ content, isRTL, colors }: { content: string; isRTL: boolean; colors: any }) => {
  const renderMarkdown = (text: string) => {
    // Split by lines to process each line
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const fontFamily = getFontFamily(line)

      // Skip empty lines but add spacing
      if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />)
        continue
      }

      // Headers (###, ##, #)
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-lg font-bold mb-2 mt-3 text-[#FF5C00]" style={{ fontFamily }}>
            {line.replace("### ", "")}
          </h3>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-xl font-bold mb-2 mt-4 text-[#FF5C00]" style={{ fontFamily }}>
            {line.replace("## ", "")}
          </h2>,
        )
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-2xl font-bold mb-3 mt-4 text-[#FF5C00]" style={{ fontFamily }}>
            {line.replace("# ", "")}
          </h1>,
        )
      }
      // Bullet points
      else if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
        const bulletContent = line.trim().replace(/^[*-] /, "")
        const processedContent = processBoldText(bulletContent)
        elements.push(
          <div
            key={i}
            className={cn("flex items-start gap-2 mb-1", isRTL && "flex-row-reverse")}
            style={{ fontFamily }}
          >
            <span className="text-[#FF5C00] mt-1 text-sm">•</span>
            <span className="flex-1">{processedContent}</span>
          </div>,
        )
      }
      // Numbered lists
      else if (/^\d+\.\s/.test(line.trim())) {
        const match = line.trim().match(/^(\d+)\.\s(.*)/)
        if (match) {
          const [, number, content] = match
          const processedContent = processBoldText(content)
          elements.push(
            <div
              key={i}
              className={cn("flex items-start gap-2 mb-1", isRTL && "flex-row-reverse")}
              style={{ fontFamily }}
            >
              <span className="text-[#FF5C00] mt-1 text-sm font-semibold">{number}.</span>
              <span className="flex-1">{processedContent}</span>
            </div>,
          )
        }
      }
      // Regular paragraphs
      else {
        const processedContent = processBoldText(line)
        elements.push(
          <p key={i} className="mb-2 leading-relaxed" style={{ fontFamily }}>
            {processedContent}
          </p>,
        )
      }
    }

    return elements
  }

  // Process bold text (**text**)
  const processBoldText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2)
        const fontFamily = getFontFamily(boldText)
        return (
          <strong key={index} className="font-bold text-[#FF5C00]" style={{ fontFamily }}>
            {boldText}
          </strong>
        )
      }
      return part
    })
  }

  return <div className="space-y-1">{renderMarkdown(content)}</div>
}

const TypingIndicator = () => {
  const { theme, isRTL } = useTheme()
  const colors = getThemeColors(theme)

  return (
    <div className={cn("flex items-center gap-1 px-4 py-2", isRTL && "flex-row-reverse")}>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "linear-gradient(90deg, #FF5C00, #FF8A00)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className={cn("text-xs", colors.textMuted, isRTL ? "mr-2" : "ml-2")}>
        {isRTL ? "الذكي الاصطناعي يكتب..." : "AI is typing..."}
      </span>
    </div>
  )
}

const ChatBubble = ({ message, isUser }: { message: Message; isUser: boolean }) => {
  const { theme, isRTL } = useTheme()
  const colors = getThemeColors(theme)
  const fontFamily = getFontFamily(message.content)

  // Adjust bubble alignment for RTL
  const bubbleAlignment = isRTL ? !isUser : isUser

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      }}
      className={cn("flex items-start gap-3 mb-4", bubbleAlignment ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium",
          isUser ? "bg-gradient-to-r from-gray-600 to-gray-700" : "bg-gradient-to-r from-[#FF5C00] to-[#FF8A00]",
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <motion.div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
          isUser ? "bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] text-white" : cn(colors.chatBubbleAI, colors.text),
          // RTL-aware border radius
          isUser ? (isRTL ? "rounded-bl-md" : "rounded-br-md") : isRTL ? "rounded-br-md" : "rounded-bl-md",
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        dir={isRTL ? "rtl" : "ltr"}
        style={{ fontFamily }}
      >
        <div className="font-medium">
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} isRTL={isRTL} colors={colors} />
          )}
        </div>
        <div className={cn("text-xs mt-2 opacity-70", isUser ? "text-white/80" : colors.textMuted)}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

const ChatWidget = ({
  isOpen: controlledIsOpen,
  onToggle,
  className,
  position = "bottom-right",
  brandName = "Mandaleen",
  welcomeMessage = "Hi! I'm your AI assistant. How can I help you today?",
  placeholder = "Type your message...",
  enableRTLToggle = true,
}: ChatWidgetProps) => {
  const { theme, isRTL, setIsRTL } = useTheme()
  const colors = getThemeColors(theme)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: isRTL ? "مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟" : welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea()

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen

  const handleToggle = () => {
    const newIsOpen = !isOpen
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen)
    }
    onToggle?.(newIsOpen)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendToWebhook = async (userMessage: string): Promise<string> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      console.log("Sending to webhook:", { sessionId, userMessage, brandName })

      const response = await fetch("https://rd4frqju.rpcld.com/webhook/mandaleen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sessionId,
          userMessage,
          timestamp: new Date().toISOString(),
          brandName,
          isRTL,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("Webhook response status:", response.status)
      console.log("Webhook response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status} ${response.statusText}`)
      }

      const responseText = await response.text()
      console.log("Raw webhook response:", responseText)

      let data
      try {
        data = JSON.parse(responseText)
        console.log("Parsed webhook response:", data)
      } catch (parseError) {
        console.error("Failed to parse webhook response as JSON:", parseError)
        // If response is not JSON, treat it as plain text
        return (
          responseText ||
          (isRTL ? "شكراً لرسالتك! كيف يمكنني مساعدتك؟" : "Thank you for your message! How can I help you?")
        )
      }

      // Handle array responses from n8n
      if (Array.isArray(data)) {
        console.log("Response is an array, processing first item:", data[0])
        if (data.length > 0) {
          const firstItem = data[0]
          // Try multiple possible response fields from the first array item
          const aiResponse =
            firstItem.output ||
            firstItem.aiResponse ||
            firstItem.response ||
            firstItem.message ||
            firstItem.reply ||
            firstItem.text ||
            firstItem.content

          if (aiResponse && typeof aiResponse === "string") {
            console.log("Found AI response in array:", aiResponse)
            return aiResponse
          }
        }
      }

      // Handle object responses
      if (data && typeof data === "object") {
        // Try multiple possible response fields
        const aiResponse =
          data.output || data.aiResponse || data.response || data.message || data.reply || data.text || data.content

        if (aiResponse && typeof aiResponse === "string") {
          console.log("Found AI response in object:", aiResponse)
          return aiResponse
        }
      }

      // If no valid response found, return a default
      console.warn("No valid AI response found in webhook data:", data)
      return isRTL ? "شكراً لرسالتك! كيف يمكنني مساعدتك؟" : "Thank you for your message! How can I help you?"
    } catch (error) {
      clearTimeout(timeoutId)
      console.error("Webhook error details:", error)

      if (error.name === "AbortError") {
        return isRTL
          ? "عذراً، انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى."
          : "Sorry, the response timed out. Please try again."
      }

      return isRTL
        ? "عذراً، لا يمكنني الاتصال بالخدمة حالياً. يرجى المحاولة لاحقاً."
        : "Sorry, I can't connect to the service right now. Please try again later."
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userMessageContent = inputValue.trim()
    setInputValue("")
    setIsTyping(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"
    }

    try {
      // Get AI response from webhook
      const aiResponseText = await sendToWebhook(userMessageContent)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error in handleSendMessage:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isRTL
          ? "عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
          : "Sorry, an unexpected error occurred. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getPositionClasses = () => {
    if (isRTL) {
      // Flip positions for RTL
      switch (position) {
        case "bottom-right":
          return "bottom-6 left-6"
        case "bottom-left":
          return "bottom-6 right-6"
        case "top-right":
          return "top-6 left-6"
        case "top-left":
          return "top-6 right-6"
        default:
          return "bottom-6 left-6"
      }
    } else {
      switch (position) {
        case "bottom-left":
          return "bottom-6 left-6"
        case "top-right":
          return "top-6 right-6"
        case "top-left":
          return "top-6 left-6"
        default:
          return "bottom-6 right-6"
      }
    }
  }

  // Get RTL-aware placeholder text
  const getPlaceholderText = () => {
    if (isRTL) {
      return "اكتب رسالتك..."
    }
    return placeholder
  }

  return (
    <div className={cn("fixed z-50", getPositionClasses(), className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "60px" : "500px",
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            className={cn(
              "w-80 rounded-2xl overflow-hidden mb-4",
              colors.background,
              colors.border,
              colors.shadow,
              "border",
            )}
            style={{ fontFamily: "Inter, sans-serif" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <motion.div
              className={cn("px-6 py-4 border-b", colors.borderLight)}
              style={{
                background: "linear-gradient(90deg, #FF5C00, #FF8A00)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3
                      className="font-semibold text-white text-sm"
                      style={{ fontFamily: getFontFamily(isRTL ? `${brandName} الذكي` : `${brandName} AI`) }}
                    >
                      {isRTL ? `${brandName} الذكي` : `${brandName} AI`}
                    </h3>
                    <div className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span
                        className="text-xs text-white/80"
                        style={{ fontFamily: getFontFamily(isRTL ? "متصل" : "Online") }}
                      >
                        {isRTL ? "متصل" : "Online"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  {enableRTLToggle && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRTL(!isRTL)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-xs font-bold"
                      title={isRTL ? "تبديل الاتجاه" : "Toggle direction"}
                    >
                      {isRTL ? "EN" : "ع"}
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleToggle}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className={cn("h-80 overflow-y-auto p-4", colors.backgroundSecondary)}>
                  {messages.map((message) => (
                    <ChatBubble key={message.id} message={message} isUser={message.sender === "user"} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={cn("p-4 border-t", colors.borderLight, colors.inputBg)}>
                  <div className={cn("flex items-end gap-3", isRTL && "flex-row-reverse")}>
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          adjustHeight()
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder={getPlaceholderText()}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border focus:outline-none resize-none text-sm",
                          colors.inputBorder,
                          colors.text,
                          colors.inputBg,
                          isRTL ? "text-right" : "text-left",
                        )}
                        style={{ minHeight: "40px", maxHeight: "120px" }}
                        rows={1}
                        dir={isRTL ? "rtl" : "ltr"}
                        disabled={isTyping}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className={cn(
                        "p-3 rounded-xl text-white transition-all",
                        inputValue.trim() && !isTyping
                          ? "bg-gradient-to-r from-[#FF5C00] to-[#FF8A00] shadow-lg hover:shadow-xl"
                          : "bg-gray-300 cursor-not-allowed",
                      )}
                    >
                      <Send className={cn("w-4 h-4", isRTL && "rotate-180")} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(90deg, #FF5C00, #FF8A00)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default function MandalenChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <ChatWidget
        isOpen={isOpen}
        onToggle={setIsOpen}
        brandName="Mandaleen"
        welcomeMessage="Hello! 👋 I'm Mandaleen 🟠, how can I assist you today?"
        placeholder="Ask me anything..."
        position="bottom-right"
        enableRTLToggle={true}
      />
    </ThemeProvider>
  )
}
