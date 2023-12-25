import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { Playlist, getUserPlaylists } from '@/services/spotifyPlaylistGuardApi';
import { InternalServerError, Unauthorized } from '@/errors';
import { handlePageReqErrorResponse } from '@/errors/serverErrorHandlers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPageReqCookie } from '@/storage/cookies/server';
import { Home as HomePage } from '@/views/Home';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const locale = context.locale || '';
        const authToken = getPageReqCookie(TOKEN_COOKIE_KEY, context.req) || '';

        const playlistsQuery = await getUserPlaylists({
            authToken,
            page: 1,
        }).then(({ success, status, data }) => {
            if (status === 401) throw new Unauthorized({ sessionEnd: true });
            if (!success) throw new InternalServerError({});

            return data;
        });

        return {
            props: {
                playlistsQuery,
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handlePageReqErrorResponse(error);
    }
};

export type HomeProps = {
    playlistsQuery: { pages: number; items: Playlist[] };
};

const Home: NextPage<HomeProps> = ({ playlistsQuery }) => {
    return <HomePage playlistsQuery={playlistsQuery} />;
};

export default Home;
