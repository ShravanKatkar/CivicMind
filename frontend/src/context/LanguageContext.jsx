import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

// Hook for translations
export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language || 'en'];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return { t };
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get from localStorage or default to null (show selection screen)
        return localStorage.getItem('civicmind_language') || null;
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('civicmind_language', lang);
    };

    const value = {
        language,
        changeLanguage,
        isLanguageSelected: !!language
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
