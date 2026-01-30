import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const variants = {
        primary: 'bg-black text-white',
        secondary: 'bg-gradient-to-r from-primary-blue to-primary-blue-light text-white',
        danger: 'bg-danger-red text-white',
        outline: 'border-2 border-neutral-200 text-neutral-500 bg-white',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-medium shadow-soft flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
