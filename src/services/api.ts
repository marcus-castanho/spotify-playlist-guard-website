import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    spotify_id: z.string(),
    country: z.string(),
    display_name: z.string(),
    email: z.string(),
    external_url: z.string(),
    followers: z.number(),
    href: z.string(),
    images: z.array(z.string()),
    product: z.string(),
    type: z.string(),
    uri: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const playlistSchema = z.array(
    z.object({
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
    }),
);

function validateUserSchema(payload: unknown) {
    const validation = userSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

function validatePlaylistSchema(payload: unknown) {
    const validation = playlistSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

export async function getUserInfo(token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/users/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const userData = validateUserSchema(resBody);

    if (!userData) throw new Error('Invalid response');

    return userData;
}

export async function getUserPlaylists(token: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/list/1`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const playlists = validatePlaylistSchema(resBody);

    if (!playlists) throw new Error('Invalid response');

    return playlists;
}
