import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';

const userProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    image_url: z.string(),
});

function validateUserProfileSchema(payload: unknown) {
    const validation = userProfileSchema.safeParse(payload);
    const { success } = validation;

    return success
        ? { data: validation.data }
        : { error: validation.error.issues };
}

export async function getUserProfile(
    userId: string,
    context?: GetServerSidePropsContext,
) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/users/profile/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) throw new Error('Invalid response');

    const resBody = await response.json().catch(() => ({}));

    const { ['data']: profile, error } = validateUserProfileSchema(resBody);

    if (!profile) throw new InvalidResponseDataError(JSON.stringify(error));

    return profile;
}
