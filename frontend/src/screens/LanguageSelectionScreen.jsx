import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/common/Logo';

const LanguageSelectionScreen = () => {
    const navigate = useNavigate();
    const { changeLanguage } = useLanguage();
    const [selectedLang, setSelectedLang] = useState(null);

    const languages = [
        {
            code: 'hi',
            name: 'हिंदी',
            englishName: 'Hindi',
            flag: '🇮🇳'
        },
        {
            code: 'mr',
            name: 'मराठी',
            englishName: 'Marathi',
            flag: '🇮🇳'
        },
        {
            code: 'en',
            name: 'English',
            englishName: 'English',
            flag: '🇬🇧'
        }
    ];

    const handleContinue = () => {
        if (selectedLang) {
            changeLanguage(selectedLang);
            navigate('/roles');
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col p-6 relative overflow-hidden"
            style={{
                background: 'var(--gov-header-gradient)',
            }}
        >
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Logo size={90} />
                    </div>

                    <h1 className="text-3xl font-extrabold text-white mb-2">
                        भाषा चुनें / Select Language
                    </h1>
                    <p className="text-white/80 text-sm">
                        Choose your preferred language
                    </p>
                </div>

                {/* Language Cards */}
                <div className="w-full space-y-4 mb-8">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={`w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 transition-all transform hover:scale-105 ${selectedLang === lang.code
                                ? 'ring-4 ring-white shadow-2xl'
                                : 'shadow-lg'
                                } `}
                            style={{
                                background: selectedLang === lang.code
                                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)'
                                    : 'rgba(255, 255, 255, 0.95)'
                            }}
                        >
                            {/* Flag/Icon */}
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-3xl shrink-0">
                                {lang.flag}
                            </div>

                            {/* Language Name */}
                            <div className="flex-1 text-left">
                                <h3 className="text-2xl font-bold text-gray-900 mb-0.5">
                                    {lang.name}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">
                                    {lang.englishName}
                                </p>
                            </div>

                            {/* Check indicator */}
                            {selectedLang === lang.code && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    disabled={!selectedLang}
                    className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl ${selectedLang
                        ? 'bg-white text-purple-600 hover:bg-gray-50 active:scale-95'
                        : 'bg-white/30 text-white/50 cursor-not-allowed'
                        } `}
                >
                    {selectedLang === 'hi' ? 'जारी रखें' : selectedLang === 'mr' ? 'सुरू ठेवा' : 'Continue'}
                </button>

                {/* Skip option (hidden by default, can be enabled) */}
                {/* <button
                    onClick={() => navigate('/login')}
                    className="mt-4 text-white/70 text-sm underline hover:text-white"
                >
                    Skip for now
                </button> */}
            </div>

            {/* Footer */}
            <div className="text-center text-white/60 text-xs relative z-10 mt-8">
                CivicMind - Safety for Everyone
            </div>
        </div>
    );
};

export default LanguageSelectionScreen;
