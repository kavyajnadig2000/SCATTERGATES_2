import React, { useState } from "react";
import { 
  PhoneCall, Mail, MapPin, CheckCircle2, AlertCircle, ArrowUpRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("IT hardware Solutions");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Representative name is required.";
        if (value.trim().length < 3) return "Name must be at least 3 characters.";
        const nameRegex = /^[a-zA-Z\s.-]+$/;
        if (!nameRegex.test(value.trim())) return "Name should only contain letters, spaces, dots, or hyphens.";
        return "";
      case "email":
        if (!value.trim()) return "Representative email is required.";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) return "Please enter a valid business email address (e.g. representative@domain.com).";
        return "";
      case "phone":
        if (!value.trim()) return "Telephone contact is required.";
        const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
        if (!phoneRegex.test(value.trim())) return "Phone number must be at least 10 digits/characters (valid format).";
        return "";
      case "message":
        if (!value.trim()) return "Detailed specifications/requirements are required.";
        if (value.trim().length < 15) return "Please provide at least 15 characters of detail for our systems division.";
        return "";
      default:
        return "";
    }
  };

  const errors = {
    name: touched.name ? validateField("name", name) : "",
    email: touched.email ? validateField("email", email) : "",
    phone: touched.phone ? validateField("phone", phone) : "",
    message: touched.message ? validateField("message", message) : ""
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set all fields to touched to display validation indicators
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    const nameErr = validateField("name", name);
    const emailErr = validateField("email", email);
    const phoneErr = validateField("phone", phone);
    const messageErr = validateField("message", message);

    if (nameErr || emailErr || phoneErr || messageErr) {
      setStatus("error");
      
      // Smart focus on the first invalid field
      if (nameErr) {
        document.getElementById("contact-name-input")?.focus();
      } else if (emailErr) {
        document.getElementById("contact-email-input")?.focus();
      } else if (phoneErr) {
        document.getElementById("contact-phone-input")?.focus();
      } else if (messageErr) {
        document.getElementById("contact-message-input")?.focus();
      }
      return;
    }

    setLoading(true);
    setStatus("idle");

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      // Save local in browser
      const history = JSON.parse(localStorage.getItem("scattergates_general_inquiries") || "[]");
      history.push({ name, email, phone, subject, message, date: new Date().toISOString() });
      localStorage.setItem("scattergates_general_inquiries", JSON.stringify(history));

      // Reset values
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      // Clean up touched states
      setTouched({
        name: false,
        email: false,
        phone: false,
        message: false
      });
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
      
      {/* Visual Corporate Contact Information Card */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider block mb-1">Global Headquarters</span>
          <h3 className="text-3xl font-display font-extrabold text-[#0f172a] tracking-tight leading-tight">Bengaluru Head Office</h3>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-sans">
            Connect with our system consulting division, schedule active networking site surveys, or consult with our HR dispatch experts.
          </p>
        </div>

        {/* Detailed credential list */}
        <div className="space-y-6">
          
          <a
            id="contact-phone"
            href="tel:+919591984646"
            className="group flex gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-slate-100/50 hover:border-slate-200"
          >
            <div className="h-12 w-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-mono block uppercase font-semibold tracking-wider">DIRECT PHONE LINE</span>
              <span className="text-slate-950 text-base font-extrabold block mt-0.5 group-hover:text-red-600 transition-colors tracking-tight">
                +91 95919 84646
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1 mt-1 font-mono">
                Click to call directly <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </a>

          <a
            id="contact-email"
            href="mailto:business@scattergates.com"
            className="group flex gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-slate-100/50 hover:border-slate-200"
          >
            <div className="h-12 w-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-mono block uppercase font-semibold tracking-wider">BUSINESS DISPATCH MAIL</span>
              <span className="text-slate-950 text-base font-extrabold block mt-0.5 group-hover:text-red-600 transition-colors tracking-tight">
                business@scattergates.com
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1 mt-1 font-mono">
                Send formal RFP document <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </a>

          <a
            id="contact-location-map"
            href="https://www.google.com/maps/search/?api=1&query=Scattergates+Business+Solutions+Pvt.+Ltd.+No.+222,+3rd+Floor,+12th+Block,+2nd+Stage,+Nagarbhavi,+Bengaluru,+Karnataka+560072"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl transition-all hover:bg-slate-100/50 hover:border-slate-200"
          >
            <div className="h-12 w-12 bg-red-500/10 text-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-mono block uppercase font-semibold tracking-wider">CORPORATE REGISTERED OFFICE</span>
              <span className="text-slate-950 text-sm font-extrabold block mt-1 leading-relaxed tracking-tight group-hover:text-red-650 transition-colors">
                Scattergates Business Solutions Pvt. Ltd.<br />
                No. 222, 3rd Floor, 12th Block, 2nd Stage,<br />
                Nagarbhavi, Bengaluru, Karnataka, India - 560072.
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1 mt-2 font-mono">
                View on Google Maps <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* Corporate Submission Form Panel */}
      <div className="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-100/50">
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Quick Inquiries</h3>
          <p className="text-slate-500 text-sm mt-1">Fill out the general request pipeline below to consult directly with Scattergates coordinators.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 text-xs font-mono uppercase mb-2">Corporate Representative *</label>
              <div className="relative">
                <input
                  id="contact-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name) {
                      setTouched(prev => ({ ...prev, name: true }));
                    }
                  }}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  placeholder="Enterprise coordinator full name"
                  className={`w-full bg-slate-50 border text-slate-950 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.name 
                      ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/10" 
                      : touched.name && name.trim().length >= 3 && /^[a-zA-Z\s.-]+$/.test(name.trim())
                        ? "border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-emerald-50/10"
                        : "border-slate-200 focus:border-red-500"
                  }`}
                />
                {touched.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {errors.name ? (
                      <AlertCircle className="text-red-500 h-4 w-4" />
                    ) : name.trim().length >= 3 && /^[a-zA-Z\s.-]+$/.test(name.trim()) ? (
                      <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                    ) : null}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 text-xs mt-1.5 font-sans flex items-center gap-1.5 overflow-hidden"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-mono uppercase mb-2">Representative Email *</label>
              <div className="relative">
                <input
                  id="contact-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) {
                      setTouched(prev => ({ ...prev, email: true }));
                    }
                  }}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  placeholder="representative@domain.com"
                  className={`w-full bg-slate-50 border text-slate-950 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.email 
                      ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/10" 
                      : touched.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
                        ? "border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-emerald-50/10"
                        : "border-slate-200 focus:border-red-500"
                  }`}
                />
                {touched.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {errors.email ? (
                      <AlertCircle className="text-red-500 h-4 w-4" />
                    ) : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? (
                      <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                    ) : null}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 text-xs mt-1.5 font-sans flex items-center gap-1.5 overflow-hidden"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 text-xs font-mono uppercase mb-2">Telephone Contact *</label>
              <div className="relative">
                <input
                  id="contact-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (touched.phone) {
                      setTouched(prev => ({ ...prev, phone: true }));
                    }
                  }}
                  onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                  placeholder="+91 XXXXX XXXXX"
                  className={`w-full bg-slate-50 border text-slate-950 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.phone 
                      ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/10" 
                      : touched.phone && /^\+?[0-9\s\-()]{10,20}$/.test(phone.trim())
                        ? "border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-emerald-50/10"
                        : "border-slate-200 focus:border-red-500"
                  }`}
                />
                {touched.phone && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {errors.phone ? (
                      <AlertCircle className="text-red-500 h-4 w-4" />
                    ) : /^\+?[0-9\s\-()]{10,20}$/.test(phone.trim()) ? (
                      <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                    ) : null}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 text-xs mt-1.5 font-sans flex items-center gap-1.5 overflow-hidden"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-mono uppercase mb-2">Primary Consultation Field</label>
              <select
                id="contact-subject-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              >
                <option value="IT hardware Solutions">IT Hardware Solutions (Servers & Storage)</option>
                <option value="Networked Technologies">Networked Tech & Active devices</option>
                <option value="Structured Cabling">Structured Cable Splicing (Copper/Fiber)</option>
                <option value="Audio Visual Conference">Audio-Visual (Zoom & Teams MS Meetings)</option>
                <option value="Professional Staffing">Professional IT Consulting & Outsource Sourcing</option>
                <option value="Executive Sizing Plan">Custom Hardware AMC & Security Audit plans</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-mono uppercase mb-2">Detailed Specifications / Requirements Brief *</label>
            <div className="relative">
              <textarea
                id="contact-message-input"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (touched.message) {
                    setTouched(prev => ({ ...prev, message: true }));
                  }
                }}
                onBlur={() => setTouched(prev => ({ ...prev, message: true }))}
                placeholder="Please provide full details of your deployment requirements, estimated user load, or staffing profiles desired."
                className={`w-full bg-slate-50 border text-slate-950 rounded-xl p-4 text-sm focus:outline-none focus:bg-white transition-all resize-none ${
                  errors.message 
                    ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-red-50/10" 
                    : touched.message && message.trim().length >= 15
                      ? "border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-emerald-50/10"
                      : "border-slate-200 focus:border-red-500"
                }`}
              />
              {touched.message && (
                <div className="absolute right-3 top-3 pointer-events-none">
                  {errors.message ? (
                    <AlertCircle className="text-red-500 h-4 w-4" />
                  ) : message.trim().length >= 15 ? (
                    <CheckCircle2 className="text-emerald-500 h-4 w-4" />
                  ) : null}
                </div>
              )}
            </div>
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-600 text-xs mt-1.5 font-sans flex items-center gap-1.5 overflow-hidden"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            id="contact-form-submit-btn"
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-950 hover:bg-slate-900 text-white font-sans font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer shadow-lg`}
          >
            {loading ? (
              <span className="flex items-center gap-2" id="contact-submit-spinner-container">
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                <span>Transmitting...</span>
              </span>
            ) : (
              "Submit Proposal Inquiries"
            )}
          </button>

          {/* Alert Status Feedback panel with Framer motion */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                id="contact-success-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-5 flex gap-3 text-green-950"
              >
                <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="font-semibold text-sm block">Success! Your inquiry has been submitted</span>
                  <p className="text-green-800 text-xs mt-0.5 leading-relaxed">
                    Our technical sizing teams will review your specifications and contact you within 1 business hour. Direct support line is +91 95919 84646.
                  </p>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                id="contact-error-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3 text-red-950"
              >
                <AlertCircle className="text-red-600 h-5 w-5 shrink-0" />
                <div>
                  <span className="font-semibold text-sm block">Verification Error</span>
                  <p className="text-red-800 text-xs mt-0.5 leading-relaxed">
                    Please ensure that name, email, phone, and detailed requirements are filled in correctly with valid formats.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
