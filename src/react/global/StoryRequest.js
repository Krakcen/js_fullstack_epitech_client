import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
// import AuthManagement from 'feathers-authentication-management/lib/client';
// const auth = feathers.authentication;
const auth = require('@feathersjs/authentication-client');

const app = feathers();

// Setting SocketIO
const getEnvUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:3030';
    case 'production':
      return 'https://storyfactory.tk';
    default:
      throw new Error('NODE_ENV missing or invalid, must be [development, production]');
  }
};
const socket = io(getEnvUrl());
app.configure(socketio(socket));

// Setting Authentication
const fOptions = {
  header: 'Authorization', // the default authorization header for REST
  prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
  path: '/authentication', // the server-side authentication service path
  jwtStrategy: 'jwt', // the name of the JWT authentication strategy
  entity: 'user', // the entity you are authenticating (ie. a users)
  service: 'users', // the service to look up the entity
  cookie: 'storyfactory-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
  storageKey: 'storyfactory-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
  storage: window.localStorage,
};
app.configure(auth(fOptions));

const logInUser = async (params = false) => {
  try {
    if (!params) {
      const login = await app.authenticate();
      return login;
    }
    const login = await app.authenticate({
      strategy: 'local',
      ...params,
    });
    return login;
  } catch (error) {
    throw Error(
      `[logInUser] - Error when logging in to Story Factory: ${
        error.message
      } - url: ${getEnvUrl()}`,
    );
  }
};

const logOutUser = async () => {
  try {
    const logout = await app.logout();
    return logout;
  } catch (error) {
    throw new Error(`Error when logging out to Story Factory: ${error.message}`);
  }
};

export {
  app, socket, logInUser, logOutUser,
};

// const authManagement = new AuthManagement(app);

// const StorySocket = {
//   emitEvent: async (name, message) => {
//     try {
//       return socket.emit(name, message);
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   onEvent: async (name, cb) => {
//     if (socket._callbacks[`$${name}`] === undefined) {
//       /* eslint no-underscore-dangle: 0 */
//       // Handler not present, install now
//       socket.on(name, cb);
//     }
//   },
// };

// const StoryRequest = async (methodHTTP = null, service = null, params = {}, header = {}) => {
//   try {
//     let result;
//     switch (methodHTTP) {
//       case 'find':
//         result = await app.service(service).find(params, { headers: header });
//         break;
//       case 'get':
//         result = await app.service(service).get(params._id, params.query, { headers: header });
//         break;
//       case 'create':
//         result = await app.service(service).create(params, { headers: header });
//         break;
//       case 'update':
//         result = await app
//           .service(service)
//           .update(params._id, params.data, params.query, { headers: header });
//         break;
//       case 'patch':
//         result = await app
//           .service(service)
//           .patch(params._id, params.data, params.query, { headers: header });
//         break;
//       case 'remove':
//         result = await app.service(service).remove
// (params._id, params.query, { headers: header });
//         break;
//       default:
//         break;
//     }
//     return result;
//   } catch (e) {
//     console.error('Error: ', e);
//     throw new Error(e.message);
//   }
// };

// change password
// const passwordChange = async (oldPassword, password, identifyUser) => await
// authManagement.passwordChange(oldPassword, password, identifyUser);

// // forgotten password verification with long token
// const resetPwdLong = (resetToken, password) => authManagement.resetPwdLong(resetToken, password);

// // send forgotten password notification
// const sendResetPwd = (identifyUser, notifierOptions) =>
// authManagement.sendResetPwd(identifyUser, notifierOptions);

// const verifySignupLong = verifyToken => authManagement.verifySignupLong(verifyToken);

// old but gold
// const axios = require('axios');
// const rest = feathers.rest;
// let restClient;
// restClient = rest(getEnvUrl());
// app.configure(restClient.axios(axios));
