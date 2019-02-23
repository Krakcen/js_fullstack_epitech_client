import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  List,
  Segment,
  Flag,
  Card,
  Progress,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Element } from 'react-scroll';
import faker from 'faker';
import { useTranslation, withTranslation } from 'react-i18next';

import { setLang as setLangAction } from '../../redux/actions';
import DesktopContainer from './desktop-layout';
import MobileContainer from './mobile-layout';

const fakeData = [];

const cookies = new Cookies();

for (let i = 0; i < 4; i += 1) {
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
        style={{ marginTop: '100px' }}
        size="huge"
        circular
        icon="arrow down"
      />
    </Container>
  );
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

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
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row centered>
              <Grid.Column width={13}>
                <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                  {t('landing.sectionOneHeaderOne')}
                </Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
                  {t('landing.sectionOneDescOne')}
                </p>
                <Header as="h3" style={{ fontSize: '2em', textAlign: 'center', marginTop: '70px' }}>
                  {t('landing.sectionOneHeaderTwo')}
                </Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
                  {t('landing.sectionOneDescTwo')}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '5.5em 0em' }} vertical>
          <Grid container>
            <Grid.Row centered>
              <Grid.Column>
                <Header
                  as="h3"
                  style={{ fontSize: '3em', textAlign: 'center', marginBottom: '60px' }}
                >
                  {t('landing.sectionTwoHeader')}
                </Header>
                <Card.Group textAlign="center" itemsPerRow={3}>
                  {fakeData.map((el, index) => (
                    <Card link onClick={this.goToStory} key={el.synopsis}>
                      <Card.Content>
                        <Card.Header>
                          <Grid>
                            <Grid.Column width={12}>
                              <p>{el.title}</p>
                            </Grid.Column>
                            <Grid.Column textAlign="right" width={4}>
                              <i className="fas fa-scroll" />
                            </Grid.Column>
                          </Grid>
                        </Card.Header>
                        <Card.Meta>{`Imaginé par ${el.ownerName}`}</Card.Meta>
                        <Card.Description>{el.synopsis}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button color="blue">{t('landing.sectionTwoButtonGoEdit')}</Button>
                        </div>
                      </Card.Content>
                      <Card.Content extra>
                        <Progress percent={el.progression} size="small" indicating>
                          {"Progression de l'histoire"}
                        </Progress>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content={t('landing.footerHeaderOne')} />
                  <List link inverted>
                    <List.Item as="a">{t('landing.legalLink')}</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Language" />
                  <List link inverted>
                    <List.Item onClick={this.handleLanguageChange} as="a">
                      <Flag name={storyFactoryLang} />
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

const mapStateToProps = state => ({
  storyFactoryLang: state.lang,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setLang: setLangAction },
  )(withTranslation()(Landing)),
);
