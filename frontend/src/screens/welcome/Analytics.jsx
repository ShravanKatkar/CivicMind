import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { ShieldCheck, TrendingDown, Clock, CheckCircle } from 'lucide-react';

const Analytics = () => {
    // Incident reduction chart data
    const incidentData = [
        { month: 'Jan', before: 45, after: 12 },
        { month: 'Feb', before: 52, after: 10 },
        { month: 'Mar', before: 48, after: 8 },
        { month: 'Apr', before: 60, after: 6 },
        { month: 'May', before: 55, after: 4 },
        { month: 'Jun', before: 50, after: 3 }
    ];

    // Hazard frequency trend data
    const trendData = [
        { name: 'Mon', Gas: 14, Scaffold: 8, Slips: 18 },
        { name: 'Tue', Gas: 12, Scaffold: 12, Slips: 24 },
        { name: 'Wed', Gas: 8, Scaffold: 15, Slips: 14 },
        { name: 'Thu', Gas: 15, Scaffold: 9, Slips: 10 },
        { name: 'Fri', Gas: 6, Scaffold: 6, Slips: 12 },
        { name: 'Sat', Gas: 4, Scaffold: 3, Slips: 8 },
        { name: 'Sun', Gas: 2, Scaffold: 2, Slips: 5 }
    ];

    const stats = [
        { icon: <TrendingDown className="w-5 h-5 text-emerald-500" />, value: "84.2%", label: "Incident Reduction", color: "text-emerald-500" },
        { icon: <ShieldCheck className="w-5 h-5 text-electric-blue" />, value: "99.8%", label: "Prediction Accuracy", color: "text-electric-blue" },
        { icon: <Clock className="w-5 h-5 text-vivid-cyan" />, value: "1.2s", label: "Automated Dispatch", color: "text-vivid-cyan" },
        { icon: <CheckCircle className="w-5 h-5 text-deep-violet" />, value: "100%", label: "Closed Audits", color: "text-deep-violet" }
    ];

    return (
        <section id="analytics" className="py-24 bg-white dark:bg-slate-900 relative">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
                
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-bold text-electric-blue uppercase tracking-widest bg-electric-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3 font-display">
                        Safety Metrics
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-ink-navy dark:text-white font-display mb-4">
                        Municipal Safety Analytics
                    </h2>
                    <p className="text-slate-gray font-medium text-sm md:text-base">
                        Real-time incident trends, compliance indexing, and safety compliance logs visualized directly for municipal planners and department heads.
                    </p>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-6 bg-[#F7F9FC] dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center shrink-0">
                                {stat.icon}
                            </div>
                            <div>
                                <span className={`text-xl md:text-2xl font-black font-data block ${stat.color}`}>{stat.value}</span>
                                <span className="text-[10px] text-slate-gray font-bold uppercase tracking-wider block mt-0.5">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Area Chart: Incident Reduction */}
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 shadow-soft flex flex-col h-[360px]">
                        <div className="mb-6">
                            <h3 className="font-extrabold text-ink-navy dark:text-white text-base">Safety Protocol Efficacy</h3>
                            <span className="text-[10px] text-slate-gray uppercase font-bold tracking-wider">INCIDENTS REPORTED BEFORE VS AFTER CIVICMIND AI</span>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={incidentData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="beforeGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="afterGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                    <Area type="monotone" dataKey="before" name="Before CivicMind" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#beforeGrad)" />
                                    <Area type="monotone" dataKey="after" name="With CivicMind AI" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#afterGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart: Hazard Type Trends */}
                    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/60 shadow-soft flex flex-col h-[360px]">
                        <div className="mb-6">
                            <h3 className="font-extrabold text-ink-navy dark:text-white text-base">Weekly Hazard Types Frequency</h3>
                            <span className="text-[10px] text-slate-gray uppercase font-bold tracking-wider">DISTRIBUTION OF DETECTED ENVIRONMENT THREATS</span>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                                    <Bar dataKey="Gas" name="Gas Risk" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={8} />
                                    <Bar dataKey="Scaffold" name="Scaffold Dangers" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={8} />
                                    <Bar dataKey="Slips" name="Slippery Floor" fill="#F97316" radius={[4, 4, 0, 0]} barSize={8} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Analytics;
