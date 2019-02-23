import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ReducerUser from './reducer-user';
import ReducerLang from './reducer-lang';

const reducers = {
  form: formReducer,
  user: ReducerUser,
  lang: ReducerLang,
};

export default combineReducers(reducers);
