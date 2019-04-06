import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Grid, Header, Container, Menu, Button, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Constants } from '../global';
import { StorySingle } from './components';
import './stories.css';

// import { useInterval } from '../../utils/react-hooks';

const Stories = () => {
  const [menuActive, setMenuActive] = useState('myStories');

  const handleMenuActive = (e, { name }) => {
    setMenuActive(name);
  };

  return (
    <div
      style={{
        paddingTop: '50px',
        backgroundColor: Constants.secondaryColor,
        minHeight: '100vh',
      }}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Link to="/">
                <Button icon labelPosition="left" inverted color="white">
                  <Icon name="arrow left" />
                  Retour accueil
                </Button>
              </Link>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" style={{ color: 'white', fontSize: '2.5rem' }} textAlign="center">
              Parcourir les histoires
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginTop: '35px', marginBottom: '35px' }}>
          <Grid.Column style={{ textAlign: 'center' }}>
            <Container>
              <Menu style={{ fontSize: '1.3rem' }} compact size="massive" secondary inverted>
                <Menu.Item
                  name="myStories"
                  active={menuActive === 'myStories'}
                  onClick={handleMenuActive}
                />
                <Menu.Item
                  name="searchStories"
                  active={menuActive === 'searchStories'}
                  onClick={handleMenuActive}
                />
              </Menu>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid style={{ overflowY: 'auto' }}>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <Grid.Column computer={8} tablet={12} mobile={15}>
            <StorySingle />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Stories);
