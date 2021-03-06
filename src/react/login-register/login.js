import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Header } from 'semantic-ui-react';
import { withRouter, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';

import { AuthWrapper, LoginBar } from './components';
import {
  FormField, Alert, StoryButton, StoryLogin, useStateValue, LanguageFooter,
} from '../global';

const COLOR_ERROR = 'crimson';
const COLOR_SUCCESS = '#21ba45';

const Login = ({ handleSubmit }) => {
  const [t] = useTranslation();
  const [{ user }, dispatch] = useStateValue();

  const handleLoginSubmit = async (e) => {
    try {
      if (!e.email || !e.email.length || !e.password || !e.password.length) {
        Alert({ title: t('login.noLogin'), timer: 4000, color: COLOR_ERROR });
        return;
      }

      // Log in
      const login = await StoryLogin({
        email: e.email,
        password: e.password,
      });

      if (!user.loggedIn) {
        dispatch({
          type: 'SET_USER',
          payload: { loggedIn: true, ...login },
        });
      }

      Alert({
        title: 'You logged in !',
        timer: 4000,
        color: COLOR_SUCCESS,
      });
    } catch (error) {
      Alert({ title: error.message, timer: 4000, color: COLOR_ERROR });
    }
  };

  return (
    <React.Fragment>
      { user.loggedIn && <Redirect to="/" /> }
      <LoginBar t={t} />
      <Grid centered style={{ marginTop: '20px' }} columns={2}>
        <Grid.Row centered>
          <Grid.Column computer={8} mobile={14} tablet={10}>
            <AuthWrapper>
              <Header style={{ marginTop: '25px' }} textAlign="center" as="h3">
                {t('login.header')}
              </Header>
              <Form style={{ padding: '25px' }} onSubmit={handleSubmit(handleLoginSubmit)}>
                <Field label={t('login.loginEmail')} name="email" component={FormField} type="text" />
                <Field label={t('login.loginPsw')} name="password" component={FormField} type="password" />
                <StoryButton style={{ marginTop: '20px' }} primary fluid type="submit">
                  {t('login.loginButton')}
                </StoryButton>
              </Form>
            </AuthWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <LanguageFooter />
    </React.Fragment>
  );
};
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withRouter(
  reduxForm({
    form: 'story-login',
  })(Login),
);
