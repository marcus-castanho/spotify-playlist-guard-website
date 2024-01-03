import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
    Playlist,
    getPlaylist,
    getMe,
    getUserProfile,
} from '@/services/spotifyPlaylistGuardApi';
import { handlePageReqErrorResponse } from '@/errors/serverErrorHandlers';
import { InternalServerError, Unauthorized } from '@/errors';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPageReqCookie } from '@/storage/cookies/server';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { Playlist as PlaylistPage, UserProfile } from '@/views/Playlist';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { id } = context.query;
        const locale = context.locale || '';
        const authToken = getPageReqCookie(TOKEN_COOKIE_KEY, context.req) || '';

        const playlist = await getPlaylist({
            id: id as string,
            authToken,
        }).then(({ success, status, data }) => {
            if (status === 401) throw new Unauthorized({ sessionEnd: true });
            if (!success) throw new InternalServerError({});

            return data;
        });

        const user = await getMe({ authToken }).then(
            ({ success, status, data }) => {
                if (status === 401)
                    throw new Unauthorized({ sessionEnd: true });
                if (!success) throw new InternalServerError({});

                return data;
            },
        );

        const allowedUsers = await Promise.all(
            playlist.allowed_userIds.map(async (userId) => {
                const defaultValue = {
                    id: userId,
                    name: null,
                    image_url: null,
                };
                return getUserProfile({ userId, authToken })
                    .then(({ success, data }) => {
                        if (!success && userId === user.spotify_id) {
                            return {
                                id: user.spotify_id,
                                name: user.display_name,
                                image_url: user.images[1],
                            };
                        }
                        if (!success) return defaultValue;
                        return data;
                    })
                    .catch(() => defaultValue);
            }),
        );

        return {
            props: {
                playlist,
                allowedUsers,
                ownerSpotifyId: user.spotify_id,
                ...(await serverSideTranslations(locale)),
            },
        };
    } catch (error) {
        return handlePageReqErrorResponse(error);
    }
};

export type PlaylistProps = {
    playlist: Playlist;
    allowedUsers: UserProfile[];
    ownerSpotifyId: string;
};

const Playlist: NextPage<PlaylistProps> = ({
    playlist,
    allowedUsers,
    ownerSpotifyId,
}) => {
    return (
        <PlaylistPage
            playlist={playlist}
            allowedUsers={allowedUsers}
            ownerSpotifyId={ownerSpotifyId}
        />
    );
};

export default Playlist;
