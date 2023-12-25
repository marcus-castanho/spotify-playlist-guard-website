import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { QueryKey } from '@/contexts/QueryContext';
import { useClientErrorHandler } from '@/errors/clientErrorHandlers';
import { usePagination } from '@/hooks/usePagination';
import { getUserPlaylists, Playlist } from '@/services/spotifyPlaylistGuardApi';
import { useCookies } from '@/contexts/CookiesContext';
import { useQuery } from '@tanstack/react-query';

export function usePlaylists(initialData: {
    pages: number;
    items: Playlist[];
}) {
    const { getCookie } = useCookies();
    const token = getCookie(TOKEN_COOKIE_KEY) || '';
    const { handleGuardApiResponse } = useClientErrorHandler();
    const playlistsQueryKey: QueryKey = 'playlists';
    const { page, changePage, getPagesIndexes } = usePagination();

    const playlistsQuery = useQuery({
        queryFn: () =>
            getUserPlaylists({
                page,
                authToken: token,
            })
                .then(handleGuardApiResponse)
                .catch(() => initialData),
        initialData: initialData,
        queryKey: [playlistsQueryKey, page],
    });

    const { indexesArr: pagesIndexes } = getPagesIndexes(
        playlistsQuery.data?.pages || 1,
        5,
    );

    return {
        playlists: playlistsQuery.data?.items || [],
        isFetching: playlistsQuery.isFetching,
        page,
        changePage,
        pagesIndexes,
        playlistsQuery,
    };
}
