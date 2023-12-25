import { z } from 'zod';
import { InvalidResponseDataError } from '@/errors';
import { Fetch } from '../.';
import { request } from '../httpClient';

type Playlist = z.infer<typeof playlistSchema>;

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
    images: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const playlistsSchema = z.object({
    pages: z.number(),
    items: z.array(playlistSchema),
});

function validatePlaylistsSchema(payload: unknown) {
    const validation = playlistsSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

type GetUserPlaylistsPayload = {
    authToken: string;
    page: number;
};

export const getUserPlaylists: Fetch<
    { pages: number; items: Playlist[] },
    GetUserPlaylistsPayload
> = async ({ authToken, page }) => {
    const response = await request({
        path: `/playlists/list/${page}`,
        options: { method: 'GET' },
        authToken,
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { success: false, status, data: null };

    const body = validatePlaylistsSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: body,
    };
};
