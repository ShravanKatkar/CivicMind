import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Sparkles } from 'lucide-react';
import LivingRiskGauge from '../components/LivingRiskGauge';

const DangerAlertScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [analyzing, setAnalyzing] = useState(true);
    const [showAnnotatedSheet, setShowAnnotatedSheet] = useState(false);

    // Get Assessment Data
    const assessmentResult = location.state?.assessmentResult || {};
    const riskData = assessmentResult.risk_assessment || {};
    const visionData = assessmentResult.vision_analysis || {};

    // Dynamic Data Mapping
    const riskLevel = riskData.risk_level || 'Medium';
    const riskScore = riskData.score || 5.0;
    const hazards = riskData.hazards_detected || ['Potential Hazard'];
    const actions = riskData.recommended_actions || ['Proceed with caution', 'Alert Supervisor'];
    const explanation = riskData.explanation || 'AI detected potential safety concerns in image.';

    // Image Handling
    const originalImage = location.state?.imageSrc || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop';

    // Construct Annotated Image URL if available
    let annotatedImageSrc = null;
    if (visionData.annotated_image) {
        const filename = visionData.annotated_image.split(/[\\/]/).pop();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        annotatedImageSrc = `${API_URL}/static/${filename}`;
    }

    const currentImage = annotatedImageSrc || originalImage;

    // Simulate AI analysis delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnalyzing(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (analyzing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EFF6FF] to-[#F0FDFA]">
                {/* Analyzing Animation */}
                <div className="mb-8">
                    <div className="relative flex items-center justify-center">
                        <div className="w-32 h-32 border-8 border-electric-blue/15 border-t-electric-blue rounded-full animate-spin"></div>
                        <div className="absolute text-5xl animate-bounce">🔍</div>
                    </div>
                </div>

                <h2 className="text-3xl font-extrabold text-ink-navy mb-2 text-center font-display">
                    AI Safety Scanning...
                </h2>
                <p className="text-slate-gray text-center max-w-xs font-medium text-sm">
                    Processing context with YOLOv8 Vision & AI Hazard Analysis
                </p>

                <div className="flex gap-2 mt-8">
                    <div className="w-2.5 h-2.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2.5 h-2.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2.5 h-2.5 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-white pb-24 font-body text-ink-navy">
            {/* Header */}
            <div className="pt-8 pb-4 px-6 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white hover:bg-sky-white shadow-soft rounded-full flex items-center justify-center text-ink-navy transition-all duration-200 active:scale-90"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-extrabold font-display">
                    Safety Assessment
                </h1>
                <div className="w-12"></div>
            </div>

            {/* Main Content Scroll */}
            <div className="px-6 space-y-6">
                
                {/* Top: The Living Risk Orb */}
                <LivingRiskGauge score={riskScore} level={riskLevel} hazards={hazards} />

                {/* AI Vision Sheet Trigger Card */}
                <div className="bg-white rounded-3xl p-5 shadow-soft border border-blue-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-deep-violet/10 rounded-2xl flex items-center justify-center text-xl shrink-0">
                            👁️
                        </div>
                        <div>
                            <h4 className="font-bold text-ink-navy text-sm">Vision Bounding Boxes</h4>
                            <p className="text-xs text-slate-gray font-medium">YOLOv8 Visual Overlay</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => setShowAnnotatedSheet(true)}
                        className="bg-gradient-to-r from-deep-violet to-electric-blue hover:opacity-95 text-white font-bold text-xs px-5 py-3 rounded-full shadow-md active:scale-95 transition-all"
                    >
                        Reveal Photo
                    </button>
                </div>

                {/* Middle: Detected hazards as illustrated chip-cards in a horizontal scroll */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🚨</span>
                        <h3 className="text-xs font-bold text-slate-gray uppercase tracking-wider">
                            Detected Hazards ({hazards.length})
                        </h3>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-hide snap-x -mx-6 px-6">
                        {hazards.map((hazard, i) => {
                            const cleanName = hazard.replace(/\(.*\)/, '').trim();
                            let icon = '⚠️';
                            let severity = 'Medium';
                            let severityColor = 'bg-[#FEF3C7] text-[#D97706]';
                            
                            const lowerName = cleanName.toLowerCase();
                            if (lowerName.includes('gas') || lowerName.includes('toxic') || lowerName.includes('leak')) {
                                icon = '💨';
                                severity = 'Critical';
                                severityColor = 'bg-[#FEE2E2] text-[#DC2626]';
                            } else if (lowerName.includes('open') || lowerName.includes('manhole') || lowerName.includes('collapse')) {
                                icon = '🕳️';
                                severity = 'Critical';
                                severityColor = 'bg-[#FEE2E2] text-[#DC2626]';
                            } else if (lowerName.includes('ppe') || lowerName.includes('helmet') || lowerName.includes('vest')) {
                                icon = '🪖';
                                severity = 'High';
                                severityColor = 'bg-[#FFEDD5] text-[#D97306]';
                            } else if (lowerName.includes('wire') || lowerName.includes('elect')) {
                                icon = '⚡';
                                severity = 'Critical';
                                severityColor = 'bg-[#FEE2E2] text-[#DC2626]';
                            }
                            
                            return (
                                <div 
                                    key={i} 
                                    className="bg-white rounded-2xl p-4 shadow-soft border border-blue-50 min-w-[140px] snap-center flex flex-col justify-between gap-4 transform hover:translate-y-[-2px] transition-all duration-200"
                                >
                                    <div className="w-10 h-10 bg-sky-white rounded-xl flex items-center justify-center text-2xl">
                                        {icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ink-navy text-xs leading-tight mb-2 truncate" title={cleanName}>
                                            {cleanName}
                                        </h4>
                                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${severityColor}`}>
                                            {severity}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* AI Brief Explanation */}
                <div className="bg-white rounded-3xl p-5 shadow-soft border border-blue-50 border-l-4 border-l-electric-blue flex gap-4">
                    <div className="w-10 h-10 bg-electric-blue/10 rounded-full flex items-center justify-center shrink-0 text-electric-blue">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-ink-navy text-sm mb-1">AI Context Assessment</h4>
                        <p className="text-slate-gray text-xs leading-relaxed font-medium">
                            {explanation}
                        </p>
                    </div>
                </div>

                {/* Action Steps: bright card list, each step has a left-side color bar + illustrated icon */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📋</span>
                        <h3 className="text-xs font-bold text-slate-gray uppercase tracking-wider">
                            Recommended Action Steps
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {actions.map((action, i) => {
                            let barColor = 'bg-electric-blue';
                            let icon = '🛡️';
                            if (action.toLowerCase().includes('evacuate') || action.toLowerCase().includes('immediate') || action.toLowerCase().includes('alert') || action.toLowerCase().includes('escalate')) {
                                barColor = 'bg-alert-red';
                                icon = '🚨';
                            } else if (action.toLowerCase().includes('caution') || action.toLowerCase().includes('barrier') || action.toLowerCase().includes('wait')) {
                                barColor = 'bg-blazing-amber';
                                icon = '⚠️';
                            } else {
                                barColor = 'bg-neon-green';
                                icon = '✅';
                            }
                            
                            return (
                                <div 
                                    key={i} 
                                    className="bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4 relative overflow-hidden border border-blue-50/50 transform hover:translate-x-1 transition-all duration-200"
                                >
                                    {/* Left side color bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${barColor}`} />
                                    
                                    {/* Illustrated icon */}
                                    <div className="w-10 h-10 bg-sky-white rounded-xl flex items-center justify-center text-xl shrink-0 text-electric-blue pl-0.5">
                                        {icon}
                                    </div>
                                    
                                    <div>
                                        <span className="text-[9px] text-slate-gray font-bold block uppercase tracking-wider">Step {i + 1}</span>
                                        <span className="font-bold text-sm text-ink-navy">{action}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom: Share / Escalate Alert Button in Sunrise Orange */}
                <div className="pt-2">
                    <button
                        onClick={() => navigate('/live-safety')}
                        className="w-full bg-gradient-to-r from-sunrise-orange to-[#FB923C] hover:opacity-95 text-white font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all duration-200 ease-spring"
                        style={{
                            boxShadow: '0 8px 20px -4px rgba(249, 115, 22, 0.4)',
                        }}
                    >
                        <AlertTriangle className="w-5 h-5" />
                        Escalate to Supervisor
                    </button>
                </div>
            </div>

            {/* Slide-up bottom sheet for AI Vision Photo Toggle */}
            {showAnnotatedSheet && (
                <div className="fixed inset-0 bg-ink-navy/60 backdrop-blur-sm z-50 flex items-end justify-center transition-all duration-300">
                    {/* Backdrop click dismiss */}
                    <div className="absolute inset-0" onClick={() => setShowAnnotatedSheet(false)}></div>
                    
                    {/* Sheet container */}
                    <div className="bg-white rounded-t-[32px] w-full max-w-md p-6 relative z-10 shadow-2xl transform translate-y-0 animate-in slide-in-from-bottom duration-300">
                        {/* Drag indicator handle */}
                        <div 
                            className="w-12 h-1 bg-slate-gray/30 rounded-full mx-auto mb-4 cursor-pointer" 
                            onClick={() => setShowAnnotatedSheet(false)}
                        ></div>
                        
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-extrabold text-ink-navy text-lg font-display">AI Vision Analysis</h3>
                            <button 
                                onClick={() => setShowAnnotatedSheet(false)}
                                className="text-xs font-bold text-electric-blue hover:text-vivid-cyan bg-sky-white px-3 py-1.5 rounded-full"
                            >
                                Close
                            </button>
                        </div>
                        
                        <div className="relative rounded-2xl overflow-hidden shadow-inner bg-black border border-blue-50 aspect-video flex items-center justify-center">
                            <img 
                                src={currentImage} 
                                alt="AI Vision Overlay" 
                                className="max-h-[260px] object-contain"
                            />
                        </div>
                        
                        <p className="text-xs text-slate-gray mt-4 leading-relaxed font-medium">
                            YOLOv8 Computer Vision model has processed the image, placing bounding box overlays over anomalous items like open manholes, lacking safety gear, or exposed hazard nodes.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DangerAlertScreen;
