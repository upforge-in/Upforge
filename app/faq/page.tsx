"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { HelpCircle, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "Upforge kya hai?",
    answer: "Upforge India ka ek independent founder registry hai. Hum startups ki verification karte hain aur builders ka ek curated public ledger maintain karte hain taaki ecosystem mein trust aur transparency bani rahe."
  },
  {
    question: "Registry mein list hone ke kya charges hain?",
    answer: "Standard listing founders ke liye hamesha free rahegi. Humara maqsad ecosystem ko organize karna hai, na ki access bechna. Halanki, optional 'Verified Seal' ke liye hum ek chota sa one-time processing fee lete hain jo manual verification costs ko cover karta hai."
  },
  {
    question: "Verification process mein kitna waqt lagta hai?",
    answer: "Usually, submission ke baad humari team 4 se 7 business days ke andar manual review complete kar leti hai. Isme incorporation documents aur founder profiles ki vetting shamil hai."
  },
  {
    question: "Kya main apni startup details baad mein edit kar sakta hoon?",
    answer: "Ji haan. Ek baar aapka profile live ho jaye, toh aap founder dashboard ke zariye ya humari support team ko email karke details update kar sakte hain."
  },
  {
    question: "Upforge 'Verified Seal' ke kya fayde hain?",
    answer: "Verified Seal aapki startup ki legitimacy proof karta hai. Ye hiring ke waqt candidates ka trust jeetne, investors ko transparency dikhane, aur partners ke saath deal close karne mein madad karta hai."
  },
  {
    question: "Kaunsa startup apply kar sakta hai?",
    answer: "Koi bhi Indian startup jo registered entity (Pvt Ltd ya LLP) hai aur jiske paas ek verifiable founder profile hai, wo apply kar sakta hai. Hum early-stage se lekar scale-ups tak sabko welcome karte hain."
  }
]

export default function FAQPage() {
  return (
    <div className="bg-[#F8F8F6] min-h-screen text-zinc-900 antialiased pt-44 pb-36 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-6"
          >
            <HelpCircle className="h-4 w-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Knowledge Base</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8">
            Common <span className="font-semibold italic">Questions.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Everything you need to know about the Upforge registry and verification process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-20"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-zinc-100 last:border-0 pb-2">
                <AccordionTrigger className="text-left text-lg font-medium hover:text-indigo-600 hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support CTA */}
        <div className="bg-zinc-900 rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-light mb-6">Sawaal abhi bhi baaki hai?</h2>
            <p className="text-zinc-400 mb-10 max-w-md mx-auto">
              Agar aapko apna jawab nahi mila, toh humari team aapki madad ke liye taiyar hai.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="mailto:hello@upforge.in">
                <Button className="h-14 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-14 px-10 rounded-full border-zinc-700 text-white hover:bg-white/10 text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
            Upforge India · Updated February 2026
          </p>
        </div>

      </div>
    </div>
  )
}
