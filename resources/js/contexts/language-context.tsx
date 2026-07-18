import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Language, type TranslationKey, translations } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('language') as Language) || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string, params?: Record<string, string | number>): string => {
        const entry = translations[key as TranslationKey];
        if (!entry) return key;
        let text = entry[language] || entry.en || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
            });
        }
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
