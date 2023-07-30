import { GetServerSideProps } from 'next';
import { BaseError, NotFoundError, UnauthorizedError } from '../errors';

export function handleErrorResponse(
    error: any,
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
        return {
            redirect: {
                destination: '/',
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
