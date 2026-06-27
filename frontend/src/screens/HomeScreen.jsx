import React, { useState } from 'react';
import { Search, Camera, Mic, AlertTriangle, MapPin, ChevronRight, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';

// Import illustrations
import workerInspecting from '../assets/images/worker_inspecting.png';
import siteDanger from '../assets/images/site_hazard.png';
import headerPattern from '../assets/images/header_pattern.png';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = ['All', 'Safety', 'Risk', 'Reports'];

    // Sample site data - Indian locations
    const sites = [
        {
            id: 1,
            name: 'Site A',
            location: 'Mumbai, Maharashtra',
            image: workerInspecting,
            risk: 'safe',
            riskLevel: 'Safe',
        },
        {
            id: 2,
            name: 'Site B',
            location: 'Pune, Maharashtra',
            image: siteDanger,
            risk: 'danger',
            riskLevel: 'High Risk Rear',
        },
    ];

    const filteredSites = sites.filter(site => {
        const matchesTab =
            activeTab === 'All' ||
            (activeTab === 'Safety' && site.risk === 'safe') ||
            (activeTab === 'Risk' && site.risk === 'danger');
        const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const t = (key) => {
        const translations = {
            'home.welcome': 'Welcome',
            'home.searchPlaceholder': 'Search for Field Sites...',
            'home.recentSites': 'Recent Sites',
            'home.voiceReport': 'Voice Report',
            'home.assessDanger': 'Assess Danger',
        };
        return translations[key] || key;
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-900 transition-colors duration-300 pb-8">
            {/* Premium Header Banner */}
            <div className="relative pt-8 pb-14 px-6 rounded-b-[32px] overflow-hidden bg-gradient-to-tr from-electric-blue via-[#1D4ED8] to-vivid-cyan shadow-lg">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none" 
                    style={{ backgroundImage: `url(${headerPattern})` }} 
                />

                {/* Brand & Pulser */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-lg text-white font-display tracking-tight leading-none">
                                CivicMind <span className="text-cyan-200">AI</span>
                            </span>
                            <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest mt-0.5 leading-none">
                                Municipal Safety
                            </span>
                        </div>
                    </div>

                    {/* Glowing active indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        Engine Active
                    </div>
                </div>

                {/* Search Bar Container */}
                <div className="relative z-10 max-w-md mx-auto">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center shadow-lg border border-white/20 transition-colors duration-300">
                        <Search className="w-5 h-5 text-slate-gray mr-3" />
                        <input
                            type="text"
                            placeholder="Search for Field Sites..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-ink-navy dark:text-white placeholder-slate-gray font-semibold"
                        />
                        <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-6 -mt-6 relative z-20">
                {/* Horizontal Category Tabs */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-soft mb-6 flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="relative py-2 px-5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex-1 text-center"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-[#F7F9FC] dark:bg-slate-700 text-electric-blue rounded-xl"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? 'text-electric-blue dark:text-white' : 'text-slate-gray dark:text-gray-400'}`}>
                                    {tab}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Home Dashboard List Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60 mb-6">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h2 className="text-base font-extrabold text-ink-navy dark:text-white leading-none">
                                Home Dashboard
                            </h2>
                            <span className="text-[10px] text-slate-gray font-bold uppercase tracking-wider block mt-1">
                                ACTIVE SECTORS
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                            <Shield className="w-4.5 h-4.5" />
                        </div>
                    </div>

                    {/* Site Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {filteredSites.map((site) => {
                            const isSafe = site.risk === 'safe';
                            return (
                                <motion.div
                                    key={site.id}
                                    onClick={() => navigate('/live-safety')}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-[#F7F9FC] dark:bg-slate-700/50 rounded-2xl overflow-hidden cursor-pointer border border-gray-200/40 dark:border-slate-700/30 flex flex-col justify-between"
                                >
                                    <div className="h-20 relative">
                                        <img
                                            src={site.image}
                                            alt={site.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                                        
                                        {/* Status Tag Overlay */}
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider ${
                                                isSafe ? 'bg-emerald-500 text-white' : 'bg-alert-red text-white animate-pulse'
                                            }`}>
                                                {isSafe ? 'Safe' : 'Danger'}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-2 left-3">
                                            <p className="text-white text-xs font-bold leading-none">{site.name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3">
                                        <div className="flex items-center text-slate-gray dark:text-gray-400 text-[9px] font-bold mb-1.5">
                                            <MapPin className="w-3 h-3 mr-1 text-electric-blue" />
                                            {site.location.split(',')[0]}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {isSafe 
                                                ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                : <ShieldAlert className="w-3.5 h-3.5 text-alert-red" />
                                            }
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                isSafe ? 'text-emerald-500' : 'text-alert-red'
                                            }`}>
                                                {site.riskLevel}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* View All Button */}
                    <button
                        onClick={() => navigate('/reports')}
                        className="w-full py-3 bg-[#F7F9FC] dark:bg-slate-700/50 hover:bg-sky-white text-xs font-bold text-slate-gray dark:text-gray-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-gray-200/30"
                    >
                        View All Sites
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Quick Actions Container */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60 mb-6">
                    <h3 className="font-extrabold text-ink-navy dark:text-white text-base mb-4">Quick Safety Actions</h3>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/assess')}
                            className="w-full text-white font-bold py-4 rounded-2xl shadow-md shadow-electric-blue/15 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2.5 bg-gradient-to-r from-electric-blue to-vivid-cyan"
                        >
                            <Camera className="w-5 h-5 text-white" />
                            AI Photo Assessment
                        </button>

                        <button
                            onClick={() => navigate('/voice')}
                            className="w-full text-white font-bold py-4 rounded-2xl shadow-md shadow-emerald-500/15 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                        >
                            <Mic className="w-5 h-5 text-white" />
                            Voice Report
                        </button>

                        <button
                            onClick={() => navigate('/reports')}
                            className="w-full border border-gray-200 dark:border-slate-700 text-slate-gray dark:text-gray-200 font-bold py-4 rounded-2xl hover:bg-sky-white dark:hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2.5"
                        >
                            <AlertTriangle className="w-5 h-5 text-slate-gray" />
                            View Reports History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
