import { create } from 'zustand';
import { translations } from '../constants/translations';

export type Language = 'en' | 'vi';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => {
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'vi';
  };

  return {
    language: getInitialLanguage(),
    setLanguage: (lang) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
      }
      set({ language: lang });
    },
    t: (path) => {
      const lang = get().language;
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = translations[lang];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return path;
        }
      }

      return typeof current === 'string' ? current : path;
    },
  };
});
