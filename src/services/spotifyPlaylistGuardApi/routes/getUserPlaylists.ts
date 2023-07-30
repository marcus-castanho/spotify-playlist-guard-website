import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';

export type Playlist = z.infer<typeof playlistsSchema>[number];

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

const playlistsSchema = z.array(playlistSchema);

function validatePlaylistsSchema(payload: unknown) {
    const validation = playlistsSchema.safeParse(payload);
    const { success } = validation;

    return success
        ? { data: validation.data }
        : { error: validation.error.issues };
}

export async function getUserPlaylists(context?: GetServerSidePropsContext) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/list/1`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const { ['data']: playlists, error } = validatePlaylistsSchema(resBody);

    if (!playlists) throw new InvalidResponseDataError(JSON.stringify(error));

    return playlists;
}
