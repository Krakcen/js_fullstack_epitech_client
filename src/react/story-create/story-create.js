/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Header, Container, Menu, Button, Icon, Form,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FadeIn from 'react-fade-in';

import {
  Constants, StorySocket, useStateValue, NavBar, StoryButton, Alert,
} from '../global';
import { FormFieldInput, FormFieldTextArea } from './components';

const COLOR_ERROR = 'crimson';
const COLOR_SUCCESS = '#21ba45';

const LoadingScreen = () => (
  <FadeIn delay={0}>
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header
            style={{
              color: 'white',
              marginBottom: '70px',
              fontSize: '3rem',
              textAlign: 'center',
            }}
            as="h1"
          >
            {'Création de votre histoire...'}
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </FadeIn>
);

const StoryCreate = ({ handleSubmit, history }) => {
  const [storySubmitLoading, setStorySubmitLoading] = useState(false);
  const [{ user }] = useStateValue();

  const handleLoginSubmit = async (e) => {
    try {
      setStorySubmitLoading(true);
      if (
        !e.title
        || !e.title.length
        || !e.synopsis
        || !e.synopsis.length
        || !e.nombreOfBlockDefault
        || !e.nombreOfBlockDefault.length
      ) {
        Alert({ title: 'Vérifiez que tous les champs soit remplis !', timer: 4000, color: COLOR_ERROR });
        setStorySubmitLoading(false);
        return;
      }

      StorySocket.emit('create', 'story', {
        author: user._id,
        title: e.title,
        synopsis: e.synopsis,
        nombreOfBlockDefault: e.nombreOfBlockDefault,
      }, (error, story) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        }
        console.log('Story Created', story);
        Alert({
          title: 'Votre story est crée !',
          timer: 4000,
          color: COLOR_SUCCESS,
        });
        setStorySubmitLoading(false);
        history.push(`/awesome-story/${story._id}`);
      });
    } catch (error) {
      console.error(error);
      Alert({ title: error.message, timer: 4000, color: COLOR_ERROR });
      setStorySubmitLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: '50px',
        paddingBottom: '50px',
        backgroundColor: Constants.secondaryColor,
        minHeight: '100vh',
      }}
    >
      <NavBar backTo="/stories" backText="Retour" createStory={false} />
      <FadeIn delay={0}>
        {storySubmitLoading ? (
          <LoadingScreen />
        ) : (
          <Grid centered>
            <Grid.Row>
              <Grid.Column>
                <Header
                  style={{
                    color: 'white',
                    marginBottom: '70px',
                    fontSize: '3rem',
                    textAlign: 'center',
                  }}
                  as="h1"
                >
                  {'Créer une histoire'}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column computer={8} mobile={14} tablet={10}>
                <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                  <Form.Group widths="equal">
                    <Field
                      style={{ paddingRight: '30px' }}
                      label="Titre"
                      name="title"
                      component={FormFieldInput}
                      type="text"
                    />
                    <Field
                      label="Nombre d'éditions"
                      name="nombreOfBlockDefault"
                      component={FormFieldInput}
                      type="number"
                    />
                  </Form.Group>
                  <Field
                    label="Synopsis"
                    name="synopsis"
                    component={FormFieldTextArea}
                    type="text"
                  />
                  <div style={{ textAlign: 'center' }}>
                    <StoryButton size="big" style={{ marginTop: '20px' }} primary type="submit">
                      Créer mon histoire !
                    </StoryButton>
                  </div>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </FadeIn>
    </div>
  );
};
StoryCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default withRouter(reduxForm({
  form: 'story-create',
})(StoryCreate));
