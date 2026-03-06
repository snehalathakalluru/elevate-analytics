import { Quote } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "Elevate Analytics completely transformed how our finance team operates. We went from weekly spreadsheet reviews to real-time visibility — our month-end close is now 3 days faster.",
    name: "Elena Castillo",
    title: "VP of Finance",
    company: "Meridian Ventures",
    initials: "EC",
    color: "from-primary/30 to-chart-4/20",
  },
  {
    quote:
      "The AI insights feature is unlike anything I've used before. It found a $400K revenue leak in our billing pipeline within the first week. The ROI was immediate and undeniable.",
    name: "Marcus Tran",
    title: "Head of Revenue Operations",
    company: "Orbit Software",
    initials: "MT",
    color: "from-chart-3/30 to-primary/20",
  },
  {
    quote:
      "We had 12 different data tools before Elevate. Now we have one. Our engineers can actually focus on building instead of maintaining pipelines. Setup took less than a day.",
    name: "Priya Sharma",
    title: "CTO",
    company: "Luminary Health",
    initials: "PS",
    color: "from-chart-2/30 to-chart-3/20",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
            Customer Stories
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Loved by Teams Who
            <span className="text-gradient-cyan"> Move Fast</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From early-stage startups to Fortune 500 companies, data leaders
            trust Elevate to power their most critical decisions.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glow-card rounded-xl p-6 bg-card border border-border/60 flex flex-col relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg feature-icon-bg flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1 mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-xs font-bold text-foreground border border-border/60`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.title} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: "2,400+", label: "Active Teams" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "< 10min", label: "Avg. Setup Time" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-card border border-border/60"
            >
              <div className="font-display text-2xl font-extrabold text-gradient-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
