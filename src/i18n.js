import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-xhr-backend';

// the translations

const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en_US'
i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({

    keySeparator: false,

    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: process.env.REACT_APP_SUB_APP + 'translation/{{lng}}.json'
    },
    debug: true,
    lng: language,
    fallbackLng: false,
    react: {
      wait: true
    }
  });
export default i18n;