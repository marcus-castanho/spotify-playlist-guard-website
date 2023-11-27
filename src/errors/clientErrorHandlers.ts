import { ErrorInfo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { log } from '@/logger';
import { ReturnValue } from '@/services/spotifyPlaylistGuardApi';

export function handleClientError(error, errorInfo: ErrorInfo) {
    log({ message: 'Uncaught error', payload: { error, errorInfo } });
}

export function useClientErrorHandler() {
    const { signOut } = useAuth();

    const handleGuardApiResponse = <T>({
        success,
        status,
        data,
    }: ReturnValue<T>) => {
        if (status === 401) signOut(true);
        if (!success) throw new Error('Failed');

        return data;
    };

    return {
        handleGuardApiResponse,
    };
}
