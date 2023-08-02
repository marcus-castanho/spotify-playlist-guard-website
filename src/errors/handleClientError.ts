import { ErrorInfo } from 'react';

export function handleClientError(error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
}
