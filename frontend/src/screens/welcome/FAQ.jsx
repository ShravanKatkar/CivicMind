import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const questionsList = [
        {
            q: "How does CivicMind AI prevent vision hallucinations?",
            a: "We wrap our neural network models inside a two-layered safety wrapper. First, the Relevance Gatekeeper checks if the photo matches civil work contexts. Second, the Risk Engine validates YOLOv8 tags against hard-coded deterministic weights before calling the LLM explainer."
        },
        {
            q: "What languages does the Voice Reporting system support?",
            a: "Our speech pipeline decodes standard audio streams and is compatible with major local languages including Hindi, Marathi, Tamil, Telugu, and English, allowing crews to report incidents naturally."
        },
        {
            q: "Can the application work offline in low network zones?",
            a: "Yes. CivicMind AI v2.0 utilizes offline-first browser synchronization. Critical site reports and photos are queued locally and automatically sync back to the municipal database the moment connectivity is restored."
        },
        {
            q: "What hardware is required for On-Premise deployments?",
            a: "For local municipal server installations, we recommend standard x86 servers equipped with at least one NVIDIA RTX series GPU (8GB+ VRAM) to support concurrent Whisper and YOLOv8 inference loops."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-[#F7F9FC] dark:bg-slate-900/50 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side text */}
                <div className="lg:col-span-4 flex flex-col items-start gap-4">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block font-display">
                        Faq
                    </span>
                    <h2 className="text-3xl font-extrabold text-ink-navy dark:text-white font-display leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base leading-relaxed">
                        Need answers about model accuracy, municipal server integrations, or offline local sync? Reach out to our technical support team for detailed architecture guides.
                    </p>
                </div>

                {/* Right side Accordion */}
                <div className="lg:col-span-8 space-y-4">
                    {questionsList.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700/60 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-sm md:text-base text-ink-navy dark:text-white hover:bg-sky-white/50 transition-colors"
                                >
                                    <span className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-electric-blue shrink-0" />
                                        {item.q}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-gray transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="p-5 pt-0 border-t border-gray-50 dark:border-slate-700/40 text-xs md:text-sm text-slate-gray dark:text-gray-300 font-semibold leading-relaxed">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FAQ;
