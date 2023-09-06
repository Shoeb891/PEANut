import { NextResponse, NextRequest } from 'next/server';
import { verifyJwtToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const publicPaths = ['/', '/student/login', '/student/signup', '/Faculty/Login', '/Faculty/Signup'];

  // Check if the path is public
  const isPublicPath = publicPaths.includes(path);

  // Get the user's token
  const token = request.cookies.get('token')?.value || '';

  // Verify the JWT token to get the user's role
  const userRole = await verifyJwtToken(token);

  if (isPublicPath) {
    if (token) {
      // Redirect to the appropriate dashboard based on the user's role
      if (userRole === 'student') {
        return NextResponse.redirect(new URL('/student/home', request.nextUrl));
      } else if (userRole === 'faculty') {
        return NextResponse.redirect(new URL('/Faculty/home', request.nextUrl));
      }
    }
  } else {
    // If the path is not public and the user is not logged in, redirect to the root URL
    if (!token) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }

  // Allow access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/Faculty/profile',
    '/student/login',
    '/student/signup',
    '/profile/(.*)',
    '/Faculty/Login',
    '/Faculty/Signup',
    '/student/profile',
    '/student/dashboard', // Add the dashboard routes
    '/Faculty/dashboard', // Add the dashboard routes
  ],
};
