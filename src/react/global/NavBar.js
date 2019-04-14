import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { StoryButton, useStateValue } from '.';

const NavBar = ({
  backTo, backText, createStory = true, children,
}) => {
  const [{ user }] = useStateValue();
  return (
    <Grid container>
      <Grid.Row columns="equal">
        <Grid.Column style={{ paddingBottom: '50px' }}>
          <Link to={backTo}>
            <Button style={{ borderRadius: '20px' }} icon labelPosition="left" inverted>
              <Icon name="arrow left" />
              {backText}
            </Button>
          </Link>
        </Grid.Column>
        {user.loggedIn && createStory && (
          <Grid.Column floated="right" style={{ paddingBottom: '50px', textAlign: 'right' }}>
            <Link to="/story-create">
              <StoryButton size="big" primary>
                Créer une histoire
              </StoryButton>
            </Link>
          </Grid.Column>
        )}
        {children && (
          <Grid.Column floated="right" style={{ paddingBottom: '50px', textAlign: 'right' }}>
            {children}
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};
NavBar.propTypes = {
  backTo: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
  createStory: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
NavBar.defaultProps = {
  children: false,
};

export default NavBar;
