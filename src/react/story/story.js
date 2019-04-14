/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import { withRouter, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FadeIn from 'react-fade-in';
import {
  Constants,
  NavBar,
  StoryApp,
  useStateValue,
  Alert,
  LanguageFooter,
  historyReactRouter,
  matchReactRouter,
} from '../global';
import { StoryLoader } from '../stories/components';
import {
  SectionStoryFirst,
  SectionStoryLeft,
  SectionStoryRight,
  StoryTextArea,
  StoryButton,
  NoStory,
  UserBubbles,
  StoryFinishedSegment,
} from './components';
import './story.css';

const COLOR_ERROR = 'crimson';
const COLOR_SUCCESS = '#21ba45';

const Story = ({ match, history }) => {
  const [storyBlockInput, setStoryBlockInput] = useState('');
  const [storyInitialLoading, setStoryInitialLoading] = useState(true);
  const [storyWhole, setStoryWhole] = useState(null);
  const [storyLength, setStoryLength] = useState(0);
  const [storyAuthor, setStoryAuthor] = useState('...');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [t] = useTranslation();
  const [{ user }] = useStateValue();

  const fetchStory = async () => {
    try {
      const data = await StoryApp.service('story').find({ query: { _id: match.params.storyId } });

      if (!data || !data.data || data.data.length !== 1) throw new Error('no story found');

      const newStory = [];
      newStory.push({
        title: data.data[0].title,
        author: data.data[0].author,
        full_text: data.data[0].synopsis,
      });

      data.data[0].blocks.map((el) => {
        newStory.push({
          title: null,
          author: el.author,
          full_text: el.full_text,
        });
        return 0;
      });

      setStoryInitialLoading(false);
      setStoryAuthor(data.data[0].author);
      setStoryLength(data.data[0].nombreOfBlockDefault);
      setStoryWhole(newStory);
      // });
    } catch (error) {
      setStoryInitialLoading(false);
    }
  };

  const handleStoryBlockSubmit = async () => {
    try {
      // console.log('SUBMITTED: ', storyBlockInput);
      if (!storyBlockInput.length) {
        Alert({
          title: t('story.msgEmptyText'),
          timer: 4000,
          color: COLOR_ERROR,
        });
        return;
      }

      await StoryApp.service('methods').create({
        method: 'create_story_block',
        story_id: match.params.storyId,
        full_text: storyBlockInput,
      });

      Alert({
        title: t('story.msgThanks'),
        timer: 4000,
        color: COLOR_SUCCESS,
      });

      setStoryBlockInput('');
    } catch (error) {
      switch (error.message) {
        case 'short_text':
          Alert({
            title: t('story.msgShort'),
            timer: 4000,
            color: COLOR_ERROR,
          });
          break;
        case 'story_finished':
          Alert({
            title: t('story.msgEnded'),
            timer: 4000,
            color: COLOR_ERROR,
          });
          break;
        default:
          break;
      }
      // console.error(error.message);
    }
  };

  const checkBeforeAddUser = (userToAdd) => {
    // console.log('USER JOIN: ', userToAdd);
    setConnectedUsers((previousConnectedUser) => {
      let found = false;
      previousConnectedUser.map((userEl) => {
        if (userEl === userToAdd) found = true;
        return true;
      });
      return !found ? previousConnectedUser.concat(userToAdd) : previousConnectedUser;
    });
  };

  const checkBeforeRemoveUser = (userToRemove) => {
    // console.log('USER LEFT: ', userToRemove);
    setConnectedUsers(previousConnectedUser => previousConnectedUser.filter((userEl) => {
      if (userEl === userToRemove) return false;
      return true;
    }));
  };

  const updateWholeStory = (blockToAdd) => {
    setStoryWhole((oldStoryWhole) => {
      const newStory = [...oldStoryWhole];
      newStory.push({
        title: null,
        author: blockToAdd.author,
        full_text: blockToAdd.full_text,
      });
      return newStory;
    });
  };

  const getRoomInfo = async () => {
    try {
      const roomInfo = await StoryApp.service('methods').create({
        method: 'get_room_info',
        story_id: match.params.storyId,
        user_id: user._id,
      });
      // console.log('ROOM INFO: ', roomInfo);
      setConnectedUsers(roomInfo);
      // dispatch({
      //   type: 'SET_STORY',
      //   payload: { users: roomInfo },
      // });
    } catch (error) {
      // console.error(error);
    }
  };

  const joinRoom = async () => {
    try {
      await StoryApp.service('methods').create({
        method: 'join_story_room',
        story_id: match.params.storyId,
      });

      // console.log('JOIN ROOM: ', joinRoomResponse);

      await getRoomInfo();

      // if it doesnt exists, create one
    } catch (error) {
      switch (error.message) {
        case 'already_connected_client':
          Alert({
            title: t('story.msgAlreadyConnected'),
            timer: 8000,
            color: COLOR_ERROR,
          });
          history.push('/stories');
          break;
        default:
          break;
      }
      // console.error(error);
    }
  };

  const leaveRoom = async () => {
    try {
      await StoryApp.service('methods').create({
        method: 'leave_story_room',
        story_id: match.params.storyId,
      });

      // if it doesnt exists, create one
    } catch (error) {
      // console.error(error);
    }
  };

  // Only on mount
  useEffect(() => {
    fetchStory();
    joinRoom();

    StoryApp.service('methods').on('created', (data) => {
      if (!data || !data.action_type) throw new Error('invalid response');
      switch (data.action_type) {
        case 'user_join':
          checkBeforeAddUser(data.payload.username);
          break;
        case 'user_leave':
          checkBeforeRemoveUser(data.payload.username);
          break;
        case 'user_create_story_block':
          updateWholeStory(data.payload.block);
          break;
        default:
          break;
      }
    });

    window.onbeforeunload = () => {
      leaveRoom();
    };

    return () => {
      setConnectedUsers((oldConnectedUsers) => {
        if (oldConnectedUsers.length) leaveRoom();
        return [];
      });
      // leaveRoom();
      StoryApp.service('methods').off('created');
    };
  }, []);

  return (
    <div
      style={{
        paddingTop: '50px',
        minHeight: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        backgroundColor: Constants.secondaryColor,
        color: 'white',
      }}
      className="container-fluid blue-bg"
    >
      <NavBar createStory={false} backText={t('global.goBackButton')} backTo="/stories">
        <UserBubbles t={t} usernames={connectedUsers} you={user.username} />
      </NavBar>

      {/* Content */}
      {storyInitialLoading ? (
        <StoryLoader />
      ) : (
        <React.Fragment>
          {!user.loggedIn && <Redirect to="/login" />}
          {storyWhole ? (
            <React.Fragment>
              <div className="container">
                <Header style={{ color: 'white', marginBottom: '70px', fontSize: '3rem' }} as="h1">
                  <Header.Subheader style={{ color: 'white', fontSize: '1.3rem' }}>
                    {`${t('stories.by')} ${storyAuthor.username}`}
                  </Header.Subheader>
                  {`${storyWhole[0].title.toUpperCase()}`}
                </Header>
                {storyWhole.map((storyBlock, i) => (
                  <React.Fragment key={storyBlock.full_text + (storyBlock.title || 'title')}>
                    {/* {console.log(storyBlock)} */}
                    <FadeIn delay={0}>
                      {i === 0 && <SectionStoryFirst storyBlock={storyBlock} />}
                      {i !== 0 && i % 2 === 0 && (
                        <SectionStoryLeft
                          t={t}
                          index={i + 1}
                          end={storyWhole.length === i + 1}
                          storyBlock={storyBlock}
                        />
                      )}
                      {i !== 0 && i % 2 !== 0 && (
                        <SectionStoryRight
                          t={t}
                          index={i + 1}
                          end={storyWhole.length === i + 1}
                          storyBlock={storyBlock}
                        />
                      )}
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
              {storyLength >= storyWhole.length ? (
                <Form onSubmit={handleStoryBlockSubmit}>
                  <Grid style={{ paddingBottom: '60px' }} container>
                    <Grid.Row style={{ paddingBottom: '0px' }}>
                      <Grid.Column>
                        <FadeIn delay={0}>
                          <StoryTextArea
                            onChange={(e, d) => setStoryBlockInput(d.value)}
                            value={storyBlockInput}
                            rows={6}
                            placeholder={t('story.inputPlaceholder')}
                          />
                        </FadeIn>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '0px' }}>
                      <Grid.Column textAlign="center">
                        <StoryButton type="submit" color="orange" size="massive">
                          {t('story.sendButton')}
                        </StoryButton>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              ) : (
                <Grid container style={{ paddingBottom: '60px' }}>
                  <Grid.Row style={{ paddingBottom: '0px' }}>
                    <Grid.Column>
                      <FadeIn delay={0}>
                        <StoryFinishedSegment compact>
                          <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                            {t('story.storyFinished')}
                          </p>
                        </StoryFinishedSegment>
                      </FadeIn>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </React.Fragment>
          ) : (
            <NoStory />
          )}
        </React.Fragment>
      )}
      <LanguageFooter />
    </div>
  );
};
Story.propTypes = {
  history: historyReactRouter.isRequired,
  match: matchReactRouter.isRequired,
};

export default withRouter(Story);

// LEGACY
// StorySocket.emit('find', 'story', { _id: match.params.storyId }, (error, data) => {});
