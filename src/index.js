import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './redux/configureStore';
import { setUser as setUserAction } from './redux/actions';
import Routes from './routes';
import i18n from './translation/i18n';

// import i18n from "./translation/i18n";
// import { logInUserDefault } from "./utils/tkwlive-request";

import './semantic/dist/semantic.min.css';

class App extends Component {
  state = {};

  componentDidMount = () => {
    // const { user, setUser } = this.props;
    //    logInUserDefault()
    //       .then(r => {
    //          if (r === "Not Logged In") {
    //             //console.log("NO ", r);
    //             setUser({ ...user, loggedIn: false });
    //          } else {
    //             //console.log("YES ", r);
    //             setUser({ ...user, loggedIn: true, ...r });
    //          }
    //       })
    //       .catch(e => {
    //          console.log("oops in init login", e);
    //          setUser({ ...user, loggedIn: false });
    //       });
  };

  render() {
    // const { user } = this.props;

    return (
      //  <I18nextProvider i18n={i18n}>{user.loggedIn != null ?
      // <Routes user={user} /> : <p>Loading...</p>}</I18nextProvider>
      <Routes />
    );
  }
}

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
      <AppConnect />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
);
