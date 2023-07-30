import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import qs from 'qs';
import { getToken } from '../auth';

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

    return success ? validation.data : undefined;
}

export async function getUserProfiles(
    userIds: string[],
    context?: GetServerSidePropsContext,
) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(
        `${apiUrl}/users/profile?${qs.stringify({ spotify_id: userIds })}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.status !== 200) throw new Error('Invalid response');

    const resBody = await response.json().catch(() => ({}));

    const profiles = validateUserProfilesSchema(resBody);

    if (!profiles) throw new Error('Invalid response');

    return profiles;
}
