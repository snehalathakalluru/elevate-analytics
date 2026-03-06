import {
  FileText,
  LayoutDashboard,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboards",
    description:
      "Monitor your KPIs with live data refreshing every second. Build beautiful, interactive dashboards in minutes — no code required.",
    color: "text-primary",
    bg: "from-primary/15 to-primary/5",
    border: "border-primary/20",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Our AI engine automatically surfaces anomalies, trends, and actionable recommendations from your raw data 24/7.",
    color: "text-chart-3",
    bg: "from-chart-3/15 to-chart-3/5",
    border: "border-chart-3/20",
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description:
      "Build scheduled or on-demand reports with drag-and-drop simplicity. Share as PDF, Excel, or a shareable link.",
    color: "text-chart-2",
    bg: "from-chart-2/15 to-chart-2/5",
    border: "border-chart-2/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Comment on charts, tag teammates, and share dashboards with granular access controls. Analytics, together.",
    color: "text-chart-4",
    bg: "from-chart-4/15 to-chart-4/5",
    border: "border-chart-4/20",
  },
  {
    icon: Plug,
    title: "50+ Integrations",
    description:
      "Connect Salesforce, HubSpot, Stripe, Google Analytics, BigQuery, Snowflake, and dozens more in one click.",
    color: "text-chart-1",
    bg: "from-chart-1/15 to-chart-1/5",
    border: "border-chart-1/20",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified, end-to-end encryption, SSO via SAML/OIDC, and fine-grained role-based access control.",
    color: "text-chart-5",
    bg: "from-chart-5/15 to-chart-5/5",
    border: "border-chart-5/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
            Everything You Need
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Built for Modern
            <span className="text-gradient-cyan"> Data Teams</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From real-time monitoring to AI-generated reports, Elevate gives
            your team every tool needed to go from raw data to confident
            decisions.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="glow-card rounded-xl p-6 bg-card border border-border/60 relative overflow-hidden group cursor-default"
              >
                {/* Top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${feature.color}`}
                />

                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>

                <h3 className="font-display font-bold text-base mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
