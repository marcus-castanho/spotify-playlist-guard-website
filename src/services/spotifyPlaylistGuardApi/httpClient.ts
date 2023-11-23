export function request({
    path,
    authToken,
    options,
}: {
    path: string;
    authToken?: string;
    options?: RequestInit;
}) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
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
