import {type NextRequest, NextResponse} from 'next/server';
export {default} from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
	return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
	matcher: [
		/*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
		'/((?!|api|_next/static|_next/image|favicon.ico).*)',
	],
};
