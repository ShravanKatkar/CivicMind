/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // CivicMind AI v2.0 - Vivid & High Energy Palette
                'sky-white': '#F0F7FF',
                'electric-blue': '#2563EB',
                'vivid-cyan': '#06B6D4',
                'neon-green': '#10B981',
                'blazing-amber': '#F59E0B',
                'alert-red': '#EF4444',
                'deep-violet': '#7C3AED',
                'sunrise-orange': '#F97316',
                'ink-navy': '#0F172A',
                'slate-gray': '#64748B',
                
                // Keep compatibility references if needed
                gov: {
                    navy: '#2563EB',
                    'navy-dark': '#0F172A',
                    'navy-light': '#2563EB',
                    'safety-green': '#10B981',
                    'warning-amber': '#F59E0B',
                    'danger-red': '#EF4444',
                    'slate': '#0F172A',
                    'slate-light': '#64748B',
                    'gray-bg': '#F0F7FF',
                    'white': '#FFFFFF',
                    'accent-teal': '#06B6D4',
                }
            },
            fontFamily: {
                display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                data: ['"Space Grotesk"', 'monospace'],
            },
            borderRadius: {
                '3xl': '20px', // Standardized to 20px card radius
                '4xl': '32px',
            },
            boxShadow: {
                'soft': '0 4px 24px rgba(37, 99, 235, 0.10)', // Card soft shadow
                'card': '0 4px 24px rgba(37, 99, 235, 0.10)',
                'professional': '0 1px 3px rgba(15, 23, 42, 0.08)',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
            animation: {
                'bounce-once': 'bounceOnce 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'scan': 'scanLine 3s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                bounceOnce: {
                    '0%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
                    '75%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '100%': { transform: 'translateY(0)' },
                },
                scanLine: {
                    '0%, 100%': { top: '0%' },
                    '50%': { top: '100%' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        },
    },
    plugins: [],
}
