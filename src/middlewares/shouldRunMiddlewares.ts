import { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function shouldRunMiddlewares(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (
        pathname.startsWith('/_') || // Default undefined page to redirect when NotFound is thrown in middleware
        pathname.startsWith('/500') || // Custom 500 - Internal server error page (pages directory)
        PUBLIC_FILE.test(req.nextUrl.pathname) // Public file resource
    )
        return false;

    return true;
}
