import React, { FC } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    Playlist,
    patchActivateDeactivatePlaylist,
    getUserPlaylists,
} from '@/services/spotifyPlaylistGuardApi';
import Link from 'next/link';
import { useClientErrorHandler } from '@/errors/clientErrorHandlers';
import { QueryKey } from '@/contexts/QueryContext';
import { useCookies } from '@/contexts/CookiesContext';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

type PlaylistsLegacyListProps = {
    playlists: Playlist[];
};

export const PlaylistsListLegacy: FC<PlaylistsLegacyListProps> = ({
    playlists,
}) => {
    const { getCookie } = useCookies();
    const { handleGuardApiResponse } = useClientErrorHandler();
    const playlistQueryKey: QueryKey = 'playlists';
    const authToken = getCookie(TOKEN_COOKIE_KEY) || '';
    const playlistsQuery = useQuery({
        queryFn: () =>
            getUserPlaylists({ authToken })
                .then(handleGuardApiResponse)
                .catch(() => []),
        initialData: playlists,
        placeholderData: keepPreviousData,
        queryKey: [playlistQueryKey],
    });

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await patchActivateDeactivatePlaylist({ id, active, authToken })
            .then(({ success, status, data }) => {
                handleGuardApiResponse({ success, status, data });
                playlistsQuery.refetch();
            })
            .catch(() => {
                return;
            });
    };

    return (
        <>
            {playlistsQuery.data &&
                playlistsQuery.data.map((playlist) => {
                    const { id, active } = playlist;
                    const editLink = `/playlist/${id}`;
                    return (
                        <div key={id}>
                            {'{'}
                            {Object.keys(playlist).map((key) => {
                                return (
                                    <div key={key}>
                                        {`${key}: ${
                                            playlist[
                                                key as keyof typeof playlist
                                            ]
                                        }`}
                                    </div>
                                );
                            })}
                            {'}'}
                            <button
                                onClick={() =>
                                    handleActivatePlaylist(id, !active)
                                }
                            >
                                {active ? 'Deactivate' : 'Activate'}
                            </button>
                            <Link href={editLink}>Edit</Link>
                        </div>
                    );
                })}
        </>
    );
};
