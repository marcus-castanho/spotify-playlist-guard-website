import React, { ErrorInfo, ReactNode } from 'react';

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
        console.log({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export default ErrorBoundary;
