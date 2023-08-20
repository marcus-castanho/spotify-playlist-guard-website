import { useAuth } from '../contexts/AuthContext';
import { SpotifyPlaylistGuardApiReturn } from '../services/spotifyPlaylistGuardApi';

export function useClientErrorHandler() {
    const { signOut } = useAuth();

    const handleGuardApiResponse = <T>({
        success,
        status,
        data,
    }: SpotifyPlaylistGuardApiReturn<T>) => {
        if (status === 401) signOut(true);
        if (!success) throw new Error('Failed');

        return data;
    };

    return {
        handleGuardApiResponse,
    };
}
