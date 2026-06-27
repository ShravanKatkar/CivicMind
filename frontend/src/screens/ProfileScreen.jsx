import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Phone, MapPin, Award, Shield,
    Settings, LogOut, ChevronRight, Edit, Globe,
    Home, FileText, Check, X, Moon, Sun, Bell,
    Smartphone, ShieldAlert, Sparkles
} from 'lucide-react';
import { useTranslation, useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { logout, user, updateUser } = useAuth();
    const { theme, toggleTheme, isDark } = useTheme();

    // Modal States
    const [activeModal, setActiveModal] = useState(null); // 'language', 'edit', 'settings', 'privacy'

    // Form State for Edit Profile
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        role: ''
    });

    // Initialize form data from user object
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || 'User',
                email: user.email || '',
                phone: user.phone || '',
                location: user.location || 'Mumbai, Maharashtra',
                role: user.role || 'Worker'
            });
        }
    }, [user]);

    // Stats and Badges (Mock for now, could be dynamic later)
    const stats = [
        { label: t('profile.reportsFiled'), value: '47', icon: Shield, color: 'text-electric-blue bg-blue-50 dark:bg-blue-900/25' },
        { label: t('profile.incidentsPrevented'), value: '12', icon: Award, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/25' },
        { label: t('profile.trainingHours'), value: '84', icon: Sparkles, color: 'text-vivid-cyan bg-cyan-50 dark:bg-cyan-900/25' },
        { label: t('profile.safetyScore'), value: '98%', icon: Shield, color: 'text-deep-violet bg-purple-50 dark:bg-purple-900/25' },
    ];

    const badges = [
        { name: 'Safety Champion', icon: '🏆', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300' },
        { name: 'Quick Reporter', icon: '⚡', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
        { name: 'Team Leader', icon: '👑', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
        { name: '100 Reports', icon: '💯', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' },
    ];

    const training = [
        { title: 'Danger Recognition', date: 'Jan 2026', status: 'Completed' },
        { title: 'Emergency Response', date: 'Dec 2025', status: 'Completed' },
        { title: 'PPE Safety', date: 'Nov 2025', status: 'Completed' },
    ];

    const handleLogout = () => {
        if (window.confirm(t('profile.logoutConfirm'))) {
            logout();
            navigate('/');
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, ...formData };
        updateUser(updatedUser);
        setActiveModal(null);
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-900 pb-24 transition-colors duration-300">
            {/* Header with Gradient */}
            <div className="relative pt-12 pb-24 px-6 rounded-b-[32px] bg-gradient-to-tr from-electric-blue via-[#1D4ED8] to-vivid-cyan shadow-lg">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10">
                    <h1 className="text-xl font-extrabold text-white font-display tracking-tight uppercase">
                        {t('profile.title')}
                    </h1>
                    <button
                        onClick={() => navigate('/home')}
                        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90 border border-white/10"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Profile Card - Overlapping */}
            <div className="mx-6 -mt-16 relative z-10 bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-slate-700/60">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-electric-blue to-vivid-cyan flex items-center justify-center text-white text-xl font-bold border-2 border-white dark:border-slate-700 shadow-md">
                            {formData.name?.charAt(0) || 'U'}
                        </div>
                        <button
                            onClick={() => setActiveModal('edit')}
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-electric-blue hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-all"
                        >
                            <Edit className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-base font-extrabold text-ink-navy dark:text-white leading-tight">{formData.name}</h2>
                        <span className="text-[9px] font-mono font-bold text-slate-gray dark:text-gray-400 block mt-1">
                            {user?.id || 'ID: #WK-7829'}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-[9px] font-bold text-electric-blue uppercase mt-1">
                            {formData.role}
                        </span>
                    </div>
                </div>

                <div className="space-y-2.5 text-xs font-semibold text-slate-gray dark:text-gray-300">
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-electric-blue shrink-0" />
                        <span className="truncate">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-electric-blue shrink-0" />
                        <span>{formData.phone}</span>
                    </div>
                    {formData.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-electric-blue shrink-0" />
                            <span className="truncate">{formData.location}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-6 mt-6 space-y-5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-soft border border-gray-100 dark:border-slate-700/60 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold text-slate-gray uppercase tracking-wider block">
                                    {stat.label}
                                </span>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-ink-navy dark:text-white font-data">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Achievements Badges */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60">
                    <h3 className="font-extrabold text-sm text-ink-navy dark:text-white mb-4 uppercase tracking-wider">
                        {t('profile.achievements')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3.5">
                        {badges.map((badge, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl p-4 text-center border border-transparent shadow-sm flex flex-col items-center justify-center ${badge.color}`}
                            >
                                <div className="text-2xl mb-1.5">{badge.icon}</div>
                                <p className="text-[10px] font-bold uppercase tracking-wider">{badge.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training History */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-extrabold text-sm text-ink-navy dark:text-white uppercase tracking-wider">
                            {t('profile.trainingHistory')}
                        </h3>
                        <button className="text-electric-blue text-xs font-bold hover:underline">
                            {t('profile.viewAll')}
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {training.map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3.5 bg-[#F7F9FC] dark:bg-slate-750 rounded-2xl hover:bg-sky-white transition-colors"
                            >
                                <div className="flex-1 min-w-0 pr-4">
                                    <h4 className="font-bold text-xs text-ink-navy dark:text-white truncate">{course.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-gray dark:text-gray-400 mt-1 font-data">{course.date}</p>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-950/20 px-2.5 py-1 rounded-md shrink-0">
                                    {course.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings Menu List */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-2.5 shadow-soft border border-gray-100 dark:border-slate-700/60">
                    {[
                        {
                            label: t('profile.editProfile'),
                            icon: Edit,
                            action: () => setActiveModal('edit')
                        },
                        {
                            label: t('profile.changeLanguage'),
                            icon: Globe,
                            action: () => setActiveModal('language')
                        },
                        {
                            label: t('profile.settings'),
                            icon: Settings,
                            action: () => setActiveModal('settings')
                        },
                        {
                            label: t('profile.privacyPolicy'),
                            icon: FileText,
                            action: () => alert('Privacy Policy feature coming soon!')
                        },
                        {
                            label: t('profile.logout'),
                            icon: LogOut,
                            danger: true,
                            action: handleLogout
                        },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors ${
                                item.danger
                                    ? 'text-alert-red hover:bg-red-50 dark:hover:bg-red-900/10'
                                    : 'text-slate-gray dark:text-gray-200 hover:bg-[#F7F9FC] dark:hover:bg-slate-700'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5 shrink-0 text-slate-gray" />
                                <span className="font-bold text-xs md:text-sm text-ink-navy dark:text-white">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-gray/65" />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Edit Profile Modal */}
            {activeModal === 'edit' && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md sm:rounded-3xl rounded-t-[32px] p-6 shadow-2xl animate-slide-up sm:animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-ink-navy dark:text-white uppercase tracking-wider">{t('profile.editProfile')}</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-sky-white dark:hover:bg-slate-700 rounded-full">
                                <X className="w-4.5 h-4.5 text-slate-gray" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-gray uppercase tracking-wider mb-1">{t('register.fullName')}</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F7F9FC] dark:bg-slate-750 text-ink-navy dark:text-white font-semibold text-xs md:text-sm outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-gray uppercase tracking-wider mb-1">{t('register.email')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F7F9FC] dark:bg-slate-750 text-ink-navy dark:text-white font-semibold text-xs md:text-sm outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-gray uppercase tracking-wider mb-1">{t('register.phone')}</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F7F9FC] dark:bg-slate-750 text-ink-navy dark:text-white font-semibold text-xs md:text-sm outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-gray uppercase tracking-wider mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F7F9FC] dark:bg-slate-750 text-ink-navy dark:text-white font-semibold text-xs md:text-sm outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-electric-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-all mt-4"
                            >
                                {t('common.save')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Language Modal */}
            {activeModal === 'language' && (
                <LanguageModal onClose={() => setActiveModal(null)} />
            )}

            {/* Settings Modal */}
            {activeModal === 'settings' && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md sm:rounded-3xl rounded-t-[32px] p-6 shadow-2xl animate-slide-up sm:animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-base font-extrabold text-ink-navy dark:text-white uppercase tracking-wider">{t('profile.settings')}</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-sky-white dark:hover:bg-slate-700 rounded-full">
                                <X className="w-4.5 h-4.5 text-slate-gray" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Theme Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#F7F9FC] dark:bg-slate-750 rounded-2xl border border-gray-200/30">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDark ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-100 text-orange-600'}`}>
                                        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-ink-navy dark:text-white">Dark Mode</p>
                                        <p className="text-[10px] text-slate-gray mt-0.5">{isDark ? 'On' : 'Off'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${isDark ? 'bg-electric-blue' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isDark ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Notifications (Mock) */}
                            <div className="flex items-center justify-between p-4 bg-[#F7F9FC] dark:bg-slate-750 rounded-2xl border border-gray-200/30 opacity-75">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-ink-navy dark:text-white">Notifications</p>
                                        <p className="text-[10px] text-slate-gray mt-0.5">Push alerts active</p>
                                    </div>
                                </div>
                                <div className="w-12 h-7 rounded-full bg-electric-blue relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute top-1 left-6 shadow-sm" />
                                </div>
                            </div>

                            {/* Data Saver (Mock) */}
                            <div className="flex items-center justify-between p-4 bg-[#F7F9FC] dark:bg-slate-750 rounded-2xl border border-gray-200/30 opacity-75">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs text-ink-navy dark:text-white">Data Saver</p>
                                        <p className="text-[10px] text-slate-gray mt-0.5">Compress image feeds</p>
                                    </div>
                                </div>
                                <div className="w-12 h-7 rounded-full bg-gray-300 relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Language Selection Modal Component
const LanguageModal = ({ onClose }) => {
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    ];

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setTimeout(() => onClose(), 300);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-scale-in">
                <h2 className="text-base font-extrabold text-ink-navy dark:text-white uppercase tracking-wider mb-1">{t('language.title')}</h2>
                <p className="text-[11px] font-semibold text-slate-gray mb-6">{t('language.subtitle')}</p>

                <div className="space-y-3 mb-6">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full p-4 rounded-2xl border transition-all text-left ${language === lang.code
                                ? 'border-electric-blue bg-electric-blue/5 dark:bg-indigo-900/20'
                                : 'border-gray-200 dark:border-slate-700 hover:border-electric-blue'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-xs text-ink-navy dark:text-white">{lang.nativeName}</p>
                                    <p className="text-[10px] font-semibold text-slate-gray">{lang.name}</p>
                                </div>
                                {language === lang.code && (
                                    <div className="w-5.5 h-5.5 bg-electric-blue rounded-full flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-[#F7F9FC] dark:bg-slate-700 text-slate-gray dark:text-gray-200 py-3 rounded-2xl font-bold hover:bg-sky-white transition-colors"
                >
                    {t('common.close')}
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;
