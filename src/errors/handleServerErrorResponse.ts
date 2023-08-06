import { GetServerSideProps } from 'next';
import {
    BaseError,
    InvalidResponseDataError,
    NotFoundError,
    UnauthorizedError,
} from '.';
import { cleanCookie } from '../storage/cookies';
import { log } from '../logger';

export function handleServerErrorResponse(
    error,
): Awaited<ReturnType<GetServerSideProps>> {
    if (!(error instanceof BaseError)) {
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

    const { name, message, stack } = error;
    log({
        message: name,
        payload: { message, stack },
    });

    const { originalError } = error;
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
        cleanCookie('s-p-guard:token');
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
