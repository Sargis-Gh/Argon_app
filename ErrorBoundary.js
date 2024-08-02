import React, { Component } from 'react';

import Error from './src/pages/error/Error';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    resetError = () => {
        this.setState({ hasError: false });
    };

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <Error resetError={this.resetError} />;
        }
        const { children } = this.props;
        return children;
    }
}

export default ErrorBoundary;
