import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, Users, Clock, CheckCircle, Phone, Navigation } from 'lucide-react';
import InteractiveMap from '../components/map/InteractiveMap';

const LiveSafetyScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [alertSent, setAlertSent] = useState(false);
    const [countdown, setCountdown] = useState(location.state?.autoSend ? 5 : 0);

    // Auto-send countdown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && location.state?.autoSend) {
            handleSendAlert();
        }
    }, [countdown]);

    const handleSendAlert = () => {
        setAlertSent(true);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // Confirmation State (Screen 14)
    if (!alertSent && countdown > 0) {
        return (
            <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    {/* Warning Icon */}
                    <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
                        <AlertTriangle className="w-16 h-16 text-white" fill="currentColor" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-white mb-3">
                        High Risk Detected
                    </h1>
                    <p className="text-white/90 text-lg mb-8">
                        Emergency alert will be sent in
                    </p>

                    {/* Countdown */}
                    <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30">
                        <span className="text-5xl font-bold text-white">{countdown}</span>
                    </div>

                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/30 transition-colors border-2 border-white/30"
                    >
                        Cancel Alert
                    </button>

                    <p className="text-white/70 text-sm mt-6 max-w-sm">
                        Supervisor and emergency team will be notified immediately
                    </p>
                </div>
            </div>
        );
    }

    // Alert Sent State (Screen 15)
    if (alertSent) {
        return (
            <div
                className="min-h-screen flex flex-col p-6 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                }}
            >
                {/* Background effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                {/* Header */}
                <div className="relative z-10 pt-4 mb-8">
                    <button
                        onClick={() => navigate('/home')}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
                    {/* Success Icon */}
                    <div className="w-32 h-32 mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-white mb-3">
                        Alert Sent Successfully
                    </h1>
                    <p className="text-white/90 text-base mb-8 max-w-sm">
                        Supervisor and emergency team have been notified. Help is on the way.
                    </p>

                    {/* Status Cards */}
                    <div className="w-full max-w-md space-y-3 mb-8">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-bold text-sm">Supervisor Notified</h3>
                                <p className="text-white/70 text-xs">Just now</p>
                            </div>
                        </div>

                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-bold text-sm">Workers Alerted</h3>
                                <p className="text-white/70 text-xs">Evacuation in progress</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => navigate('/live-safety')}
                        className="px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95"
                    >
                        View Live Safety Status
                    </button>
                </div>
            </div>
        );
    }

    // Live Safety View (Screen 16 - Default State)
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-6 py-4 pt-10 flex items-center justify-between shadow-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Live Site Safety Alert</h1>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                    •••
                </button>
            </div>

            {/* Interactive Map */}
            <div className="relative w-full h-96 bg-gray-200">
                <InteractiveMap
                    center={[19.0760, 72.8777]}
                    zoom={14}
                    height="384px"
                    markers={[
                        {
                            position: [19.0760, 72.8777],
                            type: 'danger',
                            title: 'High Risk Zone',
                            description: 'High gas level detected',
                            time: '10:32 AM'
                        },
                        {
                            position: [19.0789, 72.8851],
                            type: 'worker',
                            title: 'Worker #1234',
                            description: 'Rajesh Kumar - On Site'
                        },
                        {
                            position: [19.0749, 72.8840],
                            type: 'worker',
                            title: 'Worker #5678',
                            description: 'Priya Sharma - Patrol'
                        }
                    ]}
                    dangerZones={[
                        {
                            position: [19.0760, 72.8777],
                            radius: 150,
                            title: 'Gas Leak Area',
                            description: 'Immediate evacuation required'
                        }
                    ]}
                />
            </div>

            {/* Bottom Sheet */}
            <div className="flex-1 bg-white rounded-t-[32px] -mt-8 relative z-10 px-6 pt-8 shadow-2xl">
                {/* Main Alert */}
                <div
                    className="rounded-2xl p-5 mb-6 flex items-start gap-4"
                    style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                    }}
                >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-base mb-1">
                            A Sandy Alert
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            High gas level detected. Immediate evacuation and securing required.
                        </p>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">High Gas Level</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>10:32 AM</span>
                    </div>
                </div>

                {/* Insights */}
                <div className="space-y-3 mb-6">
                    {[
                        'Call to Front-Locale',
                        'Communicate with monitoring streets',
                        'Coordinating on warning near streets'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">{item}</p>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleSendAlert}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95 mb-6"
                    style={{
                        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                    }}
                >
                    <Navigation className="w-5 h-5" />
                    Slide to Send Evacuation Alert
                </button>
            </div>
        </div>
    );
};

export default LiveSafetyScreen;
