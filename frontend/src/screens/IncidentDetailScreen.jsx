import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Share2, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const IncidentDetailScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const report = location.state?.report || {
        title: 'Sharp Objects & Gas Risk',
        location: 'Site A, New York',
        date: 'Today, 10:32 AM',
        riskLevel: 'High',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    };

    const incidentData = {
        reportedBy: 'John Worker #1234',
        timestamp: 'Jan 26, 2026 at 10:32 AM',
        dangers: ['Sharp Objects', 'Possible Gas Risk', 'Open Drain', 'Dirty Water'],
        explanation: 'This area is a high risk because stagnant water, sharp object, open drain, and possible toxic gases.',
        actions: [
            'Workers evacuated from danger zone',
            'Supervisor notified immediately',
            'Emergency team dispatched',
            'Area secured and marked'
        ],
        prevented: 'Potential gas leak exposure to 8 workers',
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'High': return 'bg-gradient-to-r from-red-600 to-red-500"';
            case 'Medium': return 'bg-gradient-to-r from-orange-600 to-orange-500';
            case 'Low': return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
            default: return 'bg-gradient-to-r from-gray-600 to-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-10 pb-6 px-6"
                style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold text-white">Incident Summary</h1>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="px-6 -mt-4 space-y-4">
                {/* Main Image */}
                <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src={report.image}
                        alt="Incident"
                        className="w-full h-56 object-cover"
                    />
                </div>

                {/* Risk Level Banner */}
                <div
                    className={`rounded-2xl p-5 text-white ${getRiskColor(report.riskLevel)}`}
                    style={{
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">{report.title}</h2>
                        <AlertTriangle className="w-8 h-8" fill="currentColor" />
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{report.location}</span>
                    </div>
                </div>

                {/* Incident Info */}
                <div className="bg-white rounded-3xl p-5 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-3">Incident Details</h3>

                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Reported Time</p>
                            <p className="text-sm font-semibold text-gray-900">{incidentData.timestamp}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">👷</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Reported By</p>
                            <p className="text-sm font-semibold text-gray-900">{incidentData.reportedBy}</p>
                        </div>
                    </div>
                </div>

                {/* Dangers Detected */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-3">Dangers Detected</h3>
                    <div className="flex flex-wrap gap-2">
                        {incidentData.dangers.map((danger, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full"
                            >
                                {danger}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cause Analysis */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-3">Cause Analysis</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {incidentData.explanation}
                    </p>
                </div>

                {/* Actions Taken */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-3">Actions Taken</h3>
                    <div className="space-y-2.5">
                        {incidentData.actions.map((action, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <p className="text-gray-700 text-sm">{action}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prevention Impact */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-200">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-green 900 text-sm mb-1">Prevented</h3>
                            <p className="text-green-700 text-sm">{incidentData.prevented}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/incident-report', { state: { report } })}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95"
                        style={{
                            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                        }}
                    >
                        View Full Report
                    </button>
                    <button className="w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncidentDetailScreen;
