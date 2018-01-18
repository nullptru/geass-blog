import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.PureComponent {
  componentDidCatch(error, errorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  // eslint-disable-next-line
  onError: (error, errorInfo) => { console.log('error', error, errorInfo); },
};

export default ErrorBoundary;
