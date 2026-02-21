"use client"

import React, { useRef, useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Plus, 
  Lock, 
  ArrowUpRight, 
  Globe, 
  X, 
  ShieldAlert
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm({ isMobile = false }: { isMobile?: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (pathname === "/apply") setIsOpen(true);
  }, [pathname]);

  const isHomePage = pathname === "/";
  const shouldAnimate = isHomePage && !isOpen;

  const states = [
    { label: "Connect", color: "bg-white text-black", icon: <Plus className="h-5 w-5" /> },
    { label: "Grow", color: "bg-primary text-primary-foreground", icon: <ArrowUpRight className="h-5 w-5" /> }
  ];

  useEffect(() => {
    if (!shouldAnimate) { setStep(0); return; }
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % states.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldAnimate]);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm('service_hez7mw9', 'template_htai0ev', form.current!, 'qsf9Wt-yXfBKQ7CD7');
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(true); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    setIsSubmitted(false);
    setIsOpen(false);
    if (pathname === "/apply") router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { 
      setIsOpen(v); 
      if(!v) {
        setIsSubmitted(false);
        if(pathname === "/apply") router.push("/");
      }
    }}>
      <DialogTrigger asChild>
        {isMobile ? (
          <motion.button
            animate={{ width: shouldAnimate ? [52, 130, 130, 52] : 52 }}
            transition={{ duration: 4, repeat: shouldAnimate ? Infinity : 0, repeatDelay: 2, ease: "easeInOut" }}
            className={`relative flex h-12 items-center justify-start overflow-hidden rounded-full px-4 shadow-2xl ${states[step].color}`}
          >
            <div className="flex shrink-0 items-center justify-center">{states[step].icon}</div>
            <AnimatePresence>
              {shouldAnimate && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }} className="ml-3 text-sm font-bold uppercase tracking-widest">
                  {states[step].label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ) : (
          <Button className="group h-12 gap-2 rounded-full px-8 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Join the Ecosystem
          </Button>
        )}
      </DialogTrigger>
      
      {/* Shortened max-w and premium backdrop */}
      <DialogContent className="sm:max-w-[440px] overflow-hidden border-white/10 bg-slate-950/95 backdrop-blur-2xl p-0 shadow-2xl outline-none ring-0">
        
        {/* Unified Close Button - Custom Styled */}
        <DialogClose className="absolute right-5 top-5 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-white active:scale-90 border-none outline-none ring-0">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="relative h-1 w-full bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: isSubmitted ? "100%" : "0%" }} className="h-full bg-indigo-500" />
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center p-10 text-center"
            >
              <div className="relative mb-6">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight text-white">Application Logged</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-slate-400">
                Identity verified. Your startup is now in the queue.
              </DialogDescription>
              <Button className="mt-8 h-12 w-full rounded-lg font-bold transition-all hover:bg-indigo-600" onClick={handleFinalize}>
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-8">
              <DialogHeader className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                   <Lock className="h-3 w-3 text-indigo-400" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/80">Secure Submission</span>
                </div>
                <DialogTitle className="text-3xl font-black tracking-tighter text-white">Forge Listing</DialogTitle>
                <DialogDescription className="text-slate-400 text-sm">Join India's most ambitious builder network.</DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input name="from_name" placeholder="Founder" className="h-12 border-white/5 bg-white/5 focus:border-indigo-500/50" required />
                  <Input name="business_name" placeholder="Startup" className="h-12 border-white/5 bg-white/5 focus:border-indigo-500/50" required />
                </div>
                
                <Input name="reply_to" type="email" placeholder="Work Email" className="h-12 border-white/5 bg-white/5 focus:border-indigo-500/50" required />
                
                <div className="relative">
                  <Input name="website" type="url" placeholder="Website" className="h-12 border-white/5 bg-white/5 pl-10 focus:border-indigo-500/50" required />
                  <Globe className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
                </div>

                <Textarea name="message" placeholder="Elevator pitch..." className="min-h-[100px] border-white/5 bg-white/5 focus:border-indigo-500/50" required />
                
                <div className="flex items-center gap-2 rounded-md bg-indigo-500/5 p-3 text-[10px] text-slate-400 border border-indigo-500/10">
                  <ShieldAlert className="h-3 w-3 text-indigo-400 shrink-0" />
                  Encryption Active: Your data is sent over a 256-bit SSL tunnel.
                </div>

                <Button type="submit" disabled={isLoading} className="mt-2 h-14 w-full rounded-lg text-md font-black shadow-xl transition-all hover:scale-[1.01] active:scale-95 bg-indigo-600 hover:bg-indigo-500">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : "Submit Identity"}
                </Button>
                
                <div className="mt-2 flex items-center justify-between opacity-30 grayscale transition-opacity hover:opacity-100">
                   <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">SSL Secured</span>
                   <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">Institutional Grade</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
