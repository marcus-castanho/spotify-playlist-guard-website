import React, { FC } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { AllowedUser, useAllowedUsers } from '../hooks/useAllowedUsers';
import { match } from 'ts-pattern';
import { AvatarFilledIcon } from '@/components/icons/AvatarFilledIcon';
import { colors } from '@/styles/theme';
import { SearchBoxInput } from '@/components/SearchBoxInput';
import { Spinner } from '@/components/Spinner';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { CustomImage } from '@/components/CustomImage';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { FormField } from '@/components/FormField';
import { useAllowedUserInput } from '../hooks/useAllowedUserInput';

type UserProfileImageProps = {
    imageURL: AllowedUser['imageURL'];
};
const UserProfileImage: FC<UserProfileImageProps> = ({ imageURL }) => {
    return (
        <div className="relative h-20 w-20 min-w-20">
            {imageURL ? (
                <CustomImage
                    alt="User profile image"
                    src={imageURL || ''}
                    className="h-full w-full rounded-[50%] object-cover"
                />
            ) : (
                <div className="flex min-h-20 min-w-20 items-center justify-center rounded-[50%] bg-gray-400">
                    <AvatarFilledIcon
                        fillColor={colors.gray['100']}
                        size={60}
                    />
                </div>
            )}
        </div>
    );
};

type StatusSpanProps = {
    status: AllowedUser['status'];
};
const StatusSpan: FC<StatusSpanProps> = ({ status }) => {
    const statusMap: { [key in typeof status]: string } = {
        added: 'Added',
        removed: 'Removed',
        idle: 'Editable',
        permanent: 'Playlist owner',
    };
    return (
        <span
            className={match(status)
                .with(
                    'added',
                    () =>
                        'rounded-md border-2 border-primary-verdant p-2 text-center text-primary-verdant',
                )
                .with(
                    'removed',
                    () =>
                        'rounded-md border-2 border-secondary-red p-2 text-center text-secondary-red',
                )
                .with(
                    'permanent',
                    () =>
                        'rounded-md border-2 border-secondary-blue p-2 text-center text-secondary-blue',
                )
                .with('idle', () => 'hidden')
                .otherwise(() => 'hidden')}
        >
            {statusMap[status]}
        </span>
    );
};

type ActionButtonProps = {
    onClick: () => void;
    status: AllowedUser['status'];
};
const ActionButton: FC<ActionButtonProps> = ({ onClick, status }) => {
    const { theme } = useTheme();
    return (
        <button
            onClick={() => onClick()}
            className={
                status === 'idle'
                    ? 'rounded-md border-2 border-transparent p-2 hover:border-gray-100'
                    : 'hidden rounded-md border-2 border-transparent p-2 hover:border-gray-100'
            }
        >
            <PlusIcon
                size={24}
                fillColor={theme === 'dark' ? 'white' : 'black'}
            />
        </button>
    );
};

