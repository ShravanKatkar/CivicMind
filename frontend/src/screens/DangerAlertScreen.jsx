import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, HelpCircle, ChevronRight, MapPin, Phone } from 'lucide-react';

const DangerAlertScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [analyzing, setAnalyzing] = useState(true);

    const imageSrc = location.state?.imageSrc || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop';

    // Get Assessment Data from previous screen
    const assessmentResult = location.state?.assessmentResult;
    // Extract nested risk data if available
    const riskData = assessmentResult?.risk_assessment || {};

    // Dynamic Data Mapping
    const riskLevel = riskData.risk_level || 'Medium'; // Low, Medium, High, Critical
    const hazards = riskData.hazards_detected || ['Potential Hazard'];
    const actions = riskData.recommended_actions || ['Proceed with caution', 'Alert Supervisor'];
    const explanation = riskData.explanation || 'AI detected potential safety concerns in image.';

    // Simulate AI analysis delay
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
                    Analyzing risks and detecting potential dangers in the image
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
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        •••
                    </button>
                </div>
            </div>

            <div className="px-6 -mt-4 space-y-4">
                {/* Site Image Card */}
                <div
                    className="rounded-3xl overflow-hidden shadow-lg"
                    style={{
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <img
                        src={imageSrc}
                        alt="Site"
                        className="w-full h-56 object-cover"
                    />
                </div>

                {/* Danger Icons Strip (Dynamic) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[14px] border-b-orange-500 border-r-[8px] border-r-transparent relative">
                            <span className="absolute top-1.5 -left-[3px] text-white text-[8px] font-bold">!</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            AI Detected Hazards
                        </span>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {hazards.length > 0 ? hazards.map((hazard, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 min-w-[70px]">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100">
                                    ⚠️
                                </div>
                                <span className="text-[10px] text-gray-600 font-semibold text-center leading-tight">
                                    {hazard}
                                </span>
                            </div>
                        )) : (
                            <p className="text-sm text-green-600 font-medium p-2">No specific hazards detected.</p>
                        )}
                    </div>
                </div>

                {/* Risk Level Banner (Dynamic Color) */}
                <div
                    className="rounded-2xl p-4 flex items-center justify-between"
                    style={{
                        background: getRiskColor(riskLevel),
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{riskLevel} Risk</h3>
                            <p className="text-white/80 text-xs">AI Assessment Complete</p>
                        </div>
                    </div>
                    {/* Only pulse if high risk */}
                    {(riskLevel.includes('High') || riskLevel.includes('Critical')) && (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    )}
                </div>

                {/* Risks Why Card (Dynamic) */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <div className="flex gap-4 items-start mb-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                            }}
                        >
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Analysis</h3>
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
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-2.5 mb-4">
                        {actions.map((action, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                                <span className="font-medium">{action}</span>
                            </div>
                        ))}
                    </div>

                    {/* Illustration */}
                    <div className="flex justify-end -mr-2 -mb-2">
                        <div className="relative">
                            <div className="w-10 h-10 bg-orange-400 rounded-full"></div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full absolute top-0 left-4 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Send Alert Button */}
                <button
                    onClick={() => navigate('/live-safety')}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
                    style={{
                        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                    }}
                >
                    Send Alert to Supervisor
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Incident Report Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">
                                Incident Report Generated
                            </h3>
                            <p className="text-gray-500 text-xs">
                                AI has analyzed the situation
                            </p>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        Save your data regarding data via this incident report, and passing the data into the database.
                    </p>

                    <button className="w-full bg-purple-50 text-purple-700 font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors">
                        <Phone className="w-4 h-4" />
                        Contact Supervisor
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DangerAlertScreen;
