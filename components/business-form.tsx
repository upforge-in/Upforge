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
import { toast } from "sonner"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function BusinessForm() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // EmailJS logic
    emailjs.sendForm('service_hez7mw9', 'template_htai0ev', form.current!, 'qsf9Wt-yXfBKQ7CD7')
      .then(() => {
        setIsSubmitted(true);
        toast.success("Success! Details received.");
      }, (error) => {
        toast.error("Failed to send. Please try again later.");
        console.error(error.text);
      });
  };

  return (
    <Dialog onOpenChange={(open) => { if(!open) setIsSubmitted(false) }}>
      <DialogTrigger asChild>
        <Button className="gap-2 font-semibold">
          Inform Us <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitted ? (
          /* Success Animation & Message View */
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
            <div className="rounded-full bg-green-100 p-3 mb-4 dark:bg-green-900/30">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Mil Gaya! 🚀</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              Hume aapki startup details mil gayi hain. <br />
              <span className="font-medium text-primary">We will verify and update you shortly.</span>
            </DialogDescription>
            <Button 
              className="mt-8 w-full" 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          /* Normal Form View */
          <>
            <DialogHeader>
              <DialogTitle>List Your Startup</DialogTitle>
              <DialogDescription>
                Fill in your business details below. Our team will verify and list you on UPFORGE.
              </DialogDescription>
            </DialogHeader>
            <form ref={form} onSubmit={sendEmail} className="grid gap-4 py-4">
              <Input name="from_name" placeholder="Founder Name" required />
              <Input name="business_name" placeholder="Business Name" required />
              <Input name="reply_to" type="email" placeholder="Work Email" required />
              <Input name="website" type="url" placeholder="Website URL" />
              <Textarea 
                name="message" 
                placeholder="Briefly describe your business..." 
                className="min-h-[100px]" 
                required 
              />
              <Button type="submit" className="w-full">Submit Business Info</Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
