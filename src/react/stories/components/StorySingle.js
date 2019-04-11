/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, Progress,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StoryCardDescription = styled(Card.Description)`
  &&&&& {
    color: white;
    font-size: 1.25rem;
  }
`;

const StorySingle = ({ story }) => (
  <StoryCard fluid>
    <StoryCardContent>
      <StoryCardHeader>{story.title}</StoryCardHeader>
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
        {`${(story.blocks.length / story.nombreOfBlockDefault) * 100}%`}
      </p>
    </StoryCardContent>
    <StoryCardContent textAlign="center">
      <Link to={`/awesome-story/${story._id}`}>
        <Button color="orange" style={{ borderRadius: '20px' }} size="large">
          Edit the story
        </Button>
      </Link>
    </StoryCardContent>
  </StoryCard>
);
StorySingle.propTypes = {
  story: PropTypes.shape({
    author: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
    nombreOfBlock: PropTypes.number.isRequired,
    nombreOfBlockDefault: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default StorySingle;
