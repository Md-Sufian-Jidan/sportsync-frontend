"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function Faq() {
  const faqs = [
    {
      q: "How do I reserve a parking spot?",
      a: "Simply create an account or login, select your preferred zone from the dashboard or landing grid, configure your vehicle's license plate and reservation time frame, and click reserve. You will receive an immediate confirmation code.",
    },
    {
      q: "How is security handled for session logins?",
      a: "SportSync relies on secure, JSON Web Tokens (JWT) signed by our backend server. Tokens are stored in local storage and appended securely in Axios request interceptor headers to protect authentication layers.",
    },
    {
      q: "What happens if a zone is completely occupied?",
      a: "Our database implements concurrency transaction limits to prevent duplicate spot allocations. If a zone reaches 100% occupancy, the interface disables booking options for that section and recommends alternative available zones.",
    },
    {
      q: "How are hourly rates calculated?",
      a: "Hourly fees vary by zone. Prices range from $2.50 for standard visitors to $8.00 for premium VIP parking. Charges are computed strictly from the starting hour until your designated checkout session ends.",
    },
    {
      q: "Who can access the Admin Dashboard features?",
      a: "Only verified accounts carrying 'admin' role claims inside their decrypted JWT profile can access dashboard pages, view global reservation logs, alter zone capacities, or edit rates.",
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8 w-full">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
          >
            F.A.Q.
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-black text-foreground"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-sm md:text-base text-muted-foreground"
          >
            Find quick answers to common queries regarding reservations, safety configurations, pricing, and system parameters.
          </motion.p>
        </div>

        {/* Accordions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                <AccordionTrigger className="font-heading text-sm md:text-base font-bold text-foreground hover:text-secondary hover:no-underline text-left py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}