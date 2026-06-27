import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-vivid-cyan/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                <div className="bg-gradient-to-r from-electric-blue via-[#1D4ED8] to-vivid-cyan rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    {/* Glowing Mesh lines inside the banner */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    
                    {/* Floating SVG dots */}
                    <svg className="absolute left-6 top-6 w-24 h-24 text-white/5" viewBox="0 0 100 100">
                        <circle cx="20" cy="20" r="2" fill="currentColor" />
                        <circle cx="50" cy="50" r="4" fill="currentColor" />
                        <circle cx="80" cy="80" r="3" fill="currentColor" />
                    </svg>

                    <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                        <span className="text-[10px] font-bold text-sky-white uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
                            Get Started Today
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black font-display leading-tight tracking-tight">
                            Ready to Build Safer Cities <br className="hidden md:block" /> with Safety Intelligence?
                        </h2>
                        <p className="text-white/80 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Bring real-time vision threat assessment, deterministic safety scores, and automated supervisor sync to your public works department.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <button
                                onClick={() => navigate('/language')}
                                className="px-8 py-4 bg-white hover:bg-sky-white text-electric-blue font-bold rounded-full flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all duration-200"
                            >
                                Request Live Demo
                                <ArrowRight className="w-4 h-4 text-electric-blue" />
                            </button>
                            <button
                                onClick={() => window.location.href = 'mailto:sales@civicmind.ai'}
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
                            >
                                <Mail className="w-4 h-4" />
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
