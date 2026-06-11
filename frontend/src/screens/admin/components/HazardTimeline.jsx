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

const HazardTimeline = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col">
            <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Hazard Trend (Last 7 Days)</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="Low" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="High" stackId="a" fill="#F59E0B" />
                        <Bar dataKey="Critical" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HazardTimeline;
