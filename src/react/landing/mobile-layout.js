import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Icon, Menu, Responsive, Segment, Sidebar,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

import { withTranslation } from 'react-i18next';
import { HomepageHeading } from './landing';
import { AuthButtons } from './components';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  handleArrowDownClick = () => {
    scroller.scrollTo('section_one', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  render() {
    const { children, t } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Link to="/stories">
            <Menu.Item>{t('landing.menuStories')}</Menu.Item>
          </Link>
          {/* <Link to="/profile">
            <Menu.Item>{t('landing.menuProfile')}</Menu.Item>
          </Link> */}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <AuthButtons fixed={false} t={t} />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile handleArrowDownClick={this.handleArrowDownClick} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}
MobileContainer.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(MobileContainer);
