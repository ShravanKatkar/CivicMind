import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Play, ShieldAlert, Cpu, Landmark, Languages, ShieldCheck, Zap } from 'lucide-react';

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

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
                {/* Left Column Content */}
                <div className="lg:col-span-7 flex flex-col items-start gap-8">
                    {/* Badge List */}
                    <div className="flex flex-wrap gap-2">
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
                        className="text-slate-gray text-base md:text-lg max-w-xl leading-relaxed font-medium"
                    >
                        CivicMind AI is an advanced safety intelligence platform built strictly for public works and municipal sanitation. We combine real-time computer vision, context-aware risk scoring, and zero-hallucination guardrails to protect frontline workers and automate compliance.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
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
                            <div key={idx} className="flex flex-col">
                                <Counter value={stat.value} suffix={stat.suffix} />
                                <span className="text-[11px] font-bold text-slate-gray uppercase tracking-widest mt-1">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column Animated Simulation Artwork */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className="lg:col-span-5 relative w-full h-[380px] md:h-[480px] rounded-3xl bg-slate-900 overflow-hidden shadow-2xl border border-slate-800"
                >
                    {/* Glowing Bounding Box Scanning Feed Mockup */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
                    
                    {/* Glowing Neural Grid Lines overlaying */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.2)_1px,transparent_1px)] bg-[size:16px_16px] z-10 opacity-70" />
                    
                    {/* Simulated Camera Scanner line */}
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-vivid-cyan to-transparent animate-scan z-20" />
                    
                    {/* CCTV Details Overlays */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col font-mono text-[10px] text-vivid-cyan/80 gap-0.5">
                        <span>CAMERA: CAM-EAST-04</span>
                        <span>LAT: 19.0760° N | LON: 72.8777° E</span>
                        <span className="text-alert-red font-bold animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-alert-red" />
                            LIVE ASSESSMENT FEED
                        </span>
                    </div>

                    {/* Animated Smart City elements */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                        <svg className="w-full h-full text-slate-800" viewBox="0 0 200 200" fill="none">
                            {/* Radar Waves */}
                            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                            
                            {/* Scanning cone */}
                            <path d="M100 100 L60 40 A80 80 0 0 1 140 40 Z" fill="url(#scanGrad)" opacity="0.1" />
                            
                            {/* Node connections */}
                            <g stroke="#2563EB" strokeWidth="1">
                                <line x1="100" y1="100" x2="60" y2="70" />
                                <line x1="100" y1="100" x2="140" y2="70" />
                                <line x1="100" y1="100" x2="80" y2="150" />
                                <line x1="100" y1="100" x2="130" y2="140" />
                                <line x1="60" y1="70" x2="40" y2="110" />
                                <line x1="140" y1="70" x2="160" y2="110" />
                            </g>

                            {/* Node Dots */}
                            <circle cx="100" cy="100" r="4" fill="#2563EB" className="animate-ping" />
                            <circle cx="100" cy="100" r="3" fill="#2563EB" />
                            
                            <circle cx="60" cy="70" r="3" fill="#06B6D4" />
                            <circle cx="140" cy="70" r="3" fill="#06B6D4" />
                            <circle cx="80" cy="150" r="3" fill="#10B981" />
                            <circle cx="130" cy="140" r="3" fill="#10B981" />
                            <circle cx="40" cy="110" r="3" fill="#F97316" />
                            <circle cx="160" cy="110" r="3" fill="#F97316" />

                            <defs>
                                <linearGradient id="scanGrad" x1="100" y1="100" x2="100" y2="40">
                                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Floating AI Panels */}
                    <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-6 left-6 z-20 p-3 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-xl flex items-center gap-3 max-w-[220px]"
                    >
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-4.5 h-4.5 text-orange-500" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] font-bold text-slate-gray uppercase tracking-wider block">Risk Alert</span>
                            <span className="text-xs font-bold text-white truncate block">Open Manhole (94%)</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-16 right-6 z-20 p-3 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-xl flex items-center gap-3 max-w-[200px]"
                    >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] font-bold text-slate-gray uppercase tracking-wider block">PPE Tracker</span>
                            <span className="text-xs font-bold text-white truncate block">Helmet Secured (99%)</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
