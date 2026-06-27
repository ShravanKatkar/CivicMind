import React, { useEffect } from 'react';
import Navbar from './welcome/Navbar';
import Hero from './welcome/Hero';
import DashboardPreview from './welcome/DashboardPreview';
import Features from './welcome/Features';
import HowItWorks from './welcome/HowItWorks';
import Capabilities from './welcome/Capabilities';
import SafetyMap from './welcome/SafetyMap';
import Analytics from './welcome/Analytics';
import Testimonials from './welcome/Testimonials';
import Pricing from './welcome/Pricing';
import FAQ from './welcome/FAQ';
import CTASection from './welcome/CTASection';
import Footer from './welcome/Footer';

const WelcomeScreen = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-ink-navy dark:text-white font-body selection:bg-electric-blue/10 relative overflow-hidden">
            
            {/* Background Grid Pattern (Global) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Navigation Header */}
            <Navbar />

            {/* Main Sections Stack */}
            <main className="relative z-10 w-full">
                {/* Hero Section */}
                <Hero />

                {/* Dashboard Control Room Preview */}
                <DashboardPreview />

                {/* AI Features Cards */}
                <Features />

                {/* Operations How It Works Timeline */}
                <HowItWorks />

                {/* AI Model capabilities */}
                <Capabilities />

                {/* Live Safety Interactive Heatmap */}
                <SafetyMap />

                {/* Municipal Analytics Charts */}
                <Analytics />

                {/* Client Testimonials */}
                <Testimonials />

                {/* Deployment Pricing Options */}
                <Pricing />

                {/* FAQ Accoridon Panels */}
                <FAQ />

                {/* Premium Banner CTA */}
                <CTASection />
            </main>

            {/* Legal Links and Footer info */}
            <Footer />
        </div>
    );
};

export default WelcomeScreen;
