import { GetServerSidePropsContext } from 'next';
import { CookieKey } from '../@types';
import { parseCookies, setCookie } from 'nookies';
import { getAuth } from '../services/api';

export async function authenticate(
    code: string,
    context: GetServerSidePropsContext,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';

    const { token } = await getAuth(code);

    setCookie(context, tokenCookieKey, token, {
        maxAge: 60 * 60 * 1,
    });
}

export const sessionIsActive = (context: GetServerSidePropsContext) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);

    return !!token;
};
