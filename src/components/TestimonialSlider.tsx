import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star, Building2, MapPin } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  text: string;
  avatarChar: string;
}

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Anirban Sen",
      role: "Vice President of Infrastructure",
      company: "NexaCorp Systems",
      location: "Manyata Tech Park, Bengaluru",
      rating: 5,
      text: "Scattergates provided elite engineering teams during our critical server consolidation and datacenter transition. Their structural copper and fiber splicing was flawless, reducing local networks latencies by 38% while maintaining complete zero-downtime compliance throughout the deployment.",
      avatarChar: "A"
    },
    {
      id: 2,
      name: "Director Meera Krishnan",
      role: "Chief Technology Officer",
      company: "Fintech One Bangalore",
      location: "Electronic City Phase II, Bengaluru",
      rating: 5,
      text: "The enterprise network room installation at our primary headquarters was completed 10 days ahead of our original SLA timetable. Sourcing and server configuration were handled seamlessly. Their preventative systems maintenance has kept our financial services pipeline running at absolute 100% uptime.",
      avatarChar: "M"
    },
    {
      id: 3,
      name: "Col. Rajesh Gupta (Retd.)",
      role: "Head of Logistics Operations",
      company: "Bharath Logistics Solutions",
      location: "Pan-India Warehousing Network",
      rating: 5,
      text: "For our distributed delivery nodes and transit hubs, Scattergates sourced and deployed vetted, enterprise-ready systems administrators on extremely short notice. Their transparent staffing vetting, deep technical understanding, and reliable SLA guarantees make them our trusted regional service partner.",
      avatarChar: "R"
    },
    {
      id: 4,
      name: "Sarah Albright",
      role: "Managing Director of APAC Division",
      company: "Global Ventures Group",
      location: "Indiranagar Exchange Office, Bengaluru",
      rating: 5,
      text: "Our complete corporate boardroom smart AV conferencing upgrade has completely transformed cross-border stakeholder collaboration. Setting up the wireless multi-display clusters, beamforming noise-isolating hardware, and integrating it with our firewalls was executed with the highest degree of professionalism.",
      avatarChar: "S"
    }
  ];

  // Auto-play utility
  const resetTimer = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
    if (isAutoPlaying) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 7000); // 7-second rotation balance for readability
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 relative overflow-hidden bg-white border-t border-b border-slate-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Visual Ambient Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono text-red-650 font-extrabold uppercase tracking-[0.15em] block">
            02.5 / CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-[#0f172a] tracking-tight leading-tight">
            Trusted by Elite <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600 tracking-tighter block mt-1">Enterprise Partners</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Discover how we design, optimize, and maintain critical systems infrastructure for industry leaders across Indian technology hubs.
          </p>
        </div>

        {/* Testimonials Slider Main Interactive Card */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          <div className="relative bg-slate-50/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-16 border border-slate-200/50 shadow-xl shadow-slate-100/40 overflow-hidden">
            
            {/* Elegant Quote Graphic Decortation */}
            <div className="absolute top-8 right-8 text-red-500/10 pointer-events-none">
              <Quote className="h-28 w-28 rotate-180" />
            </div>

            <div className="min-h-[280px] sm:min-h-[220px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Rating Stars Panel */}
                  <div className="flex gap-1 items-center" id={`stars-rating-${current.id}`}>
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  {/* Review Text Body */}
                  <blockquote className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-sans italic relative z-10 font-[450]">
                    &ldquo;{current.text}&rdquo;
                  </blockquote>

                  {/* Client Identification Panel */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200/60">
                    <div className="flex items-center gap-4">
                      {/* Stylized Circle Letter Character Avatar Badge */}
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-display font-extrabold text-base shadow-md shadow-red-500/10 shrink-0 uppercase">
                        {current.avatarChar}
                      </div>
                      <div>
                        <span className="font-sans font-extrabold text-[#0f172a] text-sm block tracking-tight">
                          {current.name}
                        </span>
                        <span className="text-slate-500 text-xs block mt-0.5 leading-none">
                          {current.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center">
                      <div className="flex items-center gap-1.5 text-slate-900 text-xs font-bold font-mono uppercase tracking-wide">
                        <Building2 className="h-3.5 w-3.5 text-red-600 shrink-0" />
                        <span>{current.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[10px] sm:text-xs mt-1">
                        <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                        <span>{current.location}</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* Hover-State Active Tactile Controllers (Previous / Next Buttons with touch targets > 44px) */}
          <button
            id="testimonial-btn-prev"
            onClick={handlePrev}
            className="absolute left-[-10px] sm:left-[-16px] top-1/2 -translate-y-1/2 h-11 w-11 bg-white hover:bg-slate-950 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-950 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer hover:rotate-3 z-20"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            id="testimonial-btn-next"
            onClick={handleNext}
            className="absolute right-[-10px] sm:right-[-16px] top-1/2 -translate-y-1/2 h-11 w-11 bg-white hover:bg-slate-950 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-950 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer hover:-rotate-3 z-20"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

        {/* Carousel Indicator Dots Indicator HUD Row */}
        <div className="flex items-center justify-center gap-2.5 mt-8" id="testimonials-indicator-dots-hud">
          {testimonials.map((test, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={test.id}
                id={`testimonial-dot-${test.id}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-550 focus:outline-none cursor-pointer ${
                  isActive 
                    ? "w-8 bg-gradient-to-r from-red-650 to-rose-650 shadow-md shadow-red-500/10" 
                    : "w-2 bg-slate-200 hover:bg-slate-350"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
