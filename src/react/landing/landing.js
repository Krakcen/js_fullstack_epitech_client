import React from 'react';
import {
  Button,
  Container,
  Table,
  Menu,
  Grid,
  Header,
  Image,
  List,
  Icon,
  Label,
  Segment,
  Card,
} from 'semantic-ui-react';
import { Element } from 'react-scroll';
import faker from 'faker';

import DesktopContainer from './desktop-layout';
import MobileContainer from './mobile-layout';

const fakeData = [];

for (let i = 0; i < 4; i++) {
  fakeData.push({
    ownerName: faker.name.findName(),
    title: faker.lorem.words(7),
    synopsis: faker.lorem.words(20),
    progression: Math.round(Math.random() * 100),
  });
}

// console.log(faker.name.findName());

export const HomepageHeading = ({ mobile, handleArrowDownClick }) => (
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
      content="Let your imagination take over"
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

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

const Landing = () => (
  <ResponsiveContainer>
    <Element name="section_one" />
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row centered>
          <Grid.Column width={13}>
            <Header as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
              Be the creator of a unique story made together
            </Header>
            <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
              Everyone can contribute writing a part of the story, the only limit is the
              imagination.
            </p>
            <Header as="h3" style={{ fontSize: '2em', textAlign: 'center', marginTop: '70px' }}>
              Choose a subject, add rules and create your thread
            </Header>
            <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
              You are in charge of the story, so you decide what part stays and what part doesnt.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '5.5em 0em' }} vertical>
      <Grid container>
        <Grid.Row centered>
          <Grid.Column>
            <Header as="h3" style={{ fontSize: '3em', textAlign: 'center', marginBottom: '60px' }}>
              Stories in progress
            </Header>
            <Card.Group textAlign="center" itemsPerRow={3}>
              {fakeData.map((el, index) => (
                <Card>
                  <Card.Content>
                    <Image floated="right" size="mini" src="/images/avatar/large/steve.jpg" />
                    <Card.Header>{ el.title }</Card.Header>
                    <Card.Meta>{ el.ownerName }</Card.Meta>
                    <Card.Description>
                      { el.synopsis }
                      <strong>{el.progression}</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button color="blue">
                        Continue this story !
                      </Button>
                    </div>
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
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Legal</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default Landing;
