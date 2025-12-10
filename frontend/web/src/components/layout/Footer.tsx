
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore, type Language } from '../../store/languageStore';

export const Footer: React.FC = () => {
    const { language, setLanguage } = useLanguageStore();


    const languages: { code: Language; label: string; dir?: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'ar', label: 'العربية', dir: 'rtl' },
        { code: 'it', label: 'Italiano' },
        { code: 'de', label: 'Deutsch' },
    ];

    return (
        <footer className="w-full py-6 mt-auto border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-4">
                    {/* Languages Row */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        {languages.map((lang, index) => (
                            <React.Fragment key={lang.code}>
                                <button
                                    onClick={() => setLanguage(lang.code)}
                                    className={`transition-colors ${language === lang.code ? 'font-bold text-blue-600' : 'hover:text-gray-900'}`}
                                    {...(lang.dir ? { dir: lang.dir } : {})}
                                >
                                    {lang.label}
                                </button>
                                {index < languages.length - 1 && <span className="text-gray-300">|</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <Link to="#" className="hover:text-gray-900 transition-colors">FAQ</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">Help</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">Terms and conditions</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">About</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
