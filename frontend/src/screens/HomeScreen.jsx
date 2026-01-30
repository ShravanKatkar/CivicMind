import React, { useState } from 'react';
import { Search, Camera, Mic, AlertTriangle, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

    // Placeholder for t function and user object
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
    const user = { name: 'John Doe', role: 'Supervisor' }; // Mock user object

    return (
        <div
            className="min-h-screen pb-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"
        >
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-8 pb-6 px-6 mb-4 relative overflow-hidden"
                style={{
                    background: 'var(--gov-header-gradient)',
                    boxShadow: 'var(--shadow-soft)',
                }}
            >
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage: `url(${headerPattern})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Logo & Branding - Aligned Center */}
                <div className="flex flex-col items-center justify-center mb-4 relative z-10">
                    <div className="mb-2 transform hover:scale-105 transition-transform duration-300">
                        <Logo size={80} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-0.5 text-center drop-shadow-lg font-heading">
                        CivicMind
                    </h1>
                    <p className="text-blue-50 text-xs font-semibold tracking-wider uppercase text-center opacity-90">
                        Municipal Safety Intelligence
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center shadow-xl relative z-10 transition-colors duration-300 border border-white/20">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Search for Field Sites..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 font-medium"
                    />
                    <div className="w-8 h-8 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gov-navy/10 dark:bg-white/10 rounded-full flex items-center justify-center">
                            <ChevronRight className="w-5 h-5 text-gov-navy dark:text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide py-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${activeTab === tab
                                ? 'bg-gray-800 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                                : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Home Dashboard Card */}
                <div
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg mb-6 transition-colors duration-300"
                    style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Home Dashboard
                        </h2>
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform rotate-3"
                            style={{
                                background: 'var(--gov-header-gradient)',
                                boxShadow: 'var(--shadow-professional)',
                            }}
                        >
                            <span className="text-white text-lg">📊</span>
                        </div>
                    </div>

                    {/* Site Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        {filteredSites.map((site) => (
                            <div
                                key={site.id}
                                onClick={() => navigate('/live-safety')}
                                className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all transform hover:scale-[1.02] border border-transparent hover:border-blue-100 dark:hover:border-slate-600"
                            >
                                <div className="h-24 relative">
                                    <img
                                        src={site.image}
                                        alt={site.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-2 left-2 right-2">
                                        <p className="text-white text-xs font-bold text-shadow-sm">{site.name}</p>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-[10px] mb-1.5">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {site.location}
                                    </div>
                                    <div className={`text-xs font-semibold ${site.risk === 'safe' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                        {site.riskLevel}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <button
                        onClick={() => navigate('/reports')}
                        className="w-full py-3 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        View All Sites
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg mb-6 transition-colors duration-300">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/assess')}
                            className="w-full text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                            style={{ background: 'var(--gov-header-gradient)' }}
                        >
                            <Camera className="w-5 h-5" />
                            AI Photo Assessment
                        </button>

                        <button
                            onClick={() => navigate('/voice')}
                            className="w-full text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                            style={{ background: 'var(--gov-safety-gradient)' }}
                        >
                            <Mic className="w-5 h-5" />
                            Voice Report
                        </button>

                        <button
                            onClick={() => navigate('/reports')}
                            className="w-full border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-semibold py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3"
                        >
                            <AlertTriangle className="w-5 h-5" />
                            View Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
