/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Grid, Header, Container, Menu, Button, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import {
  Constants, StorySocket, useStateValue, NavBar,
} from '../global';
import { StorySingle, StoryLoader } from './components';
import './stories.css';

const Stories = () => {
  const [menuActive, setMenuActive] = useState('myStories');
  const [myStories, setMyStories] = useState([]);
  const [myStoriesLoading, setMyStoriesLoading] = useState(false);
  const [searchStories, setSearchStories] = useState([]);
  const [searchStoriesLoading, setSearchStoriesLoading] = useState(false);
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearchStories = async () => {
    try {
      setSearchStories([]);
      setSearchStoriesLoading(true);

      StorySocket.emit('find', 'story', {}, (error, data) => {
        if (!data || !data.data || !data.data.length) {
          console.log('nope');
          setSearchStories([]);
          setSearchStoriesLoading(false);
          return;
        }
        setSearchStories(data.data);
        setSearchStoriesLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
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
                            <StorySingle story={story} />
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
            <FadeIn delay={0}>
              <Grid style={{ overflowY: 'auto', paddingBottom: '50px', minHeight: '300px' }}>
                {searchStoriesLoading ? (
                  <StoryLoader />
                ) : (
                  <React.Fragment>
                    {searchStories.length ? (
                      searchStories.map(story => (
                        <Grid.Row key={story.title + story.synopsis} centered columns={1}>
                          <Grid.Column computer={8} tablet={12} mobile={15}>
                            <StorySingle story={story} />
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
                )}
              </Grid>
            </FadeIn>
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
