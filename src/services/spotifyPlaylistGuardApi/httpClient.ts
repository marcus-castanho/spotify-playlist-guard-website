import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../../storage/cookies';

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
    const token = getCookie('s-p-guard:token', context);
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
