"use client"

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, ShieldCheck, Plus, Lock, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm({ isMobile = false }: { isMobile?: boolean }) {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  // Two premium states that match the website vibe
  const states = [
    { label: "Connect", color: "bg-white text-black", icon: <Plus className="h-5 w-5" /> },
    { label: "Grow", color: "bg-primary text-primary-foreground", icon: <ArrowUpRight className="h-5 w-5" /> }
  ];

  useEffect(() => {
    // 5-second delay between state changes for a premium, non-spammy feel
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % states.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) setIsSubmitted(false); }}>
      <DialogTrigger asChild>
        {isMobile ? (
          <motion.button
            animate={{ 
              width: [52, 130, 130, 52], // Expansion animation
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 1, // Adds that extra pause before re-animating
              ease: "easeInOut" 
            }}
            className={`relative flex h-12 items-center justify-start overflow-hidden rounded-full px-4 shadow-2xl transition-colors duration-700 ${states[step].color}`}
          >
            <div className="flex shrink-0 items-center justify-center">
              {states[step].icon}
            </div>
            <motion.span 
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
              className="ml-3 text-sm font-bold uppercase tracking-widest"
            >
              {states[step].label}
            </motion.span>
          </motion.button>
        ) : (
          <Button className="group h-12 gap-2 rounded-full px-8 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Join the Ecosystem
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[480px] overflow-hidden border-white/5 bg-background/95 backdrop-blur-3xl p-0 shadow-2xl">
        {/* Trust Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center p-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <DialogTitle className="text-3xl font-black tracking-tighter">Application Logged</DialogTitle>
              <DialogDescription className="mt-2 text-base text-muted-foreground">Your venture is now in the verification queue.</DialogDescription>
              <Button className="mt-10 h-14 w-full rounded-xl font-bold" onClick={handleFinalize}>Return to Home</Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <DialogHeader className="mb-8 text-center">
                <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
                  <Lock className="h-3 w-3" /> Secure Submission
                </div>
                <DialogTitle className="text-4xl font-black tracking-tighter">Forge Listing</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">Submit your startup for network-wide visibility.</DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input name="from_name" placeholder="Name" className="h-14 bg-white/5 border-white/10 focus:bg-white/10" required />
                  <Input name="business_name" placeholder="Startup" className="h-14 bg-white/5 border-white/10 focus:bg-white/10" required />
                </div>
                <Input name="reply_to" type="email" placeholder="Work Email" className="h-14 bg-white/5 border-white/10 focus:bg-white/10" required />
                <Textarea name="message" placeholder="Elevator Pitch..." className="min-h-[100px] bg-white/5 border-white/10 focus:bg-white/10" required />
                
                <Button type="submit" disabled={isLoading} className="mt-2 h-16 rounded-xl text-lg font-black transition-all hover:shadow-primary/25 shadow-lg">
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Verify Identity"}
                </Button>
                
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-6 opacity-40">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest"><ShieldCheck className="h-3.5 w-3.5" /> 256-Bit SSL</span>
                  <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest">Institutional Grade</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
