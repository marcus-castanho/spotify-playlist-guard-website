export class InvalidResponseDataError extends Error {
    constructor(
        readonly errorName = 'InvalidResponseDataError',
        readonly errorMessage?: string,
    ) {
        super(errorMessage);
        this.name = errorName;
    }
}

export class HTTPException extends Error {
    constructor(
        readonly errorMessage: string = '',
        readonly statusCode = 500,
        readonly errorName = 'HTTPException',
        readonly originalError?: Error,
    ) {
        super(errorMessage);
        this.name = errorName;
    }
}

export class UnauthorizedError extends HTTPException {
    readonly sessionEnd?: boolean;
    constructor({
        message = 'Unauthorized',
        sessionEnd = false,
        error,
    }: {
        message?: string;
        sessionEnd?: boolean;
        error?: Error;
    }) {
        super(...[message, 401, 'UnauthorizedError', error]);
        this.sessionEnd = sessionEnd;
    }
}

export class NotFoundError extends HTTPException {
    constructor({
        message = 'Not Found',
        error,
    }: {
        message?: string;
        error?: Error;
    }) {
        super(...[message, 404, 'NotFoundError', error]);
    }
}

export class InternalServerError extends HTTPException {
    constructor({
        message = 'Internal Server Error',
        error,
    }: {
        message?: string;
        error?: Error;
    }) {
        super(...[message, 500, 'InternalServerError', error]);
    }
}
