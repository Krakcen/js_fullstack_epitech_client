import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';
import { withTranslation } from 'react-i18next';
import { HomepageHeading } from './landing';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  handleArrowDownClick = () => {
    scroller.scrollTo('section_one', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  render() {
    const { children, t } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a">{t('landing.menuStories')}</Menu.Item>
                <Menu.Item as="a">{t('landing.menuProfile')}</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    {t('landing.menuLogin')}
                  </Button>
                  <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    {t('landing.menuRegister')}
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading handleArrowDownClick={this.handleArrowDownClick} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default withTranslation()(DesktopContainer);
