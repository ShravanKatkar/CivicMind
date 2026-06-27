import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Filter, AlertTriangle, CheckCircle, Clock, ChevronRight } from 'lucide-react';

import sharpObjects from '../assets/images/sharp_objects.png';
import openDrain from '../assets/images/open_drain.png';
import dirtyWater from '../assets/images/dirty_water.png';

const ReportsScreen = () => {
    const navigate = useNavigate();
    const [filterBy, setFilterBy] = useState('All');

    const filters = ['All', 'High Risk', 'Medium', 'Low', 'Resolved'];

    const reports = [
        {
            id: 1,
            title: 'Sharp Objects & Gas Risk',
            location: 'Site A, Mumbai',
            date: 'Today, 10:32 AM',
            riskLevel: 'High',
            status: 'Active',
            image: sharpObjects,
        },
        {
            id: 2,
            title: 'Open Drain Detected',
            location: 'Site B, Pune',
            date: 'Yesterday, 3:15 PM',
            riskLevel: 'Medium',
            status: 'Resolved',
            image: openDrain,
        },
        {
            id: 3,
            title: 'Dirty Water Accumulation',
            location: 'Site C, Navi Mumbai',
            date: '2 days ago, 11:20 AM',
            riskLevel: 'Low',
            status: 'Monitoring',
            image: dirtyWater,
        },
    ];

    const filteredReports = reports.filter(report => {
        if (filterBy === 'All') return true;
        if (filterBy === 'Resolved') return report.status === 'Resolved';
        return report.riskLevel === filterBy || report.riskLevel.includes(filterBy);
    });

    const getRiskColor = (level) => {
        switch (level) {
            case 'High': return 'text-red-600 bg-red-50';
            case 'Medium': return 'text-orange-600 bg-orange-50';
            case 'Low': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
            default: return <Clock className="w-4 h-4 text-orange-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-10 pb-6 px-6"
                style={{
                    background: 'var(--gov-header-gradient)',
                }}
            >
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-white">
                        Reports
                    </h1>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Date Range */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <div className="flex-1">
                        <p className="text-white text-sm font-semibold">Last 7 Days</p>
                        <p className="text-white/70 text-xs">Jan 19 - Jan 26, 2026</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/70" />
                </div>
            </div>

            <div className="px-6 -mt-2">
                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setFilterBy(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${filterBy === filter
                                ? 'bg-gray-800 text-white shadow-md'
                                : 'bg-white text-gray-500 shadow-sm hover:bg-gray-50'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Reports List */}
                <div className="space-y-4">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            onClick={() => navigate('/incident-detail', { state: { report } })}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex gap-4 p-4">
                                {/* Image */}
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                    <img
                                        src={report.image}
                                        alt={report.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-gray-900 text-sm leading-tight">
                                            {report.title}
                                        </h3>
                                        {getStatusIcon(report.status)}
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs text-gray-500">{report.location}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getRiskColor(report.riskLevel)}`}>
                                            {report.riskLevel} Risk
                                        </span>
                                        <span className="text-xs text-gray-400">{report.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg mb-2">No Reports Found</h3>
                        <p className="text-gray-500 text-sm">
                            Try adjusting your filters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsScreen;
