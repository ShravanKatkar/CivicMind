import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import { AlertTriangle, Clock, ChevronRight, MessageSquare, CheckCircle, XCircle, Send } from 'lucide-react';

// Mock worker reports with response capability
// Mock worker reports with response capability
const getInitialAlerts = (district) => [
    {
        id: 1,
        reportId: 'RPT-001',
        type: 'Critical',
        workerName: 'Ramesh Patil',
        message: 'Dangerous scaffolding at Site A',
        description: 'Scaffolding appears unstable with loose connections. Requires immediate attention.',
        location: `Site A, ${district || 'Mumbai'}`,
        time: '2m ago',
        color: 'bg-red-100 text-red-600',
        status: 'pending',
        priority: 'high'
    },
    {
        id: 2,
        reportId: 'RPT-002',
        type: 'Warning',
        workerName: 'Suresh Kumar',
        message: 'Electrical wiring exposed near water',
        description: 'Exposed wiring posing electrical danger near water source.',
        location: `Site B, ${district || 'Mumbai'}`,
        time: '12m ago',
        color: 'bg-orange-100 text-orange-600',
        status: 'pending',
        priority: 'high'
    },
    {
        id: 3,
        reportId: 'RPT-003',
        type: 'Info',
        workerName: 'Vikram Singh',
        message: 'Slippery floor in warehouse',
        description: 'Water accumulation making floor slippery.',
        location: `Site C, ${district || 'Mumbai'}`,
        time: '1h ago',
        color: 'bg-yellow-100 text-yellow-600',
        status: 'pending',
        priority: 'medium'
    },
];

