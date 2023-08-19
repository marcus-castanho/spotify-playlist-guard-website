import { GetServerSidePropsContext } from 'next';
import { getCookie } from '../storage/cookies';
import { UnauthorizedError } from '../errors';

export const validateSession = (context: GetServerSidePropsContext) => {
    const token = getCookie('s-p-guard:token', context);

    if (!token) throw new UnauthorizedError({});
};
