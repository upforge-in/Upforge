"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Sparkles, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const suggestedQuestions = [
  "What is UpForge?",
  "How to get listed?",
  "Sponsorship pricing?",
  "Verification process?",
  "Benefits for founders?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to the Registry. How can I assist your growth today?" }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Nudge logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowNudge(true)
        setTimeout(() => setShowNudge(false), 4000)
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage = { role: "user", content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await res.json()
      const reply = data.message || data.error || "Sorry, I couldn't process that request."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection to Registry failed. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Nudge Bubble with Robot */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mb-4 mr-2 bg-white border border-[#1e3a5f]/10 rounded-2xl shadow-xl p-4 flex items-center gap-3"
          >
            <div className="relative h-10 w-10 shrink-0"> {/* larger robot */}
              <Image src="/robot.jpg" alt="Robot" fill className="object-contain rounded-full" />
            </div>
            <p className="text-sm font-medium text-[#1e1b1b]">
              May I help you navigate the Registry? ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="mb-6 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-[#1e3a5f]/10 flex flex-col overflow-hidden"
          >
            {/* Header - without close button */}
            <div className="p-8 bg-[#0f1e2f] text-white flex items-center gap-4 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={80} />
              </div>
              <div className="relative h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center"> {/* larger robot */}
                <Image src="/robot.jpg" alt="Robot" fill className="object-contain p-2 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">UpForge Intelligence</h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">
                    Concierge Active
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#fbf9f6]">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative h-9 w-9 rounded-xl bg-white border border-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image src="/robot.jpg" alt="Robot" fill className="object-contain p-1" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#c6a43f] text-[#0f1e2f] rounded-[20px] rounded-tr-none"
                        : "bg-white border border-[#1e3a5f]/10 text-[#1e1b1b] rounded-[20px] rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="relative h-9 w-9 rounded-xl bg-white border border-[#1e3a5f]/10 overflow-hidden">
                    <Image src="/robot.jpg" alt="Robot" fill className="object-contain p-1" />
                  </div>
                  <div className="h-12 w-24 bg-white border border-[#1e3a5f]/10 rounded-2xl" />
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-2 flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-white border border-[#1e3a5f]/10 hover:border-[#c6a43f]/30 rounded-full px-3 py-1.5 text-[#1e1b1b] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-6 bg-white border-t border-[#1e3a5f]/10">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Indian startup ecosystem..."
                  className="flex-1 bg-[#fbf9f6] border border-[#1e3a5f]/10 rounded-2xl py-4 px-6 text-sm text-[#1e1b1b] placeholder:text-[#4a4a4a]/50 focus:ring-2 focus:ring-[#c6a43f]/20 outline-none transition-all"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] shadow-lg hover:shadow-[#c6a43f]/30 transition-all"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Robot */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all bg-[#0f1e2f] border border-[#c6a43f]/20 relative overflow-hidden"
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <div className="relative h-12 w-12"> {/* larger robot */}
            <Image src="/robot.jpg" alt="Robot" fill className="object-contain rounded-full" />
          </div>
        )}
      </Button>
    </div>
  )
}
