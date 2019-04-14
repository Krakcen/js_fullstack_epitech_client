/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid, Header, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FadeIn from 'react-fade-in';

import {
  Constants,
  StorySocket,
  useStateValue,
  NavBar,
  StoryButton,
  Alert,
  LanguageFooter,
  historyReactRouter,
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
  const [t] = useTranslation();
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
        Alert({
          title: t('storyCreate.empty'),
          timer: 4000,
          color: COLOR_ERROR,
        });
        setStorySubmitLoading(false);
        return;
      }

      StorySocket.emit(
        'create',
        'story',
        {
          author: user._id,
          title: e.title,
          synopsis: e.synopsis,
          nombreOfBlockDefault: e.nombreOfBlockDefault,
        },
        (error, story) => {
          if (error) {
            // console.log(error);
            throw new Error(error);
          }
          Alert({
            title: t('storyCreate.created'),
            timer: 4000,
            color: COLOR_SUCCESS,
          });
          setStorySubmitLoading(false);
          history.push(`/awesome-story/${story._id}`);
        },
      );
    } catch (error) {
      // console.error(error);
      Alert({
        title: /* error.message */ t('global.errorOccured'),
        timer: 4000,
        color: COLOR_ERROR,
      });
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
      <NavBar backTo="/stories" backText={t('global.goBackButton')} createStory={false} />
      <FadeIn delay={0}>
        {storySubmitLoading ? (
          <LoadingScreen />
        ) : (
          <Grid style={{ paddingBottom: '50px' }} centered>
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
                  {t('storyCreate.header')}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column computer={8} mobile={14} tablet={10}>
                <Form onSubmit={handleSubmit(handleLoginSubmit)}>
                  <Form.Group widths="equal">
                    <Field
                      style={{ paddingRight: '30px' }}
                      label={t('storyCreate.title')}
                      name="title"
                      component={FormFieldInput}
                      type="text"
                    />
                    <Field
                      label={t('storyCreate.editionNb')}
                      name="nombreOfBlockDefault"
                      component={FormFieldInput}
                      type="number"
                    />
                  </Form.Group>
                  <Field
                    label={t('storyCreate.synopsis')}
                    name="synopsis"
                    component={FormFieldTextArea}
                    type="text"
                  />
                  <div style={{ textAlign: 'center' }}>
                    <StoryButton size="big" style={{ marginTop: '20px' }} primary type="submit">
                      {t('storyCreate.buttonSubmit')}
                    </StoryButton>
                  </div>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </FadeIn>
      <LanguageFooter />
    </div>
  );
};
StoryCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: historyReactRouter.isRequired,
};

export default withRouter(
  reduxForm({
    form: 'story-create',
  })(StoryCreate),
);
