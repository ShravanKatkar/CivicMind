import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RiskSpeedometer = ({ score = 0, size = 200 }) => {
    // Score is 0-10. We map it to 180 degrees.
    // Data for the background arc (gray)
    const dataTotal = [{ name: 'total', value: 10 }];

    // Data for the value arc
    // We create a "needle" or filled portion.
    // For a simple gauge, we can just fill the percentage.
    const data = [
        { name: 'score', value: score },
        { name: 'rest', value: 10 - score }
    ];

    // Colors
    const getColor = (s) => {
        if (s >= 8) return '#EF4444'; // Red
        if (s >= 5) return '#F59E0B'; // Orange
        return '#10B981'; // Green
    };

    const activeColor = getColor(score);
    const cx = size / 2;
    const cy = size / 2 + 20; // Shift down slightly

    return (
        <div style={{ width: size, height: size / 1.5, position: 'relative', margin: '0 auto' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataMax={10}
                        data={data}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={size / 2 - 20}
                        outerRadius={size / 2}
                        paddingAngle={0}
                    >
                        <Cell key="score" fill={activeColor} cornerRadius={10} />
                        <Cell key="rest" fill="#E5E7EB" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 left-0 right-0 text-center -mb-2">
                <div className="text-4xl font-bold text-gray-800">{score}</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Risk Score</div>
            </div>
        </div>
    );
};

export default RiskSpeedometer;
