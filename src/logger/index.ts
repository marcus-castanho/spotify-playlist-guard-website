import logger from 'pino';
import { match } from 'ts-pattern';

const loggerInstance = logger();

export function log({
    payload,
    message,
    level = 'info',
}: {
    payload: unknown;
    message?: string;
    level?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';
}) {
    const logArgs = [payload, message];
    match(level)
        .with('fatal', () => loggerInstance.fatal(logArgs))
        .with('error', () => loggerInstance.error(logArgs))
        .with('warn', () => loggerInstance.warn(logArgs))
        .with('info', () => loggerInstance.info(logArgs))
        .with('debug', () => loggerInstance.debug(logArgs))
        .with('trace', () => loggerInstance.trace(logArgs))
        .with('silent', () => loggerInstance.silent(logArgs))
        .otherwise(() => () => loggerInstance.info(logArgs));
}
