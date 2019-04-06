import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';

import { useStateValue, StoryLogout } from '../../global';

const AuthButtons = ({ t, fixed }) => {
  const [{ user }, dispatch] = useStateValue();

  const logoutUser = async () => {
    try {
      const logout = await StoryLogout();

      console.log(logout);

      dispatch({
        type: 'SET_USER',
        payload: { loggedIn: false },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {user.loggedIn ? (
        <Header as="h3" style={{ color: 'white', fontWeight: 'normal' }}>
          {`Welcome back ${user.username} !`}
          {' '}
          <Icon
            onClick={logoutUser}
            style={{ marginLeft: '30px', cursor: 'pointer' }}
            name="log out"
          />
        </Header>
      ) : (
        <React.Fragment>
          <Link to="/login">
            <Button inverted={!fixed}>{t('landing.menuLogin')}</Button>
          </Link>
          <Link to="/register">
            <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
              {t('landing.menuRegister')}
            </Button>
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
AuthButtons.propTypes = {
  t: PropTypes.func.isRequired,
  fixed: PropTypes.bool.isRequired,
};

export default AuthButtons;
