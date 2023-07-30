import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Playlist, UserProfile } from '../../@types';
import { getPlaylist, getUserInfo, getUserProfile } from '../../services/api';
import { UsersSearchBox } from '../../components/UsersSearchBox';
import Link from 'next/link';
import { useAllowedUsers } from '../../hooks/useAllowedUsers';
import Image from 'next/image';
import { P, match } from 'ts-pattern';
import { useAllowedUserInput } from '../../hooks/useAllowedUserInput';
import { sessionIsActive } from '../../validations/sessionIsActive';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    if (!sessionIsActive(context)) {
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
        isUpdating,
    } = useAllowedUsers({ playlist, allowedUsers, ownerSpotifyId });
    const {
        handleUserIdInput,
        userIdInput,
        isValid,
        ['handleSubmit']: handleSubmitUserId,
    } = useAllowedUserInput();

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
                                            `${match(status)
                                                .with('added', () => 'Added')
                                                .with(
                                                    'removed',
                                                    () => 'Removed',
                                                )
                                                .with('idle', () => 'Editable')
                                                .otherwise(() => '')}`}
                                        {status !== 'permanent' && (
                                            <button
                                                onClick={() =>
                                                    handleAllowedUsers(
                                                        id,
                                                        status,
                                                    )
                                                }
                                            >
                                                {match(status)
                                                    .with(
                                                        P.union(
                                                            'added',
                                                            'idle',
                                                        ),
                                                        () => 'Remove',
                                                    )
                                                    .with(
                                                        'removed',
                                                        () => 'Add',
                                                    )
                                                    .otherwise(() => '')}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                            <button onClick={() => handleSubmit()}>Save</button>
                            {isUpdating && 'Saving'}
                        </div>
                        <div>
                            <input
                                onChange={(event) =>
                                    handleUserIdInput(event.target.value)
                                }
                                value={userIdInput}
                                style={{
                                    borderColor: isValid ? 'black' : 'red',
                                }}
                            />
                            <button
                                onClick={() =>
                                    handleSubmitUserId(() =>
                                        addNewAllowedUser({
                                            id: userIdInput,
                                            name: 'Data not found.',
                                            imageURL: 'Data not found.',
                                        }),
                                    )
                                }
                            >
                                Insert ID
                            </button>
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
