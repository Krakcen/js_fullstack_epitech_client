import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { StoryButton } from '../../global';

const LoginBar = () => (
  <React.Fragment>
    <Grid style={{ marginTop: '35px' }} container>
      <Grid.Row>
        <Grid.Column>
          <Link to="/">
            <StoryButton icon labelPosition="left" secondary>
              <Icon name="arrow left" />
              Retour accueil
            </StoryButton>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);

export default LoginBar;
