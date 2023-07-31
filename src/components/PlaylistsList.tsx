import React, { FC } from 'react';
import { QueryKey } from '../@types';
import { useQuery } from '@tanstack/react-query';
import {
    Playlist,
    patchActivateDeactivatePlaylist,
    getUserPlaylists,
} from '../services/spotifyPlaylistGuardApi';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export type PlaylistsListProps = {
    playlists: Playlist[];
};

export const PlaylistsList: FC<PlaylistsListProps> = ({ playlists }) => {
    const { signOut } = useAuth();
    const playlistQueryKey: QueryKey = 'playlists';
    const playlistsQuery = useQuery([playlistQueryKey], {
        queryFn: () =>
            getUserPlaylists()
                .then(({ status, data }) => {
                    if (status === 401) return signOut(true);
                    if (status !== 200 || !data) return [];

                    return data;
                })
                .catch(() => []),
        initialData: playlists,
        keepPreviousData: true,
    });

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await patchActivateDeactivatePlaylist(id, active)
            .then(({ status }) => {
                if (status === 401) signOut(true);
                if (status !== 204) return;

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
