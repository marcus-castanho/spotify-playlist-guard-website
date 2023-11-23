import { Fetch } from '../.';
import { request } from '../httpClient';

type PatchActivateDeactivatePlaylist = {
    id: string;
    active: boolean;
    authToken: string;
};

export const patchActivateDeactivatePlaylist: Fetch<
    null,
    PatchActivateDeactivatePlaylist
> = async ({ id, active, authToken }) => {
    const response = await request({
        path: `/playlists/active/${id}`,
        options: {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active }),
        },
        authToken,
    });
    const { status } = response;

    if (status !== 204) return { success: false, status, data: null };

    return {
        success: true,
        status: status as 204,
        data: null,
    };
};
