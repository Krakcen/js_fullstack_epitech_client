import React from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';

const UserSegment = styled(Segment)`
  &&&&& {
    border-radius: 25px;
    background-color: transparent;
    box-shadow: none;
    border: 2px solid white;
    margin-right: 0px;
    padding: 0.6em 1em;
  }
`;

const HeaderBubbles = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`;

const UserBubbles = ({ usernames, you }) => (
  <React.Fragment>
    {!usernames || !usernames.length ? null : (
      <React.Fragment>
        <span>
          <HeaderBubbles>Auteurs actifs</HeaderBubbles>
          {usernames.map(username => (
            <FadeIn key={username} delay={0}>
              <UserSegment floated="right" compact>
                {username === you ? `${username} (vous)` : username}
              </UserSegment>
            </FadeIn>
          ))}
        </span>
      </React.Fragment>
    )}
  </React.Fragment>
);
UserBubbles.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
  you: PropTypes.string.isRequired,
};

export default UserBubbles;
