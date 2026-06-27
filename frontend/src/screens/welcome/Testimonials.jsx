import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
    const list = [
        {
            quote: "CivicMind AI has completely transformed our municipal safety protocols. We had immediate visual verification of a gas hazard on day three of launching.",
            author: "Rajesh Shinde",
            role: "Director of Sanitation",
            org: "BMC Mumbai",
            avatar: "👨‍💼"
        },
        {
            quote: "The voice reporting tool allows our field crews to report road excavations and missing covers in Marathi instantly. It is simple, fast, and extremely reliable.",
            author: "Milind Deshmukh",
            role: "Chief Engineer",
            org: "PMC Pune",
            avatar: "👷‍♂️"
        },
        {
            quote: "Before CivicMind AI, our supervisors had zero visibility into real-time safety violations. The automated alerts and explanation system solved this completely.",
            author: "Aravind Swamy",
            role: "Safety Compliance Head",
            org: "NMMC Navi Mumbai",
            avatar: "👨‍💻"
        }
    ];

    return (
        <section className="py-24 bg-[#F7F9FC] dark:bg-slate-900/50 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        Trusted by Municipalities
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        Hear from the public safety directors and chief engineers who protect their municipal workers using CivicMind AI daily.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {list.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -6 }}
                            key={idx}
                            className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 shadow-soft flex flex-col justify-between relative overflow-hidden"
                        >
                            {/* Quote icon backdrop */}
                            <Quote className="absolute right-4 top-4 w-20 h-20 text-gray-50 dark:text-slate-700/20 -z-0 pointer-events-none" />
                            
                            <div className="relative z-10 space-y-4">
                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current text-blazing-amber" />
                                    ))}
                                </div>
                                <p className="text-slate-gray dark:text-gray-200 text-xs md:text-sm font-semibold leading-relaxed italic">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-slate-700 mt-8 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-sky-white dark:bg-slate-700 flex items-center justify-center text-xl shrink-0">
                                    {item.avatar}
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-xs text-ink-navy dark:text-white leading-none mb-1">{item.author}</h4>
                                    <span className="text-[10px] text-slate-gray dark:text-gray-400 font-bold block">{item.role}, <span className="text-electric-blue">{item.org}</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
