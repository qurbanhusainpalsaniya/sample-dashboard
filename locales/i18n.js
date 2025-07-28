"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { localStorageGetItem } from "utils/storage-available";

import { defaultLang } from "./config-lang";
import translationEn from "./langs/en.json";
import translationCn from "./langs/cn.json";
import translationFr from "./langs/fr.json";
import translationAr from "./langs/ar.json";
import translationVi from "./langs/vi.json";

// ----------------------------------------------------------------------

const lng = localStorageGetItem("i18nextLng", defaultLang.value);

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translations: translationEn },
            cn: { translations: translationCn },
            fr: { translations: translationFr },
            ar: { translations: translationAr },
            vi: { translations: translationVi },
        },
        lng,
        fallbackLng: lng,
        debug: true,
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
