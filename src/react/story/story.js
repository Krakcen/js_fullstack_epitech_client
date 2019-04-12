import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Form } from 'semantic-ui-react';
// import faker from 'faker';
import { withRouter, Redirect } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import {
  Constants, NavBar, StorySocket, StoryApp, useStateValue,
} from '../global';
import { StoryLoader } from '../stories/components';
import {
  SectionStoryFirst,
  SectionStoryLeft,
  SectionStoryRight,
  StoryTextArea,
  StoryButton,
  NoStory,
} from './components';
import './story.css';

// const fakeTitle = faker.company.bs();
// const fakeData = [];
// for (let i = 0; i < 10; i += 1) {
//   fakeData.push({
//     title: i === 0 ? null : faker.hacker.phrase(),
//     full_text: faker.lorem.words(Math.round(Math.random() * 100)),
//   });
// }

const Story = ({ match }) => {
  const [storyBlockInput, setStoryBlockInput] = useState('');
  const [storyInitialLoading, setStoryInitialLoading] = useState(true);
  const [storyWhole, setStoryWhole] = useState(null);
  const [{ user }] = useStateValue();

  const fetchStory = async () => {
    try {
      const data = await StoryApp.service('story').find({ query: { _id: match.params.storyId } });

      console.log(data);

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
          full_text: el.context,
        });
        return 0;
      });
      setStoryInitialLoading(false);
      setStoryWhole(newStory);
      // });
    } catch (error) {
      setStoryInitialLoading(false);
      console.error(error);
    }
  };

  const joinRoom = async () => {
    try {
      const joinRoomResponse = await StoryApp.service('methods').create({
        method: 'join_story_room',
        story_id: match.params.storyId,
      });

      console.log('JOIN ROOM: ', joinRoomResponse);

      // if it doesnt exists, create one
    } catch (error) {
      console.error(error);
    }
  };

  const leaveRoom = async () => {
    try {
      const leaveRoomResponse = await StoryApp.service('methods').create({
        method: 'leave_story_room',
        story_id: match.params.storyId,
      });

      console.log('LEFT ROOM: ', leaveRoomResponse);

      // if it doesnt exists, create one
    } catch (error) {
      console.error(error);
    }
  };

  // Only on mount
  useEffect(() => {
    fetchStory();
    joinRoom();

    StoryApp.service('methods').on('created', (data) => {
      console.log('RECEIVED AN EVENT');
      console.log(data);
    });

    window.onbeforeunload = () => {
      leaveRoom();
    };

    return () => {
      leaveRoom();
    };
  }, []);

  const handleStoryBlockSubmit = async () => {
    try {
      console.log('SUBMITTED: ', storyBlockInput);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        paddingTop: '50px',
        minHeight: '100vh',
        overflowY: 'auto',
        backgroundColor: Constants.secondaryColor,
        color: 'white',
      }}
      className="container-fluid blue-bg"
    >
      <NavBar createStory={false} backText="Retour" backTo="/stories" />

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
                  {`${storyWhole[0].title.toUpperCase()}`}
                </Header>
                {storyWhole.map((storyBlock, i) => (
                  <React.Fragment key={storyBlock.full_text + (storyBlock.title || 'title')}>
                    <FadeIn delay={0}>
                      {i === 0 && <SectionStoryFirst storyBlock={storyBlock} />}
                      {i !== 0 && i % 2 === 0 && (
                        <SectionStoryLeft
                          index={i + 1}
                          end={storyWhole.length === i + 1}
                          storyBlock={storyBlock}
                        />
                      )}
                      {i !== 0 && i % 2 !== 0 && (
                        <SectionStoryRight
                          index={i + 1}
                          end={storyWhole.length === i + 1}
                          storyBlock={storyBlock}
                        />
                      )}
                    </FadeIn>
                  </React.Fragment>
                ))}
              </div>
              <Form onSubmit={handleStoryBlockSubmit}>
                <Grid style={{ paddingBottom: '60px' }} container>
                  <Grid.Row style={{ paddingBottom: '0px' }}>
                    <Grid.Column>
                      <FadeIn delay={0}>
                        <StoryTextArea
                          onChange={(e, d) => setStoryBlockInput(d.value)}
                          value={storyBlockInput}
                          rows={6}
                          placeholder="Et ensuite..."
                        />
                      </FadeIn>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ paddingTop: '0px' }}>
                    <Grid.Column textAlign="center">
                      <StoryButton type="submit" color="orange" size="massive">
                        Envoyer
                      </StoryButton>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </React.Fragment>
          ) : (
            <NoStory />
          )}
        </React.Fragment>
      )}
    </div>
  );
};
Story.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      storyId: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default withRouter(Story);

// LEGACY
// StorySocket.emit('find', 'story', { _id: match.params.storyId }, (error, data) => {});
