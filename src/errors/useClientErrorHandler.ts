import { SpotifyPlaylistGuardApiReturn } from '../@types';
import { useAuth } from '../contexts/AuthContext';

export function useClientErrorHandler() {
    const { signOut } = useAuth();

    const handleGuardApiResponse = <T>({
        success,
        status,
        data,
    }: SpotifyPlaylistGuardApiReturn<T>) => {
        if (status === 401) {
            signOut(true);
            throw new Error('Failed');
        }
        if (!success) throw new Error('Failed');

        return data;
    };

    return {
        handleGuardApiResponse,
    };
}
