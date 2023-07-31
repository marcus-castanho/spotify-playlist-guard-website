import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import qs from 'qs';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';

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
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { status, data: null };

    const profiles = validateUserProfilesSchema(resBody);

    return {
        success: status === 200 && !!profiles,
        status: status as 200,
        data: profiles,
    };
}
