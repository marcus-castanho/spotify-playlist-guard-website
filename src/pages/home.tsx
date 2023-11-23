import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { TOKEN_COOKIE_KEY, useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import {
    Playlist,
    getUserPlaylists,
} from '../services/spotifyPlaylistGuardApi';
import { PlaylistsList } from '../components/PlaylistsList';
import { InternalServerError, UnauthorizedError } from '../errors';
import { handlePageReqErrorResponse } from '../errors/serverErrorHandlers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { validateSession } from '../middlewares/validateSession';
import { getPageReqCookie } from '@/storage/cookies/server';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = context.locale || '';
        const authToken = getPageReqCookie(TOKEN_COOKIE_KEY, context.req) || '';

        validateSession(context);

        const playlists = await getUserPlaylists({ authToken }).then(
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
        return handlePageReqErrorResponse(error);
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
