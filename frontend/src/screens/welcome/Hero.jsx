import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Play, Cpu, Landmark, Languages, Zap } from 'lucide-react';

const Counter = ({ value, duration = 2, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value.toString().replace(/,/g, ''), 10);
        if (start === end) return;

        const totalMiliseconds = duration * 1000;
        const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
        
        const timer = setInterval(() => {
            start += Math.ceil(end / 100);
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k+';
        }
        return num.toLocaleString();
    };

    return (
        <span className="font-data font-extrabold text-2xl md:text-3xl text-ink-navy">
            {count > 999 ? formatNumber(count) : count}{suffix}
        </span>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    
    const stats = [
        { value: 12500, suffix: "+", label: "Workers Protected" },
        { value: 87400, suffix: "+", label: "Safety Alerts Sent" },
        { value: 99.8, suffix: "%", label: "Risk Accuracy" },
        { value: 1.2, suffix: "s", label: "Response Time" }
    ];

    const badges = [
        { icon: <Cpu className="w-3.5 h-3.5" />, text: "AI Powered" },
        { icon: <Zap className="w-3.5 h-3.5" />, text: "Real-Time Analysis" },
        { icon: <Languages className="w-3.5 h-3.5" />, text: "Multilingual Voice" },
        { icon: <Landmark className="w-3.5 h-3.5" />, text: "Government Ready" }
    ];

    return (
        <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
            {/* Background Glow Elements */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-electric-blue/10 blur-[120px] pointer-events-none" />
            <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-vivid-cyan/10 blur-[120px] pointer-events-none" />
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full flex flex-col items-center relative z-20">
                {/* Centered Content */}
                <div className="max-w-4xl flex flex-col items-center text-center gap-8">
                    {/* Badge List */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {badges.map((badge, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                                key={idx}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-white dark:bg-slate-800 text-electric-blue text-[11px] font-bold uppercase tracking-wider border border-electric-blue/10"
                            >
                                {badge.icon}
                                {badge.text}
                            </motion.div>
                        ))}
                    </div>

                    {/* Headline */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-[60px] font-black leading-[1.1] tracking-tight font-display text-ink-navy"
                    >
                        AI That Protects Every <br />
                        <span className="bg-gradient-to-r from-electric-blue via-vivid-cyan to-electric-blue bg-clip-text text-transparent">
                            Worker
                        </span> Before Danger Strikes
                    </motion.h1>

                    {/* Paragraph description */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                        className="text-slate-gray text-base md:text-lg max-w-xl leading-relaxed font-medium mx-auto"
                    >
                        CivicMind AI is an advanced safety intelligence platform built strictly for public works and municipal sanitation. We combine real-time computer vision, context-aware risk scoring, and zero-hallucination guardrails to protect frontline workers and automate compliance.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
                    >
                        <button 
                            onClick={() => navigate('/language')}
                            className="px-8 py-4 bg-gradient-to-r from-electric-blue to-vivid-cyan hover:opacity-95 text-white font-bold rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-electric-blue/20 active:scale-95 transition-all duration-200"
                        >
                            Enter Safety Platform
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('how-it-works');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-white hover:bg-sky-white border border-gray-200 text-slate-gray font-bold rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all duration-200"
                        >
                            <Play className="w-4 h-4 fill-current text-slate-gray" />
                            Watch AI Simulation
                        </button>
                    </motion.div>

                    {/* Real-time stats widgets */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-6 border-t border-gray-100 dark:border-slate-800">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <Counter value={stat.value} suffix={stat.suffix} />
                                <span className="text-[11px] font-bold text-slate-gray uppercase tracking-widest mt-1">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
