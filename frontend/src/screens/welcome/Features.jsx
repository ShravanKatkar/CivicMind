import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Bell, Languages, BarChart3, FileText, Map, Sparkles } from 'lucide-react';

const Features = () => {
    const featuresList = [
        {
            icon: <Eye className="w-6 h-6 text-electric-blue" />,
            title: "Computer Vision",
            desc: "Leverages YOLOv8 and BLIP models to analyze safety hazards, missing PPE, and open manholes on-site instantly.",
            borderClass: "hover:border-electric-blue/30"
        },
        {
            icon: <Shield className="w-6 h-6 text-vivid-cyan" />,
            title: "Deterministic Risk Engine",
            desc: "Fuses visual, audio, and environmental triggers against strict regulatory rules for 100% hallucination-free scores.",
            borderClass: "hover:border-vivid-cyan/30"
        },
        {
            icon: <Bell className="w-6 h-6 text-alert-red" />,
            title: "Automated Alerts",
            desc: "Instantly triggers real-time supervisor notifications when risk index scores surpass high safety limits (>8.0).",
            borderClass: "hover:border-alert-red/30"
        },
        {
            icon: <Languages className="w-6 h-6 text-deep-violet" />,
            title: "Multilingual Voice AI",
            desc: "Workers report hazards by speaking naturally in their local language. The AI transcribes and tags safety keywords.",
            borderClass: "hover:border-deep-violet/30"
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-neon-green" />,
            title: "Predictive Analytics",
            desc: "Aggregates incident history to forecast high-risk time corridors and weather conditions to advise workers proactively.",
            borderClass: "hover:border-neon-green/30"
        },
        {
            icon: <FileText className="w-6 h-6 text-sunrise-orange" />,
            title: "Smart Incident Reports",
            desc: "Translates complex visual findings into structured, formatted reports complete with location stamps and supervisor notes.",
            borderClass: "hover:border-sunrise-orange/30"
        },
        {
            icon: <Map className="w-6 h-6 text-electric-blue" />,
            title: "Live GPS Tracking",
            desc: "Centers incident reports onto a live geographical map of the municipality to track safety coverage dynamically.",
            borderClass: "hover:border-electric-blue/30"
        },
        {
            icon: <Sparkles className="w-6 h-6 text-vivid-cyan" />,
            title: "AI Safety Advisor",
            desc: "Generates explicit, numbered, and action-oriented safety guidance tailored directly to the verified on-site hazard.",
            borderClass: "hover:border-vivid-cyan/30"
        }
    ];

    return (
        <section id="features" className="py-24 bg-white dark:bg-slate-900 relative">
            {/* Background grids */}
            <div className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-5%] w-[350px] h-[350px] bg-vivid-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                {/* Heading */}
                <div className="max-w-2xl mb-20 text-left">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        Core Capabilities
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        Flagship AI Safety Features
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        CivicMind AI v2.0 wraps bleeding-edge computer vision models in a reliable enterprise-grade framework designed to keep public workforces safe in all environments.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresList.map((feat, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            whileHover={{ y: -8 }}
                            key={idx}
                            className={`p-6 bg-white dark:bg-slate-800 rounded-[24px] border border-gray-100 dark:border-slate-700/60 shadow-soft transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden group ${feat.borderClass}`}
                        >
                            {/* Accent Glow backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Icon Wrapper */}
                            <div className="w-12 h-12 rounded-2xl bg-sky-white dark:bg-slate-700 flex items-center justify-center shrink-0">
                                {feat.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="font-extrabold text-ink-navy dark:text-white text-base mb-2 group-hover:text-electric-blue transition-colors duration-200">
                                    {feat.title}
                                </h3>
                                <p className="text-slate-gray dark:text-gray-300 text-xs md:text-sm font-semibold leading-relaxed">
                                    {feat.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
