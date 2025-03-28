// import i18next from "i18next";
// import { initReactI18next } from "react-i18next";
// import * as Localization from "expo-localization";

// import en from "./translations/en.json";
// import de from "./translations/de.json";
// import hi from "./translations/hi.json";

// const resources = {
//   en: { translation: en },
//   de: { translation: de },
//   hi: { translation: hi },
// };

// const availableLanguages = Object.keys(resources);

// const getStoredLanguage = () => {
//   const deviceLang = Localization.locale.split("-")[0];
//   return availableLanguages.includes(deviceLang) ? deviceLang : "en";
// };

// export const initI18n = async () => {
//   const lng = getStoredLanguage();
//   console.log("Detected language:", lng);

//   await i18next.use(initReactI18next).init({
//     lng,
//     fallbackLng: "en",
//     resources,
//     compatibilityJSON: "v4",
//     debug: true,
//   });

//   console.log("i18n initialized with language:", lng);
// };

// // Initialize immediately
// initI18n();

// export default i18next;

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./translations/en.json";
import de from "./translations/de.json";
import hi from "./translations/hi.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
  hi: { translation: hi },
};

const availableLanguages = Object.keys(resources);

// Function to determine the correct initial language
const getStoredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("appLanguage");
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }
  } catch (error) {
    console.error("Error fetching stored language:", error);
  }

  // If no stored language, fallback to device language or English
  const deviceLang = Localization.locale.split("-")[0];
  return availableLanguages.includes(deviceLang) ? deviceLang : "en";
};

export const initI18n = async () => {
  const lng = await getStoredLanguage();
  console.log("Detected language:", lng);

  await i18next.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    resources,
    compatibilityJSON: "v4",
    debug: true,
  });

  console.log("i18n initialized with language:", lng);
};

// Initialize immediately
initI18n();

export default i18next;
