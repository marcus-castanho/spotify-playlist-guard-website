import { getRequestCookie } from '../storage/cookies/server';
import { Unauthorized } from '../errors';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { NextRequest } from 'next/server';

export const validateSession = (req: NextRequest) => {
    const token = getRequestCookie(TOKEN_COOKIE_KEY, req);

    if (!token) throw new Unauthorized({});
};
