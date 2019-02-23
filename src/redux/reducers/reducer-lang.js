import storeDefault from '../defaultStore';

export default (state = storeDefault.lang, action = {}) => {
  switch (action.type) {
    case 'SET_LANG': {
      return action.payload;
    }
    default:
      return state;
  }
};
