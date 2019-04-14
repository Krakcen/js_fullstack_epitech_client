import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Container, Grid, Header, List, Segment, Flag,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Element } from 'react-scroll';
import faker from 'faker';
import { useTranslation, withTranslation } from 'react-i18next';

import { setLang as setLangAction } from '../../redux/actions';
import { Constants, StoryButton, historyReactRouter } from '../global';
import DesktopContainer from './desktop-layout';
import MobileContainer from './mobile-layout';

const fakeData = [];

const cookies = new Cookies();

for (let i = 0; i < 3; i += 1) {
  fakeData.push({
    ownerName: faker.name.findName(),
    title: faker.lorem.words(7),
    synopsis: faker.lorem.words(20),
    progression: Math.round(Math.random() * 100),
  });
}

// console.log(faker.name.findName());

export const HomepageHeading = ({ mobile, handleArrowDownClick }) => {
  const [t] = useTranslation();

  return (
    <Container text>
      <Header
        as="h1"
        content="Story Factory"
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as="h2"
        content={t('landing.baseline')}
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button
        onClick={handleArrowDownClick}
        style={{
          marginTop: '100px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '2px solid white',
        }}
        size="huge"
        circular
        icon="arrow down"
      />
    </Container>
  );
};
HomepageHeading.defaultProps = {
  mobile: false,
};
HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
  handleArrowDownClick: PropTypes.func.isRequired,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);
ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Landing extends Component {
  componentDidMount = () => {};

  handleLanguageChange = () => {
    const { storyFactoryLang, setLang } = this.props;

    if (storyFactoryLang === 'fr') {
      setLang('us');
      cookies.set('storyFactoryLang', 'us');
      i18n.changeLanguage('en');
    } else {
      setLang('fr');
      cookies.set('storyFactoryLang', 'fr');
      i18n.changeLanguage('fr');
    }
  };

  goToStory = () => {
    const { history } = this.props;

    history.push('/awesome-story');
  };

  render = () => {
    const { t, storyFactoryLang } = this.props;

    return (
      <ResponsiveContainer>
        <Element name="section_one" />
        <Segment
          style={{
            padding: '8em 0em',
            backgroundColor: 'white',
            borderTop: '1px solid rgba(34,36,38,.15)',
          }}
          vertical
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row centered>
              <Grid.Column width={13}>
                <Header as="h3" style={{ fontSize: '2em', textAlign: 'center', color: Constants.secondaryColor }}>
                  {t('landing.sectionOneHeaderOne')}
                </Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center', color: 'black' }}>
                  {t('landing.sectionOneDescOne')}
                </p>
                <Header
                  as="h3"
                  style={{
                    fontSize: '2em',
                    textAlign: 'center',
                    marginTop: '70px',
                    color: Constants.secondaryColor,
                  }}
                >
                  {t('landing.sectionOneHeaderTwo')}
                </Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center', color: 'black' }}>
                  {t('landing.sectionOneDescTwo')}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment
          style={{ padding: '5.5em 0em', backgroundColor: Constants.secondaryColor, border: 'none' }}
          vertical
        >
          <Grid container>
            <Grid.Row centered>
              <Grid.Column style={{ textAlign: 'center' }}>
                <Link to="/stories">
                  <StoryButton size="huge" primary>
                    {t('landing.startButton')}
                  </StoryButton>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em', backgroundColor: Constants.secondaryColor }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                {/* <Grid.Column width={3}>
                  <Header inverted as="h4" content={t('landing.footerHeaderOne')} />
                  <List link inverted>
                    <List.Item as="a">{t('landing.legalLink')}</List.Item>
                  </List>
                </Grid.Column> */}
                <Grid.Column width={3}>
                  <Header inverted as="h3" content="Language" />
                  <List link inverted>
                    <List.Item onClick={this.handleLanguageChange} as="a">
                      <Flag name={(storyFactoryLang === 'en' || storyFactoryLang === 'us') ? 'us' : 'fr'} />
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  };
}
Landing.propTypes = {
  t: PropTypes.func.isRequired,
  storyFactoryLang: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
  history: historyReactRouter.isRequired,
};

const mapStateToProps = state => ({
  storyFactoryLang: state.lang,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setLang: setLangAction },
  )(withTranslation()(Landing)),
);
