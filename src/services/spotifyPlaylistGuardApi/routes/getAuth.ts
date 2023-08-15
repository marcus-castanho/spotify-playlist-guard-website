import { z } from 'zod';
import { SpotifyPlaylistGuardApiReturn } from '../.';
import { InvalidResponseDataError } from '../../../errors';
import { request } from '../httpClient';

const authSchema = z.object({
    token: z.string(),
});

function validateAuthSchema(payload: unknown) {
    const validation = authSchema.safeParse(payload);
    const { success } = validation;

    if (!success)
        throw new InvalidResponseDataError(
            JSON.stringify(validation.error.issues),
        );

    return validation.data;
}

export async function getAuth(
    code: string,
): Promise<SpotifyPlaylistGuardApiReturn<string>> {
    const response = await request({
        path: `/auth/redirect?code=${code}`,
        authenticated: false,
    });
    const { status } = response;
    const resBody = await response.json().catch(() => ({}));

    if (status !== 201) return { success: false, status, data: null };

    const { token } = validateAuthSchema(resBody);

    return { success: true, status, data: token };
}
