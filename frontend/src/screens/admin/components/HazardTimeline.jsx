import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Mon', Critical: 2, High: 4, Low: 10 },
    { name: 'Tue', Critical: 1, High: 3, Low: 12 },
    { name: 'Wed', Critical: 0, High: 2, Low: 15 },
    { name: 'Thu', Critical: 3, High: 5, Low: 8 },
    { name: 'Fri', Critical: 1, High: 2, Low: 14 },
    { name: 'Sat', Critical: 0, High: 1, Low: 5 },
    { name: 'Sun', Critical: 0, High: 0, Low: 2 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        const total = item.Critical + item.High + item.Low;
        return (
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-blue-50/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-700 pb-1.5 mb-1">
                    <span className="text-xl">🪖</span>
                    <span className="font-bold text-ink-navy dark:text-white text-sm">{label} Hazards</span>
                </div>
                <div className="space-y-1.5 text-xs font-body">
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-slate-gray font-semibold">Critical danger:</span>
                        <span className="font-bold text-alert-red">{item.Critical}</span>
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-slate-gray font-semibold">High warning:</span>
                        <span className="font-bold text-blazing-amber">{item.High}</span>
                    </div>
                    <div className="flex justify-between items-center gap-8">
                        <span className="text-slate-gray font-semibold">Safe status:</span>
                        <span className="font-bold text-neon-green">{item.Low}</span>
                    </div>
                    <div className="flex justify-between items-center gap-8 border-t border-gray-100 dark:border-slate-700 pt-1.5 mt-1 font-bold text-ink-navy dark:text-white">
                        <span>Total Alerts:</span>
                        <span className="font-data">{total}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const HazardTimeline = () => {
    // Map data to calculate total for the gradient bars
    const chartData = data.map(d => ({
        ...d,
        Total: d.Critical + d.High + d.Low
    }));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-slate-700 h-full flex flex-col transition-all duration-300">
            <h3 className="font-bold text-lg mb-6 text-ink-navy dark:text-white font-display">Hazard Trend (Last 7 Days)</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 15,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="blueCyanGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563EB" />
                                <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
                        <XAxis dataKey="name" tick={{ fill: '#64748B', fontWeight: 600, fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#64748B', fontWeight: 600, fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.04)' }} />
                        <Bar dataKey="Total" fill="url(#blueCyanGrad)" radius={[8, 8, 0, 0]} barSize={28} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HazardTimeline;
