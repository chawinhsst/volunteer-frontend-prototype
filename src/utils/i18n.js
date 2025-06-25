import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 1. We now import the translation files from the 'locales' folder.
//    The '..' means "go up one directory level" from 'utils' to 'src'.
import translationEN from '../locales/en/translation.json';
import translationTH from '../locales/th/translation.json';

// 2. The resources object now uses these imported files.
const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
};

i18n
  // 3. We re-introduce the language detector to automatically set the language.
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Use English if a language is not available.

    debug: true, // Helpful for development.

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;