import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import qs from 'qs';
import { InvalidResponseDataError } from '../../../errors';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { request } from '../httpClient';

export type UserProfile = z.infer<typeof userProfileSchema>;

const userProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    image_url: z.string(),
});

const usersProfilesSchema = z.array(userProfileSchema);

function validateUserProfilesSchema(payload: unknown) {
    const validation = usersProfilesSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getUserProfiles(
    userIds: string[],
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn<z.infer<typeof usersProfilesSchema>>> {
    const response = await request({
        path: `/users/profile?${qs.stringify({ spotify_id: userIds })}`,
        options: { method: 'GET' },
        context,
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { success: false, status, data: null };

    const profiles = validateUserProfilesSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: profiles,
    };
}
