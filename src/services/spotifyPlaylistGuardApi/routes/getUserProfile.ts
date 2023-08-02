import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';
import { SpotifyPlaylistGuardApiReturn } from '../.';

const userProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    image_url: z.string(),
});

function validateUserProfileSchema(payload: unknown) {
    const validation = userProfileSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getUserProfile(
    userId: string,
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn<z.infer<typeof userProfileSchema>>> {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/users/profile/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { success: false, status, data: null };

    const profile = validateUserProfileSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: profile,
    };
}
