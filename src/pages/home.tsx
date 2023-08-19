import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import {
    Playlist,
    getUserPlaylists,
} from '../services/spotifyPlaylistGuardApi';
import { PlaylistsList } from '../components/PlaylistsList';
import { InternalServerError, UnauthorizedError } from '../errors';
import { handleServerErrorResponse } from '../errors/handleServerErrorResponse';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { validateSession } from '../middlewares/validateSession';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = context.locale || '';

        validateSession(context);

        const playlists = await getUserPlaylists(context).then(
            ({ success, status, data }) => {
                if (status === 401)
                    throw new UnauthorizedError({ sessionEnd: true });
                if (!success) throw new InternalServerError({});

                return data;
            },
        );

        return {
            props: { playlists, ...(await serverSideTranslations(locale)) },
        };
    } catch (error) {
        return handleServerErrorResponse(error);
    }
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

export default Home;
