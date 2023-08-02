import {
    parseCookies,
    setCookie as defineCookie,
    destroyCookie,
} from 'nookies';
import { GetServerSidePropsContext } from 'next';

export type CookieKey = 's-p-guard:token';

export function getCookie(
    cookieKey: CookieKey,
    context?: GetServerSidePropsContext,
) {
    const { [cookieKey]: cookieValue } = parseCookies(context);
    return cookieValue;
}

export function getCookies(context?: GetServerSidePropsContext) {
    const cookies = parseCookies(context);
    return cookies;
}

export function setCookie(
    cookieKey: CookieKey,
    cookieValue: string,
    options: Parameters<typeof defineCookie>[3],
    context?: GetServerSidePropsContext,
) {
    defineCookie(context, cookieKey, cookieValue, options);
}

export function cleanCookie(
    cookieKey: CookieKey,
    context?: GetServerSidePropsContext,
) {
    destroyCookie(context, cookieKey);
}
