import { ArrowUp, PhoneCall, Mail, MapPin, Shield, CheckCircle2, Cloud } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { id: "about", name: "Corporate Info" },
    { id: "services", name: "Systems & Hardwares" },
    { id: "planner", name: "Sizing Calculator" },
    { id: "contact", name: "Contact Inquiry" }
  ];

  return (
    <footer id="main-footer" className="bg-black text-slate-400 border-t border-slate-900 overflow-hidden relative">
      
      {/* Absolute high-contrast design grid on the background */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/10 via-transparent to-transparent pointer-events-none" />

      {/* Primary footer layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Column */}
          <div className="md:col-span-5 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => {
                onScrollToSection("hero");
              }}
              className="text-left cursor-pointer focus:outline-none transition-all hover:scale-[1.01] inline-block p-0"
            >
              <Logo 
                variant="footer"
                id="footer-logo-img"
              />
            </button>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Scattergates Business Solutions Private Limited deliver structured cabling, active network infrastructures, high-performance servers, smart conferencing boardrooms, and professional IT personnel sourcing across India.
            </p>
            <div className="flex gap-4 items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono tracking-wider uppercase text-slate-500">
                REGISTERED PAN-INDIA PROVIDER
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-5">
            <span className="text-[11px] font-sans font-black tracking-[0.15em] text-slate-200 uppercase block">
              Organizational Links
            </span>
            <ul className="space-y-4 font-sans text-xs text-slate-400">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-link-${link.id}`}
                    onClick={() => onScrollToSection(link.id)}
                    className="hover:text-slate-100 font-medium transition-colors cursor-pointer flex items-center gap-1.5 hover:translate-x-1 duration-300"
                  >
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location details */}
          <div className="md:col-span-4 space-y-5">
            <span className="text-[11px] font-sans font-black tracking-[0.15em] text-slate-200 uppercase block">
              Bengaluru HQ Coordinates
            </span>
            <div className="text-xs space-y-4 font-sans">
              <a
                id="footer-location-map"
                href="https://www.google.com/maps/search/?api=1&query=Scattergates+Business+Solutions+Pvt.+Ltd.+No.+222,+3rd+Floor,+12th+Block,+2nd+Stage,+Nagarbhavi,+Bengaluru,+Karnataka+560072"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 items-start group hover:text-slate-100 transition-colors"
              >
                <MapPin className="text-red-500 h-4 w-4 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                  Scattergates Business Solutions Pvt. Ltd.<br />
                  No. 222, 3rd Floor, 12th Block, 2nd Stage,<br />
                  Nagarbhavi, Bengaluru, Karnataka, India - 560072.
                </span>
              </a>
              <p className="flex gap-2.5 items-center">
                <PhoneCall className="text-red-500 h-3.5 w-3.5 shrink-0" />
                <a href="tel:+919591984646" className="hover:text-slate-100 font-medium transition-all text-slate-400">
                  +91 95919 84646
                </a>
              </p>
              <p className="flex gap-2.5 items-center">
                <Mail className="text-red-500 h-3.5 w-3.5 shrink-0" />
                <a href="mailto:business@scattergates.com" className="hover:text-slate-100 font-medium transition-all text-slate-400">
                  business@scattergates.com
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Divider and back to top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-500 tracking-wide">
          <div>
            <span>© {new Date().getFullYear()} Scattergates Business Solutions Pvt. Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              id="btn-scroll-top"
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group font-semibold"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
