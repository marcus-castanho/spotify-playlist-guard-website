import { GetServerSideProps } from 'next';
import {
    BaseError,
    InvalidResponseDataError,
    NotFoundError,
    UnauthorizedError,
} from '.';
import { cleanCookie, CookieKey } from '../storage/cookies';

export function handleServerErrorResponse(
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

    const { name, message, stack } = error;

    console.log(name, {
        message,
        stack,
    });

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

    const { originalError } = error;
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
        cleanCookie(tokenCookieKey);
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
