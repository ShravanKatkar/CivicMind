import React, { useState } from 'react';
import {
    BarChart2, Map as MapIcon, Users, Bell, Settings,
    Search, Menu, LogOut, Shield, ChevronDown, User, Moon, Sun
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
        navigate('/login/supervisor'); // Provide explicit path
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-neutral-50 dark:bg-slate-900 overflow-hidden font-sans text-neutral-900 dark:text-gray-100 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-slate-800 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex flex-row md:flex-col z-20 shadow-sm flex-shrink-0 overflow-x-auto md:overflow-visible transition-colors duration-300">
                <div className="p-4 md:p-6 flex items-center gap-3 min-w-fit">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <Logo size={40} />
                    </div>
                    <div className="hidden md:block">
                        <h1 className="font-bold text-lg leading-tight text-gray-900 dark:text-white">CivicMind</h1>
                        <p className="text-xs text-gray-400">Supervisor Portal</p>
                    </div>
                </div>

                <nav className="flex-1 flex flex-row md:flex-col gap-2 p-2 md:px-4 md:space-y-2 md:mt-4 overflow-x-auto md:overflow-visible">
                    {[
                        { id: 'overview', icon: MapIcon, label: 'Overview' },
                        { id: 'workers', icon: Users, label: 'Workers' },
                        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
                        { id: 'alerts', icon: Bell, label: 'Alerts' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-colors font-medium text-xs md:text-sm whitespace-nowrap ${activeTab === item.id
                                ? 'bg-black dark:bg-white text-white dark:text-black shadow-soft'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <item.icon size={16} className="md:w-[18px] md:h-[18px]" />
                            <span className="md:inline">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-2 md:p-4 border-l md:border-l-0 md:border-t border-gray-100 dark:border-gray-700 min-w-fit md:min-w-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 text-gray-400 hover:text-red-500 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-xs md:text-sm font-medium"
                    >
                        <LogOut size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                {/* Top Header */}
                <header className="bg-white dark:bg-slate-800 h-auto min-h-[64px] border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 z-10 pt-safe-top pb-2 md:py-0 transition-colors duration-300">
                    <h2 className="font-bold text-xl capitalize text-gray-900 dark:text-white">{activeTab.replace('-', ' ')}</h2>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search workers, sites..."
                                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 w-64 text-gray-900 dark:text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden border-2 border-white dark:border-slate-500 shadow-sm">
                                    <img src="https://i.pravatar.cc/100?img=68" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 hidden md:block" />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{user?.name || 'Supervisor'}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.district || 'Mumbai City'}</p>
                                    </div>

                                    <button
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
                                        onClick={() => {
                                            console.log('Navigate to profile edit');
                                            // navigate('/admin/profile'); 
                                            // For now just close menu as requested "options of edit profile"
                                            setIsProfileOpen(false);
                                        }}
                                    >
                                        <User size={16} />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={toggleTheme}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
                                    >
                                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                        {isDark ? 'Light Mode' : 'Dark Mode'}
                                    </button>

                                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="flex-1 p-6 overflow-hidden relative">
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="flex flex-col lg:flex-row gap-6 h-full">
                            <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-4 scrollbar-hide">
                                {/* Metrics Row */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Active Workers', value: '24', trend: '+2', color: 'bg-blue-50 dark:bg-blue-900/20 text-primary-blue dark:text-blue-400' },
                                        { label: 'Critical Threats', value: '3', trend: '+1', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
                                        { label: 'Safe Sites', value: '18', trend: '0', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
                                        { label: 'Avg Response', value: '4m', trend: '-30s', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
                                    ].map((stat, i) => (
                                        <Card key={i} className="!p-5 flex items-center justify-between dark:bg-slate-800 border dark:border-slate-700">
                                            <div>
                                                <p className="text-gray-400 text-xs font-semibold uppercase">{stat.label}</p>
                                                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h3>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-bold ${stat.color}`}>
                                                {stat.trend}
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {/* Main Visuals Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
                                    {/* High Risk Map (Heatmap simulated) */}
                                    <MapPanel
                                        className="rounded-3xl overflow-hidden shadow-sm"
                                        district={user?.district}
                                    />

                                    {/* Hazard Timeline */}
                                    <HazardTimeline />
                                </div>

                                {/* Secondary Table */}
                                <div className="flex-1">
                                    <h3 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">Active Personnel</h3>
                                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                                        <WorkerTable district={user?.district} />
                                    </div>
                                </div>
                            </div>
                            {/* Right Panel (Alerts Feed) */}
                            <div className="w-full lg:w-80 flex flex-col gap-4">
                                <AlertsPanel district={user?.district} />
                            </div>
                        </div>
                    )}

                    {/* WORKERS TAB */}
                    {activeTab === 'workers' && (
                        <div className="h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Worker Management</h3>
                                <Button className="!bg-primary-blue">+ Add Worker</Button>
                            </div>
                            <div className="flex-1 overflow-auto bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
                                <WorkerTable limit={50} district={user?.district} />
                            </div>
                        </div>
                    )}

                    {/* ANALYTICS TAB */}
                    {activeTab === 'analytics' && (
                        <div className="h-full flex items-center justify-center flex-col text-gray-400">
                            <BarChart2 size={64} className="mb-4 opacity-50" />
                            <h3 className="text-xl font-bold">Analytics Module</h3>
                            <p>Detailed safety reports and trends coming soon.</p>
                        </div>
                    )}

                    {/* ALERTS TAB */}
                    {activeTab === 'alerts' && (
                        <div className="h-full flex gap-6">
                            <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 overflow-auto border border-gray-100 dark:border-slate-700">
                                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">All System Alerts</h3>
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
