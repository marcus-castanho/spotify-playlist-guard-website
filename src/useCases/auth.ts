import { GetServerSidePropsContext } from 'next';
import { getAuth } from '../services/spotifyPlaylistGuardApi';
import { InternalServerError } from '../errors';
import { getCookie, setCookie, CookieKey } from '../storage/cookies';

export async function authenticate(
    code: string,
    context: GetServerSidePropsContext,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';

    const token = await getAuth(code).then(({ success, data }) => {
        if (!success) throw new InternalServerError({});
        return data;
    });

    setCookie(
        tokenCookieKey,
        token,
        {
            maxAge: 60 * 60 * 1,
        },
        context,
    );
}

export const sessionIsActive = (context: GetServerSidePropsContext) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const token = getCookie(tokenCookieKey, context);

    return !!token;
};
