import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import './story.css';

import { useInterval } from '../../utils/react-hooks';

const Story = ({ user }) => {
  const [count, setCount] = useState(42);

  // useInterval(() => {
  //   setCount(count + 42);
  // }, 1000);
  return (
    <div style={{ paddingTop: '50px' }} className="container-fluid blue-bg">
      <div className="container">
        <h2 className="pb-3 pt-2">The Hobbit: An Unexpected Journey</h2>

        <div className="row align-items-center how-it-works">
          <div className="col-2 text-center bottom">
            <div className="story-circle">1</div>
          </div>
          <div className="col-6">
            <h5>Chapter one</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor gravida
              aliquam. Morbi orci urna, iaculis in ligula et, posuere interdum lectus.
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

        <div className="row align-items-center justify-content-end how-it-works">
          <div className="col-6 text-right">
            <h5>Chapter two</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor gravida
              aliquam. Morbi orci urna, iaculis in ligula et, posuere interdum lectus. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed porttitor gravida aliquam. Morbi orci
              urna, iaculis in ligula et, posuere interdum lectus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed porttitor gravida aliquam. Morbi orci urna, iaculis
              in ligula et, posuere interdum lectus. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed porttitor gravida aliquam. Morbi orci urna, iaculis in ligula et,
              posuere interdum lectus.
            </p>
          </div>
          <div className="col-2 text-center full">
            <div className="story-circle">2</div>
          </div>
        </div>

        <div className="row timeline">
          <div className="col-2">
            <div className="corner right-bottom" />
          </div>
          <div className="col-8">
            <hr />
          </div>
          <div className="col-2">
            <div className="corner top-left" />
          </div>
        </div>

        <div className="row align-items-center how-it-works">
          <div className="col-2 text-center top">
            <div className="story-circle">3</div>
          </div>
          <div className="col-6">
            <h5>Now with Pug and Sass</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor gravida
              aliquam. Morbi orci urna, iaculis in ligula et, posuere interdum lectus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Story);
