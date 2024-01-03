import { useState } from 'react';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
    getUserProfile,
    patchPlaylistAllowedUsers,
    Playlist,
} from '@/services/spotifyPlaylistGuardApi';
import { match } from 'ts-pattern';
import { useClientErrorHandler } from '@/errors/clientErrorHandlers';
import { QueryKey } from '@/contexts/QueryContext';
import { useCookies } from '@/contexts/CookiesContext';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { UserProfile } from '..';

export type AllowedUser = {
    id: string;
    name: string | null;
    imageURL: string | null;
    status: 'permanent' | 'idle' | 'removed' | 'added';
};

const remapUserProfileToAllowedUser = (
    allowedUsers: UserProfile[],
    ownerSpotifyId: string,
): AllowedUser[] =>
    allowedUsers.map(({ id, name, image_url }) => ({
        id,
        name: name || null,
        imageURL: image_url || null,
        status: id === ownerSpotifyId ? 'permanent' : 'idle',
    }));

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
    const { getCookie } = useCookies();
    const { handleGuardApiResponse } = useClientErrorHandler();
    const [users, setUsers] = useState<AllowedUser[]>(() =>
        remapUserProfileToAllowedUser(allowedUsers, ownerSpotifyId),
    );
    const [updating, setUpdating] = useState(false);
    const usersProfilesKey: QueryKey = 'users-profiles';
    const authToken = getCookie(TOKEN_COOKIE_KEY) || '';
    const usersProfilesQuery = useQuery({
        queryFn: () => {
            return Promise.all(
                users
                    .filter(({ status }) => status !== 'removed')
                    .map(async ({ id }) => {
                        const defaultValue = {
                            id,
                            name: null,
                            image_url: null,
                        };
                        return getUserProfile({ userId: id, authToken })
                            .then((result) => {
                                const { success } = result;
                                const data = handleGuardApiResponse({
                                    ...result,
                                });
                                if (!success) return defaultValue;
                                return data;
                            })
                            .catch(() => defaultValue);
                    }),
            )
                .then((data) => {
                    const usersProfiles = remapUserProfileToAllowedUser(
                        data,
                        ownerSpotifyId,
                    );
                    setUsers(usersProfiles);
                    return data;
                })
                .finally(() => setUpdating(false));
        },
        initialData: allowedUsers,
        placeholderData: keepPreviousData,
        staleTime: Infinity,
        queryKey: [usersProfilesKey],
    });
    const usersProfilesMutation = useMutation({
        mutationFn: async (userIds: string[]) => {
            setUpdating(true);
            return patchPlaylistAllowedUsers({
                playlistId: playlist.id,
                userIds,
                authToken,
            })
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
