import { useState, useEffect } from 'react';
import Playlist from '../pages/playlist/[id]';
import { QueryKey } from '../@types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    UserProfile,
    getUserProfile,
    patchPlaylistAllowedUsers,
} from '../services/spotifyPlaylistGuardApi';
import { match } from 'ts-pattern';
import { useClientErrorHandler } from './useClientErrorHandler';

export type AllowedUser = {
    id: string;
    name: string;
    imageURL: string;
    status: 'permanent' | 'idle' | 'removed' | 'added';
};

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
    const { handleGuardApiResponse } = useClientErrorHandler();
    const [users, setUsers] = useState<AllowedUser[]>(() =>
        allowedUsers.map(({ id, name, image_url }) => ({
            id,
            name,
            imageURL: image_url,
            status: id === ownerSpotifyId ? 'permanent' : 'idle',
        })),
    );
    const [updating, setUpdating] = useState(false);
    const usersProfilesKey: QueryKey = 'users-profiles';
    const usersProfilesQuery = useQuery([usersProfilesKey], {
        queryFn: () => {
            return Promise.all(
                users
                    .filter(({ status }) => status !== 'removed')
                    .map(({ id }) => {
                        const defaultValue = {
                            id,
                            name: 'Data not found.',
                            image_url: 'Data not found.',
                        };
                        return getUserProfile(id)
                            .then(handleGuardApiResponse)
                            .catch(() => defaultValue);
                    }),
            );
        },
        initialData: allowedUsers,
        keepPreviousData: true,
        staleTime: Infinity,
    });
    const usersProfilesMutation = useMutation({
        mutationFn: async (userIds: string[]) => {
            setUpdating(true);
            return patchPlaylistAllowedUsers(playlist.id, userIds)
                .then(handleGuardApiResponse)
                .catch(() => null);
        },
        onSuccess: () => {
            usersProfilesQuery.refetch();
        },
    });

    const addNewAllowedUser = (newUser: Omit<AllowedUser, 'status'>) => {
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
        userId: AllowedUser['id'],
        status: 'added' | 'removed' | 'idle',
    ) => {
        setUsers((state) => {
            const newState = [...state];
            const usersIds = state.map(({ id }) => id);
            const idPosition = usersIds.findIndex((id) => id === userId);

            if (idPosition === -1) return [...state];

            return match(status)
                .with('added', () => removeNewAllowedUser(newState, idPosition))
                .with('removed', () => restoreAllowedUser(newState, idPosition))
                .with('idle', () => removeAllowedUser(newState, idPosition))
                .otherwise(() => newState);
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
        setUpdating(false);
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
        isUpdating: updating,
    };
}
