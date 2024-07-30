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
        if (this.state.hasError) {
            return <Error resetError={this.resetError} />;
        }
        const { children } = this.props;
        return children;
    }
}

export default ErrorBoundary;
