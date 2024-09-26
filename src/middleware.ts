import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {verifyToken} from "@/utils/verifyToken";
import rountingData from "@/data/routing/routingData";

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // Get the access token from the cookies
  const token = req.cookies.get('access_token');
  const userCookie = req.cookies.get('user')
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify and decode the token
  const decodedToken = verifyToken(token.value);

  // If the token is invalid or expired, redirect to the login page
  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Extract the user's role from the decoded token (replace 'role' with actual token property)
  const userRole = user?.role; // Default to 'admin' if no role is available




  // Replace {role} in the path dynamically
  const updatedRountingData = rountingData().map(rule => ({
    ...rule,
    path: rule.path.replace('role', userRole), // Replace 'role' with the user's actual role
  }));

  // Check if the current path matches any of the route rules
  const routeRule = updatedRountingData.find(rule => pathname === `/${rule.path}`);

  console.log(routeRule)

  // If the route exists but the user doesn't have access, redirect to unauthorized page
  if (routeRule ? !routeRule.roles.includes(userRole) : true) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Allow access to the route if the user has the correct role
  return NextResponse.next();
}

// Specify which routes this middleware should apply to
export const config = {
  matcher: [
    '/:role/admin',// Matches /admin paths for any role
    '/:role/dashboard',
    '/:role/users/list',
    '/:role/lots',
  ],
};
