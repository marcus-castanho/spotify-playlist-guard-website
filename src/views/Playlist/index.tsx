import React, { FC } from 'react';
import {
    Playlist as PlaylistType,
    UserProfile as UserProfileType,
} from '@/services/spotifyPlaylistGuardApi';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { LegacyPlaylist } from './components/LegacyPlaylist';

export type UserProfile = Pick<UserProfileType, 'id'> & {
    name: string | null;
    image_url: string | null;
};

type PlaylistProps = {
    playlist: PlaylistType;
    allowedUsers: UserProfile[];
    ownerSpotifyId: string;
};
export const Playlist: FC<PlaylistProps> = ({
    playlist,
    allowedUsers,
    ownerSpotifyId,
}) => {
    return (
        <PageContainer>
            <Header />
            <LegacyPlaylist
                allowedUsers={allowedUsers}
                ownerSpotifyId={ownerSpotifyId}
                playlist={playlist}
            />
        </PageContainer>
    );
};
