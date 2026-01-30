/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Professional Government Palette
                gov: {
                    // Earthy Professional Palette
                    // Primary - Forest Fern
                    navy: '#327039',      // Main Green (was Navy)
                    'navy-dark': '#133020', // Dark Green/Earth (was Dark Navy)
                    'navy-light': '#327039', // Keeping consistent (was Light Blue) - using Forest Fern

                    // Safety & Status Colors
                    'safety-green': '#327039', // Forest Fern
                    'warning-amber': '#F0BE49', // Wheat Field Sunrise
                    'danger-red': '#DD5C36',    // Cherry Grove

                    // Neutral Professional Tones
                    'slate': '#0f172a',        // Slate 900
                    'slate-light': '#334155',  // Slate 700
                    'gray-bg': '#F8EDD9',      // Alabaster Hay (Background)
                    'white': '#FFFFFF',

                    // Accent
                    'accent-teal': '#F0BE49',  // Wheat Field Sunrise
                },
                // Global Overrides for Earthy Theme
                'gray-50': '#F8EDD9',   // Alabaster Hay (Light Mode BG)
                // Removed green overrides, letting Tailwind defaults take over or ensuring we use grays
                // 'slate-800': '#327039', // Forest Fern (Dark Mode Card BG) <- REMOVED
                // 'slate-900': '#133020', // Tilled Earth (Dark Mode Main BG) <- REMOVED
            },
            borderRadius: {
                '3xl': '24px',
                '4xl': '32px',
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
                'professional': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
