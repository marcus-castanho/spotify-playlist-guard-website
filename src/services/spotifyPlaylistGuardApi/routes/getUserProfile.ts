import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { InvalidResponseDataError } from '../../../errors';
import { ReturnValue } from '../.';
import { request } from '../httpClient';

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
): Promise<ReturnValue<z.infer<typeof userProfileSchema>>> {
    const response = await request({
        path: `/users/profile/${userId}`,
        options: { method: 'GET' },
        context,
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
