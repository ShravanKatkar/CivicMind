import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Camera, Mail, Phone, MapPin, Award, Shield,
    Settings, LogOut, ChevronRight, Edit, Globe,
    Home, FileText, Check, X, Moon, Sun, Bell,
    Smartphone, Lock, Eye
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
        { label: t('profile.reportsFiled'), value: '47', icon: Shield },
        { label: t('profile.incidentsPrevented'), value: '12', icon: Award },
        { label: t('profile.trainingHours'), value: '84', icon: Award },
        { label: t('profile.safetyScore'), value: '98%', icon: Shield },
    ];

    const badges = [
        { name: 'Safety Champion', icon: '🏆', color: 'bg-yellow-100 text-yellow-700' },
        { name: 'Quick Reporter', icon: '⚡', color: 'bg-blue-100 text-blue-700' },
        { name: 'Team Leader', icon: '👑', color: 'bg-purple-100 text-purple-700' },
        { name: '100 Reports', icon: '💯', color: 'bg-green-100 text-green-700' },
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
        // Update user context
        const updatedUser = { ...user, ...formData };
        updateUser(updatedUser);
        setActiveModal(null);
        // Optional: Show success feedback
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-24 transition-colors duration-300">
            {/* Header with Gradient */}
            <div
                className="relative pt-12 pb-32 px-6 rounded-b-[32px]"
                style={{
                    background: 'var(--gov-header-gradient)',
                }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">{t('profile.title')}</h1>
                    <button
                        onClick={() => navigate('/home')}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl relative z-10 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gov-navy to-gov-safety-green flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-slate-700 shadow-lg">
                                {formData.name?.charAt(0) || 'U'}
                            </div>
                            <button
                                onClick={() => setActiveModal('edit')}
                                className="absolute bottom-0 right-0 w-7 h-7 bg-gov-navy rounded-full flex items-center justify-center text-white shadow-lg hover:bg-gov-navy-dark transition-colors"
                            >
                                <Edit className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{formData.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.id || 'ID: #WK-7829'}</p>
                            <p className="text-sm text-gov-navy dark:text-blue-400 font-semibold mt-1">{formData.role}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{formData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{formData.phone}</span>
                        </div>
                        {formData.location && (
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{formData.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-12 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-gov-navy/10 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <stat.icon className="w-4 h-4 text-gov-navy dark:text-blue-400" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm transition-colors duration-300">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-4">{t('profile.achievements')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {badges.map((badge, index) => (
                            <div
                                key={index}
                                className={`${badge.color} rounded-2xl p-4 text-center transition-transform hover:scale-105`}
                            >
                                <div className="text-3xl mb-2">{badge.icon}</div>
                                <p className="text-xs font-semibold">{badge.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training History */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base">{t('profile.trainingHistory')}</h3>
                        <button className="text-gov-navy dark:text-blue-400 text-sm font-semibold hover:underline">
                            {t('profile.viewAll')}
                        </button>
                    </div>
                    <div className="space-y-3">
                        {training.map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{course.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{course.date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
                                        {course.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Settings Menu */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-2 shadow-sm transition-colors duration-300">
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
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${item.danger
                                ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
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
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('profile.editProfile')}</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('register.fullName')}</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gov-navy focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('register.email')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gov-navy focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('register.phone')}</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gov-navy focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gov-navy focus:border-transparent outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gov-navy hover:bg-gov-navy-dark text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-4"
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
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('profile.settings')}</h2>
                            <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Theme Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${isDark ? 'bg-indigo-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                                        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{isDark ? 'On' : 'Off'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${isDark ? 'bg-gov-navy' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isDark ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Notifications (Mock) */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl opacity-75">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Notifications</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Push notifications</p>
                                    </div>
                                </div>
                                <div className="w-12 h-7 rounded-full bg-gov-navy relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute top-1 left-6 shadow-sm" />
                                </div>
                            </div>

                            {/* Data Saver (Mock) */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl opacity-75">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-green-100 text-green-600">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">Data Saver</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Reduce data usage</p>
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('language.title')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t('language.subtitle')}</p>

                <div className="space-y-3 mb-6">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${language === lang.code
                                ? 'border-gov-navy bg-gov-navy/5 dark:bg-indigo-900/20 dark:border-indigo-500'
                                : 'border-gray-200 dark:border-slate-700 hover:border-gov-navy/50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{lang.nativeName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</p>
                                </div>
                                {language === lang.code && (
                                    <div className="w-6 h-6 bg-gov-navy rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-3 rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                    {t('common.close')}
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;
