// CivicMind - "Industrial Dawn" Color Palette
// Philosophy: Hope at a construction site sunrise—serious about safety, energizing & human-centered

export const colors = {
    // PRIMARY PALETTE
    primary: {
        foundryCharcoal: '#2B3440',    // Deep, grounded, trustworthy
        beaconOrange: '#FF6B35',       // Warm, confident, visible without anxiety
        signalCyan: '#00D9FF',         // Electric intelligence, clarity
    },

    // SECONDARY PALETTE
    secondary: {
        morningSlate: '#5B6B7D',       // Softer neutral
        safetyAmber: '#FFB627',        // High-visibility, caution not panic
        shieldWhite: '#F7F9FB',        // Warm background
        insightViolet: '#8B5CF6',      // AI intelligence, premium
        earthGreen: '#2DD4A3',         // Safety approved, all-clear
    },

    // GRADIENT SYSTEM
    gradients: {
        // Danger → Caution → Safe
        awareness: 'linear-gradient(135deg, #FF6B35 0%, #FFB627 50%, #2DD4A3 100%)',

        // Human Input → AI Processing → Insight
        intelligence: 'linear-gradient(135deg, #FF6B35 0%, #8B5CF6 50%, #00D9FF 100%)',

        // Background depth for cards
        depth: 'linear-gradient(135deg, #2B3440 0%, #5B6B7D 100%)',

        // Reverse intelligence for certain UI
        intelligenceReverse: 'linear-gradient(135deg, #00D9FF 0%, #8B5CF6 50%, #FF6B35 100%)',
    },

    // GLASS-MORPHISM OVERLAYS
    glass: {
        cyanLight: 'rgba(0, 217, 255, 0.12)',
        orangeLight: 'rgba(255, 107, 53, 0.12)',
        violetLight: 'rgba(139, 92, 246, 0.12)',
        whiteLight: 'rgba(247, 249, 251, 0.08)',
    },

    // GLOW EFFECTS (for box-shadow)
    glows: {
        beaconOrange: '0 0 24px rgba(255, 107, 53, 0.4)',
        signalCyan: '0 0 20px rgba(0, 217, 255, 0.35)',
        insightViolet: '0 0 20px rgba(139, 92, 246, 0.3)',
        safetyAmber: '0 0 20px rgba(255, 182, 39, 0.35)',
    },

    // SEMANTIC MAPPING
    semantic: {
        // Dashboard
        dashboardBg: '#2B3440',
        dashboardAccent: '#00D9FF',

        // Actions
        actionPrimary: '#FF6B35',
        actionSecondary: '#5B6B7D',

        // Status
        success: '#2DD4A3',
        warning: '#FFB627',
        danger: '#FF6B35',
        info: '#00D9FF',

        // AI Features
        aiPrimary: '#8B5CF6',
        aiSecondary: '#00D9FF',

        // Text
        textPrimary: '#F7F9FB',
        textSecondary: '#5B6B7D',
        textOnLight: '#2B3440',

        // Backgrounds
        bgDark: '#2B3440',
        bgMedium: '#5B6B7D',
        bgLight: '#F7F9FB',
        bgCard: '#2B3440',

        // Borders
        borderLight: 'rgba(91, 107, 125, 0.3)',
        borderMedium: 'rgba(91, 107, 125, 0.5)',
    },

    // APP SECTION MAPPING
    sections: {
        dashboard: { bg: '#2B3440', accent: '#00D9FF' },
        imageUpload: { bg: '#2B3440', accent: '#FF6B35' },
        voiceInput: { from: '#FF6B35', to: '#8B5CF6' },
        aiReasoning: { primary: '#8B5CF6', secondary: '#00D9FF' },
        alerts: { bg: '#2B3440', accent: '#FFB627' },
        history: { bg: '#5B6B7D', accent: '#00D9FF' },
        safeStatus: { bg: '#2B3440', accent: '#2DD4A3' },
    },

    // LIGHT MODE VARIANTS (for future use)
    light: {
        background: '#F7F9FB',
        text: '#2B3440',
        card: '#FFFFFF',
        border: 'rgba(43, 52, 64, 0.1)',
    },
};

// CSS VARIABLE EXPORTS
export const cssVariables = `
    /* Primary */
    --foundry-charcoal: #2B3440;
    --beacon-orange: #FF6B35;
    --signal-cyan: #00D9FF;
    
    /* Secondary */
    --morning-slate: #5B6B7D;
    --safety-amber: #FFB627;
    --shield-white: #F7F9FB;
    --insight-violet: #8B5CF6;
    --earth-green: #2DD4A3;
    
    /* Gradients */
    --awareness-gradient: linear-gradient(135deg, #FF6B35 0%, #FFB627 50%, #2DD4A3 100%);
    --intelligence-gradient: linear-gradient(135deg, #FF6B35 0%, #8B5CF6 50%, #00D9FF 100%);
    --depth-gradient: linear-gradient(135deg, #2B3440 0%, #5B6B7D 100%);
    
    /* Glass */
    --glass-cyan: rgba(0, 217, 255, 0.12);
    --glass-orange: rgba(255, 107, 53, 0.12);
    --glass-violet: rgba(139, 92, 246, 0.12);
    
    /* Glows */
    --glow-orange: 0 0 24px rgba(255, 107, 53, 0.4);
    --glow-cyan: 0 0 20px rgba(0, 217, 255, 0.35);
    --glow-violet: 0 0 20px rgba(139, 92, 246, 0.3);
`;

export default colors;
