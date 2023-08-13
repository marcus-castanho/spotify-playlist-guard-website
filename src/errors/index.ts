export class InvalidResponseDataError extends Error {
    constructor(
        readonly errorName = 'InvalidResponseDataError',
        readonly errorMessage?: string,
    ) {
        super(errorMessage);
        this.name = errorName;
    }
}

export class BaseError extends Error {
    constructor(
        readonly errorName = 'BaseError',
        readonly errorMessage?: string,
        readonly statusCode = 500,
        readonly originalError?: Error,
    ) {
        super(errorMessage);
        this.name = errorName;
    }
}

export class UnauthorizedError extends BaseError {
    readonly sessionEnd?: boolean;
    constructor({
        message = '',
        sessionEnd = false,
        error,
    }: {
        message?: string;
        sessionEnd?: boolean;
        error?: Error;
    }) {
        super(...['UnauthorizedError', message, 401, error]);
        this.sessionEnd = sessionEnd;
    }
}

export class NotFoundError extends BaseError {
    constructor({ message = '', error }: { message?: string; error?: Error }) {
        super(...['NotFoundError', message, 404, error]);
    }
}

export class InternalServerError extends BaseError {
    constructor({ message = '', error }: { message?: string; error?: Error }) {
        super(...['InternalServerError', message, 500, error]);
    }
}
