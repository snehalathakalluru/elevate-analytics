import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

function DashboardIllustration() {
  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-3xl scale-110" />

      {/* Dashboard frame */}
      <div className="relative rounded-2xl glass-surface p-4 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-chart-3/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-chart-2/70" />
          </div>
          <div className="flex-1 h-4 bg-muted/40 rounded-full mx-4" />
          <div className="w-16 h-4 bg-primary/20 rounded-full" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            {
              label: "Revenue",
              value: "$2.4M",
              change: "+18%",
              color: "text-chart-2",
            },
            {
              label: "Users",
              value: "84.2K",
              change: "+31%",
              color: "text-primary",
            },
            {
              label: "Churn",
              value: "1.2%",
              change: "-0.3%",
              color: "text-chart-3",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-muted/30 rounded-xl p-3 border border-border/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="text-xs text-muted-foreground mb-0.5">
                {stat.label}
              </div>
              <div className="text-sm font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className={`text-xs font-semibold ${stat.color}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main chart area */}
        <div className="bg-muted/20 rounded-xl p-3 border border-border/40 mb-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-foreground">
              Monthly Revenue
            </span>
            <span className="text-xs text-muted-foreground">
              Last 12 months
            </span>
          </div>
          <svg
            viewBox="0 0 280 80"
            className="w-full h-16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 26.7}
                x2="280"
                y2={i * 26.7}
                stroke="oklch(0.26 0.025 252)"
                strokeWidth="0.5"
              />
            ))}
            {/* Area fill */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="oklch(0.75 0.16 204)"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.75 0.16 204)"
                  stopOpacity="0.02"
                />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,65 L23,55 L46,45 L69,50 L92,38 L115,42 L138,30 L161,25 L184,20 L207,15 L230,10 L253,8 L280,5 L280,80 L0,80 Z"
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            />
            {/* Line */}
            <motion.path
              d="M0,65 L23,55 L46,45 L69,50 L92,38 L115,42 L138,30 L161,25 L184,20 L207,15 L230,10 L253,8 L280,5"
              fill="none"
              stroke="oklch(0.75 0.16 204)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset="400"
              style={{
                filter: "drop-shadow(0 0 4px oklch(0.75 0.16 204 / 0.6))",
              }}
              initial={{ strokeDashoffset: 400 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
            />
            {/* Dot at end */}
            <motion.circle
              cx="280"
              cy="5"
              r="3.5"
              fill="oklch(0.75 0.16 204)"
              style={{ filter: "drop-shadow(0 0 6px oklch(0.75 0.16 204))" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.3, duration: 0.3 }}
            />
          </svg>
        </div>

        {/* Bottom row */}
        <div className="flex gap-2">
          <div className="flex-1 bg-muted/20 rounded-lg p-2.5 border border-border/40">
            <div className="text-xs text-muted-foreground mb-1">
              Top Channel
            </div>
            <div className="flex gap-1 mt-1">
              {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
                <motion.div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static bar chart items
                  key={i}
                  className="flex-1 bg-primary/60 rounded-sm"
                  style={{ height: `${h * 0.3}px` }}
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1, originY: 1 }}
                  transition={{ delay: 1.0 + i * 0.05, duration: 0.4 }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-muted/20 rounded-lg p-2.5 border border-border/40">
            <div className="text-xs text-muted-foreground mb-1">Conversion</div>
            <div className="mt-1.5 relative h-5 bg-muted/40 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-primary/80 to-primary"
                style={{
                  filter: "drop-shadow(0 0 4px oklch(0.75 0.16 204 / 0.5))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "67%" }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground z-10">
                67%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        className="absolute -top-3 -right-3 bg-chart-2/20 border border-chart-2/40 rounded-xl px-3 py-2 text-xs font-semibold text-chart-2 hidden sm:flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-chart-2 animate-pulse" />
        AI Insight Ready
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-chart-4/5 blur-[80px]" />
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now in Public Beta — Try it Free
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Turn Data Into
              <br />
              <span className="text-gradient-cyan">Decisions</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unlock the full potential of your business data. Elevate Analytics
              connects all your sources, surfaces AI-powered insights, and helps
              your team act faster than ever before.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                data-ocid="hero.primary_button"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-primary-foreground hover:opacity-90 font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 text-base px-8 h-12"
              >
                Start Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.secondary_button"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-border hover:border-primary/50 hover:bg-accent/40 font-semibold text-foreground text-base px-8 h-12 gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Play className="w-3 h-3 text-primary ml-0.5" />
                </div>
                See a Demo
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                {["EC", "MT", "SR", "JL"].map((initials) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-chart-4/30 border-2 border-background flex items-center justify-center text-[9px] font-bold text-foreground"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span>
                Trusted by{" "}
                <strong className="text-foreground font-semibold">
                  2,400+
                </strong>{" "}
                data teams worldwide
              </span>
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <div className="w-full">
            <DashboardIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
