import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Bell, User } from 'lucide-react';
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
        <div className="min-h-screen bg-neutral-50 dark:bg-slate-900 font-sans text-neutral-900 dark:text-white transition-colors duration-300">
            {/* Main Content */}
            <div className="min-h-screen pb-20">
                <Outlet />
            </div>

            {/* Bottom Navigation - Fixed */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-lg z-50 transition-colors duration-300">
                <div className="max-w-md mx-auto flex justify-around items-center py-3 px-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 transition-all ${isActive ? 'text-gov-navy dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
                                    }`}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>
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
