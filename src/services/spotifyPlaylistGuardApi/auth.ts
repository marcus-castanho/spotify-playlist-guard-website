import { GetServerSidePropsContext } from 'next';
import { getCookie, CookieKey } from '../../storage/cookies';

export function getToken(context?: GetServerSidePropsContext) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    return getCookie(tokenCookieKey, context);
}