type UserItemProps = { user: AllowedUser; onAddUser: () => void };
const UserItem: FC<UserItemProps> = ({
    user: { id, imageURL, name, status },
    onAddUser,
}) => {
    return (
        <div
            className={match(status)
                .with(
                    'removed',
                    () =>
                        'flex w-full rounded-[4px] p-3 hover:bg-gray-50 max-sm:border-2 max-sm:border-secondary-red dark:hover:bg-gray-500',
                )
                .with(
                    'added',
                    () =>
                        'flex w-full rounded-[4px] p-3 hover:bg-gray-50 max-sm:border-2 max-sm:border-primary-verdant dark:hover:bg-gray-500',
                )
                .otherwise(
                    () =>
                        'flex w-full rounded-[4px] p-3 hover:bg-gray-50 dark:hover:bg-gray-500',
                )}
        >
            <div className="flex w-full gap-1">
                <UserProfileImage imageURL={imageURL} />
                <div className="flex w-full justify-between">
                    <div className="flex items-center pl-3">{name || id}</div>
                    <div className="flex items-center gap-3">
                        <div
                            className={
                                status === 'permanent'
                                    ? 'flex'
                                    : 'flex max-sm:hidden'
                            }
                        >
                            <StatusSpan status={status} />
                        </div>
                        {status !== 'permanent' && (
                            <ActionButton
                                onClick={() => onAddUser()}
                                status={status}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

type UserIdInputProps = {
    onAddUser: (userId: string) => void;
};
const UserIdInput: FC<UserIdInputProps> = ({ onAddUser }) => {
    const { handleUserIdInput, userIdInput, handleSubmit, isValid } =
        useAllowedUserInput();

    return (
        <div className="flex w-full rounded-[4px] border-2 bg-gray-50 p-3 dark:bg-gray-700">
            <div className="flex items-center gap-3">
                <div className="flex min-h-20 min-w-20 items-center justify-center rounded-[50%] bg-gray-400 max-sm:hidden">
                    <AvatarFilledIcon
                        fillColor={colors.gray['100']}
                        size={50}
                    />
                </div>
                <div className="flex justify-between gap-3">
                    <FormField.TextInput
                        inputId="userId"
                        defaultValue={''}
                        onChange={(text) => handleUserIdInput(text)}
                        error={!isValid}
                        placeHolder="Enter a user ID manually"
                    />
                    <ActionButton
                        onClick={() => {
                            handleSubmit(() => onAddUser(userIdInput));
                        }}
                        status="idle"
                    />
                </div>
            </div>
        </div>
    );
};

type SearchUsersPanelProps = {
    allowedUsers: AllowedUser[];
    addNewAllowedUser: ReturnType<typeof useAllowedUsers>['addNewAllowedUser'];
    query: {
        users: ReturnType<typeof useUsersQuery>['users'];
        isPending: ReturnType<typeof useUsersQuery>['isPending'];
        mutate: ReturnType<typeof useUsersQuery>['mutate'];
    };
};
export const SearchUsersPanel: FC<SearchUsersPanelProps> = ({
    allowedUsers,
    addNewAllowedUser,
    query,
}) => {
    const { users, isPending, mutate } = query;

    const parseUserData = ({
        id,
        displayName,
        avatar,
    }: (typeof users)[number]) => {
        const imageURL = avatar?.sources[1]?.url || null;
        const allowedUser = allowedUsers.find((allowedUser) => {
            return allowedUser.id === id;
        });
        const isAllowedUser = !!allowedUser;
        const status = match({
            isAllowedUser,
            allowedUser,
        })
            .with({ isAllowedUser: false }, () => 'idle' as const)
            .with(
                {
                    isAllowedUser: true,
                    allowedUser: {
                        ...allowedUser,
                        status: 'idle',
                    },
                },
                () => 'added' as const,
            )
            .with(
                {
                    isAllowedUser: true,
                    allowedUser: {
                        ...allowedUser,
                        status: 'added',
                    },
                },
                () => 'added' as const,
            )
            .with(
                {
                    isAllowedUser: true,
                    allowedUser: {
                        ...allowedUser,
                        status: 'removed',
                    },
                },
                () => 'removed' as const,
            )
            .with(
                {
                    isAllowedUser: true,
                    allowedUser: {
                        ...allowedUser,
                        status: 'permanent',
                    },
                },
                () => 'permanent' as const,
            )
            .otherwise(() => 'idle' as const);

        return { id, imageURL, name: displayName, status };
    };

    return (
        <div className="h-full w-full rounded-lg border-2 bg-white p-5 shadow-md max-sm:h-[65%] dark:border-0 dark:bg-gray-950 dark:shadow-none">
            <div className="p-3 sm:w-[50%]">
                <SearchBoxInput
                    placeHolder="Search user..."
                    onSubmit={(value) => mutate(value)}
                />
            </div>
            {isPending ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner size="large" />
                </div>
            ) : (
                <div className="h-full w-full">
                    <div className="p-3">
                        <UserIdInput
                            onAddUser={(userId) =>
                                addNewAllowedUser({
                                    id: userId,
                                    imageURL: null,
                                    name: null,
                                })
                            }
                        />
                    </div>
                    <ul className="max-h-[65%] overflow-auto p-3 max-sm:max-h-[50%]">
                        {users.map((user) => {
                            const { id, imageURL, name, status } =
                                parseUserData(user);
                            return (
                                <li key={id} className="p-1">
                                    <UserItem
                                        user={{
                                            id,
                                            imageURL,
                                            name,
                                            status,
                                        }}
                                        onAddUser={() =>
                                            addNewAllowedUser({
                                                id,
                                                imageURL,
                                                name,
                                            })
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};
