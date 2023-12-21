import React, { FC } from 'react';
import { Playlist } from '@/services/spotifyPlaylistGuardApi';
import { PlaylistsListLegacy } from './components/PlaylistsListLegacy';
import { PageContainer } from '@/components/PageContainer';
import { Header } from '@/components/Header';

type HomeProps = {
    playlists: Playlist[];
};

export const Home: FC<HomeProps> = ({ playlists }) => {
    return (
        <PageContainer>
            <Header />
            <div
                style={{
                    display: 'inline-block',
                    width: '50%',
                    overflow: 'hidden',
                }}
            >
                <PlaylistsListLegacy playlists={playlists} />
            </div>
        </PageContainer>
    );
};
