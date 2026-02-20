"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, Bot, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] h-[500px] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">UpForge Concierge</h3>
                  <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-bold">AI Intelligence</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-zinc-50/50 dark:bg-zinc-950/50">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl rounded-tl-none border border-zinc-100 dark:border-zinc-800 text-sm shadow-sm">
                  Welcome to the Registry. I can help you with:
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="text-[10px] px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white transition-colors font-bold border border-zinc-200 dark:border-zinc-700">
                      How to Sponsor?
                    </button>
                    <button className="text-[10px] px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white transition-colors font-bold border border-zinc-200 dark:border-zinc-700">
                      Listing Criteria
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about growth..."
                  className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <Button size="icon" className="absolute right-1.5 top-1.5 h-8 w-8 rounded-xl">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-transform bg-primary"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>
    </div>
  )
}
