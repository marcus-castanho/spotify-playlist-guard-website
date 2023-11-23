import { GetServerSideProps, NextApiResponse } from 'next';
import {
    HTTPException,
    InternalServerError,
    InvalidResponseDataError,
    NotFoundError,
    UnauthorizedError,
} from '.';
import { deleteCookie } from '../storage/cookies';
import { log } from '../logger';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';

export function handleApiErrorResponse(
    error,
    res: NextApiResponse,
): NextApiResponse | void {
    if (
        error instanceof InternalServerError ||
        !(error instanceof HTTPException)
    ) {
        log({
            message: 'Uncaught error',
            payload: {
                message: error.message,
                stack: error.stack,
            },
        });

        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }

    const { name, message, stack, statusCode, originalError } = error;
    log({
        message: name,
        payload: { message, stack },
    });

    if (originalError) {
        log({
            message: 'Original error',
            payload: {
                message: originalError.message,
                stack: originalError.stack,
                error,
            },
        });
    }

    return res.status(statusCode).json({
        status: statusCode,
        message,
    });
}

export function handleMiddlewareErrorResponse(
    error,
): Awaited<ReturnType<GetServerSideProps>> {
    if (
        error instanceof InternalServerError ||
        !(error instanceof HTTPException)
    ) {
        log({
            message: 'Uncaught error',
            payload: {
                message: error.message,
                stack: error.stack,
            },
        });

        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    const { name, message, stack, originalError } = error;
    log({
        message: name,
        payload: { message, stack },
    });

    if (originalError) {
        log({
            message: 'Original error',
            payload: {
                message: originalError.message,
                stack: originalError.stack,
                error,
            },
        });
    }

    if (error instanceof InvalidResponseDataError) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    if (error instanceof UnauthorizedError) {
        const { sessionEnd } = error;
        deleteCookie(TOKEN_COOKIE_KEY);

        return {
            redirect: {
                destination: sessionEnd
                    ? `/signin/?sessionEnd=${sessionEnd}`
                    : '/signin',
                permanent: false,
            },
        };
    }

    if (error instanceof NotFoundError) {
        return {
            notFound: true,
        };
    }

    return {
        redirect: {
            destination: '/500',
            permanent: false,
        },
    };
}
