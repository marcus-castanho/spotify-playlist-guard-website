import React, { FC } from 'react';
import { Playlist } from '@/services/spotifyPlaylistGuardApi';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';
import { SessionStartWrapper } from './components/SessionStartWrapper';
import { PlaylistsList } from './components/PlaylistList';
import { Main } from '@/components/Main';

type HomeProps = {
    playlistsQuery: { pages: number; items: Playlist[] };
};

export const Home: FC<HomeProps> = ({ playlistsQuery }) => {
    return (
        <SessionStartWrapper>
            <PageContainer>
                <Header />
                <Main>
                    <div className="flex w-full justify-center p-5">
                        <PlaylistsList
                            pages={playlistsQuery.pages}
                            playlists={playlistsQuery.items}
                        />
                    </div>
                </Main>
            </PageContainer>
        </SessionStartWrapper>
    );
};
