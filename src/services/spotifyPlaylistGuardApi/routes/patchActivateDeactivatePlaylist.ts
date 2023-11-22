import { GetServerSidePropsContext } from 'next';
import { ReturnValue } from '../.';
import { request } from '../httpClient';

export async function patchActivateDeactivatePlaylist(
    id: string,
    active: boolean,
    context?: GetServerSidePropsContext,
): Promise<ReturnValue> {
    const response = await request({
        path: `/playlists/active/${id}`,
        options: {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active }),
        },
        context,
    });
    const { status } = response;

    if (status !== 204) return { success: false, status };

    return {
        success: true,
        status: status as 204,
        data: undefined,
    };
}
