import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What data sources does Elevate support?",
    answer:
      "Elevate supports 50+ integrations including popular databases (PostgreSQL, MySQL, BigQuery, Snowflake, Redshift), SaaS tools (Salesforce, HubSpot, Stripe, Shopify), cloud storage (S3, GCS), analytics platforms (Google Analytics, Mixpanel, Amplitude), and a REST API for custom sources. We add new integrations every month based on customer requests.",
    ocid: "faq.item.1",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. Elevate is SOC 2 Type II certified and implements end-to-end encryption for data in transit (TLS 1.3) and at rest (AES-256). We support Single Sign-On via SAML 2.0 and OIDC, role-based access control, IP allowlisting, and detailed audit logs. We never sell or share your data with third parties.",
    ocid: "faq.item.2",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, absolutely. There are no long-term contracts or cancellation fees on our Free or Pro plans. You can cancel your subscription at any time from your account settings and your access will continue until the end of your current billing period. For Enterprise plans, cancellation terms are outlined in your custom agreement.",
    ocid: "faq.item.3",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! All paid plans include a 14-day free trial with full access to every feature — no credit card required to start. You can also use our Free plan indefinitely for up to 3 dashboards and 5 data sources. We want you to experience the full value of Elevate before committing.",
    ocid: "faq.item.4",
  },
  {
    question: "What's the difference between Pro and Enterprise?",
    answer:
      "The Pro plan is designed for growing teams and includes unlimited dashboards, 25 data sources, AI-powered insights, and priority support. The Enterprise plan adds unlimited data sources, dedicated infrastructure, a 99.9% uptime SLA, SAML/OIDC SSO, custom data retention policies, a dedicated customer success manager, and the ability to negotiate custom contracts and invoicing terms.",
    ocid: "faq.item.5",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            Common Questions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Frequently Asked
            <span className="text-gradient-cyan"> Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Everything you need to know about Elevate Analytics.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.ocid}
                value={`item-${index + 1}`}
                data-ocid={faq.ocid}
                className="bg-card border border-border/60 rounded-xl overflow-hidden px-0 glow-card [&[data-state=open]]:border-primary/30"
              >
                <AccordionTrigger className="px-5 py-4 text-sm font-semibold text-foreground hover:text-foreground hover:no-underline text-left [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA below */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">
            Still have questions?{" "}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-primary hover:underline font-medium"
            >
              Contact our team
            </button>{" "}
            — we typically respond within 2 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
