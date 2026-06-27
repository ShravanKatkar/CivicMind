import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            
            // Detect active section
            const sections = ['hero', 'features', 'how-it-works', 'safety-map', 'analytics', 'faq'];
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { label: 'Features', id: 'features' },
        { label: 'How It Works', id: 'how-it-works' },
        { label: 'Safety Map', id: 'safety-map' },
        { label: 'Analytics', id: 'analytics' },
        { label: 'FAQ', id: 'faq' }
    ];

    return (
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'py-4 px-6 md:px-12' 
                    : 'py-6 px-6 md:px-12'
            }`}
        >
            <div 
                className={`max-w-[1440px] mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3 border ${
                    isScrolled 
                        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-white/40 dark:border-slate-800/40 shadow-soft' 
                        : 'bg-transparent border-transparent'
                }`}
            >
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-blue to-vivid-cyan flex items-center justify-center shadow-lg shadow-electric-blue/20">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-lg text-ink-navy dark:text-white font-display tracking-tight leading-none">
                            CivicMind <span className="text-electric-blue">AI</span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-gray uppercase tracking-widest mt-0.5 leading-none">
                            Safety Intelligence
                        </span>
                    </div>
                </div>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative py-2 text-sm font-semibold text-slate-gray hover:text-ink-navy dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                        >
                            {item.label}
                            {activeSection === item.id && (
                                <motion.span 
                                    layoutId="activeNavIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-blue to-vivid-cyan rounded-full"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/language')}
                        className="px-5 py-2.5 bg-gradient-to-r from-electric-blue to-vivid-cyan hover:opacity-95 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-md shadow-electric-blue/15 hover:shadow-lg hover:shadow-electric-blue/20 active:scale-95 transition-all duration-200"
                    >
                        Launch Platform
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink-navy dark:text-white hover:bg-sky-white dark:hover:bg-slate-800 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-6 right-6 mt-2 p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col gap-4 md:hidden"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-left py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                                    activeSection === item.id 
                                        ? 'bg-sky-white text-electric-blue dark:bg-slate-800 dark:text-white' 
                                        : 'text-slate-gray hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="h-px bg-gray-100 dark:bg-slate-800 my-2" />
                        <button
                            onClick={() => navigate('/language')}
                            className="w-full py-3.5 bg-gradient-to-r from-electric-blue to-vivid-cyan hover:opacity-95 text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                        >
                            Launch Platform
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
