import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {verifyToken} from "@/utils/verifyToken";

// Define access rules directly in the TypeScript file
const accessRules = {
  routes: [
    {
      path: '/admin',
      roles: ['admin'],
    },
    {
      path: '/dashboard',
      roles: ['admin', 'user'],
    },
    {
      path: '/users/list',
      roles: ['admin'],
    },
  ],
};

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // Extract the token from cookies (assuming it's named 'auth_token')
  const token = req.cookies.get('access_token');

  console.log(token)

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const decodedToken = verifyToken(token.value);

  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log("decodedToken" + decodedToken.exp)

  // const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
  //
  // if (decodedToken.exp < currentTime) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  const userRole = 'admin';

  const routeRule = accessRules.routes.find(rule => rule.path === pathname);

  if (routeRule) {
    if (!routeRule.roles.includes(userRole)) {
      // need here to create view for unauthorized routes
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes this middleware should apply to
export const config = {
  matcher: ['/admin', '/dashboard', '/users/list'], // List of routes to apply middleware
};
