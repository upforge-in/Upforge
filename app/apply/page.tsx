"use client"

import React, { useRef, useState } from 'react'
import { ShieldCheck, Sparkles, CheckCircle2, Loader2, Globe, Rocket, Zap, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ApplyPage() {
  const form = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      setIsSubmitted(true)
      setTimeout(() => router.push("/"), 3000)
    } catch (error) {
      console.error("Submission failed", error)
      setIsSubmitted(true) 
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-12 bg-[#0f1e2f]/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-[#c6a43f]/50 focus:bg-[#0f1e2f]/80 focus:ring-0 rounded-xl transition-all text-sm shadow-inner"

  return (
    <div className="min-h-screen bg-[#0f1e2f] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 8px)`,
        }}
      />

      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c6a43f]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1e3a5f]/20 rounded-full blur-[120px]" />
      </div>

      {/* 2. Left Panel: Context & Trust */}
      <div className="relative w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-between border-r border-white/5 bg-black/20 backdrop-blur-3xl z-10">
        <Link href="/" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-8 w-fit">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-widest">Return Home</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/20 shadow-lg">
            <Sparkles className="h-3 w-3 text-[#c6a43f]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c6a43f]">Vault Registry</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b]">Registry.</span>
          </h1>

          <div className="space-y-6 pt-4">
            <BenefitItem icon={ShieldCheck} title="Verified Badge" desc="Institutional trust for your startup profile." />
            <BenefitItem icon={Globe} title="Elite Network" desc="Direct access to India's top 1% builders." />
            <BenefitItem icon={Rocket} title="Scale Ready" desc="Priority listing for curated capital channels." />
          </div>
        </motion.div>

        <div className="pt-12 mt-8 border-t border-white/5 flex items-center gap-4">
          <div className="relative h-12 w-12 opacity-30 grayscale invert">
            <Image src="/seal.jpg" alt="Institutional Seal" fill className="object-contain" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-black">Identity Ledger v2.4</p>
            <p className="text-[7px] text-zinc-600 font-bold font-mono">HASH_AUTH: 0xFD91...883</p>
          </div>
        </div>
      </div>

      {/* 3. Right Panel: Premium Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
              className="w-full max-w-lg bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-2xl shadow-2xl"
            >
              <div className="mb-8 space-y-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">Founder Submission</h2>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Encryption Active</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="from_name" placeholder="Founder Name" required className={inputStyles} />
                  <Input name="business_name" placeholder="Startup Name" required className={inputStyles} />
                </div>
                <Input name="reply_to" type="email" placeholder="Professional Email" required className={inputStyles} />
                <Input name="website" type="url" placeholder="Startup Website (https://...)" required className={inputStyles} />
                <Textarea 
                  name="message" 
                  placeholder="Tell us about the problem you are solving..." 
                  required 
                  className="min-h-[120px] bg-[#0f1e2f]/60 border-white/10 text-white rounded-xl focus:border-[#c6a43f]/50 focus:bg-[#0f1e2f]/80 focus:ring-0 resize-none p-4 text-sm shadow-inner placeholder:text-zinc-500" 
                />
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-[#0f1e2f] rounded-xl uppercase text-[10px] font-black tracking-[0.3em] transition-all shadow-xl shadow-[#c6a43f]/10 mt-2 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : (
                      <>Submit for Verification <Zap className="h-3 w-3 fill-current group-hover:animate-pulse" /></>
                    )}
                  </span>
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="relative mx-auto h-24 w-24">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="h-full w-full rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/30 flex items-center justify-center text-[#c6a43f]"
                >
                  <CheckCircle2 className="h-12 w-12 animate-pulse" />
                </motion.div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-8px] border border-dashed border-[#c6a43f]/20 rounded-full"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Application Logged</h3>
                <p className="text-zinc-500 max-w-[280px] mx-auto text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  Registry synchronization in progress. Redirecting...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BenefitItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#c6a43f] group-hover:bg-[#c6a43f]/10 group-hover:border-[#c6a43f]/30 transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <h4 className="text-white font-bold text-xs tracking-wide uppercase">{title}</h4>
        <p className="text-zinc-500 text-[10px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}
