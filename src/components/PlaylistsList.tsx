import React, { FC } from 'react';
import { Playlist, QueryKey } from '../@types';
import { useQuery } from '@tanstack/react-query';
import { activateDeactivatePlaylist, getUserPlaylists } from '../services/api';
import Link from 'next/link';

export type PlaylistsListProps = {
    playlists: Playlist[];
};

export const PlaylistsList: FC<PlaylistsListProps> = ({ playlists }) => {
    const playlistQueryKey: QueryKey = 'playlists';
    const playlistsQuery = useQuery([playlistQueryKey], {
        queryFn: () => getUserPlaylists(),
        initialData: playlists,
        keepPreviousData: true,
    });

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await activateDeactivatePlaylist(id, active).then(() =>
            playlistsQuery.refetch(),
        );
        return;
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
