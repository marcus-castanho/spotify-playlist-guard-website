import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../storage/cookies';
import { UnauthorizedError } from '../errors';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

export const validateSession = (context: GetServerSidePropsContext) => {
    const token = getCookie(TOKEN_COOKIE_KEY, context);

    if (!token) throw new UnauthorizedError({});
};
