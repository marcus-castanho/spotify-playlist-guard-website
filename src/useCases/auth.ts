import { GetServerSidePropsContext } from 'next';
import { CookieKey } from '../@types';
import { parseCookies, setCookie } from 'nookies';
import { getAuth } from '../services/spotifyPlaylistGuardApi';
import { InternalServerError } from '../errors';

export async function authenticate(
    code: string,
    context: GetServerSidePropsContext,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';

    const token = await getAuth(code).then(({ status, data }) => {
        if (status !== 201 || !data) throw new InternalServerError({});

        return data;
    });

    setCookie(context, tokenCookieKey, token, {
        maxAge: 60 * 60 * 1,
    });
}

export const sessionIsActive = (context: GetServerSidePropsContext) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);

    return !!token;
};
