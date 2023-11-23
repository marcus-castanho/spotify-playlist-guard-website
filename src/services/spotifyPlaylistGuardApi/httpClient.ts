import { PROXY_URL } from './proxy';

export function request({
    path,
    authToken,
    options,
}: {
    path: string;
    authToken?: string;
    options?: RequestInit;
}) {
    const apiUrl = PROXY_URL;
    const headers = options?.headers;

    if (!authToken) {
        return fetch(`${apiUrl}${path}`, {
            ...options,
        });
    }

    return fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${authToken}`,
            ...headers,
        },
    });
}
