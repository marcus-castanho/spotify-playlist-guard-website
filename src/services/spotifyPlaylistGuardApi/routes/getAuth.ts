import { InvalidResponseDataError } from '../../../errors';

export async function getAuth(code: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/auth/redirect?code=${code}`);

    if (response.status !== 201) throw new Error('Invalid response');

    const token = response.headers.get('Authorization')?.split(' ')[1];

    if (!token) throw new InvalidResponseDataError('Invalid token received');

    return { token };
}
