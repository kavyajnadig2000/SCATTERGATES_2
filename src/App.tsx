import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, Target, Compass, HardDrive, CheckCircle2, Phone, Mail, 
  MapPin, Clock, ArrowRight, UserCheck, ShieldAlert, FileText,
  ShieldCheck, Network
} from "lucide-react";

// Local Subcomponents
import Header from "./components/Header";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/Footer";
import ServicesDetailed from "./components/ServicesDetailed";
import BrandsSection from "./components/BrandsSection";
import TestimonialSlider from "./components/TestimonialSlider";
import QuoteWizard from "./components/QuoteWizard";
import ContactForm from "./components/ContactForm";
import Logo from "./components/Logo";
import { ContactInquiry } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [savedInquiriesCount, setSavedInquiriesCount] = useState(0);
  const [showHistoryNotification, setShowHistoryNotification] = useState(false);
  const [latestPlanName, setLatestPlanName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitioningRef = useRef(false);

  const setTransitionState = (val: boolean) => {
    setIsTransitioning(val);
    transitioningRef.current = val;
  };

  // Gentle 900ms corporate brand introduction to smooth out layout shift and prevent white flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Refs for smooth scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Sync scroll section coordinates to highlight active link
  useEffect(() => {
    const handleScroll = () => {
      if (transitioningRef.current) return;
      const scrollPos = window.scrollY + 200;
      
      if (contactRef.current && scrollPos >= contactRef.current.offsetTop) {
        setActiveSection("contact");
      } else if (plannerRef.current && scrollPos >= plannerRef.current.offsetTop) {
        setActiveSection("planner");
      } else if (servicesRef.current && scrollPos >= servicesRef.current.offsetTop) {
        setActiveSection("services");
      } else if (aboutRef.current && scrollPos >= aboutRef.current.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check initial cached forms count
    const history = JSON.parse(localStorage.getItem("scattergates_inquiries") || "[]");
    setSavedInquiriesCount(history.length);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    if (id === "hero") targetRef = heroRef;
    if (id === "about") targetRef = aboutRef;
    if (id === "services") targetRef = servicesRef;
    if (id === "planner") targetRef = plannerRef;
    if (id === "contact") targetRef = contactRef;

    if (targetRef && targetRef.current) {
      setTransitionState(true);
      const headerElement = document.getElementById("main-header");
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const breadcrumbsElement = document.getElementById("global-breadcrumbs-bar");
      const breadcrumbsHeight = id !== "hero" ? 40 : 0; // standard breadcrumbs height including margin / padding offsets
      const elementPosition = targetRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - breadcrumbsHeight - 16;

      // Smooth step delay to allow fade-out visualization to occur before teleportation
      setTimeout(() => {
        window.scrollTo({
          top: id === "hero" ? 0 : offsetPosition,
          behavior: "smooth"
        });
        setActiveSection(id);

        setTimeout(() => {
          setTransitionState(false);
        }, 150);
      }, 200);
    }
  };

  const handleNewWizardSubmission = (data: ContactInquiry) => {
    setSavedInquiriesCount(prev => prev + 1);
    setLatestPlanName(data.company);
    setShowHistoryNotification(true);
    setTimeout(() => {
      setShowHistoryNotification(false);
    }, 5000);
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-6"
        >
          {/* Pulsing elegant logo */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center animate-pulse"
          >
            <Logo 
              variant="preloader"
              id="preloader-logo-img"
            />
          </motion.div>
          {/* Progress bar */}
          <div className="w-32 h-[2px] bg-slate-800 rounded-full overflow-hidden relative mt-2">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-red-650 via-red-500 to-rose-600 rounded-full"
            />
          </div>
        </motion.div>
      ) : (
        <div 
          key="main-app" 
          className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white antialiased"
        >
          {/* Top page loader progress bar overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                id="global-transition-progress-bar"
                initial={{ width: "0%", opacity: 1 }}
                animate={{ width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-650 via-rose-500 to-red-500 z-[99999] pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Gentle background transition scrim */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                id="global-transition-scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-slate-950 z-40 pointer-events-none"
              />
            )}
          </AnimatePresence>
          
          {/* Interactive Global Header */}
          <Header onScrollToSection={handleScrollToSection} activeSection={activeSection} />

          {/* Site dynamic Breadcrumbs trail */}
          <Breadcrumbs onScrollToSection={handleScrollToSection} activeSection={activeSection} />

          {/* Transition wrapper for scrollable page sections */}
          <motion.div
            id="page-content-wrapper"
            animate={{ 
              opacity: isTransitioning ? 0.35 : 1,
              scale: isTransitioning ? 0.992 : 1,
              filter: isTransitioning ? "blur(3px)" : "blur(0px)"
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="transition-all"
          >

      {/* Hero segment: Visual cover designed precisely based on Slide 1 */}
      <div
        id="hero"
        ref={heroRef}
        className="relative min-h-[90vh] lg:min-h-screen bg-slate-950 flex items-center overflow-hidden pt-[80px]"
      >
        {/* Navy/Charcoal Diagonal Geometric Split Background layout */}
        <div className="absolute inset-0 z-0">
          {/* Main Dark Split */}
          <div className="absolute inset-0 bg-[#070b13]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#070b13] via-[#0b121f] to-[#04080e]" />
          
          {/* Subtle Enterprise technology layer overlay with a production-safe local asset */}
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15 pointer-events-none" style={{ backgroundImage: `url('/images/hero/enterprise-technology.webp')` }} />
          
          {/* Red/Orange Accent shapes from Slide 1 Cover */}
          <div className="absolute top-[20%] right-[10%] w-[32rem] h-[32rem] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[24rem] h-[24rem] bg-rose-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Visual abstract network constellation pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Primary message column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[11px] font-mono text-red-500 font-semibold tracking-wider uppercase">
                ⚡ Slicing-edge Enterprise IT Infrastructure
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-white tracking-tight leading-[1.08] font-bold">
                Practical enterprise <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-600 tracking-tighter block mt-2">IT for offices that</span> need to stay online.
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Scattergates helps Indian businesses procure, deploy and maintain the physical technology layer: servers, networks, cabling, smart meeting rooms, endpoints and technical teams.
              </p>

              {/* Action Suite */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center font-sans">
                <button
                  id="hero-planner-btn"
                  onClick={() => handleScrollToSection("planner")}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 cursor-pointer shadow-xl shadow-red-600/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-y-[-2px]"
                >
                  Configure Sizing Quote <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  id="hero-services-btn"
                  onClick={() => handleScrollToSection("services")}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-100 border border-white/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider flex justify-center items-center hover:translate-y-[-2px] hover:text-white"
                >
                  Explore Systems Fleet
                </button>
              </div>

              {/* Client support summary metrics */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight">100%</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider block font-bold mt-1 uppercase">SLA COMPLIANCE</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight">PAN</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider block font-bold mt-1 uppercase">INDIA SOURCING</span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight">24/7</span>
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider block font-bold mt-1 uppercase">SYSTEM SUPPORT</span>
                </div>
              </div>
            </div>

            {/* Graphical slide card illustration with Red butterfly logo inside Slide (from slide design) */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0b101c]/90 border border-white/10 rounded-3xl p-6 relative shadow-2xl backdrop-blur-md"
              >
                {/* Diagonal geometric grey split representation matching Cover */}
                <div className="absolute right-0 bottom-0 top-1/2 left-1/3 bg-slate-800/5 rounded-br-3xl -skew-x-12 translate-x-4 translate-y-4 border-l border-t border-white/5 pointer-events-none animate-pulse duration-[6000ms]" />
                
                <div className="space-y-5 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      Operations Console
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  
                  {/* Outer grey container to frame the logo beautifully just like the console display */}
                  <div className="bg-[#121927] border border-white/5 rounded-2xl p-6 flex items-center justify-center min-h-[220px] relative overflow-hidden">
                    {/* Render the uploaded Scattergates logo asset directly without color or blend effects */}
                    <div className="w-full h-full flex items-center justify-center">
                      <Logo 
                        variant="console"
                        id="console-logo-img"
                      />
                    </div>
                  </div>

                  {/* 4 Custom System Specification Rows from actual operations board layout */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center bg-[#121927]/65 border border-white/5 px-4 py-3 rounded-xl transition-all hover:bg-[#121927]/80 group">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-sans text-slate-400 font-medium tracking-wide">Registered Bengaluru HQ</span>
                      </div>
                      <span className="text-[11px] font-sans font-bold text-white tracking-wide">Nagarbhavi</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#121927]/65 border border-white/5 px-4 py-3 rounded-xl transition-all hover:bg-[#121927]/80 group">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-sans text-slate-400 font-medium tracking-wide">Procurement support</span>
                      </div>
                      <span className="text-[11px] font-sans font-bold text-white tracking-wide">OEM-led</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#121927]/65 border border-white/5 px-4 py-3 rounded-xl transition-all hover:bg-[#121927]/80 group">
                      <div className="flex items-center gap-2.5">
                        <Network className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-sans text-slate-400 font-medium tracking-wide">Site coverage</span>
                      </div>
                      <span className="text-[11px] font-sans font-bold text-white tracking-wide">Pan-India</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#121927]/65 border border-white/5 px-4 py-3 rounded-xl transition-all hover:bg-[#121927]/80 group">
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-sans text-slate-400 font-medium tracking-wide">Response model</span>
                      </div>
                      <span className="text-[11px] font-sans font-bold text-white tracking-wide">SLA based</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* About Company & Core Coordinates Section (based on Slides 2 & 3) */}
      <section id="about" ref={aboutRef} className="py-20 md:py-28 relative overflow-hidden bg-slate-50/80">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 gpu-accelerated"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About copy and statistics layout */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <span className="text-xs font-mono text-red-600 font-extrabold uppercase tracking-[0.15em] block">
                01. About Corporate Entity
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
                Scattergates Business <span className="font-sans font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent tracking-tighter block mt-1 sm:inline">Solutions Pvt. Ltd.</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                Based in Bangalore, we provide IT hardware solutions, communications, and networking services across India. We deliver complete end-to-end solutions to ensure a fully functional, high-performing enterprise IT infrastructure.
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                Our core expertise covers consulting, professional staffing, outsourcing, and preventative systems maintenance, addressing the entire IT and communications wing of your organization. We cater to clients across India, offering services on an individual project basis or as a comprehensive turnkey solution, tailored to specific client requirements.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 text-slate-700">
                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border border-red-100/50 mt-0.5">✓</div>
                  <span className="font-semibold text-slate-800 text-sm leading-snug">High-performance local and database servers</span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border border-red-100/50 mt-0.5">✓</div>
                  <span className="font-semibold text-slate-800 text-sm leading-snug">Reliable routers, switches, and edge security</span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border border-red-100/50 mt-0.5">✓</div>
                  <span className="font-semibold text-slate-800 text-sm leading-snug">Structured copper & fiber optic spliced cabling</span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="h-5 w-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border border-red-100/50 mt-0.5">✓</div>
                  <span className="font-semibold text-slate-800 text-sm leading-snug">Contract and permanent workforce recruitment</span>
                </div>
              </div>
            </div>

            {/* Key feature block widgets */}
            <div className="lg:col-span-12 xl:col-span-5 grid grid-cols-1 gap-6">
              
              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-4 premium-card group cursor-default">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:rotate-3 transition-all duration-300">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base tracking-tight font-sans transition-colors group-hover:text-red-600">Bangalore Tech Hub Roots</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Strategically registered in Nagarbhavi, Bengaluru, aligning support dispatch channels directly adjacent to secondary tech parks.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-4 premium-card group cursor-default">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:rotate-3 transition-all duration-300">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base tracking-tight font-sans transition-colors group-hover:text-red-600">Professional Staffing Vetting</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    We source, screen, and deploy elite technicians and developers using transparent SLAs for swift, secure project staffing.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-4 premium-card group cursor-default">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:rotate-3 transition-all duration-300">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base tracking-tight font-sans transition-colors group-hover:text-red-600">Turnkey Delivery Sourcing</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Choose from standard single-site installations to multi-site backbone updates with unified preventative coverage options.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Vision vs Mission visual cards (based on Slides 4 & 5) */}
          <div className="relative pt-8">
            {/* Background glowing decorations for spectacular glassmorphism backdrop-blur effect */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-red-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 font-sans">
              
              {/* Vision Card */}
              <div className="bg-white/50 backdrop-blur-xl text-slate-900 rounded-3xl p-8 relative overflow-hidden border border-white/70 shadow-xl shadow-slate-200/10 hover:shadow-2xl hover:border-red-500/20 hover:bg-white/75 transition-all duration-300 group">
                <div className="absolute top-0 right-0 p-8 text-slate-200/80 pointer-events-none group-hover:scale-110 group-hover:text-red-500/10 transition-all duration-500">
                  <Target className="h-28 w-28 text-slate-200/40" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex gap-2 items-center text-[10px] font-mono text-red-600 font-extrabold tracking-[0.14em] bg-red-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-red-100 uppercase">
                    <span>02. Forward Vision</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-950 tracking-tight">Company Vision</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md font-sans font-normal">
                    Positioning ourselves as the premier global technology & outsourcing partner, our vision is to revolutionize the industry through unparalleled service excellence, relentless innovation, and an unwavering commitment to our clients' success. By leveraging technology, talent, and strategic partnerships, we aspire to be a catalyst for transformative change, empowering businesses to thrive and create a lasting impact in an ever-evolving, competitive marketplace.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white/50 backdrop-blur-xl text-slate-900 rounded-3xl p-8 relative overflow-hidden border border-white/70 shadow-xl shadow-slate-200/10 hover:shadow-2xl hover:border-red-500/20 hover:bg-white/75 transition-all duration-300 group">
                <div className="absolute top-0 right-0 p-8 text-slate-200/80 pointer-events-none group-hover:scale-110 group-hover:text-red-500/10 transition-all duration-500">
                  <Compass className="h-28 w-28 text-slate-200/40" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex gap-2 items-center text-[10px] font-mono text-red-600 font-extrabold tracking-[0.14em] bg-red-50/80 backdrop-blur-sm px-3 py-1 rounded-full border border-red-100 uppercase">
                    <span>03. Sourcing Mission</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-950 tracking-tight">Company Mission</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md font-sans font-normal">
                    We transform businesses through strategic partnerships that optimize processes, reduce costs, and drive innovation. Our mission is to empower organizations to focus on their core strengths while we handle the rest—helping them achieve their goals and exceed expectations in a dynamic global marketplace. With integrity, agility, and an unwavering commitment to excellence, we deliver measurable success and build lasting relationships founded on trust and mutual growth.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* Services, detailed structured points & Hardware Ecosystem Portfolio Section (Slide 6, 7, 8, 9, 10, 11, 12, 13) */}
      <section id="services" ref={servicesRef} className="py-20 md:py-28 bg-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 gpu-accelerated"
        >
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-red-600 font-extrabold uppercase tracking-[0.15em] block">
              02 / SERVICES & SYSTEMS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-tight">
              Enterprise Systems & <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 tracking-tighter block mt-1">Technical Outsourcing</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans">
              We engineer robust systems networks, splice high speed copper and fiber optic pipelines, design smart boardroom conferences, and source experienced IT specialists.
            </p>
          </div>

          {/* Tabbed Interactive services panels + Hardware fleet */}
          <ServicesDetailed onSelectWizard={() => handleScrollToSection("planner")} />

        </motion.div>
      </section>

      {/* Authorized OEM Brand Partnerships */}
      <BrandsSection />

      {/* Corporate Clients Social Proof Testimonials */}
      <TestimonialSlider />

      {/* Sizing Quote Multi-Step interactive wizard */}
      <section id="planner" ref={plannerRef} className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 gpu-accelerated"
        >
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-red-500 font-extrabold uppercase tracking-[0.15em] block">
              03 / INTERACTIVE CALCULATOR
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Instant Solution <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 tracking-tighter block mt-1">Configurator</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Skip complex assessment consultations. Check off physical server sizes, structured cabling metrics, or staffing requirements below to compile a custom RFC budget strategy instantly.
            </p>
          </div>

          {/* High fidelity Multi step Form card */}
          <div className="max-w-4xl mx-auto">
            <QuoteWizard onSubmitSuccess={handleNewWizardSubmission} />
          </div>

        </motion.div>
      </section>

      {/* Contact Hub, बेंगलुरु Region mapping coordinates, email click vectors */}
      <section id="contact" ref={contactRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 gpu-accelerated"
        >
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-red-600 font-extrabold uppercase tracking-[0.15em] block">
              04 / GLOBAL CONTACTS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Initiate Corporate <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 tracking-tighter block mt-1">Inquiries & Proposals</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
              Our regional dispatch offices in Nagarbhavi, Bangalore are ready to coordinate site visits, draft service SLAs, or dispatch permanent IT experts.
            </p>
          </div>

          {/* Validated form + detailed Coordinates card grid */}
          <ContactForm />

        </motion.div>
      </section>

      {/* Interactive Global Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

          </motion.div>

      {/* Persistent History Submission Toast Notification Notification with Framer motion */}
      <AnimatePresence>
        {showHistoryNotification && (
          <motion.div
            id="history-submit-toast"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-800 p-5 rounded-2xl shadow-2xl z-50 flex items-start gap-3 max-w-sm"
          >
            <div className="h-8 w-8 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-red-500 font-bold uppercase">Sizing Inquiry Sent</span>
              <span className="font-bold text-sm block leading-snug">
                Sizing plan logged successfully for {latestPlanName}!
              </span>
              <p className="text-slate-500 text-[10px] leading-relaxed">
                Total submissions recorded: <span className="text-white font-semibold">{savedInquiriesCount}</span>. Your requirements are preserved for offline follow-up.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
