import {
    parseCookies,
    setCookie as defineCookie,
    destroyCookie,
} from 'nookies';
import { GetServerSidePropsContext } from 'next';

export type CookieKey = 's-p-guard:token';

/**
 * Get a cookie with a particular name. To use this function on the server side, pass a request context as parameter, otherwise, it will be considered a client side use.
 *
 * @param cookieKey Cookie key.
 * @param context Request context.
 */
export function getCookie(key: CookieKey, context?: GetServerSidePropsContext) {
    const { [key]: value } = parseCookies(context);
    return value;
}

/**
 * Get cookies. To use this function on the server side, pass a request context as parameter, otherwise, it will be considered as client side use.
 *
 * @param context Request context.
 */
export function getCookies(context?: GetServerSidePropsContext) {
    return parseCookies(context);
}

/**
 * Set a cookie with a particular name. To use this function on the server side, pass a request context as parameter, otherwise, it will be considered a client side use.
 *
 * @param key Cookie key.
 * @param value Cookie value.
 * @param options Options that are passed down to `cookie` library.
 * @param context Request context.
 */
export function setCookie(
    key: CookieKey,
    value: string,
    options: Parameters<typeof defineCookie>[3],
    context?: GetServerSidePropsContext,
) {
    defineCookie(context, key, value, options);
}

/**
 * Delete a cookie with a particular name. To use this function on the server side, pass a request context as parameter, otherwise, it will be considered a client side use.
 *
 * @param key Cookie key.
 * @param context Request context.
 */
export function deleteCookie(
    key: CookieKey,
    context?: GetServerSidePropsContext,
) {
    destroyCookie(context, key);
}
