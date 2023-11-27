import { NextRequest, NextResponse } from 'next/server';
import { CookieKey } from '.';
import { GetServerSidePropsContext } from 'next';
import {
    parseCookies,
    setCookie as defineCookie,
    destroyCookie,
} from 'nookies';

export type CookieOptions = Parameters<typeof defineCookie>[3];

/**
 * Get a cookie with a particular name on the server side of the app. This function can be used in:
 * - getServerSideProps function
 *
 * @param key Cookie key.
 * @param req Request instance.
 */
export function getPageReqCookie(
    key: CookieKey,
    req: GetServerSidePropsContext['req'],
) {
    return req.cookies[key];
}

/**
 * Get cookies on the server side of the app. This function can be used in:
 * - getServerSideProps function
 *
 * @param req Request instance.
 */
export function getPageReqCookies(req: GetServerSidePropsContext['req']) {
    return req.cookies;
}

/**
 * Get a cookie with a particular name on the server side of the app. This function can be used in:
 * - getServerSideProps function
 *
 * @param key Cookie key.
 * @param res Response instance.
 */
export function getPageResCookie(
    key: CookieKey,
    context: GetServerSidePropsContext,
) {
    const { [key]: value } = parseCookies(context);
    return value;
}

/**
 * Set cookie on the server side of the app. This function can be used in:
 * - getServerSideProps function
 *
 * @param context Request context.
 * @param key Cookie key.
 * @param value Cookie value.
 * @param options Options that are passed down to `cookie` library.
 */
export function setPageResCookies(
    context: GetServerSidePropsContext,
    key: string,
    value: string,
    options: CookieOptions,
) {
    defineCookie(context, key, value, options);
}

/**
 * Delete cookie on the server side of the app. This function can be used in:
 * - getServerSideProps function
 *
 * @param context Request context.
 * @param key Cookie key.
 * @param value Cookie value.
 */
export function deletePageResCookies(
    context: GetServerSidePropsContext,
    key: string,
) {
    destroyCookie(context, key);
}

/**
 * Get a cookie with a particular name on the server side of the app. This function can be used with a Request instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param key Cookie key.
 * @param req Request instance.
 */
export function getRequestCookie(key: CookieKey, req: NextRequest) {
    return req.cookies.get(key)?.value;
}

/**
 * Get cookies on the server side of the app. This function can be used with a Request instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param req Request instance.
 */
export function getRequestCookies(req: NextRequest) {
    const cookiesArray = req.cookies.getAll();

    return cookiesArray.reduce(
        (cookiesObj, { name, value }) =>
            Object.assign(cookiesObj, { [name]: value }),
        {} as {
            [key: string]: string;
        },
    );
}

/**
 * Get a cookie with a particular name on the server side of the app. This function can be used with a Response instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param key Cookie key.
 * @param res Response instance.
 */
export function getResponseCookie(key: CookieKey, res: NextResponse) {
    return res.cookies.get(key)?.value;
}

/**
 * Get cookies on the server side of the app. This function can be used with a Response instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param res Response instance.
 */
export function getResponseCookies(res: NextResponse) {
    const cookiesArray = res.cookies.getAll();

    return cookiesArray.reduce(
        (cookiesObj, { name, value }) =>
            Object.assign(cookiesObj, { [name]: value }),
        {} as {
            [key: string]: string;
        },
    );
}

/**
 * Set a cookie with a particular name on the server side of the app. This function can be used with a Request instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param key Cookie key.
 * @param value Cookie value.
 * @param req Request instance.
 */
export function setRequestCookie(
    key: CookieKey,
    value: string,
    req: NextRequest,
) {
    req.cookies.set({ name: key, value });
}

/**
 * Set a cookie with a particular name on the server side of the app. This function can be used with a Response instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param key Cookie key.
 * @param value Cookie value.
 * @param res Response instance.
 * @param options Options that are passed down to `cookie` library.
 */
export function setResponseCookie(
    key: CookieKey,
    value: string,
    res: NextResponse,
    options?: Omit<
        Exclude<Parameters<NextResponse['cookies']['set']>[0], string>,
        'name' | 'value'
    >,
) {
    res.cookies.set({ name: key, value, ...options });
}

/**
 * Delete cookies with particular names on the server side of the app. This function can be used with a Request instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param keys Cookies keys.
 * @param req Request instance.
 */
export function deleteRequestCookies(
    cookieKeys: CookieKey[],
    req: NextRequest,
) {
    req.cookies.delete(cookieKeys);
}

/**
 * Delete a cookie with a particular name on the server side of the app. This function can be used with a Response instance in:
 * - Next middleware
 * - Next route handlers
 *
 * @param key Cookie key.
 * @param res Response instance.
 */
export function deleteResponseCookie(cookieKey: CookieKey, res: NextResponse) {
    res.cookies.delete(cookieKey);
}
