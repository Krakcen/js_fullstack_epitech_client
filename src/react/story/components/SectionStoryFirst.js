import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SectionStoryFirst = ({ storyBlock }) => (
  <React.Fragment>
    <div className="row align-items-center how-it-works">
      <div className="col-2 text-center bottom">
        <div className="story-circle">S</div>
      </div>
      <div style={{ paddingBottom: '20px' }} className="col-6">
        <Header as="h1" style={{ color: 'white' }}>
          Synopsis
        </Header>
        <p style={{ fontSize: '1.3rem' }}>
          { storyBlock.full_text }
        </p>
      </div>
    </div>
    <div className="row timeline">
      <div className="col-2">
        <div className="corner top-right" />
      </div>
      <div className="col-8">
        <hr />
      </div>
      <div className="col-2">
        <div className="corner left-bottom" />
      </div>
    </div>
  </React.Fragment>
);
SectionStoryFirst.propTypes = {
  storyBlock: PropTypes.shape({
    full_text: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
};

export default SectionStoryFirst;
