import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../../storage/cookies';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

export function request({
    path,
    authenticated = true,
    options,
    context,
}: {
    path: string;
    authenticated?: boolean;
    options?: RequestInit;
    context?: GetServerSidePropsContext;
}) {
    const token = getCookie(TOKEN_COOKIE_KEY, context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const headers = options?.headers;

    if (!authenticated) {
        return fetch(`${apiUrl}${path}`, {
            ...options,
        });
    }

    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers,
        },
    });
}
