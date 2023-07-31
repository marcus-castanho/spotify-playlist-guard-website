import { GetServerSideProps } from 'next';
import {
    BaseError,
    InvalidResponseDataError,
    NotFoundError,
    UnauthorizedError,
} from '../errors';
import { destroyCookie } from 'nookies';
import { CookieKey } from '../@types';

export function handleErrorResponse(
    error,
): Awaited<ReturnType<GetServerSideProps>> {
    if (!(error instanceof BaseError)) {
        console.log('Uncaught error', {
            message: error.message,
            stack: error.stack,
        });

        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    if (error instanceof InvalidResponseDataError) {
        console.log(error.name, {
            message: error.message,
            stack: error.stack,
        });

        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    const { originalError, name, message, stack } = error;

    console.log(name, {
        message,
        stack,
    });

    if (originalError) {
        console.log('Original error', {
            message: originalError.message,
            stack: originalError.stack,
            error,
        });
    }

    if (error instanceof UnauthorizedError) {
        const { sessionEnd } = error;
        const tokenCookieKey: CookieKey = 's-p-guard:token';
        destroyCookie(null, tokenCookieKey);
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
