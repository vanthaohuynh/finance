import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ErrorView = ({ error, errorInfo }) => (
  <div>
    <h2>Something went wrong.</h2>
    <details>
      {error && error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
  </div>
);

ErrorView.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string.isRequired,
  }).isRequired,
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      // Error path
      return <ErrorView {...{ error, errorInfo }} />;
    }
    // Normally, just render children
    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

// export function errorBoundary(WrappedComponent) {
//   return class extends ErrorBoundary {
//     render() {
//       const { error, errorInfo } = this.state;
//       if (errorInfo) {
//         // Error path
//         return <ErrorView {...{ error, errorInfo }} />;
//       }
//       //Normally, just render wrapped component
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// }
