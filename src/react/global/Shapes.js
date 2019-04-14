import PropTypes from 'prop-types';

export const historyReactRouter = PropTypes.shape({
  action: PropTypes.string,
  block: PropTypes.func,
  createHref: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  // location: PropTypes.func,
  push: PropTypes.func,
  replace: PropTypes.func,
});

export const locationReactRouter = PropTypes.shape({
  hash: PropTypes.string,
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
});

export const matchReactRouter = PropTypes.shape({
  isExact: PropTypes.bool,
  params: PropTypes.shape({
    storyId: PropTypes.string,
  }),
  path: PropTypes.string,
  url: PropTypes.string,
});
