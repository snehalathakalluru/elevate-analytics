import { Database, Lightbulb, Share2 } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    step: "01",
    icon: Database,
    title: "Connect Your Data Sources",
    description:
      "Link any database, SaaS app, or API using our one-click connectors. Elevate syncs automatically — historical and live data, unified in minutes.",
    color: "text-primary",
    iconBg: "from-primary/20 to-primary/5",
    border: "border-primary/25",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Explore Auto-Generated Insights",
    description:
      "Our AI engine instantly maps relationships, spots anomalies, and generates plain-language summaries — no SQL needed. Insights surface before you even ask.",
    color: "text-chart-3",
    iconBg: "from-chart-3/20 to-chart-3/5",
    border: "border-chart-3/25",
  },
  {
    step: "03",
    icon: Share2,
    title: "Share Reports With Your Team",
    description:
      "Export polished reports or share live dashboards with one link. Set up automated delivery on a schedule, or embed charts directly in Slack, Notion, and more.",
    color: "text-chart-2",
    iconBg: "from-chart-2/20 to-chart-2/5",
    border: "border-chart-2/25",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            Simple Process
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Up and Running in
            <span className="text-gradient-cyan"> Under 10 Minutes</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No lengthy setup, no data engineering required. Three steps and your
            entire organization is making smarter decisions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/30 via-chart-3/30 to-chart-2/30 z-0" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className="flex flex-col items-center text-center md:items-start md:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.iconBg} border ${step.border} flex items-center justify-center relative z-10 bg-card shadow-card`}
                    >
                      <Icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground z-20">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step number text */}
                  <div
                    className={`text-sm font-bold font-mono mb-1 ${step.color} opacity-70`}
                  >
                    Step {step.step}
                  </div>

                  <h3 className="font-display font-bold text-xl mb-3 text-foreground leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
