import { NextRequest, NextResponse } from 'next/server';

export const redirectToPath = (req: NextRequest, redirectPath: string) => {
    const redirectUrl = new URL(redirectPath, req.url);
    return NextResponse.redirect(redirectUrl);
};
