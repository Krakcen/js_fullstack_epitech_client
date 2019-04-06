import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Form, Header, Dimmer, Loader,
} from 'semantic-ui-react';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { AuthWrapper, LoginBar } from './components';
import {
  FormField, Alert, StoryButton, StoryLogin, StorySocket, useStateValue,
} from '../global';

const COLOR_ERROR = 'crimson';
const COLOR_SUCCESS = '#21ba45';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Register = ({ handleSubmit }) => {
  const [{ user }, dispatch] = useStateValue();
  const [formLoading, setFormLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    try {
      setFormLoading(true);
      if (
        !e.email
        || !e.email.length
        || !e.password
        || !e.password.length
        || !e.username
        || !e.username.length
        || !e.passwordVerif
        || !e.passwordVerif.length
      ) {
        Alert({ title: 'Error, register parameters are missing', timer: 4000, color: COLOR_ERROR });
        return;
      }
      if (e.password !== e.passwordVerif) {
        Alert({ title: "Error, password don't match", timer: 4000, color: COLOR_ERROR });
        return;
      }

      // Create the account on the server
      await StorySocket.emit('create', 'users', {
        username: e.username,
        email: e.email,
        password: e.password,
      });

      await sleep(1000);

      // Sign in
      const login = await StoryLogin({
        email: e.email,
        password: e.password,
        username: e.username,
      });

      dispatch({
        type: 'SET_USER',
        payload: { loggedIn: true, ...login },
      });

      Alert({
        title: 'You logged in !',
        timer: 4000,
        color: COLOR_SUCCESS,
      });

      setFormLoading(false);
    } catch (error) {
      console.error(error.message);
      setFormLoading(false);
    }
  };

  return (
    <React.Fragment>
      { user.loggedIn && <Redirect to="/" /> }
      <LoginBar />
      <Grid centered style={{ marginTop: '20px' }} columns={2}>
        <Grid.Row centered>
          <Grid.Column computer={8} mobile={14} tablet={10}>
            <AuthWrapper>
              <Dimmer active={formLoading} inverted>
                <Loader inverted content="Processing..." />
              </Dimmer>
              <Header style={{ marginTop: '25px' }} textAlign="center" as="h3">
                Register to Story Factory
              </Header>
              <Form style={{ padding: '25px' }} onSubmit={handleSubmit(handleRegisterSubmit)}>
                <Field label="Username" name="username" component={FormField} type="text" />
                <Field label="Email Address" name="email" component={FormField} type="text" />
                <Field label="Password" name="password" component={FormField} type="password" />
                <Field
                  label="Confirm password"
                  name="passwordVerif"
                  component={FormField}
                  type="password"
                />
                <StoryButton style={{ marginTop: '20px' }} primary fluid type="submit">
                  Let me enter, quick !
                </StoryButton>
              </Form>
            </AuthWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};
Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withRouter(
  reduxForm({
    form: 'story-register',
  })(Register),
);
