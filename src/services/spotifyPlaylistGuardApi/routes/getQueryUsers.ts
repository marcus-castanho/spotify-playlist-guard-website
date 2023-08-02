import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import qs from 'qs';
import { InvalidResponseDataError } from '../../../errors';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { getCookie } from '../../../storage/cookies';

export type QueryUser = z.infer<typeof queryUserSchema>[number];

const queryUserSchema = z.array(
    z.object({
        id: z.string(),
        displayName: z.string(),
        avatar: z
            .object({
                sources: z.array(
                    z.object({
                        url: z.string(),
                        width: z.number(),
                        height: z.number(),
                    }),
                ),
            })
            .or(z.null())
            .optional(),
    }),
);

function validateQueryUsersSchema(payload: unknown) {
    const validation = queryUserSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getQueryUsers(
    identifier: string,
    context?: GetServerSidePropsContext,
): Promise<SpotifyPlaylistGuardApiReturn<z.infer<typeof queryUserSchema>>> {
    const token = getCookie('s-p-guard:token', context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(
        `${apiUrl}/users/query?${qs.stringify({ identifier })}`,
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

    if (status !== 200) return { success: false, status, data: null };

    const users = validateQueryUsersSchema(resBody);

    return {
        success: true,
        status: status as 200,
        data: users,
    };
}
