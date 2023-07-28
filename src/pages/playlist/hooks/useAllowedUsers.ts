import { useState, useEffect } from 'react';
import Playlist from '../[id]';
import { QueryKey, UserProfile } from '../../../@types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    getUserProfiles,
    updatePlaylistAllowedUsers,
} from '../../../services/api';

export type UseAllowedUsersParams = {
    playlist: Playlist;
    allowedUsers: UserProfile[];
    ownerSpotifyId: string;
};

export function useAllowedUsers({
    playlist,
    allowedUsers,
    ownerSpotifyId,
}: UseAllowedUsersParams) {
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

    return {
        users,
        addNewAllowedUser,
        handleAllowedUsers,
        handleSubmit: () =>
            usersProfilesMutation.mutate(
                users
                    .filter(({ status }) => status !== 'removed')
                    .map(({ id }) => id),
            ),
        isLoading:
            usersProfilesMutation.isLoading || usersProfilesQuery.isLoading,
    };
}
