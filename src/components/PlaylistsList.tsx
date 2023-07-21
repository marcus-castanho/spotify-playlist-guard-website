import React, { FC } from 'react';
import { Playlist, QueryKey } from '../@types';
import { useQuery } from '@tanstack/react-query';
import { activateDeactivatePlaylist, getUserPlaylists } from '../services/api';

export type PlaylistsListProps = {
    playlists: Playlist[];
};

export const PlaylistsList: FC<PlaylistsListProps> = ({ playlists }) => {
    const playlistQueryKey: QueryKey = 'playlists';
    const playlistsQuery = useQuery([playlistQueryKey], {
        queryFn: () => getUserPlaylists(),
        initialData: playlists,
    });

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await activateDeactivatePlaylist(id, active).then(() =>
            playlistsQuery.refetch(),
        );
        return;
    };

    return (
        <div>
            {playlistsQuery.data &&
                playlistsQuery.data.map((playlist) => {
                    const { id, active } = playlist;
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
                                {active ? 'Desativar' : 'Ativar'}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};
