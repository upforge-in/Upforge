"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to the Registry. How can I assist your growth today?" }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Nudge logic: Show after 30s, hide after 4s
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = { role: "user", content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection to Registry failed. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 30-Second Nudge Bubble with Robot */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mb-4 mr-2 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-[#c6a43f]/20 flex items-center gap-3"
          >
            <div className="relative h-8 w-8 shrink-0">
              <Image
                src="/robot.svg" // replace with your robot image path
                alt="Robot"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-[#1e1b1b] dark:text-white">
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
            className="mb-6 w-[400px] h-[600px] bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden ring-1 ring-black/5"
          >
            {/* Premium Header with Robot */}
            <div className="p-8 bg-[#0f1e2f] text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={80} />
              </div>
              <div className="flex items-center gap-4 z-10">
                <div className="relative h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg">
                  <Image
                    src="/robot.svg" // replace with your robot image path
                    alt="Robot"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight">UpForge Intelligence</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">Concierge Active</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-50/30 dark:bg-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative h-8 w-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src="/robot.svg"
                        alt="Robot"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#c6a43f] text-[#0f1e2f] rounded-[20px] rounded-tr-none"
                        : "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[20px] rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="relative h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image src="/robot.svg" alt="Robot" fill className="object-contain p-1" />
                  </div>
                  <div className="h-12 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Indian startup ecosystem..."
                  className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#c6a43f]/20 outline-none transition-all"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading}
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-[#c6a43f] hover:bg-[#b08c2e] shadow-lg hover:shadow-[#c6a43f]/30 transition-all"
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
        className="h-16 w-16 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all bg-[#0f1e2f] dark:bg-white border-none group relative overflow-hidden"
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white dark:text-[#0f1e2f]" />
        ) : (
          <div className="relative h-10 w-10">
            <Image src="/robot.svg" alt="Robot" fill className="object-contain" />
          </div>
        )}
      </Button>
    </div>
  )
}
