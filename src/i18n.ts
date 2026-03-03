import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import cs from './locales/cs.json';
import he from './locales/he.json';
import pagesEn from './locales/pages-en.json';
import pagesRu from './locales/pages-ru.json';
import pagesHe from './locales/pages-he.json';
import pagesCs from './locales/pages-cs.json';

const resources = {
  ru: { translation: { ...ru, pages: pagesRu } },
  en: { translation: { ...en, pages: pagesEn } },
  cs: { translation: { ...cs, pages: pagesCs } },
  he: { translation: { ...he, pages: pagesHe } }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'cs',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial lang attribute
document.documentElement.lang = i18n.language || 'cs';

export default i18n;
