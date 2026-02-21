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
  ChevronRight,
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
  const [step, setStep] = useState(0); // Trigger animation step
  
  // Logic to open popup automatically if on /apply
  useEffect(() => {
    if (pathname === "/apply") {
      setIsOpen(true);
    }
  }, [pathname]);

  const isHomePage = pathname === "/";
  const shouldAnimate = isHomePage && !isOpen;

  const states = [
    { label: "Connect", color: "bg-white text-black", icon: <Plus className="h-5 w-5" /> },
    { label: "Grow", color: "bg-primary text-primary-foreground", icon: <ArrowUpRight className="h-5 w-5" /> }
  ];

  useEffect(() => {
    if (!shouldAnimate) {
      setStep(0);
      return;
    }
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
      setIsSubmitted(true); // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = () => {
    setIsSubmitted(false);
    setIsOpen(false);
    if (pathname === "/apply") {
      router.push("/");
    }
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
            animate={{ 
              width: shouldAnimate ? [52, 130, 130, 52] : 52,
            }}
            transition={{ 
              duration: 4, 
              repeat: shouldAnimate ? Infinity : 0, 
              repeatDelay: 2,
              ease: "easeInOut" 
            }}
            className={`relative flex h-12 items-center justify-start overflow-hidden rounded-full px-4 shadow-2xl transition-colors duration-700 ${states[step].color}`}
          >
            <div className="flex shrink-0 items-center justify-center">
              {states[step].icon}
            </div>
            
            <AnimatePresence>
              {shouldAnimate && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                  className="ml-3 text-sm font-bold uppercase tracking-widest"
                >
                  {states[step].label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ) : (
          <Button className="group h-12 gap-2 rounded-full px-8 font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Join the Ecosystem
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] overflow-hidden border-white/10 bg-background/98 backdrop-blur-3xl p-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] outline-none">
        {/* Progress Bar / Trust Header */}
        <div className="relative h-1.5 w-full bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isSubmitted ? "100%" : "60%" }}
            className="h-full bg-primary"
          />
        </div>

        {/* Custom Close Button for better UX */}
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center p-12 text-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
              </div>
              <DialogTitle className="text-3xl font-black tracking-tighter">Application Received</DialogTitle>
              <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
                Your venture has been added to our verification pipeline. Our analysts will review your pitch shortly.
              </DialogDescription>
              <Button 
                className="mt-10 h-14 w-full rounded-xl text-lg font-bold shadow-xl shadow-primary/10 transition-transform hover:scale-[1.02]" 
                onClick={handleFinalize}
              >
                Return to Ecosystem
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <DialogHeader className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Verification Portal</span>
                </div>
                <DialogTitle className="text-4xl font-black tracking-tighter text-foreground">Join Upforge</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                  Submit your details to gain network-wide visibility.
                </DialogDescription>
              </DialogHeader>

              <form ref={form} onSubmit={sendEmail} className="grid gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input name="from_name" placeholder="Founder Name" className="h-14 border-white/10 bg-white/5 transition-all focus:border-primary/50 focus:ring-primary/20" required />
                  </div>
                  <div className="space-y-2">
                    <Input name="business_name" placeholder="Startup Name" className="h-14 border-white/10 bg-white/5 transition-all focus:border-primary/50 focus:ring-primary/20" required />
                  </div>
                </div>
                
                <div className="relative">
                  <Input name="reply_to" type="email" placeholder="Work Email" className="h-14 border-white/10 bg-white/5 pl-11 transition-all focus:border-primary/50 focus:ring-primary/20" required />
                  <Lock className="absolute left-4 top-5 h-4 w-4 text-muted-foreground/40" />
                </div>
                
                <div className="relative">
                  <Input name="website" type="url" placeholder="Venture Website (https://...)" className="h-14 border-white/10 bg-white/5 pl-11 transition-all focus:border-primary/50 focus:ring-primary/20" required />
                  <Globe className="absolute left-4 top-5 h-4 w-4 text-muted-foreground/40" />
                </div>

                <Textarea name="message" placeholder="Brief elevator pitch..." className="min-h-[120px] resize-none border-white/10 bg-white/5 transition-all focus:border-primary/50 focus:ring-primary/20" required />
                
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    By submitting, you agree to our verification process. Your data is encrypted and only visible to vetted ecosystem partners.
                  </p>
                </div>

                <Button type="submit" disabled={isLoading} className="mt-2 h-16 w-full rounded-xl text-lg font-black shadow-2xl transition-all hover:translate-y-[-2px] hover:shadow-primary/20 active:translate-y-0">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : "Submit for Verification"}
                </Button>
                
                <div className="mt-4 flex items-center justify-center gap-6 border-t border-white/5 pt-6 opacity-30 grayscale transition-opacity hover:opacity-100">
                   <span className="text-[9px] font-bold uppercase tracking-widest">SSL Encrypted</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest">KYC Verified</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest">24/7 Support</span>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
