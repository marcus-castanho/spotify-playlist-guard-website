import { GetServerSidePropsContext } from 'next';
import { getAuth } from '../services/spotifyPlaylistGuardApi';
import { InternalServerError } from '../errors';
import { getCookie, setCookie } from '../storage/cookies';

export async function authenticate(
    code: string,
    context: GetServerSidePropsContext,
) {
    const token = await getAuth(code).then(({ success, data }) => {
        if (!success) throw new InternalServerError({});
        return data;
    });

    setCookie(
        's-p-guard:token',
        token,
        {
            maxAge: 60 * 60 * 1,
        },
        context,
    );
}

export const sessionIsActive = (context: GetServerSidePropsContext) => {
    const token = getCookie('s-p-guard:token', context);

    return !!token;
};
