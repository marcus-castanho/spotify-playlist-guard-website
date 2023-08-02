import { GetServerSidePropsContext } from 'next';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { getCookie } from '../../../storage/cookies';

export async function patchActivateDeactivatePlaylist(
    id: string,
    active: boolean,
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn> {
    const token = getCookie('s-p-guard:token', context);
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

    if (status !== 204) return { success: false, status };

    return {
        success: true,
        status: status as 204,
        data: undefined,
    };
}
