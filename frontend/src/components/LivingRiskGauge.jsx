import React from 'react';

// Custom inline SVG icons for satellites
const HelmetIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 7.02944 6.02944 3 11 3C15.9706 3 20 7.02944 20 12C20 12.5523 19.5523 13 19 13H3C2.44772 13 2 12.5523 2 12Z" fill="#F59E0B" />
        <path d="M3 13H19V15C19 15.5523 18.5523 16 18 16H4C3.44772 16 3 15.5523 3 15V13Z" fill="#D97706" />
        <path d="M10 3V7C10 7.55228 10.4477 8 11 8C11.5523 8 12 7.55228 12 7V3H10Z" fill="#FFF" opacity="0.8" />
        <rect x="1" y="16" width="22" height="2" rx="1" fill="#4B5563" />
    </svg>
);

const ManholeIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="16" rx="8" ry="4" fill="#374151" />
        <ellipse cx="12" cy="16" rx="7" ry="3.5" fill="#1F2937" />
        <ellipse cx="12" cy="14" rx="7" ry="3.5" fill="#4B5563" stroke="#9CA3AF" strokeWidth="1" />
        <path d="M12 11C12 11 8 9 8 6.5C8 4 12 1.5 12 1.5C12 1.5 16 4 16 6.5C16 9 12 11 12 11Z" fill="#06B6D4" />
        <circle cx="12" cy="6.5" r="1.5" fill="#FFF" />
    </svg>
);

const GasCloudIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gaugeGasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
        </defs>
        <path d="M6 14.5C4.07 14.5 2.5 12.93 2.5 11C2.5 9.25 3.78 7.79 5.5 7.55C6.03 5.53 7.86 4 10 4C12.44 4 14.53 5.75 14.93 8.11C15.54 7.73 16.24 7.5 17 7.5C19.21 7.5 21 9.29 21 11.5C21 13.71 19.21 15.5 17 15.5H6V14.5Z" fill="url(#gaugeGasGrad)" opacity="0.9" />
        <path d="M4 17.5C4 17.5 6 19 8 19C10 19 11 17.5 12 17.5C13 17.5 14 19 16 19" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const DangerIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LivingRiskGauge = ({ score = 5.0, level = 'Medium', hazards = [] }) => {
    // Normalize hazards array
    const normalizedHazards = hazards.length > 0 ? hazards : ['General Hazard'];

    // Map hazard keyword to icon
    const getHazardIcon = (hazardName) => {
        const name = hazardName.toLowerCase();
        if (name.includes('helmet') || name.includes('vest') || name.includes('ppe') || name.includes('worker') || name.includes('shield')) {
            return <HelmetIcon />;
        }
        if (name.includes('manhole') || name.includes('hole') || name.includes('open') || name.includes('pit')) {
            return <ManholeIcon />;
        }
        if (name.includes('gas') || name.includes('toxic') || name.includes('air') || name.includes('cloud') || name.includes('chemical')) {
            return <GasCloudIcon />;
        }
        return <DangerIcon />;
    };

    // Determine colors, sizing, and animations based on risk level
    const isCritical = level.toLowerCase().includes('critical');
    const isHigh = level.toLowerCase().includes('high');
    const isMedium = level.toLowerCase().includes('medium');
    
    let orbBg = 'bg-neon-green';
    let orbGlow = 'shadow-[0_0_40px_rgba(16,185,129,0.4)]';
    let orbSize = 'w-36 h-36';
    let pulseClass = '';
    let radialBg = 'from-neon-green/10 via-transparent to-transparent';

    if (isCritical) {
        orbBg = 'bg-alert-red';
        orbGlow = 'shadow-[0_0_60px_rgba(239,68,68,0.7)] border-4 border-white/20';
        orbSize = 'w-48 h-48';
        pulseClass = 'animate-pulse';
        radialBg = 'from-alert-red/20 via-transparent to-transparent';
    } else if (isHigh) {
        orbBg = 'bg-alert-red';
        orbGlow = 'shadow-[0_0_50px_rgba(239,68,68,0.5)]';
        orbSize = 'w-44 h-44';
        pulseClass = 'animate-pulse';
        radialBg = 'from-alert-red/15 via-transparent to-transparent';
    } else if (isMedium) {
        orbBg = 'bg-blazing-amber';
        orbGlow = 'shadow-[0_0_40px_rgba(245,158,11,0.5)]';
        orbSize = 'w-40 h-40';
        radialBg = 'from-blazing-amber/15 via-transparent to-transparent';
    }

    // Dynamic orbit radius based on orb size
    const orbitDistance = isCritical ? 130 : isHigh ? 120 : isMedium ? 110 : 100;

    // Generate style block for custom dynamic satellite orbits
    const styles = normalizedHazards.map((_, index) => {
        const startAngle = (index * 360) / normalizedHazards.length;
        const animationName = `orbit-${index}`;
        return `
            @keyframes ${animationName} {
                0% { transform: rotate(${startAngle}deg) translateX(${orbitDistance}px) rotate(-${startAngle}deg); }
                100% { transform: rotate(${startAngle + 360}deg) translateX(${orbitDistance}px) rotate(-${startAngle + 360}deg); }
            }
        `;
    }).join('\n');

    return (
        <div 
            className={`relative rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 w-full min-h-[340px] ${
                isCritical 
                    ? 'bg-gradient-to-br from-[#FEF2F2] to-[#FFF7ED] border-2 border-alert-red/20 shadow-[0_12px_40px_rgba(239,68,68,0.15)]' 
                    : 'bg-white shadow-soft border border-blue-50'
            }`}
        >
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {/* Background Soft Radial Gradient */}
            <div className={`absolute w-96 h-96 rounded-full bg-radial-gradient bg-gradient-to-r ${radialBg} filter blur-3xl pointer-events-none z-0`}></div>

            {/* Orbit ecosystem area */}
            <div className="relative w-80 h-80 flex items-center justify-center z-10">
                
                {/* Orbit path rings (visual guides) */}
                <div className="absolute w-[200px] h-[200px] border border-slate-gray/10 rounded-full pointer-events-none"></div>
                <div className="absolute w-[240px] h-[240px] border border-dashed border-slate-gray/5 rounded-full pointer-events-none"></div>
                
                {/* Central Risk Orb */}
                <div 
                    className={`rounded-full flex flex-col items-center justify-center text-white text-center cursor-pointer transition-all duration-500 ease-spring ${orbBg} ${orbSize} ${orbGlow} ${pulseClass} relative z-20`}
                >
                    {/* Inner glowing pulse ring */}
                    <div className="absolute inset-0.5 rounded-full bg-white/10 border border-white/20 pointer-events-none"></div>

                    {/* Shimmer score */}
                    <span 
                        className="text-4xl md:text-5xl font-extrabold font-data tracking-tight drop-shadow-md select-none bg-gradient-to-r from-white via-white/80 to-white bg-[length:200%_auto] animate-shimmer"
                    >
                        {score.toFixed(1)}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-90 font-display mt-1">
                        {level} Risk
                    </span>
                </div>

                {/* Floating Satellites */}
                {normalizedHazards.map((hazard, index) => {
                    const animationStyle = {
                        animation: `orbit-${index} 12s linear infinite`,
                    };

                    return (
                        <div 
                            key={index}
                            style={animationStyle}
                            className="absolute w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-gray/10 text-ink-navy hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-30 group"
                            title={hazard}
                        >
                            {getHazardIcon(hazard)}
                            
                            {/* Hover tooltip label */}
                            <div className="absolute bottom-14 opacity-0 group-hover:opacity-100 bg-ink-navy text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                                {hazard.replace(/\(.*\)/, '')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LivingRiskGauge;
