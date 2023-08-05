import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { InvalidResponseDataError } from '../../../errors';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { request } from '../httpClient';

export type User = z.infer<typeof userSchema>;

const userSchema = z.object({
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

function validateUserSchema(payload: unknown) {
    const validation = userSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getUserInfo(
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn<z.infer<typeof userSchema>>> {
    const response = await request({
        path: `/users/me`,
        options: { method: 'GET' },
        context,
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { success: false, status, data: null };

    const userData = validateUserSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: userData,
    };
}