const AlertsPanel = ({ district }) => {
    // Initialize state
    const [alerts, setAlerts] = useState(() => getInitialAlerts(district));

    // Update alerts when district changes (e.g. after user profile loads)
    React.useEffect(() => {
        setAlerts(getInitialAlerts(district));
    }, [district]);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [response, setResponse] = useState('');
    const [actionTaken, setActionTaken] = useState('');
    const [responseStatus, setResponseStatus] = useState('approved');

    const handleSubmitResponse = () => {
        if (!selectedAlert || !response.trim()) return;

        // Update alert with supervisor response
        setAlerts(prev => prev.map(alert =>
            alert.id === selectedAlert.id
                ? { ...alert, status: responseStatus, supervisorResponse: response, actionTaken }
                : alert
        ));

        // Clear form
        setSelectedAlert(null);
        setResponse('');
        setActionTaken('');
        setResponseStatus('approved');
    };

    return (
        <>
            <Card className="flex-1 flex flex-col !p-0 overflow-hidden bg-white border border-gray-100">
                <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold">Worker Reports</h3>
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {alerts.filter(a => a.status === 'pending').length} New
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-2 scrollbar-hide space-y-2">
                    {alerts.map(alert => {
                        const alertIcon = (() => {
                            const msg = alert.message.toLowerCase();
                            if (msg.includes('scaffold') || msg.includes('fall') || msg.includes('safety') || msg.includes('gear') || msg.includes('helmet')) return '🪖';
                            if (msg.includes('electric') || msg.includes('wire') || msg.includes('exposed')) return '⚡';
                            if (msg.includes('gas') || msg.includes('toxic') || msg.includes('leak') || msg.includes('chemical')) return '💨';
                            if (msg.includes('manhole') || msg.includes('open') || msg.includes('sewer') || msg.includes('hole')) return '🕳️';
                            return '⚠️';
                        })();

                        let borderClass = 'border-l-4 border-l-vivid-cyan';
                        let badgeColor = 'bg-sky-white text-vivid-cyan border border-vivid-cyan/10';
                        if (alert.type === 'Critical') {
                            borderClass = 'border-l-4 border-l-alert-red';
                            badgeColor = 'bg-[#FEE2E2] text-alert-red border border-red-200';
                        } else if (alert.type === 'Warning') {
                            borderClass = 'border-l-4 border-l-blazing-amber';
                            badgeColor = 'bg-[#FEF3C7] text-blazing-amber border border-amber-200';
                        }

                        return (
                            <div
                                key={alert.id}
                                onClick={() => setSelectedAlert(alert)}
                                className={`p-4 bg-white dark:bg-slate-800 rounded-2xl hover:bg-sky-white dark:hover:bg-slate-700/60 transition-all duration-200 cursor-pointer group border border-transparent shadow-sm flex items-start gap-3 relative overflow-hidden ${borderClass} ${selectedAlert?.id === alert.id
                                    ? 'ring-2 ring-electric-blue/30 bg-sky-white/50'
                                    : ''
                                    }`}
                            >
                                {/* Spot Illustration */}
                                <div className="w-10 h-10 bg-sky-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    {alertIcon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1 gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}>
                                            {alert.type}
                                        </span>
                                        <span className="text-[10px] text-slate-gray dark:text-gray-400 font-semibold shrink-0">
                                            {alert.time}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xs text-ink-navy dark:text-white leading-snug mb-1 truncate">
                                        {alert.message}
                                    </h4>
                                    <p className="text-[11px] font-semibold text-slate-gray dark:text-gray-400 mb-1">
                                        Worker: <span className="text-ink-navy dark:text-white font-bold">{alert.workerName}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-gray dark:text-gray-400 flex items-center justify-between">
                                        <span>{alert.location}</span>
                                        {alert.status === 'pending' ? (
                                            <span className="text-blazing-amber font-bold text-[9px] uppercase tracking-wider bg-amber-50 dark:bg-amber-900/10 px-1.5 py-0.5 rounded-md">Pending</span>
                                        ) : (
                                            <span className="text-neon-green font-bold text-[9px] uppercase tracking-wider bg-green-50 dark:bg-green-900/10 px-1.5 py-0.5 rounded-md">Resolved</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-3 border-t border-gray-50 bg-gray-50/50">
                    <button className="w-full text-center text-xs font-bold text-primary-blue py-2 hover:bg-white rounded-xl transition-colors">
                        View All Reports
                    </button>
                </div>
            </Card>

            {/* Response Modal */}
            {selectedAlert && selectedAlert.status === 'pending' && (
                <Card className="mt-4 !p-0 overflow-hidden border border-gray-200">
                    <div className="bg-gov-navy text-white p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">Respond to Report</h3>
                            <p className="text-xs text-white/80">{selectedAlert.reportId}</p>
                        </div>
                        <button
                            onClick={() => setSelectedAlert(null)}
                            className="text-white/80 hover:text-white"
                        >
                            <XCircle size={20} />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Report Details */}
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="font-bold text-sm text-gray-900 mb-1">{selectedAlert.message}</p>
                            <p className="text-xs text-gray-600 mb-2">{selectedAlert.description}</p>
                            <p className="text-xs text-gray-500">
                                <span className="font-semibold">Worker:</span> {selectedAlert.workerName} |
                                <span className="ml-1 font-semibold">Location:</span> {selectedAlert.location}
                            </p>
                        </div>

                        {/* Status Selection */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Decision</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setResponseStatus('approved')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${responseStatus === 'approved'
                                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <CheckCircle size={14} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => setResponseStatus('rejected')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${responseStatus === 'rejected'
                                        ? 'bg-red-100 text-red-700 border-2 border-red-500'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <XCircle size={14} />
                                    Reject
                                </button>
                            </div>
                        </div>

                        {/* Response Text */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Supervisor Feedback</label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Provide feedback to the worker..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                            />
                        </div>

                        {/* Action Taken */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Action Taken</label>
                            <input
                                type="text"
                                value={actionTaken}
                                onChange={(e) => setActionTaken(e.target.value)}
                                placeholder="e.g., Maintenance team dispatched"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitResponse}
                            disabled={!response.trim()}
                            className="w-full bg-gov-navy text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                            Send Response to Worker
                        </button>
                    </div>
                </Card>
            )}
        </>
    );
};

export default AlertsPanel;
