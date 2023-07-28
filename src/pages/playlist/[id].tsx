import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { CookieKey, Playlist, UserProfile } from '../../@types';
import { parseCookies } from 'nookies';
import { getPlaylist, getUserInfo, getUserProfile } from '../../services/api';
import { UsersSearchBox } from '../../components/UsersSearchBox';
import Link from 'next/link';
import { useAllowedUsers } from './hooks/useAllowedUsers';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const { id } = context.query;

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const playlist = await getPlaylist(id as string, context).catch(() => null);

    if (!playlist) {
        return {
            notFound: true,
        };
    }

    const allowedUsers = await Promise.all(
        playlist.allowed_userIds.map((userId) =>
            getUserProfile(userId, context).catch(() => ({
                id: userId,
                name: 'Data not found.',
                image_url: 'Data not found.',
            })),
        ),
    );

    const user = await getUserInfo(context).catch(() => null);

    if (!allowedUsers || !user?.spotify_id) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            playlist,
            allowedUsers,
            ownerSpotifyId: user.spotify_id,
        },
    };
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
    const {
        users,
        addNewAllowedUser,
        handleAllowedUsers,
        handleSubmit,
        isLoading,
    } = useAllowedUsers({ playlist, allowedUsers, ownerSpotifyId });

    return (
        <div>
            <Link href="/home">Home</Link>
            <div>
                {playlist && (
                    <>
                        <div>
                            {users.map((allowedUser) => {
                                const { imageURL, name, id, status } =
                                    allowedUser;
                                const imageSrc = imageURL || '/notDefined';

                                return (
                                    <div
                                        key={id}
                                        style={{ border: 'solid white' }}
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt="logo"
                                            width="64"
                                            height="64"
                                            loader={() => imageSrc}
                                        />
                                        {`${id} | ${name} | `}
                                        {status &&
                                            status !== 'permanent' &&
                                            `${
                                                status === 'added'
                                                    ? 'Added'
                                                    : status === 'removed'
                                                    ? 'Removed'
                                                    : status === 'idle'
                                                    ? 'Editable'
                                                    : ''
                                            }`}
                                        {status !== 'permanent' && (
                                            <button
                                                onClick={() =>
                                                    handleAllowedUsers(
                                                        id,
                                                        status,
                                                    )
                                                }
                                            >
                                                {status === 'added' ||
                                                status === 'idle'
                                                    ? 'Remove'
                                                    : status === 'removed'
                                                    ? 'Add'
                                                    : ''}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                            <button onClick={() => handleSubmit()}>Save</button>
                            {isLoading && 'Saving'}
                        </div>
                        <UsersSearchBox
                            allowedUsersIds={users.map(({ id }) => id)}
                            addNewAllowedUser={addNewAllowedUser}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Playlist;