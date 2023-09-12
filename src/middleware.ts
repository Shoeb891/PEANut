// import { NextResponse, NextRequest } from 'next/server';
// import { verifyJwtToken } from './lib/auth';

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const publicPaths = ['/', '/student/login', '/student/signup', '/Faculty/Login', '/Faculty/Signup'];

//   const isPublicPath = publicPaths.includes(path);

//   const token = request.cookies.get('token')?.value || '';

//   const userRole = await verifyJwtToken(token);

//   // console.log('Path:', path);
//   // console.log('Is Public Path:', isPublicPath);
//   // console.log('User Role:', userRole);

//   if (token && isPublicPath) {
//     if (userRole === 'student') {
//       return NextResponse.redirect(new URL('/student/home', request.nextUrl));
//     } else if (userRole === 'faculty') {
//       return NextResponse.redirect(new URL('/Faculty/home', request.nextUrl));
//     }
//   }

//   if (!token && !isPublicPath) {
//     return NextResponse.redirect(new URL('/', request.nextUrl));
//   }

//   if (token && !isPublicPath) {
//     if (userRole === 'student' && !path.startsWith('/student')) {
//       return NextResponse.redirect(new URL('/student/home', request.nextUrl));
//     } else if (userRole === 'faculty' && !path.startsWith('/Faculty')) {
//       return NextResponse.redirect(new URL('/Faculty/home', request.nextUrl));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/',
//     '/Faculty/profile',
//     '/student/login',
//     '/student/signup',
//     '/profile/(.*)',
//     '/Faculty/Login',
//     '/Faculty/Signup',
//     '/student/profile',
//     '/student/home',
//     '/Faculty/home',
//   ],
// };
