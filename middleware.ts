import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    // Simple route protection - actual auth check happens on client side
    const isLoginPage = req.nextUrl.pathname === '/login';
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    // Allow access to login page
    if (isLoginPage) {
        return NextResponse.next();
    }

    // For dashboard, let the page component handle auth check
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
