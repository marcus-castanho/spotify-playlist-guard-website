import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { InvalidResponseDataError } from '../../../errors';
import { Fetch } from '../.';
import { request } from '../httpClient';

type UserProfile = z.infer<typeof userProfileSchema>;

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

type GetUserProfilePayload = {
    userId: string;
    context?: GetServerSidePropsContext;
};

export const getUserProfile: Fetch<
    UserProfile,
    GetUserProfilePayload
> = async ({ userId, context }) => {
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
};
