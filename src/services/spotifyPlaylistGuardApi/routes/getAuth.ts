import { SpotifyPlaylistGuardApiReturn } from '../.';
import { InvalidResponseDataError } from '../../../errors';

export async function getAuth(
    code: string,
): Promise<SpotifyPlaylistGuardApiReturn<string>> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/auth/redirect?code=${code}`);
    const { status } = response;

    if (status !== 201) return { success: false, status, data: null };

    const token = response.headers.get('Authorization')?.split(' ')[1];

    if (!token) throw new InvalidResponseDataError('Invalid token received');

    return { success: true, status, data: token };
}
