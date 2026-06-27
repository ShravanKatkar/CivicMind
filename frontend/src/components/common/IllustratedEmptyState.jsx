import React from 'react';
import emptyFeedImg from '../../assets/images/empty_feed.png';
import supervisorEmptyImg from '../../assets/images/supervisor_empty.png';

const IllustratedEmptyState = ({ type = 'hazards', title, subtitle, actionButton }) => {
    const isHazards = type === 'hazards';
    
    const defaultTitle = isHazards ? 'All Clear!' : 'All Quiet on the Field';
    const defaultSubtitle = isHazards 
        ? 'No safety hazards have been detected in this area. Enjoy the safe streets!'
        : 'No worker reports or urgent updates have been escalated at this time.';
        
    const imageSrc = isHazards ? emptyFeedImg : supervisorEmptyImg;

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto font-body">
            {/* Full Illustrated Scene */}
            <div className="w-64 h-64 mb-6 relative flex items-center justify-center">
                <img 
                    src={imageSrc} 
                    alt={defaultTitle} 
                    className="w-full h-full object-contain transform scale-105 select-none animate-in fade-in zoom-in-95 duration-500 ease-spring"
                />
            </div>

            {/* Typography */}
            <h3 className="font-extrabold text-xl font-display text-ink-navy mb-2">
                {title || defaultTitle}
            </h3>
            <p className="text-slate-gray text-sm leading-relaxed font-medium mb-6">
                {subtitle || defaultSubtitle}
            </p>

            {/* Optional action CTA */}
            {actionButton}
        </div>
    );
};

export default IllustratedEmptyState;
