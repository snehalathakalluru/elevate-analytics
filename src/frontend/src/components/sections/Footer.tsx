import { BarChart3 } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: SiX, href: "https://twitter.com", label: "Twitter / X" },
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 bg-card/40 relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 mb-3 group"
            >
              <div className="w-8 h-8 rounded-lg feature-icon-bg flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <BarChart3 className="w-4 h-4 text-primary" size={16} />
              </div>
              <span className="font-display font-bold text-base">
                <span className="text-foreground">Elevate</span>
                <span className="text-gradient-cyan"> Analytics</span>
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The analytics platform that turns your business data into
              confident, data-driven decisions. Built for teams who move fast.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Follow Us
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-accent/40 transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Elevate Analytics. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
