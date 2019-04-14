import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { StoryButton } from '../../global';

const LoginBar = ({ t }) => (
  <React.Fragment>
    <Grid style={{ marginTop: '35px' }} container>
      <Grid.Row>
        <Grid.Column>
          <Link to="/">
            <StoryButton icon labelPosition="left" secondary>
              <Icon name="arrow left" />
              {t('global.goBackButton')}
            </StoryButton>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
);
LoginBar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginBar;
