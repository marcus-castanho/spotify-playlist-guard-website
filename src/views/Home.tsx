import React, { FC } from 'react';
import { Playlist } from '@/services/spotifyPlaylistGuardApi';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { PlaylistsList } from '@/components/PlaylistsList';

type HomeProps = {
    playlists: Playlist[];
};

export const Home: FC<HomeProps> = ({ playlists }) => {
    const { signOut } = useAuth();

    return (
        <>
            <div>
                <Link href="/profile">Profile</Link>
                <button onClick={() => signOut()}>Log Out</button>
            </div>
            <div
                style={{
                    display: 'inline-block',
                    width: '50%',
                    overflow: 'hidden',
                }}
            >
                <PlaylistsList playlists={playlists} />
            </div>
        </>
    );
};
