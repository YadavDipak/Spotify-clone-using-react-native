import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import gr from "./translations/gr.json";

const resources = {
  en: {
    translation: en,
  },
  gr: {
    translation: gr,
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  lng: "en",
  compatibilityJSON: "v4",
  // language to use if translation in user language is not available
  fallbackLng: "en",
  resources: resources,
});

export default i18next;
