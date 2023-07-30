import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { getToken } from '../auth';

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

    return success ? validation.data : undefined;
}

export async function getPlaylist(
    id: string,
    context?: GetServerSidePropsContext,
) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/find/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const playlist = validatePlaylistSchema(resBody);

    if (!playlist) throw new Error('Invalid response');

    return playlist;
}