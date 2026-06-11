import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, Clock, MapPin, Camera, Mic,
    AlertTriangle, LogIn, LogOut, User, Calendar as CalendarIcon,
    TrendingUp
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
        if (!data) return 'bg-gray-50';

        const status = data.attendance?.status;
        if (status === 'present') return 'bg-green-100 border-2 border-green-500';
        if (status === 'half-day') return 'bg-orange-100 border-2 border-orange-500';
        if (status === 'absent') return 'bg-red-100 border-2 border-red-500';
        return 'bg-gray-50';
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'login': return <LogIn className="w-4 h-4" />;
            case 'logout': return <LogOut className="w-4 h-4" />;
            case 'site_visit': return <MapPin className="w-4 h-4" />;
            case 'photo_report': return <Camera className="w-4 h-4" />;
            case 'voice_report': return <Mic className="w-4 h-4" />;
            case 'danger_alert': return <AlertTriangle className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'login': return 'bg-gov-navy text-white';
            case 'logout': return 'bg-gov-slate text-white';
            case 'site_visit': return 'bg-gov-accent-teal text-white';
            case 'photo_report': return 'bg-gov-navy-light text-white';
            case 'voice_report': return 'bg-gov-safety-green text-white';
            case 'danger_alert': return 'bg-gov-warning-amber text-white';
            default: return 'bg-gray-500 text-white';
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

    // Calculate monthly statistics
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
        <div className="transition-colors duration-300">
            {/* Header */}
            <div
                className="rounded-b-[32px] pt-12 pb-8 px-6"
                style={{
                    background: 'var(--gov-header-gradient)',
                }}
            >
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    {t('calendar.title')}
                </h1>

                {/* Monthly Statistics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <p className="text-white/80 text-xs">{t('calendar.daysWorked')}</p>
                        <p className="text-white text-xl md:text-2xl font-bold">{stats.totalDays}/{daysInMonth}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <p className="text-white/80 text-xs">{t('calendar.totalHours')}</p>
                        <p className="text-white text-xl md:text-2xl font-bold">{Math.floor(stats.totalHours)}h {Math.round((stats.totalHours % 1) * 60)}m</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <p className="text-white/80 text-xs">{t('calendar.avgDailyHours')}</p>
                        <p className="text-white text-xl md:text-2xl font-bold">{stats.avgHours.toFixed(1)}h</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <p className="text-white/80 text-xs">{t('calendar.attendanceRate')}</p>
                        <p className="text-white text-xl md:text-2xl font-bold">{stats.attendanceRate.toFixed(0)}%</p>
                    </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                    <button onClick={previousMonth} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-white font-bold text-lg">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button onClick={nextMonth} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="px-6 -mt-4">
                {/* Calendar Grid */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm mb-6 transition-colors duration-300">
                    {/* Day Names */}
                    <div className="grid grid-cols-7 gap-2 mb-3">
                        {dayNames.map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Empty cells */}
                        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                            <div key={`empty-${index}`} className="aspect-square" />
                        ))}

                        {/* Days */}
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
                                        ${isToday ? 'ring-2 ring-gov-navy-light' : ''}
                                        ${isSelected ? 'ring-4 ring-gov-navy dark:ring-blue-400 scale-105 z-10' : ''}
                                        ${dayData ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                                    `}
                                >
                                    <span className={`text-sm font-semibold ${isToday ? 'text-gov-navy font-bold' : 'text-gray-900'}`}>
                                        {day}
                                    </span>
                                    {dayData?.attendance?.loginTime && (
                                        <span className="text-[8px] text-gray-600 font-medium -mt-1">
                                            {dayData.attendance.loginTime.slice(0, 5)}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Present</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Half Day</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Absent</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Day Details */}
                {selectedDayData && (
                    <div className="space-y-4 animate-fade-in">
                        {/* Attendance Summary */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                                    {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedDayData.attendance.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                    selectedDayData.attendance.status === 'half-day' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                    {selectedDayData.attendance.status === 'present' ? 'Full Day' :
                                        selectedDayData.attendance.status === 'half-day' ? 'Half Day' : 'Absent'}
                                </span>
                            </div>

                            {selectedDayData.attendance.status !== 'absent' && (
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Login</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">{selectedDayData.attendance.loginTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Logout</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">{selectedDayData.attendance.logoutTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Total</p>
                                        <p className="text-gray-900 dark:text-white font-semibold">
                                            {Math.floor(selectedDayData.attendance.totalHours)}h {Math.round((selectedDayData.attendance.totalHours % 1) * 60)}m
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Activity Timeline */}
                        {selectedDayData.activities.length > 0 && (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm transition-colors duration-300">
                                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Activity Timeline</h3>
                                <div className="space-y-3">
                                    {selectedDayData.activities.map((activity, index) => (
                                        <div key={activity.id} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getActivityColor(activity.type)}`}>
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                                {index < selectedDayData.activities.length - 1 && (
                                                    <div className="w-0.5 h-8 bg-gray-200 dark:bg-slate-700 my-1" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-2">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                                        {getActivityLabel(activity.type)}
                                                    </span>
                                                    <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {activity.time}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm">{activity.description}</p>
                                                {activity.location && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {activity.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!selectedDay && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm text-center transition-colors duration-300">
                        <CalendarIcon className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Tap any day to view attendance details and activity timeline
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarScreen;
