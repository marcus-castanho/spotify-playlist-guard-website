import React, { FC, ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRestoreIcon } from '@/components/icons/ArrowRestoreIcon';
import { useTheme } from '@/contexts/ThemeContext';
import { TrashIcon } from '@/components/icons/TrashIcon';
import { AllowedUser, useAllowedUsers } from '../hooks/useAllowedUsers';
import { P, match } from 'ts-pattern';
import { AvatarFilledIcon } from '@/components/icons/AvatarFilledIcon';
import { colors } from '@/styles/theme';
import { Spinner } from '@/components/Spinner';
import { ButtonPrimary } from '@/components/ButtonPrimary';

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
                <Image
                    alt="User profile image"
                    src={imageURL || ''}
                    fill
                    className="rounded-[50%]"
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
                        'rounded-md border-2 border-primary-verdant p-2 text-start text-primary-verdant',
                )
                .with(
                    'removed',
                    () =>
                        'rounded-md border-2 border-secondary-red p-2 text-start text-secondary-red',
                )
                .with(
                    'permanent',
                    () =>
                        'rounded-md border-2 border-secondary-blue p-2 text-start text-secondary-blue',
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
            className="rounded-md border-2 border-transparent p-2 hover:border-gray-100"
        >
            {match(status)
                .with(P.union('added', 'idle'), () => (
                    <TrashIcon
                        size={24}
                        fillColor={theme === 'dark' ? 'white' : 'black'}
                    />
                ))
                .with('removed', () => (
                    <ArrowRestoreIcon
                        size={24}
                        fillColor={theme === 'dark' ? 'white' : 'black'}
                    />
                ))
                .otherwise(() => '')}
        </button>
    );
};

type AllowedUsersPanelProps = {
    users: AllowedUser[];
    handleAllowedUsers: ReturnType<
        typeof useAllowedUsers
    >['handleAllowedUsers'];
    handleSubmit: ReturnType<typeof useAllowedUsers>['handleSubmit'];
    isUpdating: ReturnType<typeof useAllowedUsers>['isUpdating'];
};
export const AllowedUsersPanel: FC<AllowedUsersPanelProps> = ({
    users,
    handleAllowedUsers,
    handleSubmit,
    isUpdating,
}) => {
    return (
        <div className="relative w-full rounded-lg bg-white p-5 shadow-md dark:bg-gray-950 dark:shadow-none">
            {isUpdating ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner size="large" />
                </div>
            ) : (
                <ul>
                    {users.map(({ id, imageURL, name, status }) => {
                        return (
                            <ListItem key={id}>
                                <div className="flex w-full gap-1">
                                    <UserProfileImage imageURL={imageURL} />
                                    <div className="flex w-full justify-between">
                                        <div className="flex items-center pl-3">
                                            {name || id}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusSpan status={status} />
                                            {status !== 'permanent' && (
                                                <ActionButton
                                                    onClick={() =>
                                                        handleAllowedUsers(
                                                            id,
                                                            status,
                                                        )
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
            {!isUpdating && (
                <div className="absolute bottom-10 right-10">
                    <ButtonPrimary onClick={() => handleSubmit()}>
                        Save
                    </ButtonPrimary>
                </div>
            )}
        </div>
    );
};
