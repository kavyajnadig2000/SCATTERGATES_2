import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Home, LayoutGrid, Calculator, Mail, Users } from "lucide-react";

interface BreadcrumbsProps {
  activeSection: string;
  onScrollToSection: (id: string) => void;
}

export default function Breadcrumbs({ activeSection, onScrollToSection }: BreadcrumbsProps) {
  // If we are on the hero segment, we don't display the breadcrumb bar to preserve the immersive hero design
  const showBreadcrumbs = activeSection !== "hero";

  const getSectionMetadata = (section: string) => {
    switch (section) {
      case "about":
        return {
          label: "About Corporate Entity",
          icon: <Users className="h-3.5 w-3.5 text-red-500 shrink-0" />,
          id: "about"
        };
      case "services":
        return {
          label: "Services & Systems Fleet",
          icon: <LayoutGrid className="h-3.5 w-3.5 text-red-500 shrink-0" />,
          id: "services"
        };
      case "planner":
        return {
          label: "Instant Sizing Calculator",
          icon: <Calculator className="h-3.5 w-3.5 text-red-500 shrink-0" />,
          id: "planner"
        };
      case "contact":
        return {
          label: "Systems RFP Intake Unit",
          icon: <Mail className="h-3.5 w-3.5 text-red-500 shrink-0" />,
          id: "contact"
        };
      default:
        return {
          label: "Enterprise Portal",
          icon: null,
          id: "hero"
        };
    }
  };

  const currentMetadata = getSectionMetadata(activeSection);

  return (
    <AnimatePresence>
      {showBreadcrumbs && (
        <motion.div
          id="global-breadcrumbs-bar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-[74px] md:top-[80px] left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-2.5 transition-all"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none">
              
              {/* Home node link */}
              <button
                id="breadcrumb-node-home"
                onClick={() => onScrollToSection("hero")}
                className="flex items-center gap-1 text-slate-700 hover:text-red-650 transition-colors uppercase font-bold tracking-wider cursor-pointer py-1 px-1.5 rounded-md hover:bg-slate-50"
              >
                <Home className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>Home</span>
              </button>

              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />

              {/* Company Level node */}
              <span className="text-slate-400 select-none uppercase tracking-wider font-semibold">Scattergates</span>

              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />

              {/* Current Active Section node layout */}
              <div 
                id="breadcrumb-active-node"
                className="flex items-center gap-1.5 bg-slate-100 text-[#0f172a] py-1 px-2.5 rounded-lg border border-slate-200/40 font-bold uppercase tracking-wider text-[10px]"
              >
                {currentMetadata.icon}
                <span>{currentMetadata.label}</span>
              </div>

            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
