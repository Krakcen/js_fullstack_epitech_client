/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, Progress, Icon,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { Constants, StoryButton } from '../../global';
import '../stories.css';

const StoryCard = styled(Card)`
  &&& {
    background-color: transparent;
    border-radius: 20px;
    box-shadow: none;
    border: 3px solid white;
    padding: 12px;
  }
`;

const StoryCardContent = styled(Card.Content)`
  &&&&& {
    border-top: none;
  }
`;

const StoryCardHeader = styled(Card.Header)`
  &&&&&&&& {
    color: white;
    font-size: 1.6rem;
    padding-bottom: 15px;
  }
`;

const StoryCardAuthor = styled(Card.Header)`
  &&&&&&&& {
    color: white;
    font-size: 1rem;
  }
`;

const StoryCardDescription = styled(Card.Description)`
  &&&&& {
    color: white;
    font-size: 1.25rem;
  }
`;

const StoryDeleteIcon = styled(Icon)`
  &&& {
    float: right;
    cursor: pointer;
    transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease,
      background 0.1s ease;
    -webkit-transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
      box-shadow 0.1s ease, background 0.1s ease;
  }
  &&&:hover {
    color: ${Constants.primaryColor};
  }
`;

const DeleteStory = ({
  deleteStory, title, cancelDelete, t,
}) => (
  <StoryCardContent>
    <StoryCardHeader>{t('stories.deleteHeader')}</StoryCardHeader>
    <StoryCardDescription>{`${title} ${t('stories.deleteContent')}`}</StoryCardDescription>
    <StoryCardContent style={{ paddingTop: '40px' }} textAlign="center">
      <Button
        style={{ borderRadius: '20px', marginRight: '10px' }}
        positive
        size="large"
        onClick={cancelDelete}
      >
        {t('stories.deleteButtonCancel')}
      </Button>
      <Button style={{ borderRadius: '20px' }} negative size="large" onClick={deleteStory}>
        {t('stories.deleteButtonConfirm')}
      </Button>
    </StoryCardContent>
  </StoryCardContent>
);
DeleteStory.propTypes = {
  deleteStory: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const StorySingle = ({ story, deleteStory, myStories }) => {
  const [deleteState, setDeleteState] = useState('inactive');
  const [t] = useTranslation();

  // console.log(story);

  const animatedProps = useSpring({
    from: { background: Constants.secondaryColor },
    to: {
      background: deleteState === 'confirm' ? Constants.primaryColor : Constants.secondaryColor,
    },
  });

  // console.log(transform);
  return (
    <animated.div style={{ ...animatedProps, borderRadius: '20px' }}>
      <StoryCard fluid>
        {deleteState === 'confirm' ? (
          <DeleteStory
            t={t}
            title={story.title}
            deleteStory={() => deleteStory(story)}
            cancelDelete={() => setDeleteState('inactive')}
          />
        ) : (
          <React.Fragment>
            <StoryCardContent>
              <StoryCardHeader>
                {myStories ? null : (
                  <StoryCardAuthor>{`${t('stories.by')} ${story.author.username}`}</StoryCardAuthor>
                )}
                {story.title}
                {myStories && (
                  <StoryDeleteIcon onClick={() => setDeleteState('confirm')} name="times" />
                )}
              </StoryCardHeader>
              <StoryCardDescription>{story.synopsis}</StoryCardDescription>
            </StoryCardContent>
            <StoryCardContent>
              <Progress
                percent={(story.blocks.length / story.nombreOfBlockDefault) * 100}
                style={{
                  height: '1.5rem',
                  borderRadius: '20px',
                  marginBottom: '5px',
                  marginTop: '5px',
                }}
                size="large"
                inverted
              />
              <p
                style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  paddingBottom: '5px',
                }}
              >
                Progression:
                {' '}
                {`${Math.round((story.blocks.length / story.nombreOfBlockDefault) * 100)}%`}
              </p>
            </StoryCardContent>
            <StoryCardContent textAlign="center">
              <Link to={`/awesome-story/${story._id}`}>
                <StoryButton primary size="large">
                  {t('stories.editStoryButton')}
                </StoryButton>
              </Link>
            </StoryCardContent>
          </React.Fragment>
        )}
      </StoryCard>
    </animated.div>
  );
};
StorySingle.propTypes = {
  story: PropTypes.shape({
    author: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
    nombreOfBlock: PropTypes.number.isRequired,
    nombreOfBlockDefault: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  deleteStory: PropTypes.func.isRequired,
  myStories: PropTypes.bool.isRequired,
};

export default StorySingle;
