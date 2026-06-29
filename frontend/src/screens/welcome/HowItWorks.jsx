import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, ShieldAlert, Cpu, BellRing, Ambulance, FileText } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-6 h-6 text-electric-blue" />,
            title: "Worker Captures Evidence",
            desc: "The field operator snaps a photo of the local working environment (e.g. trench, manhole) directly inside the mobile app.",
            color: "border-l-electric-blue bg-electric-blue/5"
        },
        {
            icon: <Eye className="w-6 h-6 text-vivid-cyan" />,
            title: "AI Vision Analysis",
            desc: "Computer Vision detects helmets, vests, and manholes while BLIP constructs a full semantic scene analysis in milliseconds.",
            color: "border-l-vivid-cyan bg-vivid-cyan/5"
        },
        {
            icon: <ShieldAlert className="w-6 h-6 text-blazing-amber" />,
            title: "Deterministic Risk Classification",
            desc: "A rule-based Risk Engine evaluates the findings against location risk factors, time of day, and weather conditions.",
            color: "border-l-blazing-amber bg-blazing-amber/5"
        },
        {
            icon: <Cpu className="w-6 h-6 text-deep-violet" />,
            title: "Threat & Hallucination Filtering",
            desc: "A relevance gate and LLM verify that the findings correspond to genuine civic infrastructure risks before scoring.",
            color: "border-l-deep-violet bg-deep-violet/5"
        },
        {
            icon: <BellRing className="w-6 h-6 text-alert-red" />,
            title: "Supervisor Automated Alert",
            desc: "Critical risks are forwarded to the supervisor dashboard immediately, containing bounding box evidence and explanations.",
            color: "border-l-alert-red bg-alert-red/5"
        },
        {
            icon: <Ambulance className="w-6 h-6 text-neon-green" />,
            title: "Emergency Response & Mitigation",
            desc: "Immediate recommendations are communicated to the worker in their language, and mitigation teams are dispatched if needed.",
            color: "border-l-neon-green bg-neon-green/5"
        },
        {
            icon: <FileText className="w-6 h-6 text-slate-gray" />,
            title: "Archived Incident Report",
            desc: "A persistent incident record is saved into the sqlite database, updating the district's safety compliance log.",
            color: "border-l-slate-gray bg-slate-gray/5"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-[#F7F9FC] dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-vivid-cyan/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        Operations Cycle
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        How CivicMind AI Protects Lives
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        Explore the end-to-end telemetry pipeline connecting frontline workers, local computer vision engines, and municipal control centers.
                    </p>
                </div>

                {/* Timeline vertical container */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Center connector line for desktop */}
                    <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
                    
                    {/* Left connector line for mobile */}
                    <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-800 md:hidden" />

                    <div className="space-y-12">
                        {steps.map((step, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    key={idx}
                                    className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                >
                                    {/* Connection Point Indicator Circle */}
                                    <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-electric-blue shadow-md -translate-x-1/2 z-10 flex items-center justify-center font-bold text-xs text-electric-blue">
                                        {idx + 1}
                                    </div>

                                    {/* Left side card space */}
                                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                        <div className={`p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 shadow-soft border-l-4 ${step.color} inline-block w-full transition-all hover:scale-[1.01]`}>
                                            <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm mb-4 ${
                                                isEven ? 'md:ml-auto' : ''
                                            }`}>
                                                {step.icon}
                                            </div>
                                            <h3 className="font-extrabold text-ink-navy dark:text-white text-base mb-1.5">{step.title}</h3>
                                            <p className="text-slate-gray dark:text-gray-300 text-xs md:text-sm font-semibold leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>

                                    {/* Empty filler block for desktop opposite side alignment */}
                                    <div className="w-1/2 hidden md:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
