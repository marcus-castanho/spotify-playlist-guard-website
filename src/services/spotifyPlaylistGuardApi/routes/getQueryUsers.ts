import { GetServerSidePropsContext } from 'next';
import { z } from 'zod';
import qs from 'qs';
import { getToken } from '../auth';
import { InvalidResponseDataError } from '../../../errors';

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

    return success
        ? { data: validation.data }
        : { error: validation.error.issues };
}

export async function getQueryUsers(
    identifier: string,
    context?: GetServerSidePropsContext,
) {
    const token = getToken(context);
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

    if (response.status !== 200) throw new Error('Invalid response');

    const resBody = await response.json().catch(() => ({}));

    const { ['data']: users, error } = validateQueryUsersSchema(resBody);

    if (!users) throw new InvalidResponseDataError(JSON.stringify(error));

    return users;
}
