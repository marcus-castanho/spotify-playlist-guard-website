import { NextResponse } from 'next/server';
import { handleMiddlewareErrorResponse } from './errors/serverErrorHandlers';

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware() {
    try {
        return NextResponse.next();
    } catch (error) {
        return handleMiddlewareErrorResponse(error);
    }
}
