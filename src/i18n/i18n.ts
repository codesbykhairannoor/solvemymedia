import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUI from '../locales/ui/en.json';
import idUI from '../locales/ui/id.json';
import esUI from '../locales/ui/es.json';
import frUI from '../locales/ui/fr.json';
import deUI from '../locales/ui/de.json';
import itUI from '../locales/ui/it.json';
import ptUI from '../locales/ui/pt.json';
import nlUI from '../locales/ui/nl.json';
import plUI from '../locales/ui/pl.json';
import ruUI from '../locales/ui/ru.json';
import jaUI from '../locales/ui/ja.json';
import koUI from '../locales/ui/ko.json';
import zhUI from '../locales/ui/zh.json';
import zhTWUI from '../locales/ui/zh-TW.json';
import trUI from '../locales/ui/tr.json';
import viUI from '../locales/ui/vi.json';
import thUI from '../locales/ui/th.json';
import arUI from '../locales/ui/ar.json';
import hiUI from '../locales/ui/hi.json';
import svUI from '../locales/ui/sv.json';
import noUI from '../locales/ui/no.json';
import daUI from '../locales/ui/da.json';
import fiUI from '../locales/ui/fi.json';
import csUI from '../locales/ui/cs.json';
import huUI from '../locales/ui/hu.json';
import elUI from '../locales/ui/el.json';
import roUI from '../locales/ui/ro.json';
import ukUI from '../locales/ui/uk.json';
import msUI from '../locales/ui/ms.json';
import tlUI from '../locales/ui/tl.json';


export const SUPPORTED_LANGUAGES = ["en", "id", "es", "fr", "de", "it", "pt", "nl", "pl", "ru", "ja", "ko", "zh", "zh-TW", "tr", "vi", "th", "ar", "hi", "sv", "no", "da", "fi", "cs", "hu", "el", "ro", "uk", "ms", "tl"];

const resources = {
  "en": { translation: enUI },
  "id": { translation: idUI },
  "es": { translation: esUI },
  "fr": { translation: frUI },
  "de": { translation: deUI },
  "it": { translation: itUI },
  "pt": { translation: ptUI },
  "nl": { translation: nlUI },
  "pl": { translation: plUI },
  "ru": { translation: ruUI },
  "ja": { translation: jaUI },
  "ko": { translation: koUI },
  "zh": { translation: zhUI },
  "zh-TW": { translation: zhTWUI },
  "tr": { translation: trUI },
  "vi": { translation: viUI },
  "th": { translation: thUI },
  "ar": { translation: arUI },
  "hi": { translation: hiUI },
  "sv": { translation: svUI },
  "no": { translation: noUI },
  "da": { translation: daUI },
  "fi": { translation: fiUI },
  "cs": { translation: csUI },
  "hu": { translation: huUI },
  "el": { translation: elUI },
  "ro": { translation: roUI },
  "uk": { translation: ukUI },
  "ms": { translation: msUI },
  "tl": { translation: tlUI },

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
