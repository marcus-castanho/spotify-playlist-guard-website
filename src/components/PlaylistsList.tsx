import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Playlist,
    patchActivateDeactivatePlaylist,
    getUserPlaylists,
} from '../services/spotifyPlaylistGuardApi';
import Link from 'next/link';
import { useClientErrorHandler } from '../errors/clientErrorHandlers';
import { QueryKey } from '../contexts/QueryContext';

export type PlaylistsListProps = {
    playlists: Playlist[];
};

export const PlaylistsList: FC<PlaylistsListProps> = ({ playlists }) => {
    const { handleGuardApiResponse } = useClientErrorHandler();
    const playlistQueryKey: QueryKey = 'playlists';
    const playlistsQuery = useQuery([playlistQueryKey], {
        queryFn: () =>
            getUserPlaylists({})
                .then(handleGuardApiResponse)
                .catch(() => []),
        initialData: playlists,
        keepPreviousData: true,
    });

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await patchActivateDeactivatePlaylist({ id, active })
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
