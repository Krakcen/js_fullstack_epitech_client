import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './redux/configureStore';
import { setUser as setUserAction } from './redux/actions';
import Routes from './routes';
import i18n from './translation/i18n';

import { StoryLogin, StateProvider, useStateValue } from './react/global';
import './semantic/dist/semantic.min.css';

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  const [userLogLoading, setUserLogLoading] = useState(true);

  const performFirstLogin = async () => {
    try {
      const userLog = await StoryLogin();

      if (localStorage.getItem('storyfactory-jwt') && !user.loggedIn) {
        dispatch({
          type: 'SET_USER',
          payload: { loggedIn: true, ...userLog },
        });
      }
      setUserLogLoading(false);
      return;
    } catch (error) {
      console.log(error.message);
      setUserLogLoading(false);
    }
  };
  useEffect(() => {
    performFirstLogin();
    return () => {};
  }, []);

  return <React.Fragment>{!userLogLoading ? <Routes /> : 'Loading'}</React.Fragment>;
};

const mapStateToProps = state => ({
  user: state.user,
});

const AppConnect = connect(
  mapStateToProps,
  { setUser: setUserAction },
)(App);

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <StateProvider>
        <AppConnect />
      </StateProvider>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
);
