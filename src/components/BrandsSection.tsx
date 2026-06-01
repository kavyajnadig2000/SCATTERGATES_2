import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Laptop, Cpu, Volume2, Video, Headphones, HardDrive, ArrowUpRight, Check } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  logoText: string;
  image: string;
  color: string;
  icon: React.ComponentType<any>;
  specifications: string[];
}

export default function BrandsSection() {
  const [activeBrandId, setActiveBrandId] = useState<string>("scattergates");

  const brands: BrandItem[] = [
    {
      id: "scattergates",
      name: "Scattergates",
      category: "Company Identity",
      tagline: "Modern brand system for digital-first enterprise partnerships",
      description: "This custom Scattergates logo embodies our signature visual identity, pairing bold geometry with an energetic red gradient and a polished dark background that enhances contrast and recognition.",
      logoText: "Scattergates",
      image: "/scattergates-logo.svg",
      color: "from-slate-900 via-red-700 to-rose-600",
      icon: Cpu,
      specifications: [
        "Custom corporate identity design",
        "Logo & visual system asset delivery",
        "Responsive brand presentation guidance",
        "Modern gradient-backed hero visuals"
      ]
    },
    {
      id: "lenovo",
      name: "Lenovo",
      category: "Enterprise Computing",
      tagline: "Compute power built for high-scale productivity",
      description: "As certified Lenovo distributors, Scattergates delivers extreme computational performance directly to your teams. From legendary ThinkPad series notebooks designed for field resilience, to ThinkCentre desktop units and ThinkSystem scalable server racks, we manage sizing, deployment, imaging, and full OEM warranty maintenance.",
      logoText: "Lenovo.",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
      color: "from-red-600 to-rose-700",
      icon: Laptop,
      specifications: [
        "ThinkPad T & L Series Laptops",
        "ThinkCentre Tiny Form-Factor Desktops",
        "ThinkStation CAD Workstations",
        "OEM Warranty Integration & Support"
      ]
    },
    {
      id: "hp",
      name: "HP",
      category: "Enterprise Infrastructure",
      tagline: "Uncompromised performance and absolute failover compute",
      description: "Our partnership with HP brings robust ProLiant rack systems, high-density computing clusters, and modern EliteBook user endpoints to your Bangalore or pan-India office clusters. Engineered for continuous database execution, virtualization, and advanced cybersecurity protocols right out of the box.",
      logoText: "hp",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-600 to-indigo-700",
      icon: Cpu,
      specifications: [
        "ProLiant DL360 & DL380 Server Arrays",
        "EliteBook & ProBook Secure Endpoints",
        "Z-Series Extreme Graphics Stations",
        "Integrated Lights Out (iLO) Management"
      ]
    },
    {
      id: "jabra",
      name: "Jabra",
      category: "Unified Communications",
      tagline: "Acoustic perfection for the modern hybrid office",
      description: "Eliminate low-bandwidth speaker issues and remote worker strain. We deploy certified Jabra workspace products that feature advanced background active noise canceling, crystal-clear beamforming microphone arrays, and intelligent 180-degree panoramic boardroom setups.",
      logoText: "Jabra GN",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
      color: "from-amber-500 to-yellow-600",
      icon: Volume2,
      specifications: [
        "Jabra Speak 710 & 750 Speakerphones",
        "Evolve2 Active Noise-Cancelling Headsets",
        "PanaCast 50 Panoramic Video Bars",
        "Direct Microsoft Teams & Zoom Certified"
      ]
    },
    {
      id: "logitech",
      name: "Logitech",
      category: "Smart Boardrooms & AV",
      tagline: "Immersive video collaboration on real desktop budgets",
      description: "Scattergates installs and calibrates high-fidelity Logitech video conference packages across boardrooms of all capacities. With automated camera PTZ panning, intelligent speaker tracking, and simple one-tap controller hubs, your next virtual briefing is just a click away.",
      logoText: "logitech",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      color: "from-emerald-500 to-teal-600",
      icon: Video,
      specifications: [
        "Logitech Rally Bar & Rally Plus",
        "Tap IP Meeting Controller Panels",
        "MX Master Ergonomic Peripherals",
        "RightSense Intelligent Studio Auto-Framing"
      ]
    },
    {
      id: "epos",
      name: "EPOS",
      category: "High-Fidelity Office Audio",
      tagline: "Premium sound systems engineered for high density staffing",
      description: "Designed for intensive call centers, technical staffing setups, and premium engineering focus rooms, EPOS audio technology provides brainadapt adaptive hearing support. This minimizes call-fatigue and boosts operational communications clarity exponentially.",
      logoText: "EPOS",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-600 to-fuchsia-700",
      icon: Headphones,
      specifications: [
        "IMPACT Premium Office Series Headsets",
        "ADAPT Business ANC Mobile Solutions",
        "EXPAND High-Fidelity Conference Pods",
        "EPOS Connect Enterprise Audio Management"
      ]
    },
    {
      id: "stellar",
      name: "Stellar",
      category: "Data Care & Storage Recovery",
      tagline: "Absolute hardware recovery & data backup systems",
      description: "Ensure flawless disaster prevention. In co-partnership with Stellar diagnostics, we integrate robust continuous data care platforms, RAID server recovery routines, redundant NAS storage arrays, and secure software sanitization systems matching highest compliance models.",
      logoText: "stellar",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      color: "from-orange-500 to-red-600",
      icon: HardDrive,
      specifications: [
        "Stellar Enterprise Data Recovery Software",
        "RAID, NAS & SAN Physical Data Reclamation",
        "Secure Hardware Sanitization Systems",
        "Preventative Fault-Tolerance Testing"
      ]
    }
  ];

  const activeIndex = brands.findIndex(b => b.id === activeBrandId);
  const activeBrand = brands[activeIndex];

  return (
    <section id="brands" className="py-20 md:py-28 relative overflow-hidden bg-slate-50 border-b border-slate-100">
      {/* Absolute decorative gradient glow to reinforce visual beauty and glassmorphism */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-400/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-red-600 font-semibold uppercase tracking-wider block">
            02. Portfolio Brands
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-[#0f172a] tracking-tight leading-tight">
            Authorized OEM <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 tracking-tighter block mt-1">Partnerships</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            We partner with stellar, industry-leading hardware and communications organizations to deliver certified computing equipment and structural system warranties.
          </p>
        </div>

        {/* Brand Sliding Interactive Dashboard with extreme polish, glass effects, and animations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand Buttons List Column (Touch target 44px responsive) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono font-semibold text-slate-400 block mb-2 uppercase tracking-wider">
              Select Manufacturer
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {brands.map((b) => {
                const isSelected = b.id === activeBrandId;
                const BrandIcon = b.icon;
                return (
                  <button
                    key={b.id}
                    id={`brand-tab-${b.id}`}
                    onClick={() => setActiveBrandId(b.id)}
                    className={`px-5 py-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 transform cursor-pointer group min-w-0 ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.02]"
                        : "bg-white/70 backdrop-blur-md text-slate-700 border-slate-200/55 hover:border-slate-300 hover:bg-white hover:shadow-md hover:scale-[1.01]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 mr-2">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${
                        isSelected 
                          ? `bg-gradient-to-br ${b.color} text-white shadow-md shadow-black/20` 
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/70"
                      }`}>
                        <BrandIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <span className={`font-sans font-extrabold text-sm block tracking-tight ${
                          isSelected ? "text-white" : "text-slate-900"
                        }`}>
                          {b.name}
                        </span>
                        <span className={`text-[10px] block font-mono truncate ${
                          isSelected ? "text-slate-300" : "text-slate-500"
                        }`} title={b.category}>
                          {b.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="shrink-0">
                      <ArrowUpRight className={`h-4 w-4 transition-all duration-350 ${
                        isSelected ? "text-white rotate-45 scale-110" : "text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Slide Panel Display (Glassmorphism + Smooth Framer Motion transitions) */}
          <div className="lg:col-span-8 min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl overflow-hidden flex flex-col md:flex-row h-full transition-all duration-300"
                style={{
                  boxShadow: `0 20px 40px -15px rgba(15, 23, 42, 0.05), 0 30px 60px -30px rgba(${                    activeBrand.id === "scattergates" ? "181, 18, 79" : // Custom Scattergates deep red                    activeBrand.id === "lenovo" ? "220, 38, 38" : // Red
                    activeBrand.id === "hp" ? "37, 99, 235" : // Blue
                    activeBrand.id === "jabra" ? "245, 158, 11" : // Amber/Yellow
                    activeBrand.id === "logitech" ? "16, 185, 129" : // Emerald
                    activeBrand.id === "epos" ? "147, 51, 234" : // Purple
                    "249, 115, 22" // Orange for Stellar
                  }, 0.12)`
                }}
              >
                {/* Brand Visual Segment */}
                <div className="md:w-5/12 relative min-h-[220px] md:min-h-auto overflow-hidden bg-slate-950 shrink-0 group">
                  {activeBrand.id === "scattergates" ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-900 to-rose-600" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)] pointer-events-none" />
                      <div className="relative z-10 flex items-center justify-center h-full p-6">
                        <img
                          src={activeBrand.image}
                          alt={activeBrand.name}
                          className="max-h-[220px] w-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </>
                  ) : (
                    <img
                      src={activeBrand.image}
                      alt={activeBrand.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:brightness-[1.05] transition-all duration-[2400ms] ease-out pointer-events-none"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* High-tech tech grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                  
                  {/* Dynamic swipe scan-line effect */}
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-white/20 pointer-events-none z-10"
                  />
                  {/* Glass overcoat */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1 z-10">
                    <span className="text-[10px] font-mono text-red-500 font-extrabold tracking-widest uppercase">
                      OFFICIAL SOURCING
                    </span>
                    <h3 className="text-white font-sans font-extrabold text-lg leading-tight drop-shadow">
                      {activeBrand.name} Assets
                    </h3>
                  </div>
                </div>

                {/* Brand Copy & Sizing Info Segment */}
                <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-white/90">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between min-w-0 gap-4">
                      <span className={`text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r ${activeBrand.color} text-white font-bold uppercase tracking-wider shadow-sm truncate shrink-0`}>
                        {activeBrand.category}
                      </span>
                      <span className={`text-xl md:text-2xl font-sans font-black bg-gradient-to-r ${activeBrand.color} bg-clip-text text-transparent italic tracking-tight uppercase pl-2 pr-3.5 py-0.5 block shrink-0`}>
                        {activeBrand.logoText}
                      </span>
                    </div>

                    <div className="space-y-2">
                       <h4 className="text-xl font-display font-bold text-slate-950 tracking-tight leading-snug">
                        {activeBrand.tagline}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {activeBrand.description}
                      </p>
                    </div>
                  </div>

                  {/* Vetted Specifications List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.12em] block font-extrabold">
                      Procurement Options Available:
                    </span>
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.08
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700"
                    >
                      {activeBrand.specifications.map((spec, sIdx) => (
                        <motion.div 
                          key={sIdx}
                          variants={{
                            hidden: { opacity: 0, x: -8 },
                            show: { opacity: 1, x: 0 }
                          }}
                          className="flex gap-2.5 items-start hover:translate-x-1.5 transition-transform duration-200 min-w-0"
                        >
                          <div className={`h-4.5 w-4.5 rounded-full bg-gradient-to-br ${activeBrand.color} text-white flex items-center justify-center shrink-0 shadow-sm shadow-black/5 mt-0.5`}>
                            <Check className="h-2.5 w-2.5 stroke-[3.5]" />
                          </div>
                          <span className="font-semibold text-slate-800 text-xs sm:text-[13px] leading-tight whitespace-normal break-words">{spec}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
