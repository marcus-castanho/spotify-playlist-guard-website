import React, { FC, ReactNode } from 'react';
import { Playlist } from '@/services/spotifyPlaylistGuardApi';
import { PencilIcon } from '@/components/icons/PencilIcon';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DefaultAlbumCover } from '@/components/DefaultAlbumCover';
import { useToast } from '@/contexts/ToastContext';
import { ToggleSwitch } from '@/components/ToggleSwitch';

type ActionButtonProps = {
    children: ReactNode;
    onClick: () => void;
};
const ActionButton: FC<ActionButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={() => onClick()}
            className="rounded-md border-2 border-transparent p-2 hover:border-gray-100"
        >
            {children}
        </button>
    );
};

type PlaylistCardProps = {
    playlist: Playlist;
    handleActivatePlaylistPlaylist: (id: string, active: boolean) => void;
};
export const PlaylistCard: FC<PlaylistCardProps> = ({
    playlist,
    handleActivatePlaylistPlaylist,
}) => {
    const { theme } = useTheme();
    const router = useRouter();
    const { toast } = useToast();

    return (
        <div className="rounded-lg bg-white p-1 shadow-md max-sm:h-full sm:w-[200px] dark:bg-gray-950 dark:hover:bg-gray-800">
            <div className="flex h-full flex-col justify-between">
                <div className="flex p-4 sm:flex-col">
                    <div className="relative h-40 w-40 min-w-[10rem]">
                        {playlist.images[0] ? (
                            <Image
                                alt="Playlist cover image"
                                src={playlist.images[0]}
                                fill
                            />
                        ) : (
                            <DefaultAlbumCover size={142} />
                        )}
                    </div>
                    <div className="flex flex-col max-sm:p-4">
                        <div className="py-1 font-bold">{playlist.name}</div>
                        <div className="">
                            Users: {playlist.allowed_userIds.length}
                        </div>
                        <div className="">
                            Status:{' '}
                            {playlist.collaborative
                                ? 'Collaborative'
                                : 'Not collaborative'}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <ActionButton
                        onClick={() => router.push(`/playlist/${playlist.id}`)}
                    >
                        <PencilIcon
                            size={24}
                            fillColor={theme === 'dark' ? 'white' : 'black'}
                        />
                    </ActionButton>
                    <div className="flex flex-col items-end">
                        <ToggleSwitch
                            disabled={!playlist.collaborative}
                            defaultChecked={playlist.active}
                            onClick={() => {
                                if (!playlist.collaborative) {
                                    toast(
                                        'Only collaborative can be activated',
                                        'error',
                                    );
                                }
                            }}
                            onChange={(checked) => {
                                handleActivatePlaylistPlaylist(
                                    playlist.id,
                                    checked,
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
