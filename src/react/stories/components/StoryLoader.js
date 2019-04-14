import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';

const StoryLoader = () => (
  <Grid.Row
    style={{
      height: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    centered
  >
    <Loader active inline inverted size="large" />
  </Grid.Row>
);

export default StoryLoader;
