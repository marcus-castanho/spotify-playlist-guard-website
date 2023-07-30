import { GetServerSidePropsContext } from 'next';
import { getToken } from '../auth';

export async function activateDeactivatePlaylist(
    id: string,
    active: boolean,
    context?: GetServerSidePropsContext,
) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/active/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active }),
    });

    if (response.status !== 204) throw new Error('Invalid response');

    return;
}
