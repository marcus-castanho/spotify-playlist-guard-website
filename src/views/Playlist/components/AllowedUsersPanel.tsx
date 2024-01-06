import React, { FC } from 'react';
import { ArrowRestoreIcon } from '@/components/icons/ArrowRestoreIcon';
import { useTheme } from '@/contexts/ThemeContext';
import { TrashIcon } from '@/components/icons/TrashIcon';
import { AllowedUser, useAllowedUsers } from '../hooks/useAllowedUsers';
import { P, match } from 'ts-pattern';
import { AvatarFilledIcon } from '@/components/icons/AvatarFilledIcon';
import { colors } from '@/styles/theme';
import { Spinner } from '@/components/Spinner';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { CustomImage } from '@/components/CustomImage';
import { FloppyDiskIcon } from '@/components/icons/FloppyDiskIcon';

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

type UserItemProps = { user: AllowedUser; onHandleAllowedUser: () => void };
const UserItem: FC<UserItemProps> = ({
    user: { id, imageURL, name, status },
    onHandleAllowedUser,
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
                    <div className="flex items-center px-3">{name || id}</div>
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
                                onClick={() => onHandleAllowedUser()}
                                status={status}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

type SaveButtonProps = { onSubmit: () => void };
const SaveButton: FC<SaveButtonProps> = ({ onSubmit }) => {
    return (
        <div>
            <div className="max-sm:hidden">
                <ButtonPrimary onClick={() => onSubmit()}>Save</ButtonPrimary>
            </div>
            <div className="sm:hidden">
                <ButtonPrimary round onClick={() => onSubmit()}>
                    <FloppyDiskIcon size={24} />
                </ButtonPrimary>
            </div>
        </div>
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
        <div className="relative h-full w-full rounded-lg border-2 bg-white  p-5 shadow-md dark:border-0 dark:bg-gray-950 dark:shadow-none">
            {isUpdating ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner size="large" />
                </div>
            ) : (
                <ul className="h-full overflow-auto">
                    {users.map(({ id, imageURL, name, status }) => {
                        return (
                            <li key={id} className="p-1">
                                <UserItem
                                    user={{ id, imageURL, name, status }}
                                    onHandleAllowedUser={() => {
                                        if (status === 'permanent') return;
                                        handleAllowedUsers(id, status);
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            {!isUpdating && (
                <div className="absolute bottom-2 right-2">
                    <SaveButton onSubmit={() => handleSubmit()} />
                </div>
            )}
        </div>
    );
};
