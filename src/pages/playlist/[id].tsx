import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { CookieKey, Playlist, QueryKey, UserProfile } from '../../@types';
import { parseCookies } from 'nookies';
import {
    getPlaylist,
    getUserInfo,
    getUserProfile,
    getUserProfiles,
    updatePlaylistAllowedUsers,
} from '../../services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UsersSearchBox } from '../../components/UsersSearchBox';
import Link from 'next/link';

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
    const [users, setUsers] = useState<
        {
            id: string;
            name: string;
            imageURL: string;
            status: 'permanent' | 'idle' | 'removed' | 'added';
        }[]
    >(() =>
        allowedUsers.map(({ id, name, image_url }) => ({
            id,
            name,
            imageURL: image_url,
            status: id === ownerSpotifyId ? 'permanent' : 'idle',
        })),
    );
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey], {
        queryFn: () => {
            return getUserProfiles(
                users
                    .filter(({ status }) => status !== 'removed')
                    .map(({ id }) => id),
            );
        },
        initialData: allowedUsers,
        keepPreviousData: true,
        staleTime: Infinity,
    });
    const usersProfilesMutation = useMutation({
        mutationFn: async (userIds: string[]) =>
            updatePlaylistAllowedUsers(playlist.id, userIds),
        onSuccess: () => {
            usersProfilesQuery.refetch();
        },
    });

    const addNewAllowedUser = (
        newUser: Omit<typeof users[number], 'status'>,
    ) => {
        setUsers((state) => {
            return Array.from(
                new Set([...state, { ...newUser, status: 'added' as const }]),
            );
        });
    };

    const removeNewAllowedUser = (state: typeof users, idPosition: number) => {
        const newState = [...state];
        newState.splice(idPosition, 1);

        return newState;
    };

    const removeAllowedUser = (state: typeof users, idPosition: number) => {
        const newState = [...state];
        const userProfile = newState[idPosition];

        newState.splice(idPosition, 1, {
            ...userProfile,
            status: 'removed' as const,
        });

        return newState;
    };

    const restoreAllowedUser = (state: typeof users, idPosition: number) => {
        const newState = [...state];
        const userProfile = newState[idPosition];

        newState.splice(idPosition, 1, {
            ...userProfile,
            status: 'idle' as const,
        });

        return newState;
    };

    const handleAllowedUsers = (
        userId: typeof users[number]['id'],
        status: 'added' | 'removed' | 'idle',
    ) => {
        setUsers((state) => {
            const newState = [...state];
            const usersIds = state.map(({ id }) => id);
            const idPosition = usersIds.findIndex((id) => id === userId);

            if (idPosition === -1) return [...state];

            if (status === 'added')
                return removeNewAllowedUser(newState, idPosition);
            if (status === 'removed')
                return restoreAllowedUser(newState, idPosition);
            if (status === 'idle')
                return removeAllowedUser(newState, idPosition);

            return newState;
        });
    };

    useEffect(() => {
        if (!usersProfilesQuery.data) return;

        const usersProfiles = usersProfilesQuery.data.map((userProfile) => {
            const { image_url, ...rest } = userProfile;

            return {
                ...rest,
                imageURL: image_url,
                status:
                    rest.id === ownerSpotifyId
                        ? ('permanent' as const)
                        : ('idle' as const),
            };
        });

        setUsers(usersProfiles);
    }, [usersProfilesQuery.data, ownerSpotifyId]);

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
                                return (
                                    <div
                                        key={id}
                                        style={{ border: 'solid white' }}
                                    >
                                        <img
                                            src={imageURL || '/notDefined'}
                                            alt="logo"
                                            width="64"
                                            height="64"
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
                            <button
                                onClick={() =>
                                    usersProfilesMutation.mutate(
                                        users
                                            .filter(
                                                ({ status }) =>
                                                    status !== 'removed',
                                            )
                                            .map(({ id }) => id),
                                    )
                                }
                            >
                                Save
                            </button>
                            {(usersProfilesMutation.isLoading ||
                                usersProfilesQuery.isLoading) &&
                                'Saving'}
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
