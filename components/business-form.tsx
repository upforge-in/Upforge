"use client"

import React, { useRef } from 'react'
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
import { ArrowRight } from "lucide-react"

export function BusinessForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your actual IDs
    emailjs.sendForm('service_hez7mw9', 'template_htai0ev', form.current!, 'qsf9Wt-yXfBKQ7CD7')
      .then(() => {
        toast.success("Inquiry sent! We'll review your startup soon.");
      }, (error) => {
        toast.error("Failed to send. Please try again later.");
        console.error(error.text);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 font-semibold">
          Inform Us <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
          <Textarea name="message" placeholder="Briefly describe your business..." className="min-h-[100px]" required />
          <Button type="submit" className="w-full">Submit Business Info</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
