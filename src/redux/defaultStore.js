import Cookies from 'universal-cookie';

const cookieInstance = new Cookies();

export default {
  user: {
    loggedIn: false,
  },
  lang: cookieInstance.get('storyFactoryLang') || 'fr',
};
