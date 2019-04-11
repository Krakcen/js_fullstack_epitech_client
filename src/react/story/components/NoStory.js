import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { StoryButton } from '../../global';

const NoStory = () => (
  <React.Fragment>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header
            style={{
              color: 'white',
              marginBottom: '70px',
              fontSize: '3rem',
              textAlign: 'center',
            }}
            as="h1"
          >
            {"Cette histoire n'existe pas"}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ textAlign: 'center' }}>
          <StoryButton size="big" primary>Créer ma propre histoire !</StoryButton>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);

export default NoStory;
