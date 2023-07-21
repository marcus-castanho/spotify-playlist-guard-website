/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import { CookieKey, Playlist } from '../@types';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { getUserPlaylists } from '../services/api';
import { PlaylistsList } from '../components/PlaylistsList';
import { UsersSearchBox } from '../components/UsersSearchBox';
import { UsersList } from '../components/UsersList';

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
        <>
            <div>
                <Link href="/profile">Profile</Link>
                <button onClick={signOut}>Log Out</button>
            </div>
            <PlaylistsList playlists={playlists} />
            <UsersList
                usersIds={['31ronlkcdosn3x3kkuvez6vo2jyi', '12148364973']}
            />
            <UsersSearchBox />
        </>
    );
};

export default Home;
