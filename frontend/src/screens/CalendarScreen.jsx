import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Clock, MapPin, Camera, Mic,
    AlertTriangle, LogIn, LogOut, User, Calendar as CalendarIcon,
    TrendingUp, Shield, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const CalendarScreen = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    // Mock attendance data for demonstration
    const attendanceData = {
        '2026-01-26': {
            attendance: {
                loginTime: '09:15 AM',
                logoutTime: '06:02 PM',
                totalHours: 8.78,
                status: 'present',
                punctuality: 'on-time',
            },
            activities: [
                { id: 1, type: 'login', time: '09:15 AM', description: 'Logged in' },
                { id: 2, type: 'site_visit', time: '10:30 AM', location: 'Site A, Mumbai', description: 'Started site inspection' },
                { id: 3, type: 'photo_report', time: '11:15 AM', location: 'Site A, Mumbai', description: 'Submitted photo report - Danger detected' },
                { id: 4, type: 'voice_report', time: '02:45 PM', location: 'Site B, Pune', description: 'Voice safety report submitted' },
                { id: 5, type: 'danger_alert', time: '03:30 PM', location: 'Site B, Pune', description: 'High-risk danger alert raised' },
                { id: 6, type: 'logout', time: '06:02 PM', description: 'Logged out' }
            ]
        },
        '2026-01-27': {
            attendance: {
                loginTime: '09:05 AM',
                logoutTime: '05:55 PM',
                totalHours: 8.83,
                status: 'present',
                punctuality: 'on-time',
            },
            activities: [
                { id: 1, type: 'login', time: '09:05 AM', description: 'Logged in' },
                { id: 2, type: 'site_visit', time: '10:00 AM', location: 'Site C, Thane', description: 'Routine safety inspection' },
                { id: 3, type: 'photo_report', time: '12:30 PM', location: 'Site C, Thane', description: 'Equipment check completed' },
                { id: 4, type: 'logout', time: '05:55 PM', description: 'Logged out' }
            ]
        },
        '2026-01-24': {
            attendance: {
                loginTime: '10:30 AM',
                logoutTime: '02:15 PM',
                totalHours: 3.75,
                status: 'half-day',
                punctuality: 'late',
            },
            activities: [
                { id: 1, type: 'login', time: '10:30 AM', description: 'Logged in (Late)' },
                { id: 2, type: 'site_visit', time: '11:00 AM', location: 'Site A, Mumbai', description: 'Quick site check' },
                { id: 3, type: 'logout', time: '02:15 PM', description: 'Early logout - Personal reason' }
            ]
        },
        '2026-01-23': {
            attendance: {
                status: 'absent',
            },
            activities: []
        },
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        return { daysInMonth, startingDayOfWeek };
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        setSelectedDay(null);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        setSelectedDay(null);
    };

    const getDataKey = (day) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${year}-${month}-${dayStr}`;
    };

    const getDayData = (day) => {
        return attendanceData[getDataKey(day)] || null;
    };

    const getAttendanceColor = (day) => {
        const data = getDayData(day);
        if (!data) return 'bg-[#F7F9FC] dark:bg-slate-800 text-slate-gray';

        const status = data.attendance?.status;
        if (status === 'present') return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25';
        if (status === 'half-day') return 'bg-amber-500/10 text-amber-500 border border-amber-500/25';
        if (status === 'absent') return 'bg-alert-red/10 text-alert-red border border-alert-red/25';
        return 'bg-[#F7F9FC] dark:bg-slate-800 text-slate-gray';
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'login': return <LogIn className="w-4.5 h-4.5" />;
            case 'logout': return <LogOut className="w-4.5 h-4.5" />;
            case 'site_visit': return <MapPin className="w-4.5 h-4.5" />;
            case 'photo_report': return <Camera className="w-4.5 h-4.5" />;
            case 'voice_report': return <Mic className="w-4.5 h-4.5" />;
            case 'danger_alert': return <AlertTriangle className="w-4.5 h-4.5" />;
            default: return <User className="w-4.5 h-4.5" />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'login': return 'bg-blue-100 dark:bg-blue-900/20 text-electric-blue border border-electric-blue/15';
            case 'logout': return 'bg-slate-100 dark:bg-slate-700/30 text-slate-gray border border-slate-200/50';
            case 'site_visit': return 'bg-cyan-100 dark:bg-cyan-900/20 text-vivid-cyan border border-vivid-cyan/15';
            case 'photo_report': return 'bg-blue-100 dark:bg-blue-900/20 text-electric-blue border border-electric-blue/15';
            case 'voice_report': return 'bg-emerald-100 dark:bg-emerald-900/20 text-neon-green border border-neon-green/15';
            case 'danger_alert': return 'bg-orange-100 dark:bg-orange-900/20 text-blazing-amber border border-blazing-amber/15';
            default: return 'bg-gray-100 dark:bg-slate-700 text-gray-500';
        }
    };

    const getActivityLabel = (type) => {
        switch (type) {
            case 'login': return 'Login';
            case 'logout': return 'Logout';
            case 'site_visit': return 'Site Visit';
            case 'photo_report': return 'Photo Report';
            case 'voice_report': return 'Voice Report';
            case 'danger_alert': return 'Danger Alert';
            default: return 'Activity';
        }
    };

    const calculateMonthlyStats = () => {
        let totalDays = 0;
        let totalHours = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const data = getDayData(day);
            if (data?.attendance?.status === 'present' || data?.attendance?.status === 'half-day') {
                totalDays++;
                totalHours += data.attendance.totalHours || 0;
            }
        }

        const avgHours = totalDays > 0 ? totalHours / totalDays : 0;
        const attendanceRate = (totalDays / daysInMonth) * 100;

        return { totalDays, totalHours, avgHours, attendanceRate };
    };

    const stats = calculateMonthlyStats();
    const selectedDayData = selectedDay ? getDayData(selectedDay) : null;

    return (
        <div className="min-h-screen bg-[#F7F9FC] dark:bg-slate-900 pb-24 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-tr from-electric-blue via-[#1D4ED8] to-vivid-cyan rounded-b-[32px] pt-12 pb-12 px-6 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                <h1 className="text-xl font-extrabold text-white mb-6 text-center font-display tracking-tight uppercase">
                    {t('calendar.title')}
                </h1>

                {/* Monthly Statistics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest block mb-1">
                            {t('calendar.daysWorked')}
                        </span>
                        <p className="text-white text-xl font-bold font-data">{stats.totalDays}/{daysInMonth}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest block mb-1">
                            {t('calendar.totalHours')}
                        </span>
                        <p className="text-white text-xl font-bold font-data">
                            {Math.floor(stats.totalHours)}h {Math.round((stats.totalHours % 1) * 60)}m
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest block mb-1">
                            Avg Hours
                        </span>
                        <p className="text-white text-xl font-bold font-data">{stats.avgHours.toFixed(1)}h</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest block mb-1">
                            Attendance Rate
                        </span>
                        <p className="text-white text-xl font-bold font-data">{stats.attendanceRate.toFixed(0)}%</p>
                    </div>
                </div>

                {/* Month Navigation Row */}
                <div className="flex items-center justify-between bg-white/15 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15">
                    <button onClick={previousMonth} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-white font-extrabold text-sm uppercase tracking-wide">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={nextMonth} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid Container */}
            <div className="px-6 -mt-6">
                {/* Calendar Grid Container Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60 mb-6">
                    {/* Day Titles */}
                    <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                        {dayNames.map((day) => (
                            <div key={day} className="text-[10px] font-extrabold text-slate-gray dark:text-gray-400 uppercase tracking-wider">
                                {day.slice(0, 1)}
                            </div>
                        ))}
                    </div>

                    {/* Day Buttons Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                            <div key={`empty-${index}`} className="aspect-square" />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, index) => {
                            const day = index + 1;
                            const dayData = getDayData(day);
                            const isToday = day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear();
                            const isSelected = selectedDay === day;

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`aspect-square flex flex-col items-center justify-center rounded-xl relative transition-all
                                        ${getAttendanceColor(day)}
                                        ${isToday ? 'ring-2 ring-electric-blue' : ''}
                                        ${isSelected ? 'ring-4 ring-electric-blue/40 scale-105 z-10' : ''}
                                        ${dayData ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                                    `}
                                >
                                    <span className={`text-xs font-bold ${isToday ? 'text-electric-blue' : 'text-slate-gray dark:text-white'}`}>
                                        {day}
                                    </span>
                                    {dayData?.attendance?.loginTime && (
                                        <span className="text-[7px] font-extrabold text-slate-gray/80 dark:text-gray-300 mt-0.5 leading-none">
                                            {dayData.attendance.loginTime.slice(0, 5)}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Map Legend Indicators */}
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-around text-[10px] font-bold text-slate-gray uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>Present</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span>Half Day</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-alert-red" />
                            <span>Absent</span>
                        </div>
                    </div>
                </div>

                {/* Selected Day Details Panel */}
                {selectedDayData && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-700/60">
                                <div>
                                    <h3 className="font-extrabold text-sm text-ink-navy dark:text-white leading-none">
                                        {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
                                    </h3>
                                    <span className="text-[9px] text-slate-gray font-bold uppercase tracking-wider mt-1 block">Attendance Status</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    selectedDayData.attendance.status === 'present' 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : selectedDayData.attendance.status === 'half-day' 
                                            ? 'bg-amber-100 text-amber-600' 
                                            : 'bg-red-100 text-alert-red'
                                }`}>
                                    {selectedDayData.attendance.status === 'present' ? 'Full Day' :
                                        selectedDayData.attendance.status === 'half-day' ? 'Half Day' : 'Absent'}
                                </span>
                            </div>

                            {selectedDayData.attendance.status !== 'absent' && (
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 bg-[#F7F9FC] dark:bg-slate-750 rounded-xl">
                                        <span className="text-[9px] text-slate-gray font-bold uppercase tracking-wider block mb-0.5">Login</span>
                                        <span className="text-xs font-bold text-ink-navy dark:text-white font-data">{selectedDayData.attendance.loginTime}</span>
                                    </div>
                                    <div className="p-2 bg-[#F7F9FC] dark:bg-slate-750 rounded-xl">
                                        <span className="text-[9px] text-slate-gray font-bold uppercase tracking-wider block mb-0.5">Logout</span>
                                        <span className="text-xs font-bold text-ink-navy dark:text-white font-data">{selectedDayData.attendance.logoutTime}</span>
                                    </div>
                                    <div className="p-2 bg-[#F7F9FC] dark:bg-slate-750 rounded-xl">
                                        <span className="text-[9px] text-slate-gray font-bold uppercase tracking-wider block mb-0.5">Total</span>
                                        <span className="text-xs font-bold text-ink-navy dark:text-white font-data">
                                            {Math.floor(selectedDayData.attendance.totalHours)}h {Math.round((selectedDayData.attendance.totalHours % 1) * 60)}m
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Activities timeline */}
                        {selectedDayData.activities.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-soft border border-gray-100 dark:border-slate-700/60">
                                <h3 className="font-extrabold text-sm text-ink-navy dark:text-white mb-5 uppercase tracking-wider">Activity Log</h3>
                                <div className="space-y-4 relative">
                                    {selectedDayData.activities.map((activity, index) => (
                                        <div key={activity.id} className="flex gap-4 items-start relative">
                                            <div className="flex flex-col items-center z-10 shrink-0">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${getActivityColor(activity.type)}`}>
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                                {index < selectedDayData.activities.length - 1 && (
                                                    <div className="w-0.5 h-10 bg-gray-150 dark:bg-slate-700 my-1" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-1">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-bold text-xs text-ink-navy dark:text-white">
                                                        {getActivityLabel(activity.type)}
                                                    </span>
                                                    <span className="text-slate-gray dark:text-gray-400 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <Clock className="w-3 h-3 text-electric-blue" />
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="text-slate-gray dark:text-gray-300 text-xs font-semibold leading-relaxed">{activity.description}</p>
                                                {activity.location && (
                                                    <div className="mt-1.5 flex items-center gap-1 text-[9px] font-bold text-electric-blue uppercase">
                                                        <MapPin className="w-3 h-3" />
                                                        {activity.location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State Banner */}
                {!selectedDay && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-soft border border-gray-100 dark:border-slate-700/60 text-center">
                        <CalendarIcon className="w-12 h-12 text-slate-gray/30 mx-auto mb-3" />
                        <p className="text-slate-gray dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                            Select a calendar date to view telemetry history
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarScreen;
