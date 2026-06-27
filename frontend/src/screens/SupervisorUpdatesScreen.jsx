import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, CheckCircle, Clock, XCircle, AlertTriangle,
    MapPin, User, MessageSquare, TrendingUp, Shield
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
            case 'pending': return <Clock className="w-3.5 h-3.5" />;
            case 'approved': return <CheckCircle className="w-3.5 h-3.5" />;
            case 'resolved': return <CheckCircle className="w-3.5 h-3.5" />;
            case 'rejected': return <XCircle className="w-3.5 h-3.5" />;
            default: return <Bell className="w-3.5 h-3.5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
            case 'approved': return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
            case 'resolved': return 'bg-blue-500/10 text-electric-blue border border-electric-blue/20';
            case 'rejected': return 'bg-alert-red/10 text-alert-red border border-alert-red/20';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getPriorityBorder = (priority) => {
        switch (priority) {
            case 'high': return 'border-l-4 border-l-alert-red';
            case 'medium': return 'border-l-4 border-l-amber-500';
            case 'low': return 'border-l-4 border-l-emerald-500';
            default: return 'border-l-4 border-l-slate-gray';
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
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-900 pb-24 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-tr from-electric-blue via-[#1D4ED8] to-vivid-cyan rounded-b-[32px] pt-12 pb-12 px-6 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                <h1 className="text-xl font-extrabold text-white mb-6 text-center font-display tracking-tight uppercase">
                    {t('updates.title')}
                </h1>

                {/* Statistics Grid */}
                <div className="grid grid-cols-4 gap-2.5">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/15 shadow-sm">
                        <p className="text-white text-lg font-bold font-data">{stats.total}</p>
                        <p className="text-blue-100 text-[9px] font-bold uppercase tracking-wider mt-1">Total</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/15 shadow-sm">
                        <p className="text-amber-300 text-lg font-bold font-data">{stats.pending}</p>
                        <p className="text-blue-100 text-[9px] font-bold uppercase tracking-wider mt-1">Pending</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/15 shadow-sm">
                        <p className="text-emerald-300 text-lg font-bold font-data">{stats.approved}</p>
                        <p className="text-blue-100 text-[9px] font-bold uppercase tracking-wider mt-1">Approved</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/15 shadow-sm">
                        <p className="text-blue-200 text-lg font-bold font-data">{stats.resolved}</p>
                        <p className="text-blue-100 text-[9px] font-bold uppercase tracking-wider mt-1">Resolved</p>
                    </div>
                </div>
            </div>

            {/* Content list */}
            <div className="px-6 -mt-6">
                {/* Filter Tab Row */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-soft border border-gray-100 dark:border-slate-700/60 mb-5 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2">
                        {filterOptions.map(option => (
                            <button
                                key={option.id}
                                onClick={() => setActiveFilter(option.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                                    activeFilter === option.id
                                        ? 'bg-electric-blue text-white shadow-sm'
                                        : 'bg-[#F7F9FC] dark:bg-slate-700 text-slate-gray dark:text-gray-300 hover:bg-sky-white'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feed cards list */}
                <div className="space-y-4">
                    {filteredUpdates.length === 0 ? (
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-gray-100 dark:border-slate-700/60 text-center">
                            <Bell className="w-12 h-12 text-slate-gray/30 mx-auto mb-3" />
                            <p className="text-slate-gray dark:text-gray-400 text-xs font-bold uppercase tracking-wider">No supervisor updates found</p>
                        </div>
                    ) : (
                        filteredUpdates.map(update => (
                            <div
                                key={update.id}
                                className={`bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60 transition-all ${getPriorityBorder(update.priority)}`}
                            >
                                {/* Title and Badge Header */}
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-extrabold text-sm md:text-base text-ink-navy dark:text-white leading-tight">
                                            {update.reportTitle}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-gray dark:text-gray-400 uppercase tracking-wide mt-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-electric-blue" />
                                            {update.location}
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${getStatusColor(update.status)}`}>
                                        {getStatusIcon(update.status)}
                                        {update.status}
                                    </span>
                                </div>

                                {/* Incident details row */}
                                <div className="bg-[#F7F9FC] dark:bg-slate-700/40 rounded-xl p-3 mb-4 flex justify-between items-center text-[10px] font-bold text-slate-gray dark:text-gray-300">
                                    <span>ID: <span className="text-ink-navy dark:text-white font-data">{update.reportId}</span></span>
                                    <span>Submitted: <span className="font-data">{update.reportDate.split(' ')[0]}</span></span>
                                </div>

                                {/* Response Speech Bubble */}
                                {update.supervisorResponse && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-electric-blue/10 flex items-center justify-center text-[10px] font-bold text-electric-blue shrink-0">
                                                {update.supervisorName.charAt(0)}
                                            </div>
                                            <span className="text-xs font-extrabold text-ink-navy dark:text-white">
                                                {update.supervisorName}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-gray dark:text-gray-400 font-data">
                                                {update.updatedAt.split(' ')[1]} {update.updatedAt.split(' ')[2]}
                                            </span>
                                        </div>
                                        
                                        <div className="bg-[#EFF6FF] dark:bg-slate-750 border-l-4 border-electric-blue p-3.5 rounded-r-xl">
                                            <p className="text-xs text-slate-gray dark:text-gray-200 font-semibold leading-relaxed mb-2.5 flex gap-1.5">
                                                <MessageSquare className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                                                "{update.supervisorResponse}"
                                            </p>
                                            {update.actionTaken && (
                                                <div className="pt-2 border-t border-gray-200/50 dark:border-slate-700/60 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                                                    <TrendingUp className="w-3.5 h-3.5" />
                                                    <span>Action: {update.actionTaken}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Process timeline indicator */}
                                {update.timeline && update.timeline.length > 0 && (
                                    <div className="pt-3.5 border-t border-gray-150 dark:border-slate-700/60">
                                        <span className="text-[9px] font-bold text-slate-gray dark:text-gray-400 uppercase tracking-wider mb-2.5 block">Process Timeline</span>
                                        <div className="space-y-2">
                                            {update.timeline.map((item, index) => (
                                                <div key={index} className="flex items-center gap-2.5 text-[10px] font-semibold text-slate-gray dark:text-gray-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-electric-blue shrink-0"></div>
                                                    <div className="flex-1">
                                                        <span className="font-data">{item.time}</span>
                                                        <span className="text-slate-gray/80 dark:text-gray-400"> - {item.note}</span>
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
