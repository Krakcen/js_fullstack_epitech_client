/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid, Header, Container, Menu, Button, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import {
  Constants, StorySocket, useStateValue, NavBar, StoryApp, Alert,
} from '../global';
import { StorySingle, StoryLoader, StorySearch } from './components';
import './stories.css';

const COLOR_ERROR = 'crimson';
const COLOR_SUCCESS = '#21ba45';

const Stories = () => {
  const [menuActive, setMenuActive] = useState('searchStories');
  const [myStories, setMyStories] = useState([]);
  const [myStoriesLoading, setMyStoriesLoading] = useState(false);
  const [searchStories, setSearchStories] = useState([]);
  const [searchStoriesLoading, setSearchStoriesLoading] = useState(false);
  const [timeoutSearch, setTimeoutSearch] = useState(null);
  const [{ user }] = useStateValue();

  const fetchMyStories = async () => {
    try {
      setMyStories([]);
      setMyStoriesLoading(true);
      // console.log('Fetching user stories with user id: ', user._id);

      StorySocket.emit('find', 'story', { author: user._id }, (error, data) => {
        if (!data || !data.data || !data.data.length) {
          setMyStories([]);
          setMyStoriesLoading(false);
          return;
        }
        setMyStories(data.data);
        setMyStoriesLoading(false);
        console.log(data.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchStories = async (query = '') => {
    try {
      setSearchStoriesLoading(true);

      StorySocket.emit(
        'find',
        'story',
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { synopsis: { $regex: query, $options: 'i' } },
          ],
          $limit: 5,
        },
        (error, data) => {
          if (!data || !data.data || !data.data.length) {
            console.log('nope');
            setSearchStories([]);
            setSearchStoriesLoading(false);
            return;
          }
          setSearchStories(
            data.data.map(storyEl => ({ ...storyEl, key: Math.random().toString() })),
          );
          setSearchStoriesLoading(false);
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStory = async (story) => {
    try {
      const response = await StoryApp.service('story').remove(story._id);

      const newStories = myStories.filter(storyItem => storyItem._id !== response._id);

      setMyStories(newStories);

      Alert({
        title: `${response.title} supprimée`,
        timer: 4000,
        color: COLOR_SUCCESS,
      });
    } catch (error) {
      console.error(error);
      Alert({
        title: error.message,
        timer: 4000,
        color: COLOR_ERROR,
      });
    }
  };

  const handleSearchChange = async (e, d) => {
    let query = d.value;
    if (!query || !query.length) query = '';

    setSearchStoriesLoading(true);

    setTimeoutSearch((oldTimeoutSearch) => {
      if (oldTimeoutSearch) clearTimeout(oldTimeoutSearch);
      return setTimeout(() => {
        fetchSearchStories(query);
      }, 500);
    });
  };

  useEffect(() => {
    if (menuActive === 'myStories' && user._id) {
      fetchMyStories();
    } else if (menuActive === 'searchStories' && user._id) {
      fetchSearchStories();
    }
    return () => {};
  }, [menuActive, user]);

  const handleMenuActive = (e, { name }) => {
    setMenuActive(name);
  };

  console.log(searchStories);

  return (
    <div
      style={{
        paddingTop: '50px',
        backgroundColor: Constants.secondaryColor,
        minHeight: '100vh',
      }}
    >
      <NavBar createStory backTo="/" backText="Retour" />
      {user.loggedIn ? (
        <React.Fragment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" style={{ color: 'white', fontSize: '3rem' }} textAlign="center">
                  Parcourir les histoires
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ marginTop: '35px', marginBottom: '35px' }}>
              <Grid.Column style={{ textAlign: 'center' }}>
                <Container>
                  <Menu style={{ fontSize: '1.3rem' }} compact size="massive" secondary inverted>
                    <Menu.Item
                      name="myStories"
                      active={menuActive === 'myStories'}
                      onClick={handleMenuActive}
                    />
                    <Menu.Item
                      name="searchStories"
                      active={menuActive === 'searchStories'}
                      onClick={handleMenuActive}
                    />
                  </Menu>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {menuActive === 'myStories' && (
            <FadeIn delay={0}>
              <Grid style={{ overflowY: 'auto', paddingBottom: '50px', minHeight: '300px' }}>
                {myStoriesLoading ? (
                  <StoryLoader />
                ) : (
                  <React.Fragment>
                    {myStories.length ? (
                      myStories.map(story => (
                        <Grid.Row key={story.title + story.synopsis} centered columns={1}>
                          <Grid.Column computer={8} tablet={12} mobile={15}>
                            <StorySingle myStories story={story} deleteStory={deleteStory} />
                          </Grid.Column>
                        </Grid.Row>
                      ))
                    ) : (
                      <Grid.Row>
                        <Grid.Column>
                          <Container>
                            <Header style={{ color: 'white' }} textAlign="center">
                              {"Vous n'avez pas encore créé d'histoire"}
                            </Header>
                          </Container>
                        </Grid.Column>
                      </Grid.Row>
                    )}
                  </React.Fragment>
                )}
              </Grid>
            </FadeIn>
          )}
          {menuActive === 'searchStories' && (
            <Grid style={{ overflowY: 'auto', paddingBottom: '50px', minHeight: '300px' }}>
              <Grid.Row style={{ marginBottom: '30px' }} centered columns={1}>
                <Grid.Column computer={6} tablet={12} mobile={15}>
                  <StorySearch
                    onChange={handleSearchChange}
                    size="big"
                    fluid
                    placeholder="Rechercher par nom ou synopsis"
                  />
                </Grid.Column>
              </Grid.Row>
              <React.Fragment>
                {searchStoriesLoading && <StoryLoader />}
                {searchStories.length ? (
                  searchStories.map((story, index) => (
                    <Grid.Row
                      key={story.key}
                      style={{ visibility: searchStoriesLoading ? 'hidden' : 'visible' }}
                      centered
                      columns={1}
                    >
                      <Grid.Column computer={8} tablet={12} mobile={15}>
                        <FadeIn delay={index * 50}>
                          <StorySingle myStories={false} story={story} deleteStory={deleteStory} />
                        </FadeIn>
                      </Grid.Column>
                    </Grid.Row>
                  ))
                ) : (
                  <Grid.Row>
                    <Grid.Column>
                      <Container>
                        <Header style={{ color: 'white' }} textAlign="center">
                          {"Pas encore d'histoire écrite"}
                        </Header>
                      </Container>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </React.Fragment>
            </Grid>
          )}
        </React.Fragment>
      ) : (
        <FadeIn delay={0}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" style={{ color: 'white', fontSize: '3rem' }} textAlign="center">
                  {'Vous devez vous connecter pour accéder aux histoires'}
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column style={{ textAlign: 'center' }}>
                <Link to="/login">
                  <Button
                    size="massive"
                    style={{ borderRadius: '25px', marginRight: '15px' }}
                    inverted
                  >
                    Me connecter
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="massive" style={{ borderRadius: '25px' }} inverted>
                    {"M'inscrire"}
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </FadeIn>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Stories);
