import { GetServerSideProps, NextApiResponse } from 'next';
import {
    HTTPException,
    InternalServerError,
    InvalidResponseDataError,
    NotFound,
    Unauthorized,
} from '.';
import { deleteCookie } from '@/storage/cookies/client';
import { log } from '@/logger';
import { TOKEN_COOKIE_KEY } from '@/contexts/AuthContext';
import { NextRequest, NextResponse } from 'next/server';
import { deleteResponseCookie } from '@/storage/cookies/server';

/**
 * Api error handler for API handler routes.
 *
 * @param error
 * @param res NextApiResponse instance when using pages/api route handlers
 */
export function handleApiErrorResponse(error, res?: NextApiResponse) {
    if (
        error instanceof InternalServerError ||
        !(error instanceof HTTPException)
    ) {
        log({
            message: 'Internal Server Error',
            payload: {
                message: error.message,
                stack: error.stack,
            },
        });

        return res
            ? res.status(500).json({
                  status: 500,
                  message: 'Internal Server Error',
              })
            : NextResponse.json(
                  { status: 500, message: 'Internal Server Error' },
                  { status: 500 },
              );
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

    return res
        ? res.status(statusCode).json({
              status: statusCode,
              message,
          })
        : NextResponse.json(
              { status: statusCode, message: 'Internal Server Error' },
              { status: statusCode },
          );
}

export function handlePageReqErrorResponse(
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

    if (error instanceof Unauthorized) {
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

    if (error instanceof NotFound) {
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

export function handleMiddlewareErrorResponse(
    error,
    req: NextRequest,
    res: NextResponse,
) {
    if (
        error instanceof InternalServerError ||
        !(error instanceof HTTPException)
    ) {
        log({
            message: 'Internal Server Error',
            payload: {
                message: error.message,
                stack: error.stack,
            },
        });

        return NextResponse.redirect(new URL('/500', req.url));
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
        return NextResponse.redirect(new URL('/500', req.url));
    }

    if (error instanceof Unauthorized) {
        const { sessionEnd } = error;
        deleteResponseCookie(TOKEN_COOKIE_KEY, res);

        const signInPath = sessionEnd
            ? new URL(`/signin/?sessionEnd=${sessionEnd}`, req.url)
            : new URL('/signin', req.url);

        return NextResponse.redirect(signInPath);
    }

    if (error instanceof NotFound) {
        // Default undefined page to redirect when NotFound is thrown in middleware
        return NextResponse.redirect(new URL('/_', req.url));
    }

    return NextResponse.redirect(new URL('/500', req.url));
}
