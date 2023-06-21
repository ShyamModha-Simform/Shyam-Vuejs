import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import gu from '../locales/gu.json';

// console.log(en);

export const vue_i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        gu,
    },
});
