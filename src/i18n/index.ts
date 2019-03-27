import enus from '@/i18n/en-us.ts';
import VueI18n from 'vue-i18n'
import Vue from 'vue';

Vue.use(VueI18n);

const messages = {
  'en-us': enus
};
const i18n = new VueI18n({
  locale: 'en-us', // set locale
  messages
});

export { i18n, messages }