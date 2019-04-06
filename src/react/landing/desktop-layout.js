import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Menu, Responsive, Segment, Visibility,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { withTranslation } from 'react-i18next';
import { HomepageHeading } from './landing';
import { AuthButtons } from './components';
import { Constants } from '../global';

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
            style={{
              minHeight: 700,
              padding: '1em 0em',
              backgroundColor: Constants.secondaryColor,
            }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="massive"
              style={{ border: 'none' }}
            >
              <Container>
                <Link to="/stories">
                  <Menu.Item>{t('landing.menuStories')}</Menu.Item>
                </Link>
                {/* <Link to="/profile">
                  <Menu.Item>{t('landing.menuProfile')}</Menu.Item>
                </Link> */}
                <Menu.Item position="right">
                  <AuthButtons fixed={fixed || false} t={t} />
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
DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(DesktopContainer);
