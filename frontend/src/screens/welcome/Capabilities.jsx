import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Mic, BrainCircuit, FileSearch, LineChart } from 'lucide-react';

const Capabilities = () => {
    const list = [
        {
            model: "YOLOv8",
            title: "Real-Time Object Detection",
            desc: "Identifies work hazards, workers, vehicles, open pits, and safety items with precise coordinates and confidence scores.",
            tech: "Computer Vision Model",
            icon: <Target className="w-5 h-5 text-electric-blue" />,
            bgColor: "bg-blue-50 dark:bg-blue-900/10 text-electric-blue"
        },
        {
            model: "BLIP Base",
            title: "Visual Scene Understanding",
            desc: "Translates whole-image scenery (e.g. flooded roads, excavation work) into natural descriptions to add situational context.",
            tech: "Vision-Language Model",
            icon: <Eye className="w-5 h-5 text-vivid-cyan" />,
            bgColor: "bg-cyan-50 dark:bg-cyan-900/10 text-vivid-cyan"
        },
        {
            model: "Whisper Base",
            title: "Natural Speech Translation",
            desc: "Accurately converts verbal safety voice memos into structured transcriptions directly on-site on low network conditions.",
            tech: "Speech-to-Text Model",
            icon: <Mic className="w-5 h-5 text-deep-violet" />,
            bgColor: "bg-purple-50 dark:bg-purple-900/10 text-deep-violet"
        },
        {
            model: "GPT-OSS 120B",
            title: "Structured LLM Explanations",
            desc: "Generates clear, structured JSON explanations outlining safety actions and confirmed dangers while preventing hallucinations.",
            tech: "Large Language Model",
            icon: <BrainCircuit className="w-5 h-5 text-alert-red" />,
            bgColor: "bg-red-50 dark:bg-red-900/10 text-alert-red"
        },
        {
            model: "ChromaDB RAG",
            title: "Semantic Protocol Search",
            desc: "Queries local safety guidelines and compliance policies semantically to fetch the exact protocol matching the site hazard.",
            tech: "Vector Database RAG",
            icon: <FileSearch className="w-5 h-5 text-neon-green" />,
            bgColor: "bg-green-50 dark:bg-green-900/10 text-neon-green"
        },
        {
            model: "Risk Engine v2.0",
            title: "Predictive Safety Telemetry",
            desc: "Fuses multi-modal inputs, weather parameters, and historical location hazards into a dynamic risk speedometer (0-10).",
            tech: "Statistical Risk Model",
            icon: <LineChart className="w-5 h-5 text-sunrise-orange" />,
            bgColor: "bg-orange-50 dark:bg-orange-900/10 text-sunrise-orange"
        }
    ];

    return (
        <section id="capabilities" className="py-24 bg-white dark:bg-slate-900 relative">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        AI Architecture
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        AI Models & Capabilities Stack
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        CivicMind AI employs a hybrid stack of localized computer vision networks, multilingual speech decoders, and deterministic reasoning layers.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {list.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            whileHover={{ y: -5 }}
                            key={idx}
                            className="p-6 bg-[#F7F9FC] dark:bg-slate-800 rounded-[24px] border border-gray-100 dark:border-slate-700/60 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 bg-white dark:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-gray uppercase tracking-wider shadow-sm">
                                        {item.model}
                                    </span>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-ink-navy dark:text-white text-base leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-gray dark:text-gray-300 text-xs md:text-sm font-semibold leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-200/50 dark:border-slate-700 mt-6 flex justify-between items-center text-[10px] font-bold text-slate-gray uppercase tracking-wider">
                                <span>Layer:</span>
                                <span className="text-electric-blue">{item.tech}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
