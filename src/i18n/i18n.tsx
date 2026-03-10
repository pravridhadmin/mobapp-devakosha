import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";

import en from './locales/en.json';
import fr from './locales/fr.json';
import kn from './locales/kn.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  kn: { translation: kn },
};

const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode ?? 'en';

export const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("user-language");

  const language = savedLanguage || deviceLanguage;

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;