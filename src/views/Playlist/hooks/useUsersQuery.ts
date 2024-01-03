import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { useCookies } from '@/contexts/CookiesContext';
import { useClientErrorHandler } from '@/errors/clientErrorHandlers';
import { getQueryUsers } from '@/services/spotifyPlaylistGuardApi';
import { useMutation } from '@tanstack/react-query';

export const useUsersQuery = () => {
    const { getCookie } = useCookies();
    const { handleGuardApiResponse } = useClientErrorHandler();
    const authToken = getCookie(TOKEN_COOKIE_KEY) || '';
    const defaultValue: Awaited<ReturnType<typeof getQueryUsers>>['data'] = [];
    const usersQuery = useMutation({
        mutationFn: async (identifier: string) => {
            return getQueryUsers({ identifier, authToken })
                .then(handleGuardApiResponse)
                .catch(() => defaultValue);
        },
    });

    return {
        users: usersQuery.data || [],
        isPending: usersQuery.isPending,
        mutate: usersQuery.mutate,
    };
};
