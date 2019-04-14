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
