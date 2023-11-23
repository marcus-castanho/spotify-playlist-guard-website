import { CookieKey } from '.';
import Cookies from 'js-cookie';

export type CookiesOptions = Cookies.CookieAttributes;

const isServerSide = typeof window === 'undefined';

/**
 * Get a cookie with a particular name from inside of a client component. This function can not be used on the server side of the app.
 *
 * @param key Cookie key.
 */
export function getCookie(key: CookieKey) {
    if (isServerSide) return;

    const { [key]: cookieValue } = Cookies.get();

    return cookieValue;
}

/**
 * Get cookies from inside of a client component. This can not be used on the server side of the app.
 */
export function getCookies() {
    if (isServerSide) return {};

    const parsedCookies = Cookies.get() || {};
    return parsedCookies;
}

/**
 * Set a cookie with a particular name from inside of a client component. This function can not be used on the server side of the app.
 *
 * @param key Cookie key.
 * @param value Cookie value.
 * @param options Options that are passed down to cookie library.
 */
export function setCookie(
    key: CookieKey,
    value: string,
    options?: Cookies.CookieAttributes,
) {
    if (isServerSide) return;

    Cookies.set(key, value, options);
}

/**
 * Delete a cookie with a particular name from inside of a client component. This function can not be used on the server side of the app.
 *
 * @param key Cookie key.
 */
export function deleteCookie(key: CookieKey) {
    console.log({ isServerSide });
    if (isServerSide) return;

    Cookies.remove(key);
}
