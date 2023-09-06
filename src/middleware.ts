import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/student/login' || path === '/student/signup' || path === '/Faculty/Login' || path === '/Faculty/Signup'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/student/profile', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    
}

export const config = {
    matcher: [
        '/',
        '/Faculty/profile',
        '/student/login',
        '/student/signup',
        "/profile/(.*)",
        "/Faculty/Login",
        "/Faculty/Signup",
        "/stdent/profile"
    ],
}