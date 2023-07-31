import { GetServerSidePropsContext } from 'next';
import { getToken } from '../auth';

export async function patchActivateDeactivatePlaylist(
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
    const { status } = response;

    if (status !== 204) return { status };

    return { status: status as 204 };
}
