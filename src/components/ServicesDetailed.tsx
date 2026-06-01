import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Network, HeartHandshake, Briefcase, HelpCircle, HardDrive, Check, ArrowRight, Laptop, Video, Layers, Shield
} from "lucide-react";

// Types
import { ServiceCategory } from "../types";
import { IMAGE_PATHS } from "../config/imagePaths";

// Animation variants for staggered entrance
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hardwareContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const hardwareItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ServicesDetailed({ onSelectWizard }: { onSelectWizard: () => void }) {
  const [activeTab, setActiveTab] = useState("infra");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: "infra",
      title: "IT Infrastructure & End-User Computing",
      shortDesc: "Comprehensive baseline architecture including custom rack server arrays, failover firewalls, high-density storage, and managed client endpoints.",
      longDesc: "Scattergates Business Solutions provides complete, certified end-to-end hardware installations aimed at ensuring a high-performance corporate operations footprint. We source directly from elite OEM partners and provide continuous support cycles.",
      imageUrl: IMAGE_PATHS.services.itInfrastructure,
      items: [
        {
          title: "High-Performance Servers & Storage",
          points: [
            "Bespoke physical rack servers customized for localized enterprise databases.",
            "Scalable Network Attached Storage (NAS) configurations with solid automatic backup mirroring.",
            "Virtualization architectures supporting high parallel CPU computation nodes.",
            "Hot-swap drive bays with automatic RAID configurations for zero database downtime."
          ]
        },
        {
          title: "Active Networking Routers & Switches",
          points: [
            "Heavy-duty gigabit routing stations with double ISP fail-safe auto switches.",
            "Hardware-level firewalls with continuous packet logging.",
            "Managed edge switches for perfect distribution of workspace high-bandwidth streams."
          ]
        },
        {
          title: "End-User Enterprise Devices",
          points: [
            "Corporate workspace desktop computers, laptops, and ergonomic screen configurations.",
            "Operating system image preparation and patch release management.",
            "Vetted accessories and replacement warranty guarantees."
          ]
        },
        {
          title: "Data Center Physical Hardening",
          points: [
            "Standard mounting racks, cold/hot containment, and clean modular structures.",
            "Automated dual-feed power controllers and cooling installations."
          ]
        }
      ]
    },
    {
      id: "network-av",
      title: "Network Technologies & Smart Audio-Visual",
      shortDesc: "Category copper/fiber backbone systems, cable design moves/adds/changes, and integrated Microsoft / Zoom boardrooms.",
      longDesc: "We splice, test, and commission corporate networks with extreme quality standards. Scattergates also handles meeting rooms from acoustic engineering plans to ceiling microphone integration.",
      imageUrl: IMAGE_PATHS.services.networkInfrastructure,
      items: [
        {
          title: "Backbone Structured Cabling",
          points: [
            "Category 6, 6A, and Category 7 structured cabling certification.",
            "Spliced single-mode/multi-mode fiber connections for high floors distribution.",
            "Structured cable trays, frames, cabinets and robust termination ports."
          ]
        },
        {
          title: "Moves, Adds, and Changes (MAC)",
          points: [
            "No-downtime cabinet relocation schedules.",
            "Addition of individual desk ports and instant line testing reporting."
          ]
        },
        {
          title: "Smart AV & Boardroom Installations",
          points: [
            "Dual-facing digital media displays and dynamic corporate notification signage.",
            "Unified native MS Teams & Zoom conference control terminals.",
            "Acoustic microphones, smart zoom PTZ trackers, and speaker setups."
          ]
        },
        {
          title: "Regional Support AMC Contracts",
          points: [
            "Custom preventative checks and periodic server load optimization reports."
          ]
        }
      ]
    },
    {
      id: "pro-services",
      title: "Professional Services & IT Outsourcing",
      shortDesc: "C-level cloud roadmap consultants, contract IT engineers, vetted permanent staffing solutions, and full RPO pipelines.",
      longDesc: "Solve your workforce scaling challenges instantly. We source, screen, interview, and support first-rate system analysts, developers, and administrators across India on permanent or project cycles.",
      imageUrl: IMAGE_PATHS.services.managedServices,
      items: [
        {
          title: "Strategic IT Management Consulting",
          points: [
            "C-level virtual security audits and corporate cloud backup audits.",
            "Disaster recovery planning and localized software inventory auditing."
          ]
        },
        {
          title: "Vetted Contract Staffing",
          points: [
            "Experienced network technicians, system administrators, and frontend programmers.",
            "Flexible monthly team size escalations for strict project deadline surges."
          ]
        },
        {
          title: "Permanent Executive Placement",
          points: [
            "Rigorous technical pre-screening, HR alignment, and background checks.",
            "Direct corporate recruitment matching for key management roles."
          ]
        },
        {
          title: "Recruitment Process Outsourcing (RPO)",
          points: [
            "Full outsourcing of recruitment branches to Scattergates Bengaluru coordinators."
          ]
        }
      ]
    }
  ];

  // Hardware portfolio representing the exact slides & images provided
  const products = [
    {
      id: "camera",
      name: "Enterprise PTZ Boardroom Camera",
      category: "Audio-Visual Systems",
      image: IMAGE_PATHS.products.enterprisePtzBoardroom,
      desc: "Full HD PTZ optical zoom conference camera paired with high-frequency desktop speakerphones, remote management control, and quick USB interface endpoints."
    },
    {
      id: "server",
      name: "2U Dual-Socket Rack Server Sizing",
      category: "IT Infrastructure",
      image: IMAGE_PATHS.products.rackServer,
      desc: "Dense computing platforms with hot-swap SAS drive bays, enterprise hardware redundancy, and extreme virtualization scale capacity."
    },
    {
      id: "cabling",
      name: "Category 6A / 7 Copper Splicing",
      category: "Network Systems",
      image: IMAGE_PATHS.products.structuredCabling,
      desc: "Gold-plated low-loss structured cabling networks paired with industrial backbone shielding, precision copper testing, and modular patch bay terminals."
    },
    {
      id: "monitors",
      name: "Corporate Client Workstations",
      category: "End-User Devices",
      image: IMAGE_PATHS.products.corporateWorkstation,
      desc: "Vibrant high-contrast screens (ThinkVision and iMac lineups), small form factor corporate desktop towers, and ergonomic silent computer accessories."
    },
    {
      id: "peripherals",
      name: "Physical Spares & System Cache",
      category: "IT Hardware",
      image: IMAGE_PATHS.products.hardwareComponents,
      desc: "Vetted physical system components including DDR4/DDR5 high-density speed RAM, solid-state cache disks with 120GB+ arrays, and full CMYK printer developer kits."
    }
  ];

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <div className="space-y-16">
      
       {/* Tab Navigation header */}
      <motion.div 
        id="service-navigation-tabs" 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-1.5 justify-center bg-slate-100 p-1.5 rounded-2xl max-w-2xl mx-auto border border-slate-200/50 shadow-sm"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <motion.button
              variants={staggerItem}
              key={cat.id}
              id={`service-tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white text-slate-950 shadow-sm border border-slate-200/40"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              {cat.id === "infra" && "IT Infrastructure"}
              {cat.id === "network-av" && "Network / Smart AV"}
              {cat.id === "pro-services" && "Professional Services"}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main active category board panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="flex flex-col lg:flex-row-reverse items-stretch w-full">
            
            {/* Image Side (Shows at top on mobile, right side on desktop) */}
            <div className="w-full lg:w-5/12 relative h-64 sm:h-80 lg:h-auto min-h-[300px] bg-slate-950 overflow-hidden shrink-0">
              <img
                src={activeCategory.imageUrl}
                alt={activeCategory.title}
                className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-[4000ms] ease-out hover:scale-[1.08] hover:brightness-[1.05]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay card detailing Division Sizing Metric */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-white/10 text-white hidden sm:block shadow-2xl z-10">
                <span className="text-[10px] font-mono tracking-wider text-red-400 font-bold uppercase block">Division Sizing Metric</span>
                <span className="text-xs font-medium block mt-1 leading-relaxed text-slate-300">
                  {activeCategory.shortDesc}
                </span>
              </div>
            </div>

            {/* Description Side (Shows below image on mobile, left side on desktop) */}
            <div className="w-full lg:w-7/12 p-6 md:p-10 lg:p-12 space-y-8 flex flex-col justify-between bg-white text-slate-900 border-r border-slate-100">
              <div className="space-y-4">
                <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider block">
                  Scattergates Solution Catalog
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-[#0f172a] leading-tight tracking-tight">
                  {activeCategory.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                  {activeCategory.longDesc}
                </p>
                <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-xs text-slate-500 font-mono flex items-start gap-3">
                  <Shield className="text-red-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span className="text-slate-600 leading-relaxed">
                    Continuous SLA coverage options across Bengaluru and pan-India sites are configured for this division.
                  </span>
                </div>
              </div>

              {/* Grid map points from presentation */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100"
              >
                {activeCategory.items.map((sub, sIdx) => (
                  <motion.div 
                    variants={staggerItem}
                    key={sIdx} 
                    className="space-y-3"
                  >
                    <span className="text-slate-950 font-bold text-sm tracking-tight block flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-red-600 rounded-full shrink-0" />
                      {sub.title}
                    </span>
                    <ul className="space-y-2 pl-4 text-xs text-slate-600 leading-relaxed">
                      {sub.points.map((p, pIdx) => (
                        <li key={pIdx} className="relative before:content-['•'] before:absolute before:-left-3 before:text-slate-400">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-4">
                <button
                  id="tab-action-btn"
                  onClick={onSelectWizard}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-display font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2 text-xs uppercase tracking-wider hover:translate-y-[-1px]"
                >
                  Configure solution scope <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hardware catalog ecosystem (derived from details and files uploaded) */}
      <div className="space-y-8 bg-slate-50/50 border border-slate-200/50 p-6 md:p-10 rounded-3xl shadow-sm">
        <div id="hardware-showcase-header" className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider block">Scattergates Hardware Fleet</span>
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#0f172a] leading-tight tracking-tight">Provisioned Systems Ecosystem</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            We deliver original equipment manufacturer configurations, structured spare components, and custom active hardware suites tailored to Bangalore and global corporate environments.
          </p>
        </div>

        {/* Product Grid map */}
        <motion.div 
          variants={hardwareContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {products.map((p) => {
            const isSelected = selectedProduct === p.id;
            return (
              <motion.div
                variants={hardwareItem}
                key={p.id}
                id={`hardware-card-${p.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm premium-card flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="relative h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-all duration-750 ease-out hover:scale-110 hover:brightness-[1.05]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-sm text-neutral-100 text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold tracking-wider">ORIGINAL EQUIPMENT</span>
                    <h4 className="text-sm font-display font-bold text-slate-950 leading-tight tracking-tight">{p.name}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mt-2 line-clamp-3">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    id={`btn-quote-${p.id}`}
                    onClick={() => {
                       setSelectedProduct(isSelected ? null : p.id);
                       onSelectWizard();
                    }}
                    className="w-full py-2.5 bg-[#070b13] border border-slate-800 text-slate-200 hover:bg-red-650 hover:text-white hover:border-red-650 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 shadow-md shadow-slate-950/20"
                  >
                    Integrate in sizing quote
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
}
