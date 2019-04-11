import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Form } from 'semantic-ui-react';
// import faker from 'faker';
import { withRouter } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { Constants, NavBar, StorySocket } from '../global';
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

  const fetchStory = async () => {
    try {
      StorySocket.emit('find', 'story', { _id: match.params.storyId }, (error, data) => {
        console.log(error);
        if (!data || !data.data || !data.data.length) {
          setStoryInitialLoading(false);
          return;
        }

        console.log(data.data[0]);

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
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Only on mount
  useEffect(() => {
    setTimeout(() => {
      fetchStory();
    }, 1000);
    // fetchStory();

    return () => {};
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
