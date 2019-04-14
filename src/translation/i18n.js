import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'universal-cookie';

import Resources from './resources';

// Initialise Language based on the cookie
const cookieInstance = new Cookies();
const cookieLang = cookieInstance.get('storyFactoryLang');
let initLanguage = 'fr';

if (cookieLang) {
  initLanguage = cookieLang;
} else {
  cookieInstance.set('storyFactoryLang', 'fr', {
    path: '/',
    expires: new Date(Date.now() + 100000000000),
  });
}

i18next.use(initReactI18next).init({
  lng: initLanguage,
  interpolation: {
    escapeValue: false,
  },
  resources: Resources,
});

export default i18next;
