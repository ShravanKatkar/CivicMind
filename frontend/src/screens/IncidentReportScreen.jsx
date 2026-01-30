import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Share2, AlertTriangle, MapPin, Clock, CheckCircle, Users } from 'lucide-react';

const IncidentReportScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const report = location.state?.report || {};

    const reportData = {
        incidentId: '#INC-2026-001',
        title: report.title || 'Sharp Objects & Gas Risk',
        location: report.location || 'Site A, New York',
        date: 'January 26, 2026',
        time: '10:32 AM',
        reportedBy: 'John Worker (#1234)',
        riskLevel: report.riskLevel || 'High',
        status: 'Active',

        summary: 'Worker identified multiple dangers including sharp objects, possible gas leak, open drainage, and stagnant water in the site area. Immediate evacuation was initiated.',

        dangersDetected: [
            'Sharp metal objects scattered in work area',
            'Suspicious gas odor detected',
            'Open drainage without cover',
            'Stagnant water accumulation'
        ],
        actionsTaken: [
            // ...
        ],

        preventionMeasures: [
            // ...
        ],

        impactAssessment: {
            // ...
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-10 pb-6 px-6"
                style={{
                    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold text-white">Auto-Generated Report</h1>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Report ID */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3">
                    <p className="text-white/70 text-xs mb-1">Incident Report</p>
                    <p className="text-white font-bold text-lg">{reportData.incidentId}</p>
                </div>
            </div>

            <div className="px-6 -mt-4 space-y-4">
                {/* Report Header */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{reportData.title}</h2>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{reportData.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <Clock className="w-4 h-4" />
                                    <span>{reportData.date} at {reportData.time}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl font-bold text-sm ${reportData.riskLevel === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                            {reportData.riskLevel} Risk
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Reported by:</span>
                        <span className="text-sm font-semibold text-gray-900">{reportData.reportedBy}</span>
                    </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-white rounded-3xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-xs">📋</span>
                        Executive Summary
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {reportData.summary}
                    </p>
                </div>

                {/* Dangers Detected */}
                < div className="bg-white rounded-3xl p-5 shadow-sm" >
                    <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Dangers Detected
                    </h3>
                    <div className="space-y-2">
                        {reportData.dangersDetected.map((danger, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-red-600 font-bold text-xs">{i + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{danger}</p>
                            </div>
                        ))}
                    </div>
                </div >

                {/* Root Cause Analysis */}
                < div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-5 border border-orange-200" >
                    <h3 className="font-bold text-gray-900 text-base mb-3">🔍 Root Cause Analysis</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {reportData.rootCause}
                    </p>
                </div >

                {/* Immediate Actions */}
                < div className="bg-white rounded-3xl p-5 shadow-sm" >
                    <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Immediate Actions Taken
                    </h3>
                    <div className="space-y-2.5">
                        {reportData.actionsTaken.map((action, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <p className="text-gray-700 text-sm">{action}</p>
                            </div>
                        ))}
                    </div>
                </div >

                {/* Prevention Suggestions */}
                < div className="bg-white rounded-3xl p-5 shadow-sm" >
                    <h3 className="font-bold text-gray-900 text-base mb-3">💡 Prevention Suggestions</h3>
                    <div className="space-y-2.5">
                        {reportData.preventionMeasures.map((measure, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-purple-600 font-bold text-xs">{i + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{measure}</p>
                            </div>
                        ))}
                    </div>
                </div >

                {/* Impact Assessment */}
                < div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-200" >
                    <h3 className="font-bold text-green-900 text-base mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Impact Assessment
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-green-700 mb-1">Workers Affected</p>
                            <p className="text-2xl font-bold text-green-900">{reportData.impactAssessment.workersAffected}</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700 mb-1">Downtime</p>
                            <p className="text-2xl font-bold text-green-900">{reportData.impactAssessment.downtime}</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700 mb-1">Cost Impact</p>
                            <p className="text-lg font-bold text-green-900">{reportData.impactAssessment.costEstimate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-700 mb-1">Injuries</p>
                            <p className="text-lg font-bold text-green-900">0</p>
                        </div>
                    </div>
                </div >

                {/* Action Buttons */}
                < div className="flex gap-3" >
                    <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95">
                        <Download className="w-5 h-5" />
                        Export PDF
                    </button>
                    <button className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <Share2 className="w-5 h-5" />
                        Share
                    </button>
                </div >
            </div >
        </div >
    );
};

export default IncidentReportScreen;
