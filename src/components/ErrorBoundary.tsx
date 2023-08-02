import React, { ErrorInfo, ReactNode } from 'react';
import { handleClientError } from '../errors/handleClientError';

export type ErrorBoundaryProps = {
    fallback: ReactNode;
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: { hasError: boolean };

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo: ErrorInfo) {
        handleClientError(error, errorInfo);
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export default ErrorBoundary;
