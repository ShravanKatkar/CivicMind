import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Filter, CheckCircle, Clock, XCircle, AlertTriangle,
    MapPin, User, MessageSquare, TrendingUp, ChevronRight
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const SupervisorUpdatesScreen = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock supervisor updates data
    const supervisorUpdates = [
        {
            id: 1,
            reportId: 'RPT-001',
            reportTitle: 'Dangerous scaffolding at Site A',
            reportedBy: 'You',
            reportDate: '2026-01-26 11:15 AM',
            location: 'Site A, Mumbai',
            status: 'approved',
            supervisorName: 'Rajesh Kumar',
            supervisorPhoto: null,
            supervisorResponse: 'Danger confirmed. Maintenance team dispatched immediately. Great catch on this safety issue!',
            actionTaken: 'Scaffolding replacement scheduled for today 3 PM. Site cordoned off.',
            priority: 'high',
            updatedAt: '2026-01-26 2:30 PM',
            timeline: [
                { status: 'submitted', time: '11:15 AM', note: 'Report submitted by worker' },
                { status: 'under_review', time: '11:45 AM', note: 'Supervisor reviewing evidence' },
                { status: 'approved', time: '2:30 PM', note: 'Approved and action initiated' }
            ]
        },
        {
            id: 2,
            reportId: 'RPT-002',
            reportTitle: 'Electrical wiring exposed near water',
            reportedBy: 'You',
            reportDate: '2026-01-27 9:20 AM',
            location: 'Site B, Pune',
            status: 'resolved',
            supervisorName: 'Priya Sharma',
            supervisorPhoto: null,
            supervisorResponse: 'Critical danger resolved. Electrician fixed the wiring. Thank you for reporting!',
            actionTaken: 'Emergency electrician called. Wiring insulated and relocated. Safety check completed.',
            priority: 'high',
            updatedAt: '2026-01-27 4:15 PM',
            timeline: [
                { status: 'submitted', time: '9:20 AM', note: 'Urgent report submitted' },
                { status: 'approved', time: '9:35 AM', note: 'Immediate action authorized' },
                { status: 'resolved', time: '4:15 PM', note: 'Issue fixed and verified' }
            ]
        },
        {
            id: 3,
            reportId: 'RPT-003',
            reportTitle: 'Slippery floor in warehouse',
            reportedBy: 'You',
            reportDate: '2026-01-27 2:45 PM',
            location: 'Site C, Thane',
            status: 'pending',
            supervisorName: null,
            supervisorResponse: null,
            actionTaken: null,
            priority: 'medium',
            updatedAt: '2026-01-27 2:45 PM',
            timeline: [
                { status: 'submitted', time: '2:45 PM', note: 'Report submitted - awaiting review' }
            ]
        },
        {
            id: 4,
            reportId: 'RPT-004',
            reportTitle: 'Missing fire extinguisher',
            reportedBy: 'You',
            reportDate: '2026-01-24 10:30 AM',
            location: 'Site A, Mumbai',
            status: 'rejected',
            supervisorName: 'Rajesh Kumar',
            supervisorPhoto: null,
            supervisorResponse: 'Fire extinguisher was temporarily removed for maintenance and has been replaced. Not a danger.',
            actionTaken: 'No action needed - equipment maintenance log reviewed.',
            priority: 'low',
            updatedAt: '2026-01-24 3:20 PM',
            timeline: [
                { status: 'submitted', time: '10:30 AM', note: 'Report submitted' },
                { status: 'under_review', time: '2:00 PM', note: 'Investigating claim' },
                { status: 'rejected', time: '3:20 PM', note: 'False alarm - equipment accounted for' }
            ]
        }
    ];

    const filterOptions = [
        { id: 'all', label: 'All', color: 'text-gray-700' },
        { id: 'pending', label: 'Pending', color: 'text-amber-600' },
        { id: 'approved', label: 'Approved', color: 'text-green-600' },
        { id: 'resolved', label: 'Resolved', color: 'text-blue-600' },
        { id: 'rejected', label: 'Rejected', color: 'text-red-600' }
    ];

    const filteredUpdates = activeFilter === 'all'
        ? supervisorUpdates
        : supervisorUpdates.filter(u => u.status === activeFilter);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'resolved': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return <Bell className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-300';
            case 'approved': return 'bg-green-100 text-green-700 border-green-300';
            case 'resolved': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-l-4 border-l-red-500';
            case 'medium': return 'border-l-4 border-l-orange-500';
            case 'low': return 'border-l-4 border-l-green-500';
            default: return '';
        }
    };

    // Calculate statistics
    const stats = {
        total: supervisorUpdates.length,
        pending: supervisorUpdates.filter(u => u.status === 'pending').length,
        approved: supervisorUpdates.filter(u => u.status === 'approved').length,
        resolved: supervisorUpdates.filter(u => u.status === 'resolved').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 transition-colors duration-300">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-12 pb-8 px-6"
                style={{
                    background: 'var(--gov-header-gradient)',
                }}
            >
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    {t('updates.title')}
                </h1>

                {/* Statistics */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                        <p className="text-white text-xl font-bold">{stats.total}</p>
                        <p className="text-white/80 text-[10px] mt-1">{t('updates.total')}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                        <p className="text-amber-300 text-xl font-bold">{stats.pending}</p>
                        <p className="text-white/80 text-[10px] mt-1">{t('updates.pending')}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                        <p className="text-green-300 text-xl font-bold">{stats.approved}</p>
                        <p className="text-white/80 text-[10px] mt-1">{t('updates.approved')}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                        <p className="text-blue-300 text-xl font-bold">{stats.resolved}</p>
                        <p className="text-white/80 text-[10px] mt-1">{t('updates.resolved')}</p>
                    </div>
                </div>
            </div>

            <div className="px-6 -mt-4">
                {/* Filter Tabs */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm mb-4 transition-colors duration-300">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {filterOptions.map(option => (
                            <button
                                key={option.id}
                                onClick={() => setActiveFilter(option.id)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeFilter === option.id
                                    ? 'bg-gov-navy text-white'
                                    : 'bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Updates Feed */}
                <div className="space-y-4">
                    {filteredUpdates.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm text-center transition-colors duration-300">
                            <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">No updates found</p>
                        </div>
                    ) : (
                        filteredUpdates.map(update => (
                            <div
                                key={update.id}
                                className={`bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm transition-colors duration-300 ${getPriorityColor(update.priority)}`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                                            {update.reportTitle}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {update.location}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${update.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700' :
                                        update.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700' :
                                            update.status === 'resolved' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' :
                                                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
                                        }`}>
                                        {getStatusIcon(update.status)}
                                        {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                                    </span>
                                </div>

                                {/* Report Info */}
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 mb-3">
                                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-1">
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">Report ID:</span> {update.reportId}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs">
                                        <span className="font-semibold text-gray-700 dark:text-gray-200">Submitted:</span> {update.reportDate}
                                    </p>
                                </div>

                                {/* Supervisor Response */}
                                {update.supervisorResponse && (
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-4 h-4 text-gov-navy dark:text-blue-400" />
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {update.supervisorName}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {update.updatedAt}
                                            </span>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-gov-navy dark:border-blue-500 p-3 rounded-r-xl">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                                <MessageSquare className="w-4 h-4 inline mr-1 text-gov-navy dark:text-blue-400" />
                                                {update.supervisorResponse}
                                            </p>
                                            {update.actionTaken && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    <TrendingUp className="w-3 h-3 inline mr-1 text-gov-safety-green dark:text-green-400" />
                                                    <span className="font-semibold">Action:</span> {update.actionTaken}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Timeline Preview */}
                                {update.timeline && update.timeline.length > 0 && (
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Status Timeline:</p>
                                        <div className="space-y-2">
                                            {update.timeline.map((item, index) => (
                                                <div key={index} className="flex items-start gap-2 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gov-navy dark:bg-blue-400 mt-1.5"></div>
                                                    <div className="flex-1">
                                                        <span className="text-gray-600 dark:text-gray-300">{item.time}</span>
                                                        <span className="text-gray-500 dark:text-gray-400"> - {item.note}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupervisorUpdatesScreen;
