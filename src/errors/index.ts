export class InvalidResponseData extends Error {
    constructor(
        readonly errorName = 'BaseError',
        readonly errorMessage?: string,
    ) {
        super(errorMessage);
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
    constructor({ message = '', error }: { message?: string; error?: Error }) {
        super(...['UnauthorizedError', message, 401, error]);
    }
}

export class NotFoundError extends BaseError {
    constructor({ message = '', error }: { message?: string; error?: Error }) {
        super(...['UnauthorizedError', message, 404, error]);
    }
}

export class InternalServerError extends BaseError {
    constructor({ message = '', error }: { message?: string; error?: Error }) {
        super(...['InternalServerError', message, 500, error]);
    }
}
