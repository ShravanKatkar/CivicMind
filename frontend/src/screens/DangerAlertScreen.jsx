import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, HelpCircle, ChevronRight, MapPin, Phone, Eye } from 'lucide-react';
import RiskSpeedometer from '../components/RiskSpeedometer';

const DangerAlertScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [analyzing, setAnalyzing] = useState(true);
    const [showAnnotated, setShowAnnotated] = useState(true);

    // Get Assessment Data
    const assessmentResult = location.state?.assessmentResult || {};
    const riskData = assessmentResult.risk_assessment || {};
    const visionData = assessmentResult.vision_analysis || {};

    // Dynamic Data Mapping
    const riskLevel = riskData.risk_level || 'Medium';
    const riskScore = riskData.score || 5.0; // Default if missing
    const hazards = riskData.hazards_detected || ['Potential Hazard'];
    const actions = riskData.recommended_actions || ['Proceed with caution', 'Alert Supervisor'];
    const explanation = riskData.explanation || 'AI detected potential safety concerns in image.';

    // Image Handling
    const originalImage = location.state?.imageSrc || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop';

    // Construct Annotated Image URL if available
    // Backend serves 'data/uploads' at '/static'
    // We need to extract filename from the absolute path returned by backend
    let annotatedImageSrc = null;
    if (visionData.annotated_image) {
        const filename = visionData.annotated_image.split(/[\\/]/).pop();
        // Assuming backend is at localhost:8000/static/
        // ideally use env var, but hardcode for now or use relative if proxy setup
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        annotatedImageSrc = `${API_URL}/static/${filename}`;
    }

    const currentImage = (showAnnotated && annotatedImageSrc) ? annotatedImageSrc : originalImage;

    // Simulate AI analysis delay (visual only, data is already here)
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnalyzing(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getRiskColor = (level) => {
        const l = level.toLowerCase();
        if (l.includes('critical') || l.includes('high')) return 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'; // Red
        if (l.includes('medium')) return 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)'; // Orange/Amber
        return 'linear-gradient(135deg, #059669 0%, #10B981 100%)'; // Green/Low
    };

    if (analyzing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--gov-header-gradient)' }}>
                {/* Analyzing Animation */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="w-32 h-32 border-8 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-5xl">🔍</div>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                    AI is Thinking...
                </h2>
                <p className="text-white/80 text-center max-w-sm">
                    Analyzing risks (YOLOv8 + Context Engine)...
                </p>

                <div className="flex gap-2 mt-8">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-10 pb-6 px-6"
                style={{
                    background: 'var(--gov-header-gradient)',
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold text-white">
                        AI Safety Assessment
                    </h1>
                    <div className="w-10"></div>
                </div>
            </div>

            <div className="px-6 -mt-4 space-y-4">
                {/* Site Image Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg bg-black">
                    <img
                        src={currentImage}
                        alt="Site"
                        className="w-full h-64 object-contain bg-black"
                    />
                    {annotatedImageSrc && (
                        <button
                            onClick={() => setShowAnnotated(!showAnnotated)}
                            className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2"
                        >
                            <Eye size={14} />
                            {showAnnotated ? 'Show Original' : 'Show AI Vision'}
                        </button>
                    )}
                </div>

                {/* Risk Meter Section */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Real-time Risk Score</h3>
                    <RiskSpeedometer score={riskScore} size={220} />

                    <div className={`mt-4 px-4 py-1.5 rounded-full text-sm font-bold ${riskLevel.includes('Critical') ? 'bg-red-100 text-red-700' :
                            riskLevel.includes('High') ? 'bg-orange-100 text-orange-700' :
                                riskLevel.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                        }`}>
                        {riskLevel.toUpperCase()} LEVEL
                    </div>
                </div>

                {/* Danger Icons Strip (Dynamic) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[14px] border-b-orange-500 border-r-[8px] border-r-transparent relative">
                            <span className="absolute top-1.5 -left-[3px] text-white text-[8px] font-bold">!</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            Verified Hazards
                        </span>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {hazards.length > 0 ? hazards.map((hazard, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 min-w-[80px]">
                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl border border-red-100">
                                    ⚠️
                                </div>
                                <span className="text-[10px] text-gray-800 font-semibold text-center leading-tight">
                                    {hazard.replace(/\(.*\)/, '')}
                                </span>
                            </div>
                        )) : (
                            <p className="text-sm text-green-600 font-medium p-2">No specific hazards detected.</p>
                        )}
                    </div>
                </div>

                {/* Risks Why Card (Dynamic) */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border-l-4 border-blue-500">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                            <HelpCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base mb-1">AI Analysis</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {explanation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Safe Route & Action Suggestions (Dynamic) */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 text-base">
                            Recommended Actions
                        </h3>
                    </div>

                    <div className="space-y-3 mb-2">
                        {actions.map((action, i) => (
                            <div key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-green-600 font-bold text-xs">{i + 1}</span>
                                </div>
                                <span className="font-medium">{action}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Send Alert Button */}
                <button
                    onClick={() => navigate('/live-safety')}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
                    style={{
                        boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
                    }}
                >
                    <AlertTriangle className="w-5 h-5" />
                    Escalate to Supervisor
                </button>
            </div>
        </div >
    );
};

export default DangerAlertScreen;
