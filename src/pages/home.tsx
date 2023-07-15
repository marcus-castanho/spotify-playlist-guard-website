import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import { CookieKey, Playlist } from '../@types';
import nookies from 'nookies';
import Link from 'next/link';
import { getUserPlaylists } from '../services/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = nookies.get(context);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const playlists = await getUserPlaylists(token);

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
        <>
            <div>
                <Link href="/profile">Profile</Link>
                <button onClick={signOut}>Log Out</button>
            </div>
            <div>
                {playlists &&
                    playlists.map((playlist) => {
                        return (
                            <>
                                {'{'}
                                {Object.keys(playlist).map((key) => {
                                    return (
                                        <div key={key}>{`${key}: ${
                                            playlist[
                                                key as keyof typeof playlist
                                            ]
                                        }`}</div>
                                    );
                                })}
                                {'}'}
                            </>
                        );
                    })}
            </div>
        </>
    );
};

export default Home;
