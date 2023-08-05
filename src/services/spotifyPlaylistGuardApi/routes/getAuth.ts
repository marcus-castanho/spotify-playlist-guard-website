import { SpotifyPlaylistGuardApiReturn } from '../.';
import { InvalidResponseDataError } from '../../../errors';
import { request } from '../httpClient';

export async function getAuth(
    code: string,
): Promise<SpotifyPlaylistGuardApiReturn<string>> {
    const response = await request({
        path: `/auth/redirect?code=${code}`,
        authenticated: false,
    });

    const { status } = response;

    if (status !== 201) return { success: false, status, data: null };

    const token = response.headers.get('Authorization')?.split(' ')[1];

    if (!token) throw new InvalidResponseDataError('Invalid token received');

    return { success: true, status, data: token };
}
