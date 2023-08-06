import { ErrorInfo } from 'react';
import { log } from '../logger';

export function handleClientError(error, errorInfo: ErrorInfo) {
    log({ payload: { error, errorInfo } });
}
