import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import { CookieKey, Playlist } from '../@types';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { getUserPlaylists } from '../services/api';
import { PlaylistsList } from '../components/PlaylistsList';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const playlists = await getUserPlaylists(context);

    return {
        props: { playlists },
    };
};

export type HomeProps = {
    playlists: Playlist[];
};

const Home: NextPage<HomeProps> = ({ playlists }) => {
    const { signOut } = useAuth();

    return (
        <div>
            <div>
                <Link href="/profile">Profile</Link>
                <button onClick={signOut}>Log Out</button>
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
        </div>
    );
};

export default Home;
