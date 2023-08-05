import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { InvalidResponseDataError } from '../../../errors';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { request } from '../httpClient';

const playlistSchema = z.object({
    id: z.string(),
    spotify_id: z.string(),
    collaborative: z.boolean(),
    description: z.string(),
    external_url: z.string(),
    href: z.string(),
    name: z.string(),
    userId: z.string(),
    public: z.boolean(),
    snapshot_id: z.string(),
    uri: z.string(),
    active: z.boolean(),
    allowed_userIds: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

function validatePlaylistSchema(payload: unknown) {
    const validation = playlistSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getPlaylist(
    id: string,
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn<z.infer<typeof playlistSchema>>> {
    const response = await request({
        path: `/playlists/find/${id}`,
        options: { method: 'GET' },
        context,
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { success: false, status, data: null };

    const playlist = validatePlaylistSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: playlist,
    };
}
