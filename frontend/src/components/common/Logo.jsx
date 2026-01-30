import React from 'react';

const Logo = ({ size = 100, className = '' }) => {
    return (
        <img
            src="/civicmind-logo.png"
            alt="CivicMind Logo"
            width={size}
            height={size}
            className={className}
            style={{ objectFit: 'contain' }}
        />
    );
};

export default Logo;
