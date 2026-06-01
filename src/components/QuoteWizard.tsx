import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, Cpu, Server, Network, ShieldCheck, Video, UsersRound, Send, CheckCircle2, ArrowRight, ArrowLeft 
} from "lucide-react";
import { ContactInquiry } from "../types";

export default function QuoteWizard({ onSubmitSuccess }: { onSubmitSuccess: (data: ContactInquiry) => void }) {
  const [step, setStep] = useState(1);
  const [teamSize, setTeamSize] = useState<string>("50-200");
  
  // Combines all selections into clear, straightforward checkboxes
  const [infrastructure, setInfrastructure] = useState<string[]>(["Servers & Storage"]);
  const [cablingAndAV, setCablingAndAV] = useState<string[]>(["Copper - Cat6 & Cat7"]);
  const [staffingNeeds, setStaffingNeeds] = useState<string[]>([]);
  
  // Submit Contact Form Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Toggle helper
  const toggleSelection = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (state.includes(item)) {
      setState(state.filter(i => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  const calculateEstimate = () => {
    let basePrice = 200000; // in INR
    if (teamSize === "1-50") basePrice = 120000;
    if (teamSize === "50-200") basePrice = 400000;
    if (teamSize === "200-1000") basePrice = 1000000;
    if (teamSize === "1000+") basePrice = 3000000;

    const infraCost = infrastructure.length * 100000;
    const cabCost = cablingAndAV.length * 80000;
    const staffCost = staffingNeeds.length * 120000;

    return basePrice + infraCost + cabCost + staffCost;
  };

  const formatCost = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !company) return;

    const inquiry: ContactInquiry = {
      name,
      email,
      phone,
      company,
      serviceInterest: "Enterprise IT Sizing Estimate",
      message: message || "Requested a customized Scattergates physical hardware and staffing plan.",
      assessmentAnswers: {
        teamSize,
        infrastructure: infrastructure.join(", ") || "None selected",
        cablingAndAV: cablingAndAV.join(", ") || "None selected",
        staffingNeeds: staffingNeeds.join(", ") || "None selected",
        estimatedBudgetBucket: formatCost(calculateEstimate())
      }
    };

    // Save submit in local storage
    const history = JSON.parse(localStorage.getItem("scattergates_inquiries") || "[]");
    localStorage.setItem("scattergates_inquiries", JSON.stringify([...history, inquiry]));

    onSubmitSuccess(inquiry);
    setSubmitted(true);
  };

  return (
    <div id="it-planner-container" className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Wave Background Pattern */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/20 via-slate-950/0 to-slate-950/0 pointer-events-none animate-pulse duration-[8000ms]" />

      {/* Header section of the interactive card */}
      <div className="bg-gradient-to-r from-slate-950/80 to-slate-900/80 p-6 md:p-8 backdrop-blur-md border-b border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-mono text-red-500 font-extrabold tracking-[0.15em] uppercase">Scattergates Sizing Tool</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-1 tracking-tight">IT Capacity & Budget Calculator</h3>
          <p className="text-slate-400 text-[13px] mt-1 font-sans">Select your hardware, cabling, and staffing requirements to calculate a budget estimate instantly</p>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/80 px-5 py-2.5 rounded-xl shrink-0 backdrop-blur-sm shadow-lg shadow-black/30">
          <span className="text-[9px] text-slate-500 block font-mono font-extrabold tracking-[0.12em] uppercase">ESTIMATED INVESTMENT RANGE</span>
          <span className="text-2xl font-mono font-black text-red-500 mt-0.5 block tracking-tighter">{formatCost(calculateEstimate())}</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-slate-950/90 px-6 py-3 flex gap-2 justify-center border-b border-slate-900">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            id={`step-btn-${s}`}
            onClick={() => s < step && !submitted && setStep(s)}
            className={`w-10 h-2 rounded-full transition-all duration-300 ${
              step === s
                ? "bg-red-600 w-16"
                : s < step
                ? "bg-slate-700 cursor-pointer hover:bg-slate-500"
                : "bg-slate-800 cursor-not-allowed"
            }`}
          />
        ))}
      </div>

      <div className="p-6 md:p-10 min-h-[380px]">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: SYSTEMS & SERVICES REQUIRED */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-display font-bold text-white flex items-center justify-center md:justify-start gap-2 tracking-tight">
                      <Cpu className="text-red-500 h-5 w-5" /> 1 — Select Hardware & Cabling Services
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">Select which elements your facility needs to deploy or reinforce:</p>
                  </div>

                  {/* Standard unified simple option sections */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 block mb-3 uppercase tracking-wider">IT Hardware & Server Infrastructure</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "Servers & Storage", label: "Servers & Storage Backup", desc: "Rack servers customized for databases." },
                          { id: "Networking Routers", label: "Active Network Routers & Switches", desc: "Multi-port hardware switches and firewalls." },
                          { id: "End-User Devices", label: "Workspace Workstations & Laptops", desc: "Client computers and workspace devices." },
                          { id: "Data Center Tech", label: "Server Cabinets & Redundant UPS", desc: "Racks, physical enclosures, and failover power." }
                        ].map((node) => {
                          const selected = infrastructure.includes(node.id);
                          return (
                            <button
                              key={node.id}
                              type="button"
                              id={`infra-opt-${node.id.replace(/\s+/g, '-')}`}
                              onClick={() => toggleSelection(node.id, infrastructure, setInfrastructure)}
                              className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                                selected
                                  ? "bg-slate-800/80 border-red-500 shadow-md ring-1 ring-red-500/25"
                                  : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                              }`}
                            >
                              <div className={`mt-1 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                                selected ? "border-red-500 bg-red-600 text-white" : "border-slate-700 bg-slate-950"
                              }`}>
                                {selected && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                              </div>
                              <div>
                                <span className="text-white font-bold text-sm block">{node.label}</span>
                                <span className="text-slate-400 text-xs mt-0.5 block">{node.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 block mb-3 uppercase tracking-wider">Cabling & Conference Room Solutions</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "Copper - Cat6 & Cat7", label: "Copper Structured Cabling (Cat6/Cat7)", desc: "Lightning-fast high performance local network rails." },
                          { id: "Fibre Optic Pipelines", label: "Enterprise Fiber Optic Splicing", desc: "High bandwidth campus or multi-floor connections." },
                          { id: "Unified AV Systems", label: "Smart Zoom & Microsoft Teams Rooms", desc: "Audio systems, tracking cameras, and display panels." }
                        ].map((node) => {
                          const selected = cablingAndAV.includes(node.id);
                          return (
                            <button
                              key={node.id}
                              type="button"
                              id={`cab-opt-${node.id.replace(/\s+/g, '-')}`}
                              onClick={() => toggleSelection(node.id, cablingAndAV, setCablingAndAV)}
                              className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                                selected
                                  ? "bg-slate-800/80 border-red-500 shadow-md ring-1 ring-red-500/25"
                                  : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                              }`}
                            >
                              <div className={`mt-1 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                                selected ? "border-red-500 bg-red-600 text-white" : "border-slate-700 bg-slate-950"
                              }`}>
                                {selected && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                              </div>
                              <div>
                                <span className="text-white font-bold text-sm block">{node.label}</span>
                                <span className="text-slate-400 text-xs mt-0.5 block">{node.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 block mb-3 uppercase tracking-wider font-bold">IT Professional Staffing Sourcing</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "Contract Staffing", label: "Contract Support & Tech Staffing", desc: "Certified network engineers or systems administrators on task cycles." },
                          { id: "Management Consulting", label: "Corporate Management Consulting", desc: "Security vulnerability audits, baseline roadmap plans." }
                        ].map((node) => {
                          const selected = staffingNeeds.includes(node.id);
                          return (
                            <button
                              key={node.id}
                              type="button"
                              id={`staff-opt-${node.id.replace(/\s+/g, '-')}`}
                              onClick={() => toggleSelection(node.id, staffingNeeds, setStaffingNeeds)}
                              className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                                selected
                                  ? "bg-slate-800/80 border-red-500 shadow-md ring-1 ring-red-500/25"
                                  : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                              }`}
                            >
                              <div className={`mt-1 h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                                selected ? "border-red-500 bg-red-600 text-white" : "border-slate-700 bg-slate-950"
                              }`}>
                                {selected && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                              </div>
                              <div>
                                <span className="text-white font-bold text-sm block">{node.label}</span>
                                <span className="text-slate-400 text-xs mt-0.5 block">{node.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ORGANIZATIONAL TEAM SIZE */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-display font-bold text-white flex items-center justify-center md:justify-start gap-2 tracking-tight">
                      <Building2 className="text-red-500 h-5 w-5" /> 2 — Company Operational Size
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1 font-sans">Select organization size to define server load, power specs, and physical cabling scale:</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "1-50", label: "Compact Operations (1-50 corporate seats)", desc: "Small office networks, primary active switches & localized storage." },
                      { id: "50-200", label: "Growing Midmarket (50-200 corporate seats)", desc: "Dedicated physical rack servers, clean multi-bay cabling & active edge firewalls." },
                      { id: "200-1000", label: "Large Enterprise (200-1000 structures)", desc: "Virtually scalable high-performance servers, hybrid active devices & consulting services." },
                      { id: "1000+", label: "Multinational Scale (1000+ seats)", desc: "High-density fiber networks, advanced boardrooms & continuous contract teams." }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        id={`team-opt-${opt.id}`}
                        onClick={() => setTeamSize(opt.id)}
                        className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                          teamSize === opt.id
                            ? "bg-slate-800/80 border-red-500 ring-2 ring-red-500/20"
                            : "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30"
                        }`}
                      >
                        <span className="text-white font-semibold block text-base">{opt.label}</span>
                        <span className="text-slate-400 text-xs mt-1 block leading-relaxed">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT FORM AND SUBMISSION */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-display font-bold text-white flex items-center justify-center md:justify-start gap-2 tracking-tight">
                      <Send className="text-red-500 h-5 w-5" /> 3 — Finalize Sizing Inquiry
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1">Submit your basic contact details. Our team in Bengaluru will compile a customized systems and labor plan.</p>
                  </div>

                  {/* Quick selections receipt preview */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-400">
                    <div>
                      <span className="text-slate-600 block font-bold leading-normal">ORGANIZATIONAL CAPACITY:</span>
                      <span className="text-red-500 font-semibold">{teamSize} Users</span>
                    </div>
                    <div>
                      <span className="text-slate-600 block font-bold leading-normal">SELECTED CATEGORIES:</span>
                      <span className="text-white truncate block">
                        {[...infrastructure, ...cablingAndAV, ...staffingNeeds].join(", ") || "None Selected"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-xs font-mono uppercase mb-1.5">Your Name *</label>
                      <input
                        id="wizard-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-mono uppercase mb-1.5">Corporate Email *</label>
                      <input
                        id="wizard-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@company.com"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-mono uppercase mb-1.5">Phone Number *</label>
                      <input
                        id="wizard-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 95919 84646"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-mono uppercase mb-1.5">Company Name *</label>
                      <input
                        id="wizard-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Scattergates Solutions"
                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 placeholder-slate-600 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="block text-slate-400 text-xs font-mono uppercase mb-1.5">Add details or specific requirements (optional)</label>
                     <textarea
                       id="wizard-message"
                       rows={2}
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       placeholder="e.g. Target installation before Q3, cabling weekend schedules, specific model counts..."
                       className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-4 placeholder-slate-600 focus:outline-none focus:border-red-500 text-sm"
                     />
                  </div>

                  <button
                    id="wizard-submit-btn"
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-sans font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/20 text-base uppercase tracking-wider"
                  >
                    SUBMIT SIZING INQUIRY <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              )}

              {/* Navigation Actions below cards */}
              {step < 3 && (
                <div id="wizard-navigation-actions" className="flex justify-between items-center pt-8 border-t border-slate-800/60 mt-8">
                  <button
                    id="wizard-back-btn"
                    type="button"
                    disabled={step === 1}
                    onClick={() => setStep(step - 1)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-800 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-205 ${
                      step === 1
                        ? "text-slate-650 border-slate-900 cursor-not-allowed clickable-disabled"
                        : "text-slate-300 hover:bg-slate-800/80 cursor-pointer"
                    }`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> BACK
                  </button>

                  <button
                    id="wizard-next-btn"
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex justify-center items-center gap-2 px-7 py-3 bg-white text-slate-950 font-bold hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider shadow-md"
                  >
                    NEXT STEP <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6 max-w-lg mx-auto"
            >
              <div id="wizard-success-checkmark-container" className="h-20 w-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-sans font-bold text-white">Sizing Request Received!</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Excellent. We have received your specifications. Our regional team in Nagarbhavi, Bengaluru, is preparing your customized hardware and labor plan for <span className="text-white font-semibold">{company}</span>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl text-left space-y-3 font-mono text-xs text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">CLIENT REFERENCE:</span>
                  <span className="text-white font-semibold">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">CALCULATED BUDGET ESTIMATE:</span>
                  <span className="text-green-400 font-bold">{formatCost(calculateEstimate())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">ESTIMATION SPEED:</span>
                  <span className="text-red-500 font-semibold">Under 4 Business Hours</span>
                </div>
              </div>

              <button
                id="wizard-reset-btn"
                onClick={() => {
                  setStep(1);
                  setSubmitted(false);
                  setInfrastructure(["Servers & Storage"]);
                  setCablingAndAV(["Copper - Cat6 & Cat7"]);
                  setStaffingNeeds([]);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setCompany("");
                  setMessage("");
                }}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-mono font-bold uppercase underline"
              >
                Assemble Another Sizing Plan
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
