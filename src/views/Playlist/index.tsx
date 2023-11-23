import React, { FC } from 'react';
import {
    Playlist as PlaylistType,
    UserProfile,
} from '@/services/spotifyPlaylistGuardApi';
import { useAllowedUsers } from '@/hooks/useAllowedUsers';
import { useAllowedUserInput } from '@/hooks/useAllowedUserInput';
import Link from 'next/link';
import Image from 'next/image';
import { P, match } from 'ts-pattern';
import { UsersSearchBox } from './components/UsersSearchBox';

type PlaylistProps = {
    playlist: PlaylistType;
    allowedUsers: UserProfile[];
    ownerSpotifyId: string;
};

export const Playlist: FC<PlaylistProps> = ({
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
        <>
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
        </>
    );
};
