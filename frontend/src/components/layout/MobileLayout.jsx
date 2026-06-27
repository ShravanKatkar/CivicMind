import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../context/LanguageContext';

const MobileLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const navItems = [
        { icon: Home, label: t('nav.home'), path: '/home' },
        { icon: Calendar, label: t('nav.calendar'), path: '/home/calendar' },
        { icon: Bell, label: t('nav.updates'), path: '/home/updates' },
        { icon: User, label: t('nav.profile'), path: '/home/profile' },
    ];

    return (
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-900 font-body text-ink-navy dark:text-white transition-colors duration-300 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 pb-24 overflow-y-auto">
                <Outlet />
            </div>

            {/* Bottom Floating Navigation - Glassmorphic Capsule */}
            <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
                <div className="bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border border-white/40 dark:border-slate-800/40 shadow-soft max-w-md w-full rounded-2xl flex justify-around items-center py-2 px-3 relative pointer-events-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1.5 relative z-10 transition-colors duration-200"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeMobileTab"
                                        className="absolute inset-0 bg-electric-blue/10 dark:bg-electric-blue/20 rounded-xl -z-10"
                                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                    />
                                )}
                                <Icon 
                                    className={`w-5.5 h-5.5 transition-colors duration-200 ${
                                        isActive ? 'text-electric-blue' : 'text-slate-gray dark:text-gray-400'
                                    }`} 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                />
                                <span className={`text-[9px] font-bold tracking-tight transition-colors duration-200 ${
                                    isActive ? 'text-electric-blue' : 'text-slate-gray dark:text-gray-400'
                                }`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileLayout;
