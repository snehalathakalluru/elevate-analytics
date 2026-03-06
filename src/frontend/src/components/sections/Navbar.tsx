import { Button } from "@/components/ui/button";
import { BarChart3, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-lg feature-icon-bg flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
              <BarChart3 className="w-4.5 h-4.5 text-primary" size={18} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-foreground">Elevate</span>
              <span className="text-gradient-cyan"> Analytics</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/40"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Button
              size="sm"
              data-ocid="nav.get_started_button"
              onClick={() => {
                const el = document.getElementById("pricing");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 px-5"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden nav-blur border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/40"
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-border">
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
                  data-ocid="nav.get_started_button"
                  onClick={() => {
                    setMobileOpen(false);
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
