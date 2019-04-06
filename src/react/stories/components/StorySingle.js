import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import styled from 'styled-components';

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
  &&&&& {
    color: white;
  }
`;

const StoryCardDescription = styled(Card.Description)`
  &&&&& {
    color: white;
  }
`;

const StorySingle = () => (
  <StoryCard fluid>
    <StoryCardContent>
      <StoryCardHeader>by: Steve Sanders</StoryCardHeader>
      <StoryCardDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis convallis nisi,
        interdum malesuada felis mattis nec. Donec mattis mi at massa elementum euismod. Suspendisse
        et volutpat quam. Morbi vitae leo ut metus mollis finibus. Nam maximus ante nibh, in egestas
        tortor varius id. Morbi cursus rutrum nulla eget dignissim. Integer in orci sit amet sapien
        dignissim tristique.
      </StoryCardDescription>
    </StoryCardContent>
    <StoryCardContent textAlign="center">
      <Button inverted size="large" color="white">Edit the story</Button>
    </StoryCardContent>
  </StoryCard>
);

export default StorySingle;
