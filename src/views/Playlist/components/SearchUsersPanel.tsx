import React, { FC, ReactNode } from 'react';
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

type ListItemProps = {
    children: ReactNode;
};
const ListItem: FC<ListItemProps> = ({ children }) => {
    return (
        <li>
            <div className="flex w-full items-start rounded-[4px] p-3 hover:bg-gray-50 dark:hover:bg-gray-500">
                {children}
            </div>
        </li>
    );
};

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

type SearchUsersPanelProps = {
    allowedUsers: AllowedUser[];
    addNewAllowedUser: ReturnType<typeof useAllowedUsers>['addNewAllowedUser'];
};
export const SearchUsersPanel: FC<SearchUsersPanelProps> = ({
    allowedUsers,
    addNewAllowedUser,
}) => {
    const { users, isPending, mutate } = useUsersQuery();

    return (
        <div className="h-full w-full rounded-lg bg-white p-5 shadow-md dark:bg-gray-950 dark:shadow-none">
            <div className="p-3">
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
                <ul className="h-[90%] overflow-auto">
                    {users.map(({ id, displayName, avatar }, index) => {
                        const imageURL = avatar?.sources[1]?.url || null;
                        const allowedUser = allowedUsers.find((allowedUser) => {
                            return allowedUser.id === id;
                        });
                        const isAllowedUser = !!allowedUser;
                        const status = match({
                            isAllowedUser,
                            allowedUser,
                        })
                            .with(
                                { isAllowedUser: false },
                                () => 'idle' as const,
                            )
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
                        return (
                            <ListItem key={index}>
                                <div className="flex w-full gap-1">
                                    <UserProfileImage imageURL={imageURL} />
                                    <div className="flex w-full justify-between">
                                        <div className="flex items-center pl-3">
                                            {displayName || id}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusSpan status={status} />
                                            {status !== 'permanent' && (
                                                <ActionButton
                                                    onClick={() =>
                                                        addNewAllowedUser({
                                                            id,
                                                            imageURL,
                                                            name: displayName,
                                                        })
                                                    }
                                                    status={status}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ListItem>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
