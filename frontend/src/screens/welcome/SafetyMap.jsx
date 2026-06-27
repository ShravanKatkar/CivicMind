import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShieldAlert, Users, Info, Activity } from 'lucide-react';

const SafetyMap = () => {
    const [selectedPin, setSelectedPin] = useState(null);

    const locations = [
        { id: 1, x: 45, y: 35, name: 'Mumbai North Sewerage - Site A', risk: '9.2', status: 'CRITICAL', details: 'H2S Gas leak detected near water junction.', workers: 2 },
        { id: 2, x: 70, y: 55, name: 'Thane Highway Flyover - Site B', risk: '7.8', status: 'WARNING', details: 'Unstable scaffolding nodes detected.', workers: 4 },
        { id: 3, x: 30, y: 70, name: 'Zone 4 Depot - Site C', risk: '4.5', status: 'NORMAL', details: 'Slippery corridor floor. Wet sign missing.', workers: 1 }
    ];

    return (
        <section id="safety-map" className="py-24 bg-[#F7F9FC] dark:bg-slate-900/50 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left side text */}
                <div className="lg:col-span-5 flex flex-col items-start gap-6">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block font-display">
                        Geospatial intelligence
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display leading-tight">
                        Interactive Live Safety Heatmap
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base leading-relaxed">
                        Track live safety compliance parameters geographically across municipal limits. Bounding boxes and telemetry coordinates are updated in real-time as workers submit reports from the field.
                    </p>
                    
                    <div className="space-y-4 w-full pt-4 border-t border-gray-200/60 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <ShieldAlert className="w-4 h-4 text-alert-red" />
                            </div>
                            <div className="text-xs font-semibold text-slate-gray">
                                <span className="font-bold text-ink-navy block">Critical Danger Zones</span>
                                Red pins highlight locations with immediate safety violations.
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Users className="w-4 h-4 text-electric-blue" />
                            </div>
                            <div className="text-xs font-semibold text-slate-gray">
                                <span className="font-bold text-ink-navy block">Active Field Operatives</span>
                                Displays count of active crews monitoring the specific sector.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side SVG Map visualization */}
                <div className="lg:col-span-7 relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 p-4 shadow-soft h-[350px] md:h-[450px]">
                    <div className="absolute inset-0 bg-[#EFF6FF]/20 dark:bg-slate-900/40 rounded-3xl pointer-events-none" />
                    
                    {/* SVG City Outline Mockup */}
                    <svg className="w-full h-full text-gray-100 dark:text-slate-700/50" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.5">
                        {/* District grids */}
                        <path d="M0,20 Q40,30 60,10 T100,20" />
                        <path d="M0,50 Q20,60 50,40 T100,50" strokeWidth="0.75" />
                        <path d="M0,80 Q30,70 70,90 T100,80" />
                        <path d="M30,0 Q40,40 20,70 T30,100" />
                        <path d="M60,0 Q50,30 70,60 T60,100" strokeWidth="0.75" />
                        
                        {/* Heatmap circles */}
                        <circle cx="45" cy="35" r="18" fill="rgba(239, 68, 68, 0.08)" stroke="rgba(239, 68, 68, 0.15)" strokeWidth="0.5" />
                        <circle cx="70" cy="55" r="12" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="0.5" />
                    </svg>

                    {/* Interactive glowing pins */}
                    {locations.map((loc) => {
                        const isCritical = loc.status === 'CRITICAL';
                        const isWarning = loc.status === 'WARNING';
                        return (
                            <div
                                key={loc.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                onClick={() => setSelectedPin(loc)}
                            >
                                {/* Glowing outer ring */}
                                <span className={`absolute -inset-2 rounded-full opacity-70 ${
                                    isCritical 
                                        ? 'bg-alert-red animate-ping' 
                                        : isWarning 
                                            ? 'bg-blazing-amber animate-pulse' 
                                            : 'bg-neon-green animate-pulse'
                                }`} />
                                
                                {/* Inner Marker Pin */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg relative ${
                                    isCritical 
                                        ? 'bg-alert-red text-white' 
                                        : isWarning 
                                            ? 'bg-blazing-amber text-white' 
                                            : 'bg-neon-green text-white'
                                }`}>
                                    <MapPin className="w-4 h-4" />
                                </div>

                                {/* Quick hover label */}
                                <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[9px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
                                    RISK: {loc.risk}
                                </span>
                            </div>
                        );
                    })}

                    {/* Pop-up detail card overlay */}
                    <AnimatePresence>
                        {selectedPin && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-4 left-4 right-4 z-30 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-2xl flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase inline-block mb-1 ${
                                            selectedPin.status === 'CRITICAL' 
                                                ? 'bg-red-100 text-alert-red' 
                                                : selectedPin.status === 'WARNING' 
                                                    ? 'bg-amber-100 text-blazing-amber' 
                                                    : 'bg-green-100 text-neon-green'
                                        }`}>
                                            {selectedPin.status} STATUS
                                        </span>
                                        <h4 className="font-extrabold text-sm text-ink-navy dark:text-white leading-tight">
                                            {selectedPin.name}
                                        </h4>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedPin(null)}
                                        className="text-xs font-bold text-slate-gray hover:text-ink-navy bg-sky-white dark:bg-slate-700 px-2 py-1 rounded-lg"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                                <p className="text-xs text-slate-gray dark:text-gray-300 font-semibold leading-snug">{selectedPin.details}</p>
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-gray pt-3 border-t border-gray-100 dark:border-slate-700">
                                    <span className="flex items-center gap-1 font-data text-alert-red"><Activity className="w-3.5 h-3.5" /> Risk Score: {selectedPin.risk}/10</span>
                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-electric-blue" /> Crew size: {selectedPin.workers}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Reset instructions helper */}
                    <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 text-[10px] text-white/90 font-bold tracking-wide">
                        <Info className="w-3.5 h-3.5 text-vivid-cyan" /> Click pins to inspect
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SafetyMap;
