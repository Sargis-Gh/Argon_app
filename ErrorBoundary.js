import React, { Component } from 'react';

import Error from './src/pages/error/Error';
import { errorBoundary } from './src/utils/errorHandlers';

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

    static getDerivedStateFromError(error) {
        errorBoundary(error);
        return { error: true };
    }

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
