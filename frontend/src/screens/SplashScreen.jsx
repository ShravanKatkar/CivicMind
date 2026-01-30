import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import { useLanguage } from '../context/LanguageContext';

const SplashScreen = () => {
    const navigate = useNavigate();
    const { isLanguageSelected } = useLanguage();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to language selection if not selected, otherwise go to role selection
            navigate(isLanguageSelected ? '/roles' : '/language');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate, isLanguageSelected]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
            style={{
                background: 'var(--gov-header-gradient)',
            }}
        >
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8">
                {/* Custom Logo with animation */}
                <div
                    className="mb-8 relative"
                    style={{
                        animation: 'float 3s ease-in-out infinite',
                    }}
                >
                    <Logo size={120} />
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-3 text-center">
                    CivicMind
                </h1>
                <p className="text-white/90 text-center text-lg mb-2">
                    Safety Brain for Field Workers
                </p>
                <p className="text-white/70 text-center text-sm">
                    Your intelligent safety companion
                </p>

                {/* Loading indicator */}
                <div className="flex space-x-2 mt-8">
                    <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                    ></div>
                </div>
            </div>

            {/* Powered by text at bottom */}
            <div className="absolute bottom-8 text-white/70 text-sm">
                Powered by Advanced AI
            </div>

            {/* Float animation */}
            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
