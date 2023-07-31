import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';

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

export async function getUserInfo(context?: GetServerSidePropsContext) {
    const token = getToken(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/users/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 200) return { status, data: null };

    const userData = validateUserSchema(resBody);

    return {
        success: status === 200 && !!userData,
        status: status as 200,
        data: userData,
    };
}
