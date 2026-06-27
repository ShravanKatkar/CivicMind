import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Bell, CheckCircle, Clock, Eye, MapPin, RefreshCw, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import LivingRiskGauge from '../../components/LivingRiskGauge';

const DashboardPreview = () => {
    const [activeTab, setActiveTab] = useState('live');

    const incidents = [
        { worker: 'Ramesh Patil', site: 'Site A - Tunnel Entry', risk: '9.2', status: 'CRITICAL', time: '1m ago', type: 'Gas Risk' },
        { worker: 'Suresh Kumar', site: 'Site B - Scaffolding', risk: '7.8', status: 'WARNING', time: '4m ago', type: 'Unstable Structure' },
        { worker: 'Vikram Singh', site: 'Site C - Warehouse', risk: '4.5', status: 'NORMAL', time: '12m ago', type: 'Slip Hazard' }
    ];

    return (
        <section id="dashboard" className="py-24 bg-[#F7F9FC] dark:bg-slate-900/50 relative overflow-hidden">
            <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-vivid-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                        Enterprise Console
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        Intelligent Supervisor Control Room
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        Monitor worker telemetry, automatically receive AI explanations of critical visual risks, and dispatch automated warnings from one centralized safety hub.
                    </p>
                </div>

                {/* Dashboard Container Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white dark:bg-slate-800 rounded-[28px] border border-gray-100 dark:border-slate-700/60 p-6 md:p-8 shadow-soft relative">
                    {/* Header Controls */}
                    <div className="col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-700/60">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-red opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-alert-red"></span>
                            </span>
                            <div>
                                <h3 className="font-extrabold text-ink-navy dark:text-white text-base">CivicMind Live Safety Dashboard</h3>
                                <span className="text-[10px] text-slate-gray dark:text-gray-400 font-bold uppercase tracking-wider">MUMBAI DISTRICT CENTRAL</span>
                            </div>
                        </div>

                        {/* Interactive Tabs */}
                        <div className="flex bg-[#F7F9FC] dark:bg-slate-900 p-1 rounded-xl border border-gray-200/50 dark:border-slate-800 self-start">
                            {['live', 'alerts', 'compliance'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                                        activeTab === tab
                                            ? 'bg-white dark:bg-slate-800 text-electric-blue shadow-sm'
                                            : 'text-slate-gray hover:text-ink-navy'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Left Sidebar - Active Reports Feed */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-gray uppercase tracking-wider">Active Field Alerts</h4>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-alert-red">
                                {incidents.length} Pending
                            </span>
                        </div>

                        <div className="space-y-3">
                            {incidents.map((incident, idx) => (
                                <div 
                                    key={idx}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        idx === 0 
                                            ? 'bg-sky-white border-electric-blue/20 dark:bg-slate-900/50' 
                                            : 'bg-white border-gray-100 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700/50'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                            incident.status === 'CRITICAL' 
                                                ? 'bg-red-100 text-alert-red' 
                                                : incident.status === 'WARNING' 
                                                    ? 'bg-amber-100 text-blazing-amber' 
                                                    : 'bg-green-100 text-neon-green'
                                        }`}>
                                            {incident.status}
                                        </span>
                                        <span className="text-[10px] text-slate-gray">{incident.time}</span>
                                    </div>
                                    <h5 className="font-bold text-xs text-ink-navy dark:text-white mb-1">{incident.site}</h5>
                                    <p className="text-[11px] font-semibold text-slate-gray mb-2">Worker: <span className="text-ink-navy font-bold">{incident.worker}</span></p>
                                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-gray pt-2 border-t border-gray-100/50 dark:border-slate-700/50">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-electric-blue" /> Zone 2</span>
                                        <span className="text-alert-red font-data">{incident.risk} / 10 Risk</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column - Live Scanner Visual */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-gray uppercase tracking-wider">Live Safety Assessment</h4>
                            <span className="text-xs font-bold text-electric-blue flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> AI Scanning Active
                            </span>
                        </div>

                        {/* Scanner Video Mock */}
                        <div className="aspect-video bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.7)_100%)] z-10" />
                            {/* SVG mockup of scanning visual */}
                            <svg className="w-full h-full text-slate-800" viewBox="0 0 160 90" fill="none">
                                <rect x="30" y="20" width="100" height="50" rx="3" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" />
                                <circle cx="80" cy="45" r="15" stroke="#2563EB" strokeWidth="1" />
                                <line x1="80" y1="0" x2="80" y2="90" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
                                <line x1="0" y1="45" x2="160" y2="45" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
                                
                                {/* Detected Objects boxes */}
                                <g>
                                    {/* Bounding box for helmet */}
                                    <rect x="72" y="22" width="16" height="12" rx="1.5" stroke="#F59E0B" strokeWidth="0.75" />
                                    <text x="73" y="28" fill="#F59E0B" fontSize="3" fontWeight="bold" fontFamily="monospace">HELMET 98%</text>
                                    
                                    {/* Bounding box for drain */}
                                    <rect x="50" y="55" width="60" height="20" rx="2" stroke="#EF4444" strokeWidth="1" />
                                    <text x="52" y="61" fill="#EF4444" fontSize="4" fontWeight="bold" fontFamily="monospace">HAZARD: OPEN MANHOLE 92%</text>
                                </g>
                            </svg>
                            <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                                status: normal
                            </div>
                        </div>

                        {/* Safety Score Tracker */}
                        <div className="bg-sky-white rounded-2xl p-4 flex items-center justify-between border border-electric-blue/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-electric-blue/15 rounded-xl flex items-center justify-center text-electric-blue">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-gray font-bold uppercase tracking-wider block">Safety Compliance Index</span>
                                    <h4 className="font-extrabold text-ink-navy text-sm">Zone A - 98.4% (Excellent)</h4>
                                </div>
                            </div>
                            <span className="text-emerald-500 font-bold font-data text-sm">+2.4%</span>
                        </div>
                    </div>

                    {/* Right Column - Telemetry Gauge */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <h4 className="text-xs font-bold text-slate-gray uppercase tracking-wider">Telemetry Assessment</h4>
                        
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col items-center justify-center flex-1">
                            {/* Living Gauge Indicator widget */}
                            <LivingRiskGauge score={8.2} />
                            
                            <div className="text-center mt-6 w-full pt-4 border-t border-gray-100 dark:border-slate-700">
                                <span className="text-xs font-bold text-alert-red uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
                                    <ShieldAlert className="w-4 h-4" /> Critical Threat level
                                </span>
                                <p className="text-[11px] font-semibold text-slate-gray leading-snug">
                                    H2S gas detection levels approaching hazardous limit. PPE mandatory.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;
