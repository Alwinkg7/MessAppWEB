import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  
  // Public routes that don't need auth
  const isPublicRoute = path === '/login' || path === '/login' || path.startsWith('/home');
  const isRootRoute = path === '/';
  
  // If no token and trying to access protected route
  if (!token && !isPublicRoute && !isRootRoute) {
    if (path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If we have a token, doing role checks
  if (token) {
    try {
      // Very basic decoding just to check role in middleware
      // We don't verify signature here, that's done by the backend
      const decoded: any = jwtDecode(token);
      
      const CLAIM_ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const roleStr = decoded[CLAIM_ROLE] || decoded.role;
      const roleId = roleStr ? parseInt(roleStr as string, 10) : null;
      
      // Check expiration
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }

      // If user is logged in and tries to access login pages
      if (path === '/login' || path === '/login') {
        if (roleId === 1) {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } else {
          return NextResponse.redirect(new URL('/user-dashboard', request.url));
        }
      }

      // Role 1 (Admin) accessing non-admin protected routes (optional redirect)
      // For now, let admins access wherever, but prevent users from accessing admin
      if (path.startsWith('/admin') && roleId !== 1) {
        return NextResponse.redirect(new URL('/user-dashboard', request.url));
      }

      // Role 2 (User) trying to access admin
      if (path.startsWith('/admin') && roleId === 2) {
        return NextResponse.redirect(new URL('/user-dashboard', request.url));
      }

    } catch (e) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
