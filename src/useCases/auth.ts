import { GetServerSidePropsContext } from 'next';
import { CookieKey } from '../@types';
import { parseCookies } from 'nookies';

export const sessionIsActive = (context: GetServerSidePropsContext) => {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);

    return !!token;
};
