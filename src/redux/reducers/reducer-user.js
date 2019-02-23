import storeDefault from '../defaultStore';

export default (state = storeDefault.user, action = {}) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
