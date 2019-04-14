import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import FadeIn from 'react-fade-in';

const AuthWrapper = ({ children }) => (
  <React.Fragment>
    <FadeIn delay={0}>
      <Segment style={{ borderRadius: '1.68571429rem' }}>{children}</Segment>
    </FadeIn>
  </React.Fragment>
);
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
