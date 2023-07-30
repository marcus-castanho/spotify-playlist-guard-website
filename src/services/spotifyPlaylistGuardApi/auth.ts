import { parseCookies } from 'nookies';
import { CookieKey } from '../../@types';
import { GetServerSidePropsContext } from 'next';

export function getToken(context?: GetServerSidePropsContext) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);

    return token;
}
