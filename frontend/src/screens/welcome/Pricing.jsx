import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, Landmark, ShieldAlert, Check } from 'lucide-react';

const Pricing = () => {
    const options = [
        {
            icon: <Cloud className="w-5 h-5 text-electric-blue" />,
            title: "Safety Cloud",
            desc: "Multi-tenant public safety analytics hosted on secure servers with instant setup.",
            features: [
                "YOLOv8 & BLIP Object Scan",
                "ChromaDB semantic search",
                "SMS / Email alert warnings",
                "Standard email support"
            ],
            cta: "Deploy to Cloud",
            highlight: false
        },
        {
            icon: <Landmark className="w-5 h-5 text-vivid-cyan" />,
            title: "Government Infrastructure",
            desc: "Dedicated instances hosted on certified local state/federal cloud environments.",
            features: [
                "All Safety Cloud features",
                "Certified NIC data integration",
                "SLA-guaranteed alert delivery",
                "24/7 dedicated support phone"
            ],
            cta: "Request Gov Deployment",
            highlight: true
        },
        {
            icon: <Server className="w-5 h-5 text-deep-violet" />,
            title: "On-Premise Server",
            desc: "Local deployment hosted directly on municipal servers for offline operations.",
            features: [
                "Full network isolation",
                "Local inference execution",
                "Custom risk weight weights",
                "Annual maintenance contract"
            ],
            cta: "Contact Architecture Sales",
            highlight: false
        }
    ];

    return (
        <section id="deployment" className="py-24 bg-white dark:bg-slate-900 relative">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        Deployment Plans
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        Municipal Deployment Models
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        Choose the architecture model that complies with your municipal data privacy guidelines, local server hardware, and infrastructure requirements.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {options.map((opt, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            key={idx}
                            className={`p-8 bg-white dark:bg-slate-800 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                                opt.highlight 
                                    ? 'border-2 border-electric-blue shadow-soft ring-4 ring-electric-blue/5' 
                                    : 'border-gray-100 dark:border-slate-700/60 shadow-sm hover:border-gray-200'
                            }`}
                        >
                            {opt.highlight && (
                                <div className="absolute top-0 right-0 bg-electric-blue text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                    Recommended
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-sky-white dark:bg-slate-700 flex items-center justify-center">
                                        {opt.icon}
                                    </div>
                                    <h3 className="font-extrabold text-lg text-ink-navy dark:text-white">{opt.title}</h3>
                                </div>

                                <p className="text-slate-gray dark:text-gray-300 text-xs md:text-sm font-semibold leading-relaxed">
                                    {opt.desc}
                                </p>

                                <ul className="space-y-3 pt-6 border-t border-gray-100 dark:border-slate-700">
                                    {opt.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-gray dark:text-gray-200">
                                            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/10 flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5 text-emerald-500" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-3.5 rounded-full text-xs font-bold transition-all active:scale-95 mt-8 ${
                                opt.highlight
                                    ? 'bg-gradient-to-r from-electric-blue to-vivid-cyan hover:opacity-95 text-white shadow-md shadow-electric-blue/15'
                                    : 'bg-[#F7F9FC] dark:bg-slate-700 hover:bg-sky-white text-slate-gray dark:text-white border border-gray-100 dark:border-slate-600'
                            }`}>
                                {opt.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
