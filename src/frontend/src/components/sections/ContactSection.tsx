import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const { actor } = useActor();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    try {
      if (actor) {
        await actor.signupNewsletter(newsletterEmail.trim());
      }
      setNewsletterStatus("success");
      setNewsletterEmail("");
      toast.success("You're subscribed! Welcome to the Elevate newsletter.");
    } catch {
      setNewsletterStatus("error");
      toast.error("Failed to subscribe. Please try again.");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim())
      return;
    setContactStatus("loading");
    try {
      if (actor) {
        await actor.submitContactForm(
          contactName.trim(),
          contactEmail.trim(),
          contactMessage.trim(),
        );
      }
      setContactStatus("success");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      toast.success("Message sent! We'll get back to you within 2 hours.");
    } catch {
      setContactStatus("error");
      toast.error("Failed to send message. Please try again.");
      setTimeout(() => setContactStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
            Get In Touch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Let's Talk Data
            <span className="text-gradient-cyan"> Strategy</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you have a specific question or want to explore what Elevate
            can do for your organization, our team is ready.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Newsletter */}
          <motion.div
            className="glow-card rounded-xl bg-card border border-border/60 p-7"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg feature-icon-bg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                Stay in the Loop
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Get product updates, analytics tips, and industry insights
              delivered to your inbox. No spam, ever. Unsubscribe anytime.
            </p>

            {newsletterStatus === "success" ? (
              <div
                data-ocid="newsletter.success_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-chart-2/10 border border-chart-2/25 text-sm text-chart-2"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">
                  You're subscribed! Welcome aboard.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    data-ocid="newsletter.input"
                    required
                    disabled={newsletterStatus === "loading"}
                    className="bg-muted/40 border-border focus:border-primary/60 pr-4 h-11"
                  />
                </div>

                {newsletterStatus === "error" && (
                  <div
                    data-ocid="newsletter.error_state"
                    className="flex items-center gap-2 text-xs text-destructive"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="newsletter.submit_button"
                  disabled={
                    newsletterStatus === "loading" || !newsletterEmail.trim()
                  }
                  className="bg-primary text-primary-foreground hover:opacity-90 font-semibold h-11 shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  {newsletterStatus === "loading" ? (
                    <>
                      <Loader2
                        data-ocid="newsletter.loading_state"
                        className="mr-2 w-4 h-4 animate-spin"
                      />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe to Newsletter"
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="glow-card rounded-xl bg-card border border-border/60 p-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              Send Us a Message
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              We'll get back to you within 2 business hours.
            </p>

            {contactStatus === "success" ? (
              <div
                data-ocid="contact.success_state"
                className="flex items-center gap-3 p-4 rounded-xl bg-chart-2/10 border border-chart-2/25 text-sm text-chart-2"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">
                  Message received! We'll be in touch shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Jane Smith"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    data-ocid="contact.name_input"
                    required
                    disabled={contactStatus === "loading"}
                    className="bg-muted/40 border-border focus:border-primary/60 h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-email"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="jane@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    data-ocid="contact.email_input"
                    required
                    disabled={contactStatus === "loading"}
                    className="bg-muted/40 border-border focus:border-primary/60 h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your data challenges or what you'd like to achieve..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    data-ocid="contact.textarea"
                    required
                    disabled={contactStatus === "loading"}
                    rows={4}
                    className="bg-muted/40 border-border focus:border-primary/60 resize-none"
                  />
                </div>

                {contactStatus === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-2 text-xs text-destructive"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Failed to send. Please try again.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={
                    contactStatus === "loading" ||
                    !contactName.trim() ||
                    !contactEmail.trim() ||
                    !contactMessage.trim()
                  }
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold h-11 shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  {contactStatus === "loading" ? (
                    <>
                      <Loader2
                        data-ocid="contact.loading_state"
                        className="mr-2 w-4 h-4 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
