import React, { FC } from 'react';
import {
    Playlist as PlaylistType,
    UserProfile as UserProfileType,
} from '@/services/spotifyPlaylistGuardApi';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { AllowedUsersPanel } from './components/AllowedUsersPanel';
import { Main } from '@/components/Main';
import { useAllowedUsers } from './hooks/useAllowedUsers';
import { SearchUsersPanel } from './components/SearchUsersPanel';

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
    const {
        users,
        addNewAllowedUser,
        handleAllowedUsers,
        handleSubmit,
        isUpdating,
    } = useAllowedUsers({ playlist, allowedUsers, ownerSpotifyId });

    return (
        <PageContainer>
            <Header />
            <Main>
                <div className="flex h-[85vh] w-full gap-5 p-5">
                    <SearchUsersPanel
                        allowedUsers={users}
                        addNewAllowedUser={addNewAllowedUser}
                    />
                    <AllowedUsersPanel
                        users={users}
                        handleAllowedUsers={handleAllowedUsers}
                        handleSubmit={handleSubmit}
                        isUpdating={isUpdating}
                    />
                </div>
            </Main>
        </PageContainer>
    );
};
