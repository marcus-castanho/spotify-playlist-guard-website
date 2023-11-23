import { GetServerSidePropsContext } from 'next';
import { getAuth } from '../services/spotifyPlaylistGuardApi';
import { InternalServerError } from '../errors';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { setPageResCookies } from '@/storage/cookies/server';

export async function authenticate(
    code: string,
    context: GetServerSidePropsContext,
) {
    const token = await getAuth(code).then(({ success, data }) => {
        if (!success) throw new InternalServerError({});
        return data;
    });

    setPageResCookies(context, TOKEN_COOKIE_KEY, token, {
        maxAge: 60 * 60 * 1,
    });
}
