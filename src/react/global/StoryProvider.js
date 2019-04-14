import React, { createContext, useContext, useReducer } from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

const cookieInstance = new Cookies();

let cookieValLang = cookieInstance.get('storyFactoryLang');
if (cookieValLang === 'en') cookieValLang = 'us';

const initialState = {
  user: {
    loggedIn: false,
  },
  lang: cookieValLang || 'fr',
  // story: {
  //   users: [],
  // },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    // case 'SET_STORY':
    //   return {
    //     ...state,
    //     story: { ...state.story, ...action.payload },
    //   };
    case 'SET_LANG':
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export const StateContext = createContext();
export const StateConsumer = StateContext.Consumer;
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateValue = () => useContext(StateContext);
