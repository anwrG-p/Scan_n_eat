import { create } from 'zustand';

export type Language = 'en' | 'fr' | 'ar' | 'it' | 'de';

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'en',
    setLanguage: (lang) => set({ language: lang }),
}));
