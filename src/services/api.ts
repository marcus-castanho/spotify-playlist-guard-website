import { z } from 'zod';
import { parseCookies } from 'nookies';
import { CookieKey } from '../@types';
import { NextPageContext } from 'next';
import qs from 'qs';

export const userSchema = z.object({
    id: z.string(),
    spotify_id: z.string(),
    country: z.string(),
    display_name: z.string(),
    email: z.string(),
    external_url: z.string(),
    followers: z.number(),
    href: z.string(),
    images: z.array(z.string()),
    product: z.string(),
    type: z.string(),
    uri: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const playlistsSchema = z.array(
    z.object({
        id: z.string(),
        spotify_id: z.string(),
        collaborative: z.boolean(),
        description: z.string(),
        external_url: z.string(),
        href: z.string(),
        name: z.string(),
        userId: z.string(),
        public: z.boolean(),
        snapshot_id: z.string(),
        uri: z.string(),
        active: z.boolean(),
        allowed_userIds: z.array(z.string()),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
);

export const queryUserSchema = z.array(
    z.object({
        id: z.string(),
        displayName: z.string(),
        avatar: z
            .object({
                sources: z.array(
                    z.object({
                        url: z.string(),
                        width: z.number(),
                        height: z.number(),
                    }),
                ),
            })
            .or(z.null())
            .optional(),
    }),
);

export const usersProfilesSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        image_url: z.string(),
    }),
);

function validateUserSchema(payload: unknown) {
    const validation = userSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

function validatePlaylistsSchema(payload: unknown) {
    const validation = playlistsSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

function validateQueryUsersSchema(payload: unknown) {
    const validation = queryUserSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

function validateUserProfilesSchema(payload: unknown) {
    const validation = usersProfilesSchema.safeParse(payload);
    const { success } = validation;

    return success ? validation.data : undefined;
}

export async function getUserInfo(context?: Pick<NextPageContext, 'req'>) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/users/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const userData = validateUserSchema(resBody);

    if (!userData) throw new Error('Invalid response');

    return userData;
}

export async function getUserPlaylists(context?: Pick<NextPageContext, 'req'>) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/list/1`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    const resBody = await response.json().catch(() => ({}));

    const playlists = validatePlaylistsSchema(resBody);

    if (!playlists) throw new Error('Invalid response');

    return playlists;
}

export async function activateDeactivatePlaylist(
    id: string,
    active: boolean,
    context?: Pick<NextPageContext, 'req'>,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/playlists/active/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active }),
    });

    if (response.status !== 204) throw new Error('Invalid response');

    return;
}

export async function queryUsers(
    identifier: string,
    context?: Pick<NextPageContext, 'req'>,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(
        `${apiUrl}/users/query?${qs.stringify({ identifier })}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.status !== 200) throw new Error('Invalid response');

    const resBody = await response.json().catch(() => ({}));

    const users = validateQueryUsersSchema(resBody);

    if (!users) throw new Error('Invalid response');

    return users;
}

export async function getUserProfiles(
    userIds: string[],
    context?: Pick<NextPageContext, 'req'>,
) {
    const tokenCookieKey: CookieKey = 's-p-guard:token';
    const { [tokenCookieKey]: token } = parseCookies(context);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(
        `${apiUrl}/users/profile?${qs.stringify({ spotify_id: userIds })}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.status !== 200) throw new Error('Invalid response');

    const resBody = await response.json().catch(() => ({}));

    const profiles = validateUserProfilesSchema(resBody);

    if (!profiles) throw new Error('Invalid response');

    return profiles;
}
