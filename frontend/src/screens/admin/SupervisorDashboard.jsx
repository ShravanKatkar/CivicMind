import React, { useState } from 'react';
import {
    BarChart2, Map as MapIcon, Users, Bell, LogOut, Search, ChevronDown, User, Moon, Sun
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import WorkerTable from './components/WorkerTable';
import AlertsPanel from './components/AlertsPanel';
import MapPanel from './components/MapPanel';
import HazardTimeline from './components/HazardTimeline';
import Logo from '../../components/common/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SupervisorDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { theme, toggleTheme, isDark } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login/supervisor');
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-sky-white overflow-hidden font-body text-ink-navy transition-colors duration-300">
            {/* Sidebar - Electric Blue background with Vivid Cyan active highlights */}
            <aside className="w-full md:w-64 bg-electric-blue text-white flex flex-row md:flex-col z-20 shadow-lg flex-shrink-0 overflow-x-auto md:overflow-visible transition-all duration-300">
                <div className="p-4 md:p-6 flex items-center gap-3 min-w-fit border-b border-white/10">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl p-1.5">
                        <Logo size={36} />
                    </div>
                    <div className="hidden md:block">
                        <h1 className="font-extrabold text-lg leading-none font-display text-white">CivicMind</h1>
                        <p className="text-[10px] font-bold tracking-wider text-blue-200 uppercase mt-1">Supervisor Portal</p>
                    </div>
                </div>

                <nav className="flex-1 flex flex-row md:flex-col gap-2 p-2 md:p-4 md:space-y-2 md:mt-4 overflow-x-auto md:overflow-visible">
                    {[
                        { id: 'overview', icon: MapIcon, label: 'Overview' },
                        { id: 'workers', icon: Users, label: 'Workers' },
                        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
                        { id: 'alerts', icon: Bell, label: 'Alerts' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 md:gap-3 px-4 py-3 rounded-full transition-all duration-200 text-xs md:text-sm font-bold whitespace-nowrap ${activeTab === item.id
                                ? 'bg-vivid-cyan text-ink-navy shadow-md scale-[1.02]'
                                : 'text-blue-100 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-2 md:p-4 border-t border-white/10 min-w-fit md:min-w-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-blue-200 hover:text-white hover:bg-white/5 w-full rounded-full transition-all text-xs md:text-sm font-bold"
                    >
                        <LogOut size={18} />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-sky-white">
                {/* Top Header */}
                <header className="bg-white h-16 border-b border-blue-50 flex items-center justify-between px-6 md:px-8 z-10 shrink-0">
                    <h2 className="font-extrabold text-xl capitalize font-display text-ink-navy">{activeTab.replace('-', ' ')}</h2>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-gray" />
                            <input
                                type="text"
                                placeholder="Search workers, sites..."
                                className="pl-10 pr-4 py-2 bg-sky-white rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-electric-blue/20 w-64 text-ink-navy placeholder-slate-gray border border-blue-50"
                            />
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-sky-white transition-all duration-200"
                            >
                                <div className="w-10 h-10 bg-sky-white rounded-full overflow-hidden border-2 border-white shadow-soft">
                                    <img src="https://i.pravatar.cc/100?img=68" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <ChevronDown size={16} className="text-slate-gray hidden md:block" />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-lg border border-blue-50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-blue-50">
                                        <p className="font-bold text-sm text-ink-navy">{user?.name || 'Supervisor'}</p>
                                        <p className="text-xs text-slate-gray font-medium">{user?.district || 'Mumbai City'}</p>
                                    </div>

                                    <button
                                        className="w-full text-left px-4 py-2.5 text-sm text-ink-navy hover:bg-sky-white flex items-center gap-3 transition-all"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User size={16} />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            toggleTheme();
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-ink-navy hover:bg-sky-white flex items-center gap-3 transition-all"
                                    >
                                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                        {isDark ? 'Light Mode' : 'Dark Mode'}
                                    </button>

                                    <div className="h-px bg-blue-50 my-1"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-alert-red hover:bg-red-50 flex items-center gap-3 transition-all"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content Grid */}
                <div className="flex-1 p-6 overflow-hidden relative">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="flex flex-col lg:flex-row gap-6 h-full">
                            <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-4 scrollbar-hide">
                                {/* Metrics Strip with Illustrated Spot Mini-scenes */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Active Workers', value: '24', trend: '+2', color: 'bg-blue-50 border-blue-100 text-electric-blue', icon: '🪖' },
                                        { label: 'Critical Threats', value: '3', trend: '+1', color: 'bg-red-50 border-red-100 text-alert-red', icon: '💨' },
                                        { label: 'Safe Sites', value: '18', trend: '0', color: 'bg-green-50 border-green-100 text-neon-green', icon: '🛡️' },
                                        { label: 'Avg Response', value: '4m', trend: '-30s', color: 'bg-purple-50 border-purple-100 text-deep-violet', icon: '⚡' },
                                    ].map((stat, i) => (
                                        <Card key={i} className="!p-5 border border-blue-50 shadow-soft bg-white rounded-3xl flex items-center justify-between hover:scale-[1.03] transition-all duration-200 ease-spring relative overflow-hidden">
                                            <div>
                                                <p className="text-slate-gray text-[10px] font-extrabold uppercase tracking-wider">{stat.label}</p>
                                                <h3 className="text-3xl font-extrabold font-data mt-1 text-ink-navy">{stat.value}</h3>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="w-10 h-10 bg-sky-white rounded-xl flex items-center justify-center text-2xl shadow-inner">
                                                    {stat.icon}
                                                </div>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${stat.color}`}>
                                                    {stat.trend}
                                                </span>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {/* Main Visuals Map & Chart Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[380px]">
                                    {/* High Risk Map (Dark Matter Tile Layer) */}
                                    <MapPanel
                                        className="rounded-3xl overflow-hidden shadow-soft border border-blue-50"
                                        district={user?.district}
                                    />

                                    {/* Hazard Timeline */}
                                    <HazardTimeline />
                                </div>

                                {/* Active Personnel Table */}
                                <div className="flex-1">
                                    <h3 className="font-extrabold text-lg mb-4 font-display text-ink-navy">Active Personnel</h3>
                                    <div className="bg-white rounded-3xl shadow-soft border border-blue-50 overflow-hidden">
                                        <WorkerTable district={user?.district} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Alerts Timeline Sidebar */}
                            <div className="w-full lg:w-80 flex flex-col gap-4">
                                <AlertsPanel district={user?.district} />
                            </div>
                        </div>
                    )}

                    {/* WORKERS TAB */}
                    {activeTab === 'workers' && (
                        <div className="h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-extrabold text-xl font-display text-ink-navy">Worker Management</h3>
                                <Button className="!bg-electric-blue rounded-full px-6 py-3 font-bold">+ Add Worker</Button>
                            </div>
                            <div className="flex-1 overflow-auto bg-white rounded-3xl shadow-soft p-6 border border-blue-50">
                                <WorkerTable limit={50} district={user?.district} />
                            </div>
                        </div>
                    )}

                    {/* ANALYTICS TAB */}
                    {activeTab === 'analytics' && (
                        <div className="h-full flex items-center justify-center flex-col text-slate-gray">
                            <div className="w-24 h-24 bg-sky-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-soft">
                                📊
                            </div>
                            <h3 className="text-xl font-extrabold font-display text-ink-navy">Analytics Hub</h3>
                            <p className="text-sm font-medium mt-1">Detailed safety reports and trends coming soon.</p>
                        </div>
                    )}

                    {/* ALERTS TAB */}
                    {activeTab === 'alerts' && (
                        <div className="h-full flex gap-6">
                            <div className="flex-1 bg-white rounded-3xl shadow-soft p-6 overflow-auto border border-blue-50">
                                <h3 className="font-extrabold text-lg mb-4 font-display text-ink-navy">System Alerts Register</h3>
                                <AlertsPanel limit={20} district={user?.district} />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SupervisorDashboard;
