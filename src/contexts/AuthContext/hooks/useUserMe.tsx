import { isPrivatePage } from '@/config/pages';
import { QueryKey } from '@/contexts/QueryContext';
import { User, getMe } from '@/services/spotifyPlaylistGuardApi';
import { getCookie } from '@/storage/cookies/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { TOKEN_COOKIE_KEY } from '..';
import { useRouter } from 'next/router';

type UseUserMeParams = {
    signOut: (sessionEnd?: boolean) => void;
    defaultUser?: User | null;
};
export function useUserMe({ signOut, defaultUser }: UseUserMeParams) {
    const token = getCookie(TOKEN_COOKIE_KEY) || '';
    const userMeQueryKey: QueryKey = 'user-me';
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const router = useRouter();

    const userMeQuery = useQuery({
        queryFn: () =>
            getMe({ authToken: token })
                .then(({ data, status, success }) => {
                    if (status === 401) signOut(true);
                    if (!success) throw new Error('Failed');

                    return data;
                })
                .catch(() => null),
        initialData: defaultUser || null,
        enabled: isPrivatePage(pathname || ''),
        queryKey: [userMeQueryKey, defaultUser, router],
    });

    return {
        me: userMeQuery.data,
        refetch: userMeQuery.refetch,
        query: userMeQuery,
        key: userMeQueryKey,
        invalidate: () =>
            queryClient.removeQueries({ queryKey: [userMeQueryKey] }),
    };
}
