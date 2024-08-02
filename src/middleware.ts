import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';


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
  ],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userRole = 'admin'; // Extract user role from cookies

  // Find the route rule based on the requested path
  const routeRule = accessRules.routes.find(rule => rule.path === pathname);

  if (routeRule) {
    // Check if user role is available and authorized
    if (!userRole) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if the user role is allowed for this route
    if (!routeRule.roles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Allow request to proceed if no restrictions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/dashboard', '/login', '/unauthorized'], // List of routes to apply middleware
};
