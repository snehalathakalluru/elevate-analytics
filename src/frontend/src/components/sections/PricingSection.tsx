import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Perfect for individuals and small experiments.",
    features: [
      "Up to 3 dashboards",
      "5 data sources",
      "7-day data history",
      "Community support",
      "Basic charts & tables",
    ],
    cta: "Start for Free",
    ocid: "pricing.free_button",
    popular: false,
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For growing teams who need speed and collaboration.",
    features: [
      "Unlimited dashboards",
      "25 data sources",
      "1-year data history",
      "Priority support",
      "AI-powered insights",
      "Team collaboration",
      "Custom reports & exports",
    ],
    cta: "Start Pro Trial",
    ocid: "pricing.pro_button",
    popular: true,
    ctaVariant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security and scale needs.",
    features: [
      "Unlimited everything",
      "Unlimited data sources",
      "Unlimited history",
      "Dedicated support",
      "SLA guarantee",
      "SAML/OIDC SSO",
      "Custom contracts & invoicing",
    ],
    cta: "Talk to Sales",
    ocid: "pricing.enterprise_button",
    popular: false,
    ctaVariant: "outline" as const,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            Simple Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Plans That Grow
            <span className="text-gradient-cyan"> With You</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No hidden fees, no vendor lock-in. Start free, upgrade when you're
            ready. Cancel anytime — seriously.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl flex flex-col ${
                plan.popular
                  ? "pricing-highlight"
                  : "bg-card border border-border/60 glow-card"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-glow whitespace-nowrap">
                    ✦ Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span
                      className={`font-display font-extrabold text-4xl leading-none ${
                        plan.popular ? "text-gradient-cyan" : "text-foreground"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm mb-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-5 ${plan.popular ? "bg-primary/20" : "bg-border"}`}
                />

                {/* Features list */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular
                            ? "bg-primary/20 border border-primary/30"
                            : "bg-muted border border-border"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <span
                        className={
                          plan.popular
                            ? "text-foreground/90"
                            : "text-muted-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  data-ocid={plan.ocid}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  className={`w-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90 shadow-glow hover:shadow-glow-lg"
                      : "border-border hover:border-primary/40 hover:bg-accent/40 text-foreground"
                  }`}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          All plans include a 14-day free trial. No credit card required to
          start.
        </motion.p>
      </div>
    </section>
  );
}
