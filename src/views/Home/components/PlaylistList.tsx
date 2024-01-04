import React, { FC, useEffect, useState } from 'react';
import {
    Playlist,
    patchActivateDeactivatePlaylist,
} from '@/services/spotifyPlaylistGuardApi';
import { usePlaylists } from '../hooks/usePlaylists';
import { PaginationNav } from '@/components/PaginationNav';
import { PlaylistCard } from './PlaylistCard';
import { Spinner } from '@/components/Spinner';
import { getCookie } from '@/storage/cookies/client';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { useClientErrorHandler } from '@/errors/clientErrorHandlers';

type PlaylistsListProps = {
    pages: number;
    playlists: Playlist[];
};

export const PlaylistsList: FC<PlaylistsListProps> = ({
    pages,
    playlists: initialPlaylists,
}) => {
    const {
        playlists,
        isFetching,
        page,
        changePage,
        pagesIndexes,
        playlistsQuery,
    } = usePlaylists({ pages, items: initialPlaylists });
    const [isUpdating, setIsUpdating] = useState(false);
    const { handleGuardApiResponse } = useClientErrorHandler();
    const authToken = getCookie(TOKEN_COOKIE_KEY) || '';

    const onMutate = () => {
        setIsUpdating(true);
        playlistsQuery.refetch();
    };

    const handleActivatePlaylist = async (id: string, active: boolean) => {
        await patchActivateDeactivatePlaylist({ id, active, authToken })
            .then(({ success, status, data }) => {
                handleGuardApiResponse({ success, status, data });
            })
            .then(() => onMutate())
            .catch(() => {
                return;
            });
    };

    useEffect(() => {
        if (!isFetching) {
            setIsUpdating(false);
        }
    }, [isFetching]);

    return (
        <div className="flex w-[90vw] flex-col rounded-lg border-2 p-1  shadow-md dark:border-0 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black">
            <div className="flex flex-1 items-center justify-center">
                {isUpdating ? (
                    <Spinner size="small" />
                ) : (
                    <div className="flex justify-center gap-9 p-3.5 max-sm:w-full max-sm:flex-col">
                        {playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                                handleActivatePlaylistPlaylist={
                                    handleActivatePlaylist
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
            <PaginationNav
                page={page}
                changePage={changePage}
                pagesIndexes={pagesIndexes}
            />
        </div>
    );
};
