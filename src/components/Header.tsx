import { useState, useEffect } from "react";
import { Menu, X, PhoneCall, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  activeSection: string;
}

export default function Header({ onScrollToSection, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", name: "About" },
    { id: "services", name: "Services & Products" },
    { id: "planner", name: "Sizing Calculator" },
    { id: "contact", name: "Contact Inquiry" }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center gap-6 lg:gap-10">
            

            {/* Clickable Logo targeting Home */}
            <button
              id="header-logo-btn"
              onClick={() => {
                onScrollToSection("hero");
              }}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/10 rounded-xl transition-all hover:scale-[1.01] shrink-0 flex items-center justify-center p-0"
            >
              <Logo 
                variant="header"
                id="header-logo-img"
              />
            </button>

            {/* Desktop Navigation links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8 font-display shrink-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-red-600 rounded"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs / Call Direct Button */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-4 shrink-0">
              <a
                id="header-phone-cta"
                href="tel:+919591984646"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-xs font-medium border border-white/10 px-3 py-2 rounded-xl hover:bg-white/5 shrink-0"
              >
                <PhoneCall className="h-3.5 w-3.5 text-red-500" /> <span className="font-mono whitespace-nowrap">+91 95919 84646</span>
              </a>

              <button
                id="header-planner-cta"
                onClick={() => handleNavClick("planner")}
                className="bg-red-600 hover:bg-red-500 text-white font-display font-semibold py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/10 hover:shadow-red-600/20 active:scale-95 hover:translate-y-[-1px] shrink-0 whitespace-nowrap"
              >
                Sizing Quote <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mobile Interaction Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                id="mobile-call-icon"
                href="tel:+919591984646"
                className="h-9 w-9 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-900/40"
              >
                <PhoneCall className="h-4 w-4 text-red-500" />
              </a>
              
              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="h-9 w-9 rounded-xl border border-white/10 flex items-center justify-center text-slate-300 hover:text-white focus:outline-none bg-slate-900/40 cursor-pointer transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Panel Layer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[60px] md:top-[68px] bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl z-40 p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-3 font-display text-sm font-semibold">
              <div className="pb-4 mb-2 border-b border-white/5 flex justify-center">
                <Logo 
                  variant="header"
                  id="mobile-menu-logo"
                />
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left py-3.5 text-slate-300 hover:text-white border-b border-white/5 cursor-pointer flex justify-between items-center transition-colors"
                >
                  <span className="tracking-wide">{item.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-red-500" />
                </button>
              ))}
              <div className="pt-4 grid grid-cols-1 gap-3">
                <a
                  id="mobile-menu-phone"
                  href="tel:+919591984646"
                  className="w-full flex items-center justify-center gap-2 text-slate-300 border border-white/10 py-3.5 rounded-xl font-medium bg-slate-900/60 text-center text-sm"
                >
                  <PhoneCall className="h-4 w-4 text-red-500" /> +91 95919 84646
                </a>
                <button
                  id="mobile-menu-planner"
                  onClick={() => handleNavClick("planner")}
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-xl font-semibold text-center cursor-pointer text-sm shadow-xl shadow-red-600/10"
                >
                  Sizing Quote Tool
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
