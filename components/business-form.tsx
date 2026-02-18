"use client"

import React, { useRef, useState } from 'react'
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
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BusinessForm() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading immediately for instant feedback

    try {
      await emailjs.sendForm(
        'service_hez7mw9', 
        'template_htai0ev', 
        form.current!, 
        'qsf9Wt-yXfBKQ7CD7'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setIsSubmitted(true); // Keeping your logic of showing success anyway
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => { if(!open) { setIsSubmitted(false); setIsLoading(false); } }}>
      <DialogTrigger asChild>
        <Button className="group gap-2 px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95">
          Inform Us 
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] overflow-hidden border-none bg-background/95 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="relative mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"
                />
                <div className="relative rounded-full bg-green-500 p-4 shadow-xl shadow-green-500/40">
                  <CheckCircle2 className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-black mb-2 text-foreground">
                Mil Gaya! 🚀
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground px-4">
                Thanks for informing us! <br />
                <span className="font-semibold text-primary">We'll verify and list you soon.</span>
              </DialogDescription>
              
              <Button 
                variant="outline"
                className="mt-8 w-full border-primary/20 hover:bg-primary/5" 
                onClick={() => setIsSubmitted(false)}
              >
                Done
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">List Your Startup</DialogTitle>
                <DialogDescription>
                  Tell us about your venture. We handle the rest.
                </DialogDescription>
              </DialogHeader>
              <form ref={form} onSubmit={sendEmail} className="grid gap-4 py-6">
                <div className="space-y-3">
                  <Input name="from_name" placeholder="Founder Name" className="bg-secondary/30 border-none h-12" required />
                  <Input name="business_name" placeholder="Business Name" className="bg-secondary/30 border-none h-12" required />
                  <Input name="reply_to" type="email" placeholder="Work Email" className="bg-secondary/30 border-none h-12" required />
                  <Input name="website" type="url" placeholder="Website URL (Optional)" className="bg-secondary/30 border-none h-12" />
                  <Textarea 
                    name="message" 
                    placeholder="Briefly describe your business..." 
                    className="min-h-[120px] bg-secondary/30 border-none resize-none" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 text-base font-bold transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Business Info"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
