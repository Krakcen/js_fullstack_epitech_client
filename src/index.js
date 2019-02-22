import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { applyMiddleware, createStore, compose } from 'redux';
// import { Provider } from 'react-redux';
// import { connect } from 'react-redux';
// import promise from 'redux-promise-middleware';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import { I18nextProvider } from 'react-i18next';
import Routes from './routes';

// import i18n from "./translation/i18n";
// import rootReducer from "./redux/reducers";
// import { setUser } from "./redux/actions";
// import { logInUserDefault } from "./utils/tkwlive-request";

import './semantic/dist/semantic.min.css';

// const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));
// let store = createStore(/*reducer*/ rootReducer, middleware);

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

ReactDOM.render(<App />, document.getElementById('root'));
